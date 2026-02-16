"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const images = [
        "/images/gallery/1.jpg",
        "/images/gallery/2.jpg",
        "/images/gallery/3.jpg",
        "/images/gallery/4.jpg",
        "/images/gallery/5.jpg",
        "/images/gallery/6.jpg",
        "/images/gallery/7.jpg",
        "/images/gallery/8.jpg"
    ];

    return (
        <section id="gallery" className="relative min-h-[80vh] py-24 flex flex-col items-center justify-center bg-neutral-900 border-t border-white/5 overflow-hidden">
            <h2 className="font-orbitron text-white text-3xl mb-12 font-bold pointer-events-auto">VISUAL <span className="text-gt-r-red">ARCHIVE</span></h2>

            {/* Horizontal Scroll Container */}
            <div className="w-full overflow-x-auto pb-8 px-6 md:px-12 flex gap-6 snap-x snap-mandatory scrollbar-hide pointer-events-auto">
                {images.map((src, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedImage(src)}
                        className="relative flex-none w-[80vw] md:w-[40vw] h-[50vh] bg-neutral-800 border border-white/5 group cursor-pointer snap-center overflow-hidden rounded-sm"
                    >
                        <img
                            src={src}
                            alt={`Gallery ${i}`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="eager"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="font-rajdhani text-white text-4xl tracking-widest">VIEW</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out backdrop-blur-sm"
                    >
                        <motion.img
                            src={selectedImage}
                            alt="Full View"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-full max-h-full object-contain border border-white/10 shadow-2xl"
                        />
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                            <span className="text-4xl">&times;</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Hint */}
            <div className="absolute bottom-12 flex gap-2 items-center text-white/20 text-sm font-rajdhani animate-pulse pointer-events-none">
                <span>SCROLL/DRAG</span>
                <div className="w-12 h-px bg-white/20" />
            </div>
        </section>
    );
}
