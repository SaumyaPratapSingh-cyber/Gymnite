'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex bg-[var(--primary)] text-white overflow-hidden">
            {/* Visual Side (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                {/* Background Image / Video */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                        alt="Gym Motivation"
                        className="w-full h-full object-cover opacity-60 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-[var(--primary)]/50" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-12 max-w-xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[var(--accent)] font-bold tracking-[0.3em] uppercase mb-4"
                    >
                        Welcome to the Elite
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-6xl font-black italic uppercase leading-tight mb-6"
                    >
                        Forge Your <span className="text-outline">Legacy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 text-lg leading-relaxed"
                    >
                        Join a community of disciplined individuals dedicated to mastering their potential. Track your progress, correct your form, and dominate your goals.
                    </motion.p>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex flex-col relative z-20">
                <div className="p-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-8 lg:p-24">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
