"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import TransformerScrollCanvas from "@/components/TransformerScrollCanvas";
import GTRExperience from "@/components/GTRExperience";
import Navbar from "@/components/Navbar";

// Content Sections
import IntroSection from "@/components/sections/IntroSection";
import SpecsSection from "@/components/sections/SpecsSection";
import DesignSection from "@/components/sections/DesignSection";
import PerformanceSection from "@/components/sections/PerformanceSection";
import TimelineSection from "@/components/sections/TimelineSection";
import VariantsSection from "@/components/sections/VariantsSection";
import GallerySection from "@/components/sections/GallerySection";
import PricingSection from "@/components/sections/PricingSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
    const containerRef = useRef<HTMLElement>(null);

    // Scroll progress for the Canvas section ONLY
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <main className="bg-base-dark min-h-screen">
            <Navbar />

            {/* SECTION 1: The 'Hook' - 3D Transformation */}
            {/* Height determines how long the 3D sequence lasts */}
            <section ref={containerRef} className="h-[400vh] relative z-10">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <div className="relative w-full h-full">
                        <TransformerScrollCanvas
                            scrollYProgress={smoothProgress}
                            totalFrames={192}
                            imageFolderPath="/frames"
                        />
                        <GTRExperience scrollYProgress={smoothProgress} />
                    </div>
                </div>
            </section>

            {/* SECTION 2: The Content - Vertical Scrolling */}
            <div className="relative z-20 bg-base-dark box-border">
                <IntroSection />
                <SpecsSection />
                <DesignSection />
                <PerformanceSection />
                <TimelineSection />
                <VariantsSection />
                <GallerySection />
                <PricingSection />
                <FooterSection />
            </div>
        </main>
    );
}
