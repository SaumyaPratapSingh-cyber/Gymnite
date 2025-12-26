'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SlidersHorizontal, Search } from 'lucide-react';

const CATEGORIES = ['All', 'Apparel', 'Supplements', 'Gear', 'Accessories'];

const PRODUCTS = [
    { id: 1, name: 'Oversized Pump Cover', price: 45, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop', isNew: true },
    { id: 2, name: 'Pre-Workout Ignite', price: 39, category: 'Supplements', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Pro Lifting Straps', price: 25, category: 'Gear', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Whey Isolate Gold', price: 89, category: 'Supplements', image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, name: 'Compression Tee', price: 35, category: 'Apparel', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, name: 'Gymnite Shaker', price: 15, category: 'Accessories', image: 'https://images.unsplash.com/photo-1590403164319-780c65511dc4?q=80&w=1000&auto=format&fit=crop' },
    { id: 7, name: 'Weightlifting Belt', price: 55, category: 'Gear', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop' },
    { id: 8, name: 'Creatine Monohydrate', price: 29, category: 'Supplements', image: 'https://images.unsplash.com/photo-1627483298606-1293872f1acd?q=80&w=1000&auto=format&fit=crop' },
    { id: 9, name: 'Elite Gym Bag', price: 65, category: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop' },
];

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <main className="min-h-screen bg-[var(--primary)] text-white">
            <Navbar />

            {/* SHOP HERO */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=2070&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Shop Hero"
                />

                <div className="relative z-20 text-center">
                    <ScrollReveal>
                        <h1 className="text-6xl md:text-8xl font-black italic uppercase mb-4">
                            The <span className="text-[var(--accent)]">Armory</span>
                        </h1>
                        <p className="text-gray-300 tracking-[0.3em] font-bold uppercase text-sm md:text-base">
                            Official Gymnite Merchandise & Supplements
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* SHOP CONTENT */}
            <section className="section-padding container-custom">
                {/* Filters Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 sticky top-24 z-30 bg-[var(--primary)]/95 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                                    : 'bg-transparent border-white/10 text-gray-400 hover:border-white hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH GEAR..."
                                className="w-full bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-[var(--accent)]"
                            />
                        </div>
                        <button className="p-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors">
                            <SlidersHorizontal size={18} />
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, i) => (
                        <ScrollReveal key={product.id} delay={i * 0.1}>
                            <ProductCard product={product} />
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
