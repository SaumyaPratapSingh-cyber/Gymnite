'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const CLASSES = [
    {
        id: 1,
        name: 'Iron Forge',
        description: 'Heavy compound movements designed to build raw strength and density.',
        time: '06:00 AM',
        duration: '60 min',
        intensity: 'High',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Metabolic Fire',
        description: 'High-intensity interval training to shred fat and boost endurance.',
        time: '07:30 AM',
        duration: '45 min',
        intensity: 'Extreme',
        image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=2025&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Mobility Flow',
        description: 'Active recovery and flexibility work to keep you injury-free.',
        time: '09:00 AM',
        duration: '60 min',
        intensity: 'Low',
        image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Power Hour',
        description: 'Explosive power training for athletes.',
        time: '05:00 PM',
        duration: '60 min',
        intensity: 'High',
        image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop'
    }
];

export default function ClassesPage() {
    return (
        <main className="min-h-screen bg-[var(--primary)] text-white pt-24">
            <Navbar />

            <section className="container-custom py-12">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-heading font-black italic uppercase mb-4">
                        Training <span className="text-[var(--accent)]">Protocols</span>
                    </h1>
                    <p className="text-gray-400">Join the elite. Push past failure.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CLASSES.map((cls, i) => (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black/60 z-10 group-hover:bg-black/40 transition-colors duration-500" />
                            <img src={cls.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                                <div className="mb-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${cls.intensity === 'Extreme' ? 'bg-red-600 text-white' :
                                            cls.intensity === 'High' ? 'bg-orange-500 text-white' :
                                                'bg-green-500 text-white'
                                        }`}>
                                        {cls.intensity} Intensity
                                    </span>
                                </div>
                                <h3 className="text-3xl font-heading font-black italic uppercase mb-2 group-hover:text-[var(--accent)] transition-colors">{cls.name}</h3>
                                <p className="text-gray-300 text-sm mb-6 max-w-md">{cls.description}</p>

                                <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-wide">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-[var(--accent)]" />
                                        {cls.time}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-[var(--accent)]" />
                                        Daily
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-[var(--accent)]" />
                                        Limited Spots
                                    </div>
                                </div>

                                <button className="mt-6 w-full btn-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    Book Session
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
