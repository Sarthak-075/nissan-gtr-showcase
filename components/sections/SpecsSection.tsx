"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const specs = {
    performance: [
        { label: "Horsepower", value: "565", unit: "HP" },
        { label: "Torque", value: "633", unit: "NM" },
        { label: "0-100 KMPH", value: "2.9", unit: "SEC" },
        { label: "Top Speed", value: "315", unit: "KMPH" },
        { label: "Engine", value: "3799", unit: "CC V6" },
        { label: "Power", value: "562", unit: "BHP" }
    ],
    memorial: [ // efficient placeholder for now
        // ...
    ]
};

export default function SpecsSection() {
    return (
        <section id="specs" className="relative min-h-screen py-24 flex flex-col items-center justify-center bg-black border-t border-white/5 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/images/rpm.jpg" alt="RPM Background" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
            </div>

            <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-12 pointer-events-auto z-10 relative">
                TECHNICAL <span className="text-gt-r-red">PRECISION</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16 pointer-events-auto w-full max-w-7xl px-4">
                {specs.performance.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/10 flex flex-col items-center justify-center bg-neutral-carbon/20 group-hover:border-gt-r-red/50 transition-colors duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gt-r-red/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                            <span className="font-orbitron text-2xl md:text-4xl font-bold text-white z-10">{stat.value}</span>
                            <span className="font-rajdhani text-[10px] md:text-xs text-gt-r-red font-bold tracking-widest z-10">{stat.unit}</span>
                        </div>
                        <span className="mt-4 font-rajdhani text-white tracking-[0.2em] text-xs md:text-sm font-bold drop-shadow-md whitespace-nowrap">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
