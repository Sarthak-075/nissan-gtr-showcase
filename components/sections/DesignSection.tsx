"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function DesignSection() {
    const [tab, setTab] = useState<"EXTERIOR" | "INTERIOR">("EXTERIOR");

    return (
        <section className="relative min-h-screen flex flex-col md:flex-row bg-neutral-900 border-t border-white/5">
            {/* Control Panel */}
            <div className="w-full md:w-1/3 bg-black/60 backdrop-blur-md p-12 flex flex-col justify-center pointer-events-auto border-r border-white/10">
                <h2 className="font-orbitron text-4xl text-white mb-8 font-bold">DESIGN <br /> PHILOSOPHY</h2>

                <div className="flex flex-col gap-6">
                    <button
                        onClick={() => setTab("EXTERIOR")}
                        className={`text-left text-xl font-rajdhani tracking-widest transition-colors ${tab === "EXTERIOR" ? "text-gt-r-red" : "text-neutral-400 hover:text-white"}`}
                    >
                        01. EXTERIOR
                    </button>
                    <button
                        onClick={() => setTab("INTERIOR")}
                        className={`text-left text-xl font-rajdhani tracking-widest transition-colors ${tab === "INTERIOR" ? "text-gt-r-red" : "text-neutral-400 hover:text-white"}`}
                    >
                        02. INTERIOR
                    </button>
                </div>

                <div className="mt-12">
                    <p className="font-rajdhani text-neutral-300 leading-relaxed">
                        {tab === "EXTERIOR"
                            ? "Function dictates form. Every line, vent, and blade is designed to maximize downforce and minimize drag. The V-motion grille enlarges engine cooling without increasing drag."
                            : "A cockpit designed for the driver. Nappa leather seats, carbon fiber trim, and a horizontal instrument panel layout that ensures all information is visible at a glance."
                        }
                    </p>
                </div>
            </div>

            {/* Visual Panel */}
            <div className="w-full md:w-2/3 relative overflow-hidden bg-neutral-900 group h-[50vh] md:h-auto">
                <div className={`absolute inset-0 transition-opacity duration-700 ${tab === "EXTERIOR" ? "opacity-100" : "opacity-0"}`}>
                    <Image
                        src="/images/exterior.jpeg"
                        alt="GT-R Exterior"
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-700 ${tab === "INTERIOR" ? "opacity-100" : "opacity-0"}`}>
                    <Image
                        src="/images/interior.jpg"
                        alt="GT-R Interior"
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                </div>
            </div>
        </section>
    );
}
