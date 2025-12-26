'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductPage() {
    const params = useParams();
    const { addToCart } = useCart();

    // Find product assuming id is number
    const product = PRODUCTS.find(p => p.id === Number(params.id));

    if (!product) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-[var(--primary)] text-white pt-24">
            <Navbar />

            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden border border-white/5"
                    >
                        {product.isNew && (
                            <div className="absolute top-6 left-6 z-20 bg-[var(--accent)] text-white text-xs font-bold uppercase px-4 py-2 tracking-widest">
                                New Drop
                            </div>
                        )}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <p className="text-[var(--accent)] font-bold uppercase tracking-widest mb-2">{product.category}</p>
                        <h1 className="text-4xl lg:text-5xl font-heading font-black italic uppercase mb-4 leading-tight">{product.name}</h1>
                        <p className="text-3xl font-bold text-white mb-8">${product.price}</p>

                        <div className="prose prose-invert mb-8">
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {product.description}
                            </p>
                            <p className="text-gray-500 mt-4 text-sm">
                                Designed for athletes who demand peak performance. Tested in the trenches, built for the podium.
                            </p>
                        </div>

                        {/* Size Selector (Mock for Apparel) */}
                        {product.category === 'Apparel' && (
                            <div className="mb-8">
                                <span className="block text-xs font-bold uppercase text-gray-500 mb-2">Select Size</span>
                                <div className="flex gap-4">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                        <button key={size} className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center font-bold hover:bg-white hover:text-black transition-colors focus:border-[var(--accent)]">
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 mb-12">
                            <button
                                onClick={() => addToCart(product)}
                                className="btn-primary flex-1 py-4 flex items-center justify-center gap-2 text-lg"
                            >
                                <ShoppingBag size={24} />
                                Add to Cart
                            </button>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Truck size={24} className="text-gray-400" />
                                <span className="text-xs font-bold uppercase text-gray-500">Fast Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck size={24} className="text-gray-400" />
                                <span className="text-xs font-bold uppercase text-gray-500">Lifetime Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <RefreshCw size={24} className="text-gray-400" />
                                <span className="text-xs font-bold uppercase text-gray-500">30-Day Returns</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
