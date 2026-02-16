"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IntroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-between p-6 md:p-24 bg-neutral-900 border-t border-white/5">
            {/* Left Column: Story */}
            <div className="w-full md:w-1/2 flex flex-col justify-center h-full pointer-events-auto">
                <span
                    className="block font-rajdhani text-gt-r-red text-xl tracking-widest mb-4"
                >
                    THE LEGEND
                </span>
                <motion.h2
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-orbitron text-4xl md:text-6xl text-white font-bold mb-8 leading-tight"
                >
                    REDEFINING <br /> SUPERCAR <br /> PHYSICS
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-rajdhani text-neutral-300 text-lg leading-relaxed max-w-xl text-justify"
                >
                    Since 2007, the R35 GT-R has challenged the status quo of what a supercar can be.
                    Merging brute force with digital precision, it is a weapon of mass seduction
                    engineered for a singular purpose: absolute dominance on any track, at any time.
                </motion.p>
            </div>

            {/* Right Column: Visual */}
            <div className="hidden md:flex w-5/12 h-[600px] bg-neutral-carbon/20 backdrop-blur-sm border border-white/5 rounded-sm items-center justify-center relative overflow-hidden group">
                <Image
                    src="/images/start.jpg"
                    alt="Nissan GT-R Start"
                    fill
                    className="absolute inset-0 object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <span className="font-orbitron text-white/10 text-9xl font-bold -rotate-90 z-0 group-hover:text-white/20 transition-colors duration-500 absolute">
                    LEGEND
                </span>
            </div>
        </section>
    );
}
