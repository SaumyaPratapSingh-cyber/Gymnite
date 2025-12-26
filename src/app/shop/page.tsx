'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard'; // Use the superior component
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SlidersHorizontal, Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const CATEGORIES = ['All', 'Apparel', 'Supplements', 'Gear'];

import { PRODUCTS } from '@/data/products';

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState('All');
    const { addToCart } = useCart();

    const filteredProducts = activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    // Map legacy data structure to new component props
    const mapProductToProps = (p: any) => ({
        id: p.id.toString(),
        title: p.name,
        price: p.price,
        category: p.category,
        image_url: p.image
    });

    return (
        <main className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-accent selection:text-white">
            <Navbar />

            {/* CINEMATIC HERO */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                {/* Parallax Background */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")' }}
                />

                {/* Hero Content */}
                <div className="relative z-20 text-center container-custom">
                    <ScrollReveal>
                        <h1 className="text-7xl md:text-9xl font-black italic uppercase mb-2 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                            The Armory
                        </h1>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-[1px] w-20 bg-accent" />
                            <p className="text-gray-300 tracking-[0.5em] font-bold uppercase text-xs md:text-sm">
                                Elite Equipment for Elite Athletes
                            </p>
                            <div className="h-[1px] w-20 bg-accent" />
                        </div>
                    </ScrollReveal>
                </div>

                {/* Gradient Fade to Content */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
            </section>

            {/* SHOP INTERFACE */}
            <section className="relative z-30 -mt-20 container-custom pb-32">
                {/* Floating Control Bar */}
                <div className="glass-card p-4 rounded-full mb-16 flex flex-col md:flex-row justify-between items-center gap-6 sticky top-24 z-50 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group ${activeCategory === cat
                                    ? 'text-black'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-accent"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>

                    {/* Search & Filter */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-64 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-accent transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH DATA..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-accent focus:bg-white/10 transition-all uppercase tracking-wider"
                            />
                        </div>
                        <button className="p-2.5 border border-white/10 rounded-full bg-white/5 hover:bg-white hover:text-black transition-colors">
                            <SlidersHorizontal size={18} />
                        </button>
                    </div>
                </div>

                {/* Cyber Grid Display */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <ShoppingBag size={48} className="mx-auto text-gray-700 mb-4" />
                        <h3 className="text-xl font-bold text-gray-500 uppercase">System Empty</h3>
                        <p className="text-gray-600">No assets found in this sector.</p>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
