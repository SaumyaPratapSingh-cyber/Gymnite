'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
}

// Mock initial state
const INITIAL_CART: CartItem[] = [
    { id: 1, name: 'Oversized Pump Cover', price: 45, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000', quantity: 1, size: 'L' },
    { id: 2, name: 'Pre-Workout Ignite', price: 39, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1000', quantity: 2, size: 'One Size' },
];

const FREE_SHIPPING_THRESHOLD = 150;

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - total;
    const progressPercent = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);

    const updateQty = (id: number, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-[var(--accent)]" />
                                <h2 className="text-xl font-heading font-bold uppercase tracking-wide">Your Cart <span className="text-gray-500">({items.length})</span></h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X />
                            </button>
                        </div>

                        {/* Free Shipping Progress */}
                        <div className="p-6 bg-white/5">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                <span>{remainingForFreeShipping > 0 ? `Spend $${remainingForFreeShipping} for Free Shipping` : 'Free Shipping Unlocked!'}</span>
                                <span>{Math.round(progressPercent)}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    className="h-full bg-[var(--accent)]"
                                />
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                    <ShoppingBag size={48} className="mb-4 opacity-20" />
                                    <p className="font-bold uppercase tracking-widest text-sm">Your cart is empty</p>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-sm uppercase tracking-wide pr-4">{item.name}</h3>
                                                    <span className="font-bold">${item.price * item.quantity}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1 uppercase">Size: {item.size}</p>
                                            </div>

                                            <div className="flex items-center gap-4 bg-white/5 self-start rounded-full px-3 py-1 mt-2">
                                                <button onClick={() => updateQty(item.id, -1)} className="hover:text-[var(--accent)]"><Minus size={14} /></button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQty(item.id, 1)} className="hover:text-[var(--accent)]"><Plus size={14} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-[#0f0f0f]">
                            <div className="flex justify-between items-center mb-4 text-lg font-bold uppercase">
                                <span>Subtotal</span>
                                <span>${total}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-6 text-center">Shipping and taxes calculated at checkout.</p>

                            <button className="w-full btn-primary group">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
