"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function PerformanceSection() {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <section className="relative min-h-[80vh] py-24 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 bg-black border-t border-white/5 overflow-hidden gap-12">

            {/* Left: Content */}
            <div className="w-full md:w-1/2 relative z-10 p-6 md:p-12 border-l-4 border-gt-r-red bg-neutral-900/50 backdrop-blur-sm rounded-r-lg">
                <motion.h2
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-6 leading-none"
                >
                    TRACK <br /> DOMINANCE
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-rajdhani text-neutral-300 text-xl leading-relaxed mb-8"
                >
                    Hand-crafted titanium exhaust. Independent transaxle 4WD.
                    Dampers setup by Nürburgring masters.
                    Every millimeter is designed to shave seconds off your lap time.
                </motion.p>
                <div className="flex gap-4 flex-wrap">
                    <div className="px-6 py-2 border border-white/20 text-white font-rajdhani tracking-widest text-sm hover:bg-white/10 transition-colors cursor-default">
                        ATTESA E-TS AWD
                    </div>
                    <div className="px-6 py-2 border border-white/20 text-white font-rajdhani tracking-widest text-sm hover:bg-white/10 transition-colors cursor-default">
                        BREMBO BRAKES
                    </div>
                </div>
            </div>

            {/* Right: Visual */}
            <div
                className="w-full md:w-1/2 h-[400px] md:h-[600px] relative rounded-lg overflow-hidden border border-white/10 group cursor-zoom-in bg-black"
                onClick={() => setIsLightboxOpen(true)}
            >
                <Image
                    src="/images/track.jpg"
                    alt="Track Dominance"
                    fill
                    className="absolute inset-0 object-contain transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay only on hover to not obscure text in image */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                <div className="absolute bottom-6 right-6 text-right pointer-events-none">
                    <span className="block font-orbitron text-4xl font-bold text-white drop-shadow-md">7:08.679</span>
                    <span className="block font-rajdhani text-gt-r-red tracking-widest text-sm drop-shadow-md">NÜRBURGRING LAP TIME</span>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsLightboxOpen(false)}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out backdrop-blur-sm"
                    >
                        <motion.img
                            src="/images/track.jpg"
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
        </section>
    );
}
