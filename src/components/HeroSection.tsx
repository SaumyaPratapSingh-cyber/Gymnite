'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

const HeroSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: "0%",
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section ref={containerRef} className="relative w-full h-[90vh] md:h-screen flex items-center bg-primary overflow-hidden">
            {/* Background & Overlay with Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                {/* Keeping existing asset as requested, wrapped in motion */}
                <img
                    src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1974&auto=format&fit=crop"
                    alt="Gym Background"
                    className="w-full h-full object-cover scale-110" // Slight scale to avoid gaps during parallax
                />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-20 container-custom flex flex-col justify-center h-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl"
                >
                    {/* Small Label */}
                    <div className="overflow-hidden mb-4">
                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-accent"></span>
                            <span className="text-accent font-bold tracking-[0.3em] text-sm md:text-lg uppercase">
                                Find Your Power
                            </span>
                        </motion.div>
                    </div>

                    {/* Kinetic Typography Headline */}
                    <h1 className="font-heading font-black leading-[0.8] uppercase mb-8">
                        <div className="overflow-hidden">
                            <motion.div variants={itemVariants} className="text-7xl md:text-9xl text-white">
                                Unleash
                            </motion.div>
                        </div>
                        <div className="overflow-hidden">
                            <motion.div variants={itemVariants} className="text-7xl md:text-9xl kinetic-text">
                                Your Beast
                            </motion.div>
                        </div>
                    </h1>

                    {/* Buttons Placeholder - Will be refactored to Magnetic later, standard for now but with spring */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-8">
                        <MagneticButton>
                            Start Training
                        </MagneticButton>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-outline"
                        >
                            About Us
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative Grid/Lines */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        </section>
    );
};

export default HeroSection;
