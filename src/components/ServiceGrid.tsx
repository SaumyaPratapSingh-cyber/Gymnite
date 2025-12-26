'use client';

import React from 'react';
import { Bike, Brain, Swords, Dumbbell, Activity, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    {
        icon: Bike,
        title: 'Cycling',
        desc: 'High-intensity cardio to boost endurance and leg strength.'
    },
    {
        icon: Brain,
        title: 'Meditation',
        desc: 'Mental clarity and stress reduction techniques for total wellness.'
    },
    {
        icon: Swords,
        title: 'Martial Arts',
        desc: 'Discipline, self-defense, and full-body conditioning.'
    },
    {
        icon: Dumbbell,
        title: 'Power Lifting',
        desc: 'Build raw strength with compound heavy lifting movements.'
    },
    {
        icon: Activity,
        title: 'Cardio',
        desc: 'Keep your heart healthy with advanced treadmill & rowing sessions.'
    },
    {
        icon: HeartPulse,
        title: 'Recovery',
        desc: 'Professional physiotherapy and massage for faster muscle recovery.'
    },
];

const ServiceGrid = () => {
    return (
        <section className="py-24 bg-secondary relative overflow-hidden">
            {/* Background Texture & Vector Shapes */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent rounded-full blur-[150px] mix-blend-screen" />
                <svg className="absolute left-0 bottom-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 L0 80 Q 50 20 100 80 L 100 100 Z" fill="#222" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="relative inline-block mb-4">
                        {/* Brush Stroke */}
                        <div className="absolute inset-0 bg-accent -skew-x-12 blur-sm opacity-80" />
                        <span className="relative z-10 text-white font-bold tracking-[0.2em] text-sm uppercase px-4 py-1">
                            OUR SPECIALTIES
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase italic">
                        PUSH YOUR <span className="text-outline">LIMITS</span>
                    </h2>
                </div>

                {/* Grid - 3 Columns for alignments */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900 border border-white/5 p-8 relative group overflow-hidden hover:border-accent transition-colors duration-300 rounded-br-[60px]"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-black border border-white/10 rounded-2xl rotate-3 flex items-center justify-center mb-6 group-hover:rotate-0 group-hover:bg-accent group-hover:border-transparent transition-all duration-300 shadow-2xl">
                                    <service.icon size={36} className="text-white" />
                                </div>

                                <h3 className="text-2xl font-heading font-bold mb-3 uppercase text-white tracking-wide group-hover:text-accent transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-[250px] mx-auto">
                                    {service.desc}
                                </p>

                                {/* Decorative Line */}
                                <div className="w-12 h-1 bg-white/10 mt-6 rounded-full group-hover:w-full group-hover:bg-accent/50 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;
