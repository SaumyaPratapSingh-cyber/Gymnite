'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowRight } from 'lucide-react';

import { BLOG_POSTS, CATEGORIES } from '@/data/blog';
import Link from 'next/link';

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? BLOG_POSTS
        : BLOG_POSTS.filter(p => p.category === activeCategory);

    // Sorting: Put featured or newest first
    const displayPosts = [...filteredPosts].sort((a, b) => (a.featured ? -1 : 1));

    const featuredPost = displayPosts.find(p => p.featured) || displayPosts[0];
    const gridPosts = displayPosts.filter(p => p.id !== featuredPost?.id);

    return (
        <main className="min-h-screen bg-[var(--primary)] text-white">
            <Navbar />

            {/* HEADER */}
            <section className="pt-32 pb-12 container-custom text-center">
                <ScrollReveal>
                    <p className="text-[var(--accent)] font-bold tracking-[0.3em] uppercase mb-4 text-sm">The Archives</p>
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none mb-8">
                        Grind <span className="text-outline">Chronicles</span>
                    </h1>
                </ScrollReveal>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${activeCategory === cat
                                ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                                : 'bg-transparent border-white/10 text-gray-500 hover:border-white hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* CONTENT GRID */}
            <section className="pb-32 container-custom">
                {displayPosts.length > 0 && (
                    <div className="space-y-12">
                        {/* FEATURED POST */}
                        {activeCategory === 'All' && featuredPost && (
                            <ScrollReveal>
                                <Link href={`/blog/${featuredPost.id}`}>
                                    <div className="group relative h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 cursor-pointer">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:max-w-3xl">
                                            <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest">
                                                <span className="bg-[var(--accent)] text-white px-3 py-1 rounded">{featuredPost.category}</span>
                                                <span className="flex items-center gap-1 text-gray-300"><Clock size={14} /> {featuredPost.readTime}</span>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase italic leading-tight mb-4 group-hover:text-gray-200 transition-colors">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-gray-400 text-lg mb-6 line-clamp-2 md:line-clamp-none">{featuredPost.excerpt}</p>
                                            <span className="flex items-center gap-2 text-[var(--accent)] font-bold uppercase tracking-widest hover:text-white transition-colors">
                                                Read Article <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        )}

                        {/* STANDARD GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gridPosts.map((post, i) => (
                                <ScrollReveal key={post.id} delay={i * 0.05}>
                                    <Link href={`/blog/${post.id}`}>
                                        <div className="group cursor-pointer flex flex-col h-full">
                                            <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/5 mb-6">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                                    {post.category}
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col">
                                                <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                                </div>
                                                <h3 className="text-xl font-heading font-bold uppercase italic mb-3 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                                                    {post.excerpt}
                                                </p>
                                                <div className="mt-auto">
                                                    <span className="text-xs font-bold uppercase tracking-widest border-b border-[var(--accent)] pb-1 group-hover:text-[var(--accent)] transition-colors">Read Now</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
