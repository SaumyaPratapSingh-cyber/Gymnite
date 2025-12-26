'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Wifi, Shield, Zap, Crown } from 'lucide-react';

interface DigitalMemberCardProps {
    user: any;
    planName: string;
    status: string;
}

export default function DigitalMemberCard({ user, planName, status }: DigitalMemberCardProps) {
    const isActive = status === 'active';

    // Determine card style based on plan
    const getCardStyle = () => {
        const lowerPlan = planName.toLowerCase();
        if (lowerPlan.includes('warlord')) return 'bg-gradient-to-br from-yellow-900 via-yellow-600 to-yellow-900 border-yellow-500/50';
        if (lowerPlan.includes('soldier')) return 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border-slate-500/50';
        return 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 border-white/10';
    };

    const getIcon = () => {
        const lowerPlan = planName.toLowerCase();
        if (lowerPlan.includes('warlord')) return Crown;
        if (lowerPlan.includes('soldier')) return Zap;
        return Shield;
    };

    const PlanIcon = getIcon();

    return (
        <motion.div
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`relative w-full aspect-[1.586/1] rounded-3xl p-6 overflow-hidden border ${getCardStyle()} shadow-2xl group`}
            style={{ perspective: '1000px' }}
        >
            {/* Background Texture/Noise */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                            <PlanIcon className="text-white w-4 h-4" />
                        </div>
                        <span className="font-heading font-black italic uppercase text-white/50 tracking-widest text-xs">Gymnite Elite</span>
                    </div>
                    <Wifi className="text-white/30 w-6 h-6 rotate-90" />
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <div className="mb-4">
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Operative</p>
                            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider font-mono">{user.user_metadata.full_name || 'Unknown'}</h3>
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Rank</p>
                                <p className="text-sm font-bold text-white uppercase">{planName}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">ID</p>
                                <p className="text-sm font-bold text-white/80 font-mono">00{user.id?.slice(0, 4).toUpperCase()}</p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Simulation */}
                    <div className="bg-white p-2 rounded-xl shadow-lg">
                        <QrCode className="text-black w-12 h-12" />
                    </div>
                </div>
            </div>

            {/* Status Indicator */}
            <div className={`absolute top-6 right-1/2 translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${isActive ? 'bg-green-500/20 border-green-500/30 text-green-300' : 'bg-red-500/20 border-red-500/30 text-red-300'}`}>
                {status}
            </div>
        </motion.div>
    );
}
