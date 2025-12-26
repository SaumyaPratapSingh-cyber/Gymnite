'use client';

import React from 'react';
import { Dumbbell, Users, HeartPulse, Trophy } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

const BentoGrid = () => {
    return (
        <section className="section-padding bg-[var(--secondary)] relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] rounded-full blur-[200px] opacity-5 pointer-events-none" />

            <div className="container-custom">
                <ScrollReveal className="mb-16 text-center mx-auto max-w-2xl">
                    <h3 className="text-[var(--accent)] font-bold tracking-[0.2em] text-sm uppercase mb-3">
                        Premium Facilities
                    </h3>
                    <h2 className="text-4xl md:text-6xl font-bold uppercase italic leading-none">
                        Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Greatness</span> Is Forged
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 h-[1200px] md:h-[800px]">
                    {/* Item 1: Large Featured Card */}
                    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/5 bg-black">
                        <img src="https://images.unsplash.com/photo-1540497077202-7c8a33801524?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" alt="Weight Area" />
                        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                            <Dumbbell className="text-[var(--accent)] mb-4" size={40} />
                            <h3 className="text-3xl font-bold uppercase mb-2">Pro Weight Zone</h3>
                            <p className="text-gray-400 text-sm">Olympian-grade Hammer Strength equipment for serious lifters.</p>
                        </div>
                    </div>

                    {/* Item 2: Vertical Card */}
                    <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/5 bg-black">
                        <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" alt="Trainer" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <Users className="text-[var(--accent)] mb-3" size={32} />
                            <h3 className="text-xl font-bold uppercase mb-1">Personal Training</h3>
                            <p className="text-gray-400 text-xs">1-on-1 coaching.</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] flex flex-col justify-center p-8 hover:border-[var(--accent)] transition-colors">
                        <HeartPulse className="text-[var(--accent)] mb-4" size={40} />
                        <h3 className="text-xl font-bold uppercase mb-2">Cardio Theater</h3>
                        <p className="text-gray-400 text-sm">Advanced treadmills with Netflix integration.</p>
                    </div>

                    {/* Item 4 */}
                    <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] flex flex-col justify-center p-8 hover:border-[var(--accent)] transition-colors">
                        <Trophy className="text-[var(--accent)] mb-4" size={40} />
                        <h3 className="text-xl font-bold uppercase mb-2">Competition Prep</h3>
                        <p className="text-gray-400 text-sm">Specific coaching for bodybuilding shows.</p>
                    </div>

                    {/* Item 5: Wide Bottom Card */}
                    <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/5 bg-black">
                        <img src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" alt="Recovery" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold uppercase mb-2">Recovery Lounge</h3>
                                <p className="text-gray-300 text-sm">Sauna, Steam, & Cold Plunge</p>
                                <button className="mt-4 text-[var(--accent)] text-sm font-bold uppercase tracking-widest underline">Explore Amenities</button>
                            </div>
                        </div>
                    </div>

                    {/* Item 6 */}
                    <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/5 bg-[var(--accent)] flex items-center justify-between p-8">
                        <div className="max-w-[60%]">
                            <h3 className="text-3xl font-bold uppercase text-white mb-2 leading-none">Join The<br />Movement</h3>
                            <p className="text-white/80 text-sm mb-0">Start your 7-day free trial today.</p>
                        </div>
                        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-[var(--accent)] font-bold text-2xl group-hover:scale-110 transition-transform cursor-pointer">
                            →
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
