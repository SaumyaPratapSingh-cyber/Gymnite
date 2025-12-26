'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import { motion } from 'framer-motion';

export default function PlansPage() {
    return (
        <main className="min-h-screen bg-[var(--primary)] text-white selection:bg-[var(--accent)] selection:text-white">
            <Navbar />

            <div className="pt-32 pb-16">
                <div className="container-custom text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-heading font-black italic uppercase tracking-tighter mb-6">
                            Select Your <span className="text-[var(--accent)]">Path</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Commitment is the currency of the elite. Choose how you will pay the price of greatness.
                        </p>
                    </motion.div>
                </div>

                <Pricing />
            </div>

            <Footer />
        </main>
    );
}
