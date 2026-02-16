"use client";

import { useMotionValueEvent, MotionValue, AnimatePresence } from "framer-motion";
import { useState } from "react";
import HeroSection from "./sections/HeroSection";

interface GTRExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function GTRExperience({
    scrollYProgress,
}: GTRExperienceProps) {
    // Only show Hero overlay when scroll is near top
    const [showHero, setShowHero] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Fade out hero overlay as we scroll down the transformation
        setShowHero(latest < 0.15);
    });

    return (
        <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
            <AnimatePresence>
                {showHero && <HeroSection key="hero" active={true} />}
            </AnimatePresence>

            {/* Global HUD Elements (Always Visible but subtle) */}
            <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/20" />
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/20" />

            {/* Scroll Progress Bar at bottom */}
            <div className="absolute bottom-0 left-0 h-1 bg-neutral-900 w-full z-50">
                <div
                    className="h-full bg-gt-r-red transition-transform duration-100 ease-out"
                    style={{
                        width: "100%",
                        transform: `scaleX(${scrollYProgress.get()})`,
                        transformOrigin: "0%"
                    }}
                />
            </div>
        </div>
    );
}
