'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string;
    trend: string;
    trendUp?: boolean;
    icon: LucideIcon;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, trend, trendUp = true, icon: Icon }) => {
    return (
        <div className="bg-secondary border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${trendUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {trend}
                </span>
            </div>

            <h3 className="text-gray-400 text-sm font-bold tracking-widest uppercase mb-1">{label}</h3>
            <p className="text-3xl font-heading font-bold text-white tracking-wide">{value}</p>
        </div>
    );
};

export default StatsCard;
