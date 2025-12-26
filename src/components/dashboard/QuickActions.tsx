'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, History, LifeBuoy, ShoppingBag, Zap } from 'lucide-react'; // Note: lucide-react exports might function as components

// Fix for icon imports if needed, assuming lucide-react works as standard
import { Dumbbell } from 'lucide-react';

const actions = [
    { name: 'Book Class', icon: Calendar, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { name: 'Start Workout', icon: Dumbbell, color: 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20' },
    { name: 'Order Gear', icon: ShoppingBag, color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    { name: 'History', icon: History, color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
];

export default function QuickActions() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actions.map((action, i) => (
                <motion.button
                    key={action.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${action.color} hover:bg-opacity-20 transition-all duration-300 group`}
                >
                    <div className="mb-3 p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300">
                        <action.icon size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{action.name}</span>
                </motion.button>
            ))}
        </div>
    );
}
