'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [email, setEmail] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const supabase = createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback?next=/settings` : undefined,
        });

        setLoading(false);

        if (error) {
            setMessage('Error: ' + error.message);
        } else {
            setMessage('Recovery link sent to secure channel (Email).');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative min-h-screen flex flex-col justify-center p-4">
            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10"
            >
                <Link href="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 text-xs font-bold uppercase tracking-widest transition-colors">
                    <ArrowLeft size={16} /> Return to Base
                </Link>

                <div className="mb-8">
                    <h2 className="text-4xl font-heading font-black italic uppercase mb-2">
                        Recover <span className="text-[var(--accent)]">Access</span>
                    </h2>
                    <p className="text-gray-400">Enter your secure channel ID to receive override codes.</p>
                </div>

                {message && (
                    <div className={`border text-sm p-4 mb-6 rounded text-center ${message.includes('Error') ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-green-500/10 border-green-500/50 text-green-400'}`}>
                        {message}
                    </div>
                )}

                {!message?.includes('sent') && (
                    <form onSubmit={handleReset} className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-[var(--accent)] transition-colors">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-500 group-focus-within:text-[var(--accent)] transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border-b-2 border-white/10 py-4 pl-12 pr-4 text-white text-lg font-medium focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all placeholder:text-gray-700"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-[var(--accent)] text-white font-black uppercase tracking-[0.2em] py-5 rounded-none hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <>Send Recovery Link <ArrowRight size={20} /></>}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
