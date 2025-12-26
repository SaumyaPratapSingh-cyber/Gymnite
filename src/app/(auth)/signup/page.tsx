'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, User, Phone, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', password: '' });

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call for now
        setTimeout(() => {
            setLoading(false);
            router.push('/dashboard');
        }, 2000);
    };

    const inputClasses = "w-full bg-white/5 border-b-2 border-white/10 py-3 pl-10 pr-4 text-white font-medium focus:outline-none focus:border-[var(--accent)] focus:bg-white/10 transition-all placeholder:text-gray-600 placeholder:font-normal";
    const iconClasses = "absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--accent)] transition-colors";
    const labelClasses = "text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-[var(--accent)] transition-colors mb-1 block";

    return (
        <div className="w-full max-w-lg mx-auto relative pt-10">
            <div className="mb-10 text-center lg:text-left">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-5xl font-heading font-black italic uppercase mb-2 tracking-tight"
                >
                    Enlist <span className="text-outline text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Now</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 font-medium tracking-wide"
                >
                    Begin your legacy. No excuses.
                </motion.p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-1 group"
                    >
                        <label className={labelClasses}>Full Name</label>
                        <div className="relative">
                            <User className={iconClasses} size={18} />
                            <input
                                type="text" required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={inputClasses}
                                placeholder="David Goggins"
                            />
                        </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-1 group"
                    >
                        <label className={labelClasses}>Email Address</label>
                        <div className="relative">
                            <Mail className={iconClasses} size={18} />
                            <input
                                type="email" required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className={inputClasses}
                                placeholder="john@example.com"
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-1 group"
                    >
                        <label className={labelClasses}>Mobile Number</label>
                        <div className="relative">
                            <Phone className={iconClasses} size={18} />
                            <input
                                type="tel" required
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className={inputClasses}
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-1 group"
                    >
                        <label className={labelClasses}>Location</label>
                        <div className="relative">
                            <MapPin className={iconClasses} size={18} />
                            <input
                                type="text" required
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className={inputClasses}
                                placeholder="Muscle City, USA"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Password */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-1 group"
                >
                    <label className={labelClasses}>Set Password</label>
                    <div className="relative">
                        <Lock className={iconClasses} size={18} />
                        <input
                            type="password" required
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className={inputClasses}
                            placeholder="••••••••••••"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="pt-4"
                >
                    <button
                        disabled={loading}
                        className="w-full bg-[var(--accent)] text-white font-black uppercase tracking-[0.2em] py-5 rounded-none hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <>Initiate Training <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                        </span>
                    </button>
                </motion.div>
            </form>

            <div className="mt-8 text-center pb-8">
                <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors group">
                    Already Enlisted? <span className="font-bold text-[var(--accent)] group-hover:underline">Access HQ</span>
                </Link>
            </div>
        </div>
    );
}
