'use client';

import React, { useState } from 'react';
import { Dumbbell, Users, HeartPulse, Trophy, X, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import ZonePaymentModal from './ZonePaymentModal';

const FEATURES = [
    {
        id: 'weight-zone',
        title: 'Pro Weight Zone',
        subtitle: 'Olympian-grade Hammer Strength equipment for serious lifters.',
        description: 'This is where monsters are made. Our weight zone is equipped with the finest Hammer Strength machines, over 10,000lbs of Eleiko calibrated plates, and custom lifting platforms. Whether you are powerlifting, bodybuilding, or simply forging iron, this is your battleground.',
        specs: ['20+ Squat Racks', 'Dumbbells up to 150lbs', 'Deadlift Platforms', 'Chalk Allowed'],
        image: '/proweightzone.jpg',
        icon: Dumbbell
    },
    {
        id: 'personal-training',
        title: 'Personal Training',
        subtitle: '1-on-1 coaching.',
        description: 'Stop guessing. Start progressing. Our elite coaches analyze your biomechanics, nutrition, and lifestyle to build a program that guarantees results. This is not just "counting reps"; this is a complete reconstruction of your potential.',
        specs: ['Custom Nutrition Plans', 'Biometric Analysis', '24/7 Support', 'Form Correction'],
        image: '/dio.jpg',
        icon: Users
    },
    {
        id: 'cardio-theater',
        title: 'Cardio Theater',
        subtitle: 'Advanced treadmills with Netflix integration.',
        description: 'Endurance training without the boredom. Our Cardio Theater features the latest treadmills, stairmasters, and assault runners, all integrated with 4K screens and surround sound. Stream your favorite movies or sync with Zwift while you burn.',
        specs: ['Assault Runners', 'StairMasters', 'Netflix/YouTube Integrated', 'Zone 2 Monitoring'],
        image: '/carsio.jpg', // Added relevant image for modal background
        icon: HeartPulse
    },
    {
        id: 'competition-prep',
        title: 'Competition Prep',
        subtitle: 'Specific coaching for bodybuilding shows.',
        description: 'For those who want to step on stage. We provide full contest prep coaching, including posing practice, peak week protocols, and trunk/bikini selection guidance. We have a track record of turning amateurs into pros.',
        specs: ['Posing Room', 'Peak Week Protocols', 'Tan & Oil Guidance', 'Categories: Bodybuilding, Classic, Bikini'],
        image: '/gymcom.jpg', // Added relevant image
        icon: Trophy
    },
    {
        id: 'recovery-lounge',
        title: 'Recovery Lounge',
        subtitle: 'Sauna, Steam, & Cold Plunge',
        description: 'Recovery is the other half of the battle. Accelerate muscle repair and reduce inflammation in our state-of-the-art recovery suite. Alternate between the 90°C sauna and the 3°C cold plunge to shock your system into growth.',
        specs: ['Infrared Sauna', 'Cold Plunge (3°C)', 'Compression Boots', 'Hypervolt Massage'],
        image: '/re.jpg',
        icon: HeartPulse, // Reusing HeartPulse or generic
        hasAction: true
    }
];

const BentoGrid = () => {
    const [selectedFeature, setSelectedFeature] = useState<any>(null);
    const [showPayment, setShowPayment] = useState(false);

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
                    {/* Item 1: Pro Weight Zone */}
                    <div
                        onClick={() => setSelectedFeature(FEATURES[0])}
                        className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/5 bg-black cursor-pointer"
                    >
                        <img src={FEATURES[0].image} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" alt="Weight Area" />
                        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                            <Dumbbell className="text-[var(--accent)] mb-4" size={40} />
                            <h3 className="text-3xl font-bold uppercase mb-2">{FEATURES[0].title}</h3>
                            <p className="text-gray-400 text-sm">{FEATURES[0].subtitle}</p>
                        </div>
                    </div>

                    {/* Item 2: Personal Training */}
                    <div
                        onClick={() => setSelectedFeature(FEATURES[1])}
                        className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/5 bg-black cursor-pointer"
                    >
                        <img src={FEATURES[1].image} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" alt="Trainer" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <Users className="text-[var(--accent)] mb-3" size={32} />
                            <h3 className="text-xl font-bold uppercase mb-1">{FEATURES[1].title}</h3>
                            <p className="text-gray-400 text-xs">{FEATURES[1].subtitle}</p>
                        </div>
                    </div>

                    {/* Item 3: Cardio Theater */}
                    <div
                        onClick={() => setSelectedFeature(FEATURES[2])}
                        className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] flex flex-col justify-center p-8 hover:border-[var(--accent)] transition-colors cursor-pointer"
                    >
                        <HeartPulse className="text-[var(--accent)] mb-4" size={40} />
                        <h3 className="text-xl font-bold uppercase mb-2">{FEATURES[2].title}</h3>
                        <p className="text-gray-400 text-sm">{FEATURES[2].subtitle}</p>
                    </div>

                    {/* Item 4: Competition Prep */}
                    <div
                        onClick={() => setSelectedFeature(FEATURES[3])}
                        className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] flex flex-col justify-center p-8 hover:border-[var(--accent)] transition-colors cursor-pointer"
                    >
                        <Trophy className="text-[var(--accent)] mb-4" size={40} />
                        <h3 className="text-xl font-bold uppercase mb-2">{FEATURES[3].title}</h3>
                        <p className="text-gray-400 text-sm">{FEATURES[3].subtitle}</p>
                    </div>

                    {/* Item 5: Recovery Lounge */}
                    <div
                        onClick={() => setSelectedFeature(FEATURES[4])}
                        className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/5 bg-black cursor-pointer"
                    >
                        <img src={FEATURES[4].image} className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" alt="Recovery" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold uppercase mb-2">{FEATURES[4].title}</h3>
                                <p className="text-gray-300 text-sm">{FEATURES[4].subtitle}</p>
                                <button className="mt-4 text-[var(--accent)] text-sm font-bold uppercase tracking-widest underline">Explore Amenities</button>
                            </div>
                        </div>
                    </div>

                    {/* Item 6: Join Now (Link to Plans) */}
                    <a href="/plans" className="block md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/5 bg-[var(--accent)] p-8">
                        <div className="flex items-center justify-between h-full">
                            <div className="max-w-[60%]">
                                <h3 className="text-3xl font-bold uppercase text-white mb-2 leading-none">Join The<br />Movement</h3>
                                <p className="text-white/80 text-sm mb-0">Start your 7-day free trial today.</p>
                            </div>
                            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-[var(--accent)] font-bold text-2xl group-hover:scale-110 transition-transform">
                                <ArrowRight size={24} />
                            </div>
                        </div>
                    </a>

                </div>
            </div>

            {/* Feature Detail Modal */}
            <AnimatePresence>
                {selectedFeature && !showPayment && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedFeature(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#111] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="h-64 md:h-full relative overflow-hidden group">
                                <img src={selectedFeature.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111] md:bg-gradient-to-r md:from-transparent md:to-[#111]" />
                                <div className="absolute top-4 left-4 p-3 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
                                    <selectedFeature.icon className="text-[var(--accent)]" size={24} />
                                </div>
                            </div>

                            <div className="p-8 md:p-12 relative flex flex-col">
                                <button onClick={() => setSelectedFeature(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>

                                <div className="mb-auto">
                                    <h2 className="text-3xl md:text-4xl font-heading font-black italic uppercase mb-2 leading-none">{selectedFeature.title}</h2>
                                    <p className="text-[var(--accent)] font-bold uppercase tracking-widest text-xs mb-6">{selectedFeature.subtitle}</p>

                                    <p className="text-gray-300 leading-relaxed text-sm mb-8 border-l-2 border-[var(--accent)] pl-4">
                                        {selectedFeature.description}
                                    </p>

                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold uppercase text-gray-500">Facility Specs</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            {selectedFeature.specs && selectedFeature.specs.map((spec: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                                                    <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]" />
                                                    <span className="text-sm text-gray-200 font-medium">{spec}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowPayment(true)}
                                    className="mt-8 w-full py-4 bg-[var(--accent)] text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-red-600 transition-colors shadow-lg shadow-red-900/20"
                                >
                                    Access This Zone
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Payment Modal */}
            <ZonePaymentModal
                isOpen={showPayment}
                onClose={() => {
                    setShowPayment(false);
                    setSelectedFeature(null);
                }}
                zone={selectedFeature}
            />

        </section>
    );
};

export default BentoGrid;
