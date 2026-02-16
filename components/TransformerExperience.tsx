"use client";

import { useMotionValueEvent, MotionValue, useTransform, motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TransformerExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function TransformerExperience({
    scrollYProgress,
}: TransformerExperienceProps) {
    const [phase, setPhase] = useState<"HERO" | "TRANSFORM" | "ARRIVAL">("HERO");

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.3) {
            setPhase("HERO");
        } else if (latest < 0.75) {
            setPhase("TRANSFORM");
        } else {
            setPhase("ARRIVAL");
        }
    });

    return (
        <div className="absolute inset-0 z-10 pointer-events-none select-none flex flex-col justify-between p-8 md:p-12 overflow-hidden">

            {/* Dynamic Overlay Content based on Phase */}
            <AnimatePresence mode="wait">
                {phase === "HERO" && (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="absolute top-1/3 left-8 md:left-24"
                    >
                        <h2 className="text-xl md:text-3xl font-orbitron text-white tracking-widest mb-2">
                            PROTOCOL: GODZILLA
                        </h2>
                        <div className="h-px w-24 bg-accent-metal mb-2" />
                        <p className="font-rajdhani text-neutral-400 tracking-wider">
                            SYSTEMS: VR38DETT ONLINE
                        </p>
                    </motion.div>
                )}

                {phase === "TRANSFORM" && (
                    <motion.div
                        key="transform"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-1/3 right-8 md:right-24 text-right"
                    >
                        <div className="flex flex-col items-end gap-1">
                            <p className="font-rajdhani text-accent-metal font-bold tracking-[0.2em] animate-pulse">
                                BOOST PRESSURE RISING
                            </p>
                            <h3 className="text-4xl md:text-6xl font-orbitron text-white opacity-80">
                                ATTESA E-TS
                            </h3>
                            <p className="font-rajdhani text-neutral-500 text-sm">
                                AERO DEPLOYING: 42%
                            </p>
                        </div>
                    </motion.div>
                )}

                {phase === "ARRIVAL" && (
                    <motion.div
                        key="arrival"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="absolute inset-0 flex items-center justify-center flex-col text-center"
                    >
                        <h1 className="text-5xl md:text-8xl font-orbitron text-white tracking-tighter mb-4 shadow-black drop-shadow-2xl">
                            THE LEGEND AWAKENS
                        </h1>
                        <p className="font-rajdhani text-xl text-neutral-400 tracking-[0.3em] mb-8">
                            R35 GTR NISMO REBOOT
                        </p>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="pointer-events-auto border border-neutral-carbon px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300 font-orbitron tracking-widest text-sm"
                            onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            VIEW SPECS
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Persistent Corners / HUD decoration */}
            <div className="absolute top-8 left-8 border-t border-l border-white/20 w-8 h-8" />
            <div className="absolute top-8 right-8 border-t border-r border-white/20 w-8 h-8" />
            <div className="absolute bottom-8 left-8 border-b border-l border-white/20 w-8 h-8" />
            <div className="absolute bottom-8 right-8 border-b border-r border-white/20 w-8 h-8" />

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />
                <span className="text-[10px] font-rajdhani tracking-widest text-neutral-500">SCROLL TO INITIATE</span>
            </motion.div>
        </div>
    );
}
