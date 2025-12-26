'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle2, Loader2, DollarSign } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const plan = searchParams.get('plan') || 'recruit';
    const price = searchParams.get('price') || '0';
    const billing = searchParams.get('billing') || 'monthly';

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [loading, setLoading] = useState(false);

    const isZone = searchParams.get('type') === 'zone';
    const billingLabel = isZone ? 'One-Time Access Pass' : (billing === 'one-time' ? 'One-Time Payment' : (billing === 'yearly' ? 'Yearly Subscription' : 'Monthly Subscription'));
    const periodLabel = isZone ? 'lifetime access' : (billing === 'one-time' ? 'once' : (billing === 'yearly' ? 'per year' : 'per month'));

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent)] transition-colors";
    const labelClasses = "block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2";

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        // We can keep the timeout for UX, but must await the update
        await new Promise(resolve => setTimeout(resolve, 2000));

        const supabase = createClient();

        // 1. Get current user to ensure we are authenticated
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Get current processing count or default to 0
            const currentOrders = user.user_metadata.recent_orders_count || 0;
            const currentPoints = user.user_metadata.loyalty_points || 0;

            // 2. Update user metadata
            // 2. Update user metadata
            let updateData: any = {
                status: 'active',
                recent_orders_count: currentOrders + 1,
                loyalty_points: currentPoints + 50
            };

            // If it's a zone purchase, append to 'zones' array in metadata
            if (searchParams.get('type') === 'zone') {
                const currentZones = user.user_metadata.zones || [];
                const newZone = {
                    id: plan,
                    name: searchParams.get('name') || plan,
                    purchaseDate: new Date().toISOString(),
                    accessId: `ZN-${Math.floor(Math.random() * 10000)}`,
                    price: price,
                    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // Valid 30 days
                };
                updateData.zones = [...currentZones, newZone];
            } else {
                // If it's a membership plan, update the main plan
                updateData.plan = plan;
                updateData.subscription_start = new Date().toISOString();
            }

            const { error } = await supabase.auth.updateUser({
                data: updateData
            });

            if (error) {
                console.error('Error updating user:', error);
                // Handle error appropriately
            } else {
                console.log('Processing payment for:', user.email, plan);
            }
        }

        // Redirect to success or dashboard
        router.push('/dashboard');
        router.refresh();
        setLoading(false);
    };

    return (
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
            {/* Order Summary */}
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl md:sticky md:top-8">
                <h3 className="text-xl font-heading font-bold uppercase italic mb-6 text-gray-400">Order Summary</h3>
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                    <div>
                        <h4 className="text-2xl font-bold text-white capitalize">{plan.replace('-', ' ')}</h4>
                        <p className="text-sm text-gray-500">{billingLabel}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-[var(--accent)]">${price}</p>
                        <p className="text-xs text-gray-500">{periodLabel}</p>
                    </div>
                </div>
                <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span>${price}.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Tax (0%)</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-white/5">
                        <span>Total Due</span>
                        <span>${price}.00</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 bg-white/5 p-4 rounded-xl">
                    <Lock size={16} />
                    <p>Payments are secure and encrypted. You can cancel anytime.</p>
                </div>
            </div>

            {/* Payment Form */}
            <div>
                <h2 className="text-4xl font-heading font-black italic uppercase mb-2">
                    {searchParams.get('type') === 'zone' ? 'Zone Access' : 'Secure Checkout'}
                </h2>
                <p className="text-gray-400">{searchParams.get('type') === 'zone' ? 'Unlock exclusive facility access.' : 'Complete your enrollment.'}</p>
                <form onSubmit={handlePayment} className="space-y-6">

                    {/* Dynamic Fields for Zones */}
                    {searchParams.get('type') === 'zone' && (
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-6">
                            <h4 className="text-sm font-bold uppercase text-[var(--accent)] mb-4 flex items-center gap-2">
                                <DollarSign size={16} /> Required Details
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClasses}>Preferred Access Time</label>
                                    <select className={inputClasses}>
                                        <option>Morning (06:00 - 12:00)</option>
                                        <option>Afternoon (12:00 - 18:00)</option>
                                        <option>Evening (18:00 - 24:00)</option>
                                        <option>24/7 Access (+ $10)</option>
                                    </select>
                                </div>
                                {plan.includes('personal') && (
                                    <div>
                                        <label className={labelClasses}>Primary Goal</label>
                                        <input type="text" placeholder="e.g. Hypertrophy, Strength" className={inputClasses} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className={labelClasses}>Card Information</label>
                        <div className="relative">
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="0000 0000 0000 0000"
                                className={`${inputClasses} pl-12`}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className={labelClasses}>Expiry Date</label>
                            <input
                                type="text"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className={inputClasses}
                                required
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>CVC</label>
                            <input
                                type="text"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                placeholder="123"
                                className={inputClasses}
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[var(--accent)] text-white font-black uppercase tracking-[0.2em] py-5 rounded-none hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : (
                                <>
                                    Confirm Payment <DollarSign size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-[var(--primary)] text-white flex items-center justify-center p-6 relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[var(--accent)]/5 blur-[120px] rounded-full" />
            </div>

            <Suspense fallback={<div className="text-center"><Loader2 className="animate-spin text-[var(--accent)] mx-auto" size={40} /></div>}>
                <PaymentContent />
            </Suspense>
        </div>
    );
}
