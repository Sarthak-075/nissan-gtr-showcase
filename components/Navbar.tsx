"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Chatbot from "./Chatbot";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-500 ${isScrolled ? "bg-base-dark/80 backdrop-blur-md border-b border-neutral-carbon/50" : "bg-transparent border-transparent"
                    }`}
            >
                <div className="text-white font-orbitron font-bold text-xl tracking-widest flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <span className="text-gt-r-red">GT-R</span>
                    <span className="text-neutral-500 text-sm font-light hidden md:inline">| TITANIUM</span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => scrollToSection('specs')}
                        className="hidden md:block text-xs font-rajdhani tracking-widest text-neutral-400 hover:text-white transition-colors"
                    >
                        SPECS
                    </button>
                    <button
                        onClick={() => scrollToSection('gallery')}
                        className="hidden md:block text-xs font-rajdhani tracking-widest text-neutral-400 hover:text-white transition-colors"
                    >
                        GALLERY
                    </button>
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className="text-xs md:text-sm font-rajdhani tracking-widest text-white border border-gt-r-red bg-gt-r-red/10 hover:bg-gt-r-red transition-colors px-6 py-2"
                    >
                        INQUIRE
                    </button>
                </div>
            </nav>

            <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
}
