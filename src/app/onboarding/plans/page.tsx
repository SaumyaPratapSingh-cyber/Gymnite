'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { PLANS, DAILY_SERVICES } from '@/data/plans';

export default function PlansPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'memberships' | 'services'>('memberships');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const handleSelectPlan = (plan: any) => {
        // For services, the price is always the 'monthlyPrice' (base price)
        const price = viewMode === 'services' ? plan.monthlyPrice : (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);
        const period = viewMode === 'services' ? 'one-time' : billingCycle;

        router.push(`/onboarding/payment?plan=${plan.id}&price=${price}&billing=${period}`);
    };

    const displayPlans = viewMode === 'memberships' ? PLANS : DAILY_SERVICES;

    return (
        <div className="min-h-screen bg-[var(--primary)] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl w-full">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-black italic uppercase tracking-tighter mb-4"
                    >
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-red-600">Arsenal</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Select the plan that fits your ambition. Upgrade or downgrade at any time.
                    </motion.p>
                </div>

                {/* View Mode Toggle (Memberships vs Services) */}
                <div className="flex justify-center mb-8">
                    <div className="flex bg-[#0a0a0a] p-1 rounded-full border border-white/10 relative w-fit">
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-full transition-all duration-300 ${viewMode === 'services' ? 'left-[calc(50%+2px)]' : 'left-1'}`}
                        />
                        <button
                            onClick={() => setViewMode('memberships')}
                            className={`z-10 py-2 px-8 text-xs font-bold uppercase tracking-widest transition-colors ${viewMode === 'memberships' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Memberships
                        </button>
                        <button
                            onClick={() => setViewMode('services')}
                            className={`z-10 py-2 px-8 text-xs font-bold uppercase tracking-widest transition-colors ${viewMode === 'services' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Daily / Services
                        </button>
                    </div>
                </div>

                {/* Billing Cycle Toggle (Only for Memberships) */}
                <AnimatePresence mode='wait'>
                    {viewMode === 'memberships' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="flex items-center justify-center gap-4"
                        >
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
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {displayPlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className={`relative bg-[#111] border ${plan.highlight ? 'border-[var(--accent)]' : 'border-white/10'} p-8 rounded-3xl flex flex-col h-full group hover:border-[var(--accent)]/50 transition-colors duration-300`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs font-black uppercase tracking-widest py-1 px-4 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <plan.icon className={`w-12 h-12 mb-4 ${plan.highlight ? 'text-[var(--accent)]' : 'text-gray-500 group-hover:text-white transition-colors'}`} />
                                <h3 className="text-2xl font-heading font-bold uppercase italic">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-5xl font-black font-heading">$
                                    {viewMode === 'services' ? plan.monthlyPrice : (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice)}
                                </span>
                                <span className="text-gray-500 font-medium">
                                    /{viewMode === 'services' ? (plan.period === 'One-Time' ? 'Once' : 'Day') : (billingCycle === 'monthly' ? 'Mo' : 'Yr')}
                                </span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-[var(--accent)]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSelectPlan(plan)}
                                className={`w-full py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 ${plan.highlight
                                    ? 'bg-[var(--accent)] text-white hover:bg-white hover:text-black'
                                    : 'bg-white/5 text-white hover:bg-[var(--accent)]'
                                    }`}
                                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                            >
                                {viewMode === 'services' ? 'Book Now' : 'Select Plan'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
