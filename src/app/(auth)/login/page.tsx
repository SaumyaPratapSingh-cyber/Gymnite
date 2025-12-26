'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ identifier: '', password: '' });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();

        try {
            // Check if identifier is email or phone (basic check)
            // For now, Supabase mainly supports email/password or phone/password.
            // We will assume email for this implementation as phone setup requires more config.
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: form.identifier, // User must enter email. If we implement phone, we need logic.
                password: form.password,
            });

            if (signInError) {
                setError(signInError.message);
                setLoading(false);
                return;
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to connect to authentication server. Please check your internet connection.');
            setLoading(false);
            return;
        }

        router.push('/dashboard');
        router.refresh(); // Refresh to update middleware/server components
    };

    return (
        <div className="w-full max-w-md mx-auto relative">
            {/* Decorative Glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 backdrop-blur-sm"
            >
                <div className="mb-10 text-center lg:text-left">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-heading font-black italic uppercase mb-2 tracking-tight"
                    >
                        Member <span className="text-outline text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Access</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 font-medium tracking-wide"
                    >
                        Welcome back, Athlete.
                    </motion.p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 mb-4 rounded text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2 group"
                    >
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-[var(--accent)] transition-colors">
                            Email or Mobile Number
                        </label>
                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-500 group-focus-within:text-[var(--accent)] transition-colors">
                                <Mail size={18} className="group-focus-within:hidden" />
                                <Smartphone size={18} className="hidden group-focus-within:block" />
                            </div>
                            <input
                                type="text"
                                required
                                value={form.identifier}
                                onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                                className="w-full bg-white/5 border-b-2 border-white/10 py-4 pl-12 pr-4 text-white text-lg font-medium focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all placeholder:text-gray-700 placeholder:text-base placeholder:font-normal"
                                placeholder="john@example.com / +1234567890"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2 group"
                    >
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-[var(--accent)] transition-colors">
                                Password
                            </label>
                            <Link href="/forgot-password" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                Recover Access
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-500 group-focus-within:text-[var(--accent)] transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full bg-white/5 border-b-2 border-white/10 py-4 pl-12 pr-4 text-white text-lg font-medium focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all placeholder:text-gray-700 placeholder:text-base placeholder:font-normal"
                                placeholder="••••••••••••"
                            />
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        disabled={loading}
                        className="w-full bg-[var(--accent)] text-white font-black uppercase tracking-[0.2em] py-5 rounded-none hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <>Access Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                        </span>
                    </motion.button>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Or continue with</p>
                    <div className="flex justify-center gap-4">
                        <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
                        </button>
                        <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </button>
                    </div>
                </motion.div>

                <div className="mt-8 text-center">
                    <Link href="/signup" className="text-gray-400 hover:text-white text-sm transition-colors group">
                        New Recruit? <span className="font-bold text-[var(--accent)] group-hover:underline">Join the Ranks</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
