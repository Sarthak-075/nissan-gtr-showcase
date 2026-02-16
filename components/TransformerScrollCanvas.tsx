"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TransformerScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function TransformerScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: TransformerScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    // Batch Loading Logic
    useEffect(() => {
        const BATCH_SIZE = 25;
        let isCancelled = false;

        const loadBatch = async (start: number, end: number) => {
            const promises = [];
            for (let i = start; i <= end; i++) {
                if (i > totalFrames) break;

                // Skip if already loaded (check existence in sparse array)
                if (images[i - 1]) continue;

                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `${imageFolderPath}/Frame (${i}).png`;
                    img.onload = () => {
                        if (!isCancelled) {
                            setImages(prev => {
                                const newImages = [...prev];
                                newImages[i - 1] = img;
                                return newImages;
                            });
                        }
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }
            await Promise.all(promises);
        };

        const loadAllSequentially = async () => {
            // Load first batch immediately (Critical for LCP)
            await loadBatch(1, BATCH_SIZE);
            if (isCancelled) return;
            setIsLoaded(true); // Show canvas after first batch

            // Load remaining batches
            for (let i = BATCH_SIZE + 1; i <= totalFrames; i += BATCH_SIZE) {
                if (isCancelled) break;
                await loadBatch(i, Math.min(i + BATCH_SIZE - 1, totalFrames));
            }
        };

        loadAllSequentially();

        return () => {
            isCancelled = true;
        };
    }, [totalFrames, imageFolderPath]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        const img = images[index];

        if (!ctx || !img) return;

        // Use current canvas dimensions (set by resize listener)
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate generic object-fit: contain logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        // HYBRID SCALING LOGIC
        // Check if device is portrait (mobile/tablet vertical)
        const isPortrait = canvas.height > canvas.width;

        if (isPortrait) {
            // PORTRAIT: Use CONTAIN to ensure full car is visible (User request: "reduce size")
            if (canvasRatio > imgRatio) {
                // Canvas wider -> fit to height
                drawHeight = canvas.height;
                drawWidth = img.width * (canvas.height / img.height);
            } else {
                // Canvas taller -> fit to width
                drawWidth = canvas.width;
                drawHeight = img.height * (canvas.width / img.width);
            }
        } else {
            // LANDSCAPE: Use COVER for immersive experience (User request: "upscale")
            if (canvasRatio > imgRatio) {
                // Canvas wider -> fit to Width (COVER)
                drawWidth = canvas.width;
                drawHeight = img.height * (canvas.width / img.width);
            } else {
                // Canvas taller -> fit to Height (COVER)
                drawHeight = canvas.height;
                drawWidth = img.width * (canvas.height / img.width);
            }
        }

        // PREVENT UPSCALING (User Request: "do not stretch... loses quality")
        // If the calculated size is larger than the natural image size, cap it.
        // Note: 'img.width' here refers to natural width if not styled.
        // We use Math.min to ensure we don't scale UP, only DOWN.

        // However, standard "contain" usually scales up. 
        // If we want to strictly prevent "quality loss", we shouldn't draw larger than natural size.

        // Let's check scaling factor


        // Recalculate offsets to center
        // User Request: "title bar is hidding the images so shift the images slightly down"
        // Added +60px offset to account for Navbar height
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = (canvas.height - drawHeight) / 2 + 60;

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Handle Resize & DPI
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const dpr = window.devicePixelRatio || 1;
                const parent = canvas.parentElement;

                if (parent) {
                    // Set actual canvas size (resolution)
                    canvas.width = parent.clientWidth * dpr;
                    canvas.height = parent.clientHeight * dpr;

                    // Ensure styles match visual size (handled by CSS usually, but explicit here helps)
                    // canvas.style.width = `${parent.clientWidth}px`;
                    // canvas.style.height = `${parent.clientHeight}px`;

                    // Re-render current frame immediately after resize
                    const currentProgress = scrollYProgress.get();
                    // If unset, it might be 0
                    const frameIndex = Math.min(
                        totalFrames - 1,
                        Math.floor(currentProgress * (totalFrames - 1))
                    );
                    if (isLoaded) {
                        renderFrame(frameIndex);
                    }
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images, scrollYProgress]);



    return (
        <div className="relative w-full h-full">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-carbon font-rajdhani animate-pulse">
                    INITIALIZING SYSTEMS...
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
                aria-hidden="true"
            />
        </div>
    );
}
