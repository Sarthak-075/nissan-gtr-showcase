"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const variants = [
    { name: "PREMIUM", hp: "565 HP", label: "The Grand Tourer", image: "/images/premium.jpg" },
    { name: "T-SPEC", hp: "565 HP", label: "Heritage Inspired", image: "/images/tspec.jpg" },
    { name: "NISMO", hp: "600 HP", label: "Track Weapon", image: "/images/nismo.jpg" },
];

export default function VariantsSection() {
    const [activeBackground, setActiveBackground] = useState<string | null>(null);

    return (
        <section className="relative min-h-screen py-24 flex flex-col items-center justify-center bg-black border-t border-white/5 overflow-hidden transition-all duration-700">

            {/* Default Background (Weapon) */}
            <div
                className={`absolute inset-0 transition-opacity duration-700 ${activeBackground ? "opacity-0" : "opacity-60"}`}
            >
                <Image
                    src="/images/weapon.jpg"
                    alt="Default Weapon Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Dynamic Backgrounds */}
            {variants.map((variant) => (
                <div
                    key={variant.name}
                    className={`absolute inset-0 transition-opacity duration-700 ${activeBackground === variant.image ? "opacity-60" : "opacity-0"}`}
                >
                    <Image
                        src={variant.image}
                        alt={`${variant.name} Background`}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
            ))}

            {/* Default Background if none active (optional, using black base) */}

            <div className="relative z-10 flex flex-col items-center w-full">
                <h2 className="font-orbitron text-white text-5xl mb-16 font-bold text-center drop-shadow-lg">
                    CHOOSE YOUR <span className="text-gt-r-red">WEAPON</span>
                </h2>

                <div className="flex flex-col md:flex-row gap-8 pointer-events-auto">
                    {variants.map((variant, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            onMouseEnter={() => setActiveBackground(variant.image)}
                            onMouseLeave={() => setActiveBackground(null)}
                            className="bg-neutral-900/80 backdrop-blur-md border border-white/10 p-8 w-80 hover:-translate-y-2 hover:border-gt-r-red transition-all duration-300 group relative overflow-hidden"
                        >
                            <h3 className="font-orbitron text-2xl text-white mb-2 relative z-10">{variant.name}</h3>
                            <div className="h-[1px] w-12 bg-gt-r-red mb-4 group-hover:w-full transition-all duration-500 relative z-10" />
                            <p className="font-rajdhani text-neutral-300 tracking-widest text-sm mb-8 relative z-10">{variant.label}</p>

                            <div className="text-4xl font-orbitron text-white font-bold relative z-10">{variant.hp}</div>

                            {/* Card Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gt-r-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
