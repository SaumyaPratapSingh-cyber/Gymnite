'use client';

import React, { useState } from 'react';
import { ScrollReveal } from './ui/ScrollReveal';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const PLANS = [
        {
            name: 'STANDARD',
            monthlyPrice: '29',
            yearlyPrice: '290', // 12 months for price of 10
            features: ['Access to Gym Floor', 'Locker Room Access', 'Free WiFi', '1 Guest Pass/Month'],
            highlight: false,
        },
        {
            name: 'PRO ATHLETE',
            monthlyPrice: '59',
            yearlyPrice: '590',
            features: ['All Standard Features', 'Unlimited Classes', 'Sauna & Steam Room', 'Free Solarium', '5 Guest Passes/Month'],
            highlight: true,
        },
        {
            name: 'ELITE',
            monthlyPrice: '99',
            yearlyPrice: '990',
            features: ['All Pro Features', 'Personal Trainer (2x/mo)', 'Nutrition Plan', 'Private Locker', 'Priority Support'],
            highlight: false,
        },
    ];

    return (
        <section className="section-padding bg-[var(--secondary)] relative">
            <div className="container-custom">
                <ScrollReveal className="text-center mb-12">
                    <h3 className="text-[var(--accent)] font-bold tracking-[0.2em] text-sm mb-2 uppercase">Membership Plans</h3>
                    <h2 className="text-5xl md:text-6xl font-bold italic uppercase mb-8">Choose Your <span className="text-outline">Legacy</span></h2>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                            className="w-16 h-8 bg-white/10 rounded-full p-1 relative transition-colors hover:bg-white/20"
                        >
                            <motion.div
                                layout
                                className="w-6 h-6 bg-[var(--accent)] rounded-full shadow-lg"
                                animate={{ x: billingCycle === 'monthly' ? 0 : 32 }}
                            />
                        </button>
                        <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
                            Yearly <span className="text-[var(--accent)] text-[10px] ml-1">(Save 17%)</span>
                        </span>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PLANS.map((plan, i) => (
                        <ScrollReveal key={i} delay={i * 0.15} direction='up'>
                            <div className={`p-10 border ${plan.highlight ? 'border-[var(--accent)] bg-zinc-900/80 scale-105 shadow-[0_0_50px_rgba(255,0,0,0.1)]' : 'border-white/5 bg-[#121212]'} relative group transition-all duration-500 hover:border-[var(--accent)] hover:-translate-y-2 rounded-2xl overflow-hidden flex flex-col h-full`}>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {plan.highlight && (
                                    <div className="absolute top-6 right-6">
                                        <Star className="text-[var(--accent)] fill-[var(--accent)] animate-spin-slow" />
                                    </div>
                                )}

                                <h3 className="text-xl font-bold mb-6 text-gray-400 tracking-widest uppercase">{plan.name}</h3>

                                <div className="mb-8 flex items-baseline gap-1 h-20">
                                    <span className="text-2xl text-gray-500">$</span>
                                    <motion.span
                                        key={billingCycle}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-7xl font-heading font-bold ${plan.highlight ? 'text-white' : 'text-white'} tracking-tighter`}
                                    >
                                        {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                    </motion.span>
                                    <span className="text-sm text-gray-500 font-bold uppercase bg-white/5 px-2 py-1 rounded">/{billingCycle === 'monthly' ? 'Mo' : 'Yr'}</span>
                                </div>

                                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent mb-8" />

                                <ul className="space-y-4 mb-12 flex-grow">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                            <Check size={16} className={`${plan.highlight ? 'text-[var(--accent)]' : 'text-gray-600'}`} />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 font-bold uppercase tracking-widest text-xs rounded transition-all duration-300 ${plan.highlight ? 'bg-[var(--accent)] text-white hover:bg-red-600 shadow-lg shadow-red-900/20' : 'bg-white/5 text-white hover:bg-white hover:text-black'}`}>
                                    Select Plan
                                </button>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
