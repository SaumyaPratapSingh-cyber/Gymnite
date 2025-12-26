'use client';

import React from 'react';
import RecentOrders from '@/components/dashboard/RecentOrders';

export default function OrdersPage() {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-heading font-black italic uppercase text-white mb-2">
                My <span className="text-[var(--accent)]">Orders</span>
            </h1>
            <p className="text-gray-400 mb-12">Track your gear deployments.</p>

            <RecentOrders />
        </div>
    );
}
