"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const milestones = [
    { year: "1969", title: "The Origin", desc: "The first Skyline GT-R (PGC10) is born." },
    { year: "1989", title: "Godzilla Returns", desc: "The R32 dominates Group A racing." },
    { year: "2007", title: "Global Icon", desc: "The R35 debuts as a standalone supercar." },
    { year: "2024", title: "Titanium", desc: "The ultimate evolution of the platform." },
];

export default function TimelineSection() {
    return (
        <section className="relative min-h-screen py-24 flex flex-col items-center justify-center px-6 bg-neutral-900 border-t border-white/5 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image src="/images/legacy.jpg" alt="Legacy Background" fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-center w-full max-w-6xl pointer-events-auto relative z-10">
                {milestones.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative flex flex-col items-center text-center w-full md:w-1/4 group"
                    >
                        {/* Connecting Line (Desktop) */}
                        {i !== milestones.length - 1 && (
                            <div className="hidden md:block absolute top-[15px] left-[50%] w-full h-[2px] bg-white/10" />
                        )}

                        <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-gt-r-red z-10 mb-6 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_#C30010]" />

                        <h3 className="font-orbitron font-bold text-3xl text-white mb-2 group-hover:text-gt-r-red transition-colors duration-300">{item.year}</h3>
                        <h4 className="font-rajdhani font-bold text-gt-r-red tracking-widest text-sm mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h4>
                        <p className="font-rajdhani text-neutral-300 text-sm px-4 group-hover:text-white transition-colors duration-300">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
