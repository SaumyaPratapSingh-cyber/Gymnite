'use client';

import React from 'react';
import { Bike, Brain, Swords, Dumbbell, Activity, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
    {
        icon: Bike,
        title: 'Cycling',
        desc: 'High-intensity cardio to boost endurance and leg strength.',
        className: 'md:col-span-2',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop'
    },
    {
        icon: Brain,
        title: 'Meditation',
        desc: 'Mental clarity and stress reduction techniques.',
        className: 'md:col-span-1',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1470&auto=format&fit=crop'
    },
    {
        icon: Swords,
        title: 'Martial Arts',
        desc: 'Discipline, self-defense, and full-body conditioning.',
        className: 'md:col-span-1',
        image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop'
    },
    {
        icon: Dumbbell,
        title: 'Power Lifting',
        desc: 'Build raw strength with compound heavy lifting movements.',
        className: 'md:col-span-1 md:row-span-2',
        image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1587&auto=format&fit=crop'
    },
    {
        icon: Activity,
        title: 'Cardio',
        desc: 'Keep your heart healthy with advanced treadmill & rowing sessions.',
        className: 'md:col-span-2',
        image: 'https://images.unsplash.com/photo-1538805060512-3030e2548e80?q=80&w=1469&auto=format&fit=crop'
    },
    {
        icon: HeartPulse,
        title: 'Recovery',
        desc: 'Professional physiotherapy and massage.',
        className: 'md:col-span-1',
        image: 'https://images.unsplash.com/photo-1518617638479-720dd332d541?q=80&w=2670&auto=format&fit=crop'
    },
];

const ServiceGrid = () => {
    return (
        <section className="py-24 bg-primary relative overflow-hidden">
            {/* Background Texture - Void */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-secondary)_0%,_transparent_100%)] opacity-50" />

            <div className="container-custom relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative inline-block mb-4"
                    >
                        <span className="text-accent font-bold tracking-[0.2em] text-sm uppercase">
                            Visual Excellence
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-heading font-black text-white uppercase italic tracking-tighter"
                    >
                        Push Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Limits</span>
                    </motion.h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    <AnimatePresence>
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className={`group relative overflow-hidden border border-white/10 bg-black hover:border-accent/50 transition-colors duration-500 rounded-2xl flex flex-col justify-between ${service.className}`}
                            >
                                {/* Background Image with Zoom Effect */}
                                <div className="absolute inset-0 z-0">
                                    <motion.img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700 ease-in-out"
                                    />
                                    {/* Vignette Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                </div>

                                {/* Hover Gradient Upgrade */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                                {/* Icon */}
                                <div className="relative z-20 m-6 w-12 h-12 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-colors duration-300">
                                    <service.icon size={24} />
                                </div>

                                {/* Content */}
                                <div className="relative z-20 p-6 pt-0">
                                    <h3 className="text-2xl font-heading font-black uppercase text-white mb-2 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-lg">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors drop-shadow-md">
                                        {service.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
