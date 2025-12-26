'use client';

import { createClient } from '@/utils/supabase/client';
import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from './ui/ScrollReveal';
import { Check, Star } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PLANS, DAILY_SERVICES } from '@/data/plans';
import { useRouter } from 'next/navigation';

interface PricingCardProps {
    plan: {
        id: string | number;
        name: string;
        features: string[];
    };
    highlight?: boolean;
    price: string | number;
    period: string;
    onSelect: (plan: any) => void;
}

const PricingCard = ({ plan, highlight, price, period, onSelect }: PricingCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;
        const xPct = mouseXRel / width - 0.5;
        const yPct = mouseYRel / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative min-h-[600px] rounded-3xl p-8 backdrop-blur-md border transition-all duration-300 group
            ${highlight
                    ? 'bg-gradient-to-br from-zinc-900/90 to-black/90 border-accent/20 shadow-[0_0_50px_rgba(255,69,0,0.15)] z-10 scale-105'
                    : 'bg-black/40 border-white/5 hover:border-white/10'
                }`}
        >
            {/* Holographic Shine */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)]`} />

            {/* Content Container with Depth */}
            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full flex flex-col">
                {highlight && (
                    <div className="absolute top-0 right-0 p-2">
                        <Star className="text-accent fill-accent animate-pulse" size={20} />
                    </div>
                )}

                <h3 className={`text-xl font-bold tracking-[0.2em] uppercase mb-8 ${highlight ? 'text-accent' : 'text-gray-400'}`}>
                    {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-2xl text-gray-500 font-light">$</span>
                    <motion.span
                        key={price}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl font-heading font-black text-white tracking-tighter"
                    >
                        {price}
                    </motion.span>
                    <span className="text-sm font-bold uppercase text-gray-500 ml-2">
                        /{period}
                    </span>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-8" />

                <ul className="space-y-5 flex-grow mb-8">
                    {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                            <Check size={16} className={`mt-0.5 ${highlight ? 'text-accent' : 'text-gray-600'}`} />
                            {feat}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => onSelect(plan)}
                    className={`w-full py-5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300
                    ${highlight
                            ? 'bg-accent text-white hover:bg-orange-600 shadow-[0_10px_30px_rgba(255,69,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,69,0,0.4)]'
                            : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/5 hover:border-transparent'
                        }`}
                >
                    Select Plan
                </button>
            </div>
        </motion.div>
    );
};

const Pricing = () => {
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [viewMode, setViewMode] = useState<'memberships' | 'services'>('memberships');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };
        checkUser();
    }, []);

    const handleSelectPlan = (plan: any) => {
        const price = viewMode === 'services' ? plan.monthlyPrice : (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);
        const period = viewMode === 'services' ? 'one-time' : billingCycle;

        if (user) {
            router.push(`/onboarding/payment?plan=${plan.id}&price=${price}&billing=${period}`);
        } else {
            router.push(`/signup?plan=${plan.id}&price=${price}&billing=${period}`);
        }
    };

    const displayPlans = viewMode === 'memberships' ? PLANS : DAILY_SERVICES;

    return (
        <section className="py-32 bg-[#020202] relative overflow-hidden perspective-[1000px]">
            {/* Simple Mesh Gradient Background */}
            <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10">
                <ScrollReveal className="text-center mb-20">
                    <h2 className="text-6xl md:text-8xl font-heading font-black text-white italic uppercase tracking-tighter mb-4 opacity-10 absolute top-[-60px] left-1/2 -translate-x-1/2 w-full select-none">
                        Legacy
                    </h2>
                    <h2 className="text-5xl md:text-6xl font-bold uppercase relative z-10">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Legacy</span>
                    </h2>

                    {/* Controls */}
                    <div className="mt-12 flex flex-col items-center gap-8">
                        {/* Mode Toggle */}
                        <div className="p-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/5 inline-flex relative">
                            <div
                                className={`absolute top-1.5 bottom-1.5 rounded-full bg-accent transition-all duration-300 ease-out z-0`}
                                style={{
                                    left: viewMode === 'memberships' ? '6px' : '50%',
                                    width: 'calc(50% - 9px)'
                                }}
                            />
                            <button
                                onClick={() => setViewMode('memberships')}
                                className={`px-8 py-2 rounded-full text-xs font-bold uppercase tracking-wider relative z-10 transition-colors ${viewMode === 'memberships' ? 'text-white' : 'text-gray-400'}`}
                            >
                                Memberships
                            </button>
                            <button
                                onClick={() => setViewMode('services')}
                                className={`px-8 py-2 rounded-full text-xs font-bold uppercase tracking-wider relative z-10 transition-colors ${viewMode === 'services' ? 'text-white' : 'text-gray-400'}`}
                            >
                                Services
                            </button>
                        </div>

                        {/* Billing Cycle Toggle */}
                        <AnimatePresence mode='wait'>
                            {viewMode === 'memberships' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-4"
                                >
                                    <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-600'}`}>Monthly</span>
                                    <button
                                        onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                                        className="w-14 h-7 bg-white/10 rounded-full p-1 relative transition-colors hover:bg-white/20"
                                    >
                                        <motion.div
                                            layout
                                            className="w-5 h-5 bg-white rounded-full shadow-lg"
                                            animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                                        />
                                    </button>
                                    <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-600'}`}>
                                        Yearly <span className="text-accent text-xs ml-1">-17%</span>
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto px-4">
                    {displayPlans.map((plan, i) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            highlight={plan.highlight}
                            price={viewMode === 'services' ? plan.monthlyPrice : (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice)}
                            period={viewMode === 'services' ? (plan.period === 'One-Time' ? 'Once' : 'Day') : (billingCycle === 'monthly' ? 'Mo' : 'Yr')}
                            onSelect={handleSelectPlan}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
