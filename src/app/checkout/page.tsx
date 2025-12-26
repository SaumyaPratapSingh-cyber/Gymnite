'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1); // 1: Address, 2: Payment

    const handleCheckout = () => {
        setLoading(true);
        // Simulate API
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            // Save Order to LocalStorage (Mock DB)
            const newOrder = {
                id: `ORD-${Math.floor(Math.random() * 10000)}`,
                date: new Date().toISOString(),
                status: 'Processing',
                items: cart,
                total: cartTotal
            };

            const existingOrders = JSON.parse(localStorage.getItem('gymnite-orders') || '[]');
            localStorage.setItem('gymnite-orders', JSON.stringify([newOrder, ...existingOrders]));

            setTimeout(() => {
                clearCart();
                router.push('/dashboard');
            }, 3000);
        }, 3000);
    };

    if (cart.length === 0 && !success) {
        return (
            <main className="min-h-screen bg-black text-white relative overflow-hidden">
                <Navbar />
                <div className="absolute inset-0 bg-[#020202]">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                </div>
                <div className="h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                        System Empty
                    </h2>
                    <p className="text-gray-500 mb-8 uppercase tracking-widest text-sm">No assets detected in cargo.</p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="px-8 py-3 bg-accent text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
                    >
                        Acquire Gear
                    </button>
                </div>
            </main>
        );
    }

    if (success) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
                {/* Success Animation Background */}
                <div className="absolute inset-0 bg-accent/5" />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-12 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl relative z-10 max-w-lg w-full"
                >
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
                        <CheckCircle size={80} className="text-accent relative z-10 mx-auto" />
                    </div>

                    <h2 className="text-4xl font-heading font-black uppercase italic mb-4">Order Confirmed</h2>
                    <p className="text-gray-400 mb-2 uppercase tracking-widest text-xs">Deployment Authorized</p>
                    <p className="text-gray-500 text-sm">Redirecting to command center...</p>

                    <div className="mt-8 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3 }}
                            className="h-full bg-accent"
                        />
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 relative selection:bg-accent selection:text-white">
            <Navbar />

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-900/20 to-transparent pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="flex items-end gap-6 mb-12">
                    <h1 className="text-5xl md:text-7xl font-heading font-black italic uppercase tracking-tighter">
                        Secure <span className="text-accent">Checkout</span>
                    </h1>
                    <div className="h-px bg-white/20 flex-grow mb-4 hidden md:block" />
                    <div className="hidden md:flex items-center gap-2 mb-4 text-gray-400 font-mono text-xs">
                        <ShieldCheck size={14} className="text-accent" />
                        ENCRYPTED CONNECTION
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Forms */}
                    <div className="lg:col-span-7">
                        {/* Progress Stepper */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${step === 1 ? 'text-white' : 'text-gray-500'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-accent text-white' : 'bg-zinc-800 text-gray-500'}`}>1</div>
                                Shipping
                            </div>
                            <div className="w-8 h-px bg-white/10" />
                            <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${step === 2 ? 'text-white' : 'text-gray-500'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-accent text-white' : 'bg-zinc-800 text-gray-500'}`}>2</div>
                                Payment
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5"
                                >
                                    <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <MapPin size={20} className="text-accent" /> Shipping Address
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">First Name</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="ALEX" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="FALCON" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Street Address</label>
                                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="123 SECTOR 7" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">City</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="NEO TOKYO" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Postal Code</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="10001" />
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStep(2)}
                                            className="w-full py-4 mt-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all rounded-xl"
                                        >
                                            Proceed to Payment
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                                            <CreditCard size={20} className="text-accent" /> Payment Method
                                        </h3>
                                        <button onClick={() => setStep(1)} className="text-xs text-gray-500 hover:text-white uppercase font-bold">Edit Shipping</button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Cardholder Name</label>
                                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="JOHN DOE" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Card Number</label>
                                            <div className="relative">
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="0000 0000 0000 0000" />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                                    <div className="w-8 h-5 bg-white/10 rounded" />
                                                    <div className="w-8 h-5 bg-white/10 rounded" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Expiry</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="MM/YY" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CVC</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:outline-none transition-colors" placeholder="123" />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleCheckout}
                                            disabled={loading}
                                            className="w-full py-4 bg-accent text-white font-bold uppercase tracking-widest rounded-xl hover:bg-orange-600 shadow-[0_5px_20px_rgba(255,69,0,0.3)] transition-all flex items-center justify-center gap-2 mt-4"
                                        >
                                            {loading ? <Loader2 size={20} className="animate-spin" /> : `Pay $${cartTotal}`}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 sticky top-32">
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Manifest</h3>
                            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center py-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden border border-white/5">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold uppercase text-xs tracking-wide max-w-[150px] line-clamp-1">{item.name}</h4>
                                                <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="font-bold font-mono text-sm">${item.price * item.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-t border-white/10 pt-4 mb-6">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Shipping</span>
                                    <span>Calculated</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xl font-black uppercase font-heading">
                                <span>Total</span>
                                <span className="text-accent">${cartTotal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
