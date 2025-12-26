'use client';

import React from 'react';
import { Users, DollarSign, Package } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-heading font-black italic uppercase mb-2">Command <span className="text-[var(--accent)]">Overview</span></h1>
                <p className="text-gray-400">Welcome back, Commander. Status is Green.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Total Members', value: '2,543', icon: Users, change: '+12%' },
                    { label: 'Revenue (MTD)', value: '$124,500', icon: DollarSign, change: '+8%' },
                    { label: 'Inventory Stuct', value: 'Healthy', icon: Package, change: 'Optimal' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 bg-[#111] border border-white/5 rounded-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-xl text-[var(--accent)]">
                                <stat.icon size={24} />
                            </div>
                            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">{stat.change}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-heading font-bold italic uppercase mb-6">Recent Alerts</h2>
            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 text-center text-gray-400">
                No critical alerts requiring attention.
            </div>
        </div>
    );
}
