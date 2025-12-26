'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { COACHES } from '@/data/coaches';

export default function AboutPage() {
    const [selectedCoach, setSelectedCoach] = useState<any>(null);

    return (
        <main className="min-h-screen bg-[var(--primary)] text-white pt-24">
            <Navbar />

            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale opacity-30">
                        <source src="https://videos.pexels.com/video-files/5309381/5309381-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] to-transparent" />
                </div>

                <div className="relative z-10 container-custom text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl lg:text-9xl font-heading font-black italic uppercase tracking-tighter"
                    >
                        Forged In <span className="text-[var(--accent)]">Fire</span>
                    </motion.h1>
                    <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
                        Gymnite isn't just a brand. It's a declaration of war against mediocrity.
                    </p>
                </div>
            </section>

            {/* Why Choose Us (Merged) */}
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-black italic uppercase mb-4">Why We <span className="text-[var(--accent)]">Dominate</span></h2>
                        <p className="text-gray-400">The standards we set are the ones others chase.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Elite Equipment', desc: 'Hammer Strength & Eleiko certified facility.' },
                            { title: '24/7 Access', desc: 'The grind never stops, neither do keycards.' },
                            { title: 'Champion Environment', desc: 'Surround yourself with those who refuse to lose.' }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[var(--accent)] transition-colors group">
                                <CheckCircle className="text-[var(--accent)] mb-4" size={32} />
                                <h3 className="text-xl font-bold uppercase italic mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Origin Story */}
            <section className="py-24 container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-heading font-black italic uppercase mb-8">
                            The <span className="text-outline">Origin</span> Story
                        </h2>
                        <div className="space-y-6 text-gray-400 leading-relaxed">
                            <p>
                                Founded in 2024, Gymnite appeared from the void with a simple mission: to equip the modern athlete with gear that matches their intensity. We saw a fitness industry drowning in mediocrity—generic designs, cheap materials, and zero soul.
                            </p>
                            <p>
                                We decided to burn it down and start over.
                            </p>
                            <p>
                                Every thread, every stitch, and every supplement formula is obsessed over. We don't cut corners. We don't compromise. We build for the 1% who are willing to do what it takes.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl" />
                        <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop" className="rounded-2xl mt-12" />
                    </div>
                </div>
            </section>

            {/* Coaches Section */}
            <section id="trainers" className="py-24 bg-[#0a0a0a]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-black italic uppercase mb-4">Command <span className="text-[var(--accent)]">Unit</span></h2>
                        <p className="text-gray-400">Expert guidance from those who walk the path.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {COACHES.map((coach) => (
                            <div
                                key={coach.id}
                                onClick={() => setSelectedCoach(coach)}
                                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-white/5"
                            >
                                <img src={coach.image} alt={coach.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-2xl font-bold uppercase italic text-white group-hover:text-[var(--accent)] transition-colors">{coach.name}</h3>
                                    <p className="text-sm font-bold text-gray-400">{coach.role}</p>
                                    <p className="text-xs text-[var(--accent)] mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-widest">
                                        Click to View Intel
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coach Modal */}
            <AnimatePresence>
                {selectedCoach && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedCoach(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#111] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="h-64 md:h-full relative">
                                <img src={selectedCoach.image} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111] md:bg-gradient-to-r md:from-transparent md:to-[#111]" />
                            </div>
                            <div className="p-8 md:p-12 relative">
                                <button onClick={() => setSelectedCoach(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                                    <X size={24} />
                                </button>

                                <h2 className="text-3xl font-heading font-black italic uppercase mb-2">{selectedCoach.name}</h2>
                                <p className="text-[var(--accent)] font-bold uppercase tracking-widest text-sm mb-6">{selectedCoach.role}</p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Background Info</h4>
                                        <p className="text-gray-300 leading-relaxed text-sm">{selectedCoach.bio}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Combat Experience</h4>
                                        <ul className="space-y-2">
                                            {selectedCoach.experience.map((exp: string, i: number) => (
                                                <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
                                                    {exp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Specialties</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCoach.specialties.map((spec: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 rounded text-xs font-bold uppercase text-gray-300 border border-white/10">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
