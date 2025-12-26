import React from 'react';
import { DollarSign, Package, Users, Activity } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';

export default function DashboardPage() {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-heading font-bold text-white mb-2">DASHBOARD</h1>
                <p className="text-gray-400">Welcome back, Owner. Here is what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    label="Total Revenue"
                    value="$124,592"
                    trend="+12% from last month"
                    icon={DollarSign}
                />
                <StatsCard
                    label="Active Orders"
                    value="45"
                    trend="+5 new today"
                    icon={Package}
                />
                <StatsCard
                    label="Total Members"
                    value="1,294"
                    trend="+2.4%"
                    icon={Users}
                />
                <StatsCard
                    label="Store Conversion"
                    value="3.2%"
                    trend="-0.1%"
                    trendUp={false}
                    icon={Activity}
                />
            </div>

            {/* Recent Activity / Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-secondary border border-white/5 rounded-xl p-6 lg:col-span-2 h-[400px]">
                    <h3 className="text-lg font-heading font-bold text-white mb-6">REVENUE OVERVIEW</h3>
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
                        <p className="text-gray-500 font-mono text-sm">[Chart Component Placeholder]</p>
                    </div>
                </div>

                <div className="bg-secondary border border-white/5 rounded-xl p-6 h-[400px]">
                    <h3 className="text-lg font-heading font-bold text-white mb-6">RECENT ORDERS</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer">
                                <div>
                                    <p className="text-white font-bold text-sm">Order #{1000 + i}</p>
                                    <p className="text-xs text-gray-400">2 items • Pending</p>
                                </div>
                                <span className="text-accent font-bold text-sm">$89.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
