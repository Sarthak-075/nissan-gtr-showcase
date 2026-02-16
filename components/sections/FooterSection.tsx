"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
    return (
        <footer className="relative py-12 px-6 md:px-24 bg-black border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-2">
                <span className="font-orbitron font-bold text-2xl text-white">NISSAN <span className="text-gt-r-red">GT-R</span></span>
                <span className="font-rajdhani text-neutral-500 text-sm tracking-widest">© 2024 NISSAN MOTOR CO., LTD.</span>
            </div>

            <div className="flex gap-8">
                {["Instagram", "Twitter", "YouTube"].map((item) => (
                    <a key={item} href="#" className="font-rajdhani text-metal-silver hover:text-white hover:text-gt-r-red transition-colors text-sm tracking-[0.2em] uppercase">
                        {item}
                    </a>
                ))}
            </div>
        </footer>
    );
}
