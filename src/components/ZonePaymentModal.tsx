'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, DollarSign, Loader2, CheckCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface ZonePaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    zone: any;
}

export default function ZonePaymentModal({ isOpen, onClose, zone }: ZonePaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form States
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        const user = data?.user;

        if (user) {
            const currentZones = user.user_metadata.zones || [];

            // Generate Zone Data
            const newZone = {
                id: zone.id,
                name: zone.title, // Using title from BentoGrid feature
                purchaseDate: new Date().toISOString(),
                accessId: `ZN-${Math.floor(Math.random() * 10000)}`,
                price: '50', // Fixed price for now or pass from props
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 Days default
            };

            const { error } = await supabase.auth.updateUser({
                data: {
                    zones: [...currentZones, newZone],
                    recent_orders_count: (user.user_metadata.recent_orders_count || 0) + 1,
                    loyalty_points: (user.user_metadata.loyalty_points || 0) + 50
                }
            });

            if (!error) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    onClose();
                    // Optional: Navigate to dashboard or show notification
                    window.location.href = '/dashboard';
                }, 2000);
            }
        }
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
                            <div>
                                <h3 className="text-white font-bold uppercase italic tracking-wider">Access Clearance</h3>
                                <p className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-widest">One-Time Payment</p>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Success State */}
                        {success ? (
                            <div className="p-12 text-center flex flex-col items-center justify-center h-[400px]">
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6"
                                >
                                    <CheckCircle size={40} />
                                </motion.div>
                                <h3 className="text-2xl font-bold uppercase italic text-white mb-2">Access Granted</h3>
                                <p className="text-gray-400 text-sm">Your credentials have been updated.</p>
                                <p className="text-xs text-gray-500 mt-8 animate-pulse">Redirecting to HQ...</p>
                            </div>
                        ) : (
                            <form onSubmit={handlePayment} className="p-6 space-y-5">
                                {/* Item Detail */}
                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-sm font-bold text-white uppercase">{zone.title}</span>
                                    <span className="text-xl font-black text-[var(--accent)] font-mono">$50.00</span>
                                </div>

                                {/* Card Input */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Card Number</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                value={cardNumber}
                                                onChange={e => setCardNumber(e.target.value)}
                                                className="w-full bg-black border border-white/10 rounded-lg py-3 pl-10 text-sm text-white focus:border-[var(--accent)] focus:outline-none transition-colors placeholder:text-gray-700"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={expiry}
                                                onChange={e => setExpiry(e.target.value)}
                                                className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:border-[var(--accent)] focus:outline-none transition-colors placeholder:text-gray-700 text-center"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="CVC"
                                                value={cvc}
                                                onChange={e => setCvc(e.target.value)}
                                                className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:border-[var(--accent)] focus:outline-none transition-colors placeholder:text-gray-700 text-center"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[var(--accent)] hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98] text-white font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Lock size={16} /> Confirm Payment</>}
                                </button>

                                <p className="text-center text-[10px] text-gray-600 uppercase tracking-wider">
                                    Secure Enclave • 256-bit Encryption
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
