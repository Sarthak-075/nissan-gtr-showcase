"use client";

import { motion } from "framer-motion";

export default function PricingSection() {
    return (
        <section className="relative min-h-[80vh] py-24 flex items-center justify-end px-6 md:px-24 bg-black border-t border-white/5 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/images/back.jpg" alt="Pricing Background" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-transparent" />
            </div>

            <div className="text-right pointer-events-auto relative z-10 p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-rajdhani text-gt-r-red text-xl tracking-widest font-bold"
                >
                    STARTING AT
                </motion.span>
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-4"
                >
                    ₹2.12 CRORE
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-rajdhani text-neutral-300 mb-8 tracking-widest text-lg"
                >
                    (EX-SHOWROOM)
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 bg-gt-r-red text-white font-orbitron font-bold text-xl tracking-widest hover:bg-white hover:text-black transition-colors border-none shadow-[0_0_20px_#C30010]"
                >
                    BOOK YOURS
                </motion.button>
            </div>
        </section>
    );
}
