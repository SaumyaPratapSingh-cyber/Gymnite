'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <section className="relative w-full h-[90vh] md:h-screen flex items-center bg-primary overflow-hidden">
            {/* Background & Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1974&auto=format&fit=crop"
                    alt="Gym Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Big Outline Text - Perfectly Centered & Aligned */}
            <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none select-none opacity-20">
                <h1 className="text-[12vw] md:text-[18vw] font-heading font-bold text-transparent border-white stroke-white" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                    GYMNITE
                </h1>
            </div>

            {/* Content Container - Left Aligned with Padding */}
            <div className="relative z-20 container mx-auto px-4 md:px-12 flex flex-col justify-center h-full">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    {/* Paint Stroke Accent */}
                    <div className="relative inline-block mb-4 pl-2">
                        <div className="absolute inset-0 bg-accent skew-x-[-12deg] opacity-90 h-full w-[110%] -left-2 top-0 -z-10 shadow-glow" />
                        <span className="relative text-white font-bold tracking-[0.3em] text-sm md:text-lg uppercase">
                            FIND YOUR POWER
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-heading font-bold text-white leading-[0.9] uppercase italic mb-8 drop-shadow-lg">
                        UNLEASH <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">
                            YOUR BEAST
                        </span>
                    </h2>

                    <div className="flex flex-wrap gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-accent text-white px-10 py-4 text-lg font-heading font-bold uppercase tracking-wider skew-x-[-10deg] hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(255,0,0,0.4)]"
                        >
                            <div className="skew-x-[10deg]">Start Training</div>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-transparent border-2 border-white text-white px-10 py-4 text-lg font-heading font-bold uppercase tracking-wider skew-x-[-10deg] hover:bg-white hover:text-black transition-colors"
                        >
                            <div className="skew-x-[10deg]">About Us</div>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Vector Side Element */}
            <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block z-10">
                <div className="w-full h-full bg-accent/10 clip-path-polygon-[40%_0,100%_0,100%_100%,0%_100%]" />
            </div>
        </section>
    );
};

export default HeroSection;
