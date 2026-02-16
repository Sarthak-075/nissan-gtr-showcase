"use client";

import { motion } from "framer-motion";

export default function HeroSection({ active }: { active: boolean }) {
    if (!active) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none"
        >
            <div className="relative">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-6xl md:text-9xl font-orbitron font-bold text-white tracking-tighter leading-none"
                >
                    NISSAN <span className="text-gt-r-red">GT-R</span>
                </motion.h1>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 1, ease: "circOut" }}
                    className="h-1 w-full bg-gt-r-red mt-2 mb-6 shadow-[0_0_20px_#C30010]"
                />
            </div>

            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1, type: "spring" }}
                className="font-orbitron text-5xl md:text-7xl font-black italic text-gt-r-red tracking-tighter drop-shadow-[0_0_15px_rgba(195,0,16,0.5)] mb-12"
            >
                THE GODZILLA
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex gap-6 pointer-events-auto"
            >
                <button
                    onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 bg-gt-r-red text-white font-orbitron font-bold tracking-widest hover:bg-red-700 transition-colors border border-transparent hover:shadow-[0_0_20px_#C30010]"
                >
                    EXPLORE SPECS
                </button>
                <button
                    onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 bg-transparent border border-white/20 text-white font-orbitron font-bold tracking-widest hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
                >
                    VIEW GALLERY
                </button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-2"
            >
                <span className="font-rajdhani text-xs tracking-widest text-neutral-500">SCROLL TO DISCOVER</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gt-r-red to-transparent animate-pulse" />
            </motion.div>
        </motion.div>
    );
}
