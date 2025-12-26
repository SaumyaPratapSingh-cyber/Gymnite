'use client';

import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, ChevronRight, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecentOrders() {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('gymnite-orders') || '[]');
        setOrders(savedOrders);
    }, []);

    if (orders.length === 0) {
        return (
            <div className="bg-[#0a0a0a] border border-dashed border-white/10 rounded-3xl p-12 text-center group hover:border-accent/30 transition-colors cursor-pointer">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500 group-hover:text-accent group-hover:scale-110 transition-all duration-300">
                    <Package size={32} />
                </div>
                <h3 className="text-white font-heading font-black italic uppercase text-2xl mb-2">System Idle</h3>
                <p className="text-gray-500 text-sm font-mono tracking-wide uppercase">No deployment history found.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                <h3 className="text-xl font-heading font-black italic uppercase flex items-center gap-3">
                    <Truck size={20} className="text-accent" /> Deployment Log
                </h3>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-black/50 px-3 py-1 rounded-full border border-white/5">
                    {orders.length} Records
                </div>
            </div>

            <div className="p-2">
                <div className="space-y-2">
                    {orders.map((order, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={order.id}
                            className="bg-black/40 p-4 rounded-xl border border-white/5 hover:border-accent/40 hover:bg-white/5 transition-all group cursor-pointer flex flex-col md:flex-row items-center justify-between gap-4"
                        >
                            {/* Order ID & Icon */}
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-accent shadow-lg shadow-black/50">
                                    <Package size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-accent transition-colors">{order.id}</h4>
                                    <p className="text-[10px] text-gray-500 flex items-center gap-2 uppercase font-bold tracking-widest mt-1">
                                        {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${order.status === 'Processing' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                                <span className={`text-xs font-bold uppercase tracking-widest ${order.status === 'Processing' ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {order.status}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{order.items.length} Items</span>
                                <span className="text-lg font-heading font-black italic text-white">${order.total}</span>
                                <ChevronRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
