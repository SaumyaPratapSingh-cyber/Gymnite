'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';

import { BLOG_POSTS } from '@/data/blog';
import { notFound, useParams } from 'next/navigation';

export default function BlogPost() {
    const params = useParams();
    const slug = params?.slug as string;

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const post = BLOG_POSTS.find(p => p.id === slug);

    if (!post && slug) { // Only redirect if slug is present but post not found
        // In client component, we might renders a 404 component or return early. 
        // calling notFound() works in client components in Next.js? 
        // Actually, notFound() is for server components usually. 
        // In client, we can just return a "Post not found" UI or redirect.
        // But let's try to return null for now to avoid crashes until data loads?
        // Wait, BLOG_POSTS is static data. It's available immediately.
    }

    if (!slug) return null; // Loading state logic if needed
    if (!post) return <div className="text-white pt-40 text-center">Post not found</div>;

    const relatedPosts = BLOG_POSTS
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    return (
        <main className="min-h-screen bg-[var(--primary)] text-white">
            <Navbar />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent)] origin-left z-50"
                style={{ scaleX }}
            />

            {/* Hero */}
            <div className="relative h-[60vh] w-full">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-[var(--primary)]/50 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full container-custom pb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 uppercase text-xs font-bold tracking-widest transition-colors">
                        <ArrowLeft size={16} /> Back to Archives
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-[var(--accent)] text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{post.category}</span>
                        <span className="text-gray-300 text-xs font-bold uppercase flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold italic uppercase leading-tight max-w-4xl">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Article Content */}
            <article className="container-custom max-w-3xl py-12">
                {/* Author Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
                    <div className="flex items-center gap-4">
                        <img src={post.author.image} alt={post.author.name} className="w-12 h-12 rounded-full border border-white/20" />
                        <div>
                            <p className="font-bold text-white uppercase text-sm">{post.author.name}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">{post.author.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Share2 size={20} className="text-gray-400" /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Bookmark size={20} className="text-gray-400" /></button>
                    </div>
                </div>

                {/* Typography Content */}
                <div
                    className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-heading prose-headings:italic prose-headings:uppercase 
            prose-p:text-gray-300 prose-p:leading-loose 
            prose-strong:text-white prose-strong:font-bold
            prose-blockquote:border-l-[var(--accent)] prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
            prose-li:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            {/* Related Posts */}
            <section className="bg-white/5 py-16 mt-12">
                <div className="container-custom">
                    <h3 className="text-2xl font-bold uppercase italic mb-8">Keep <span className="text-[var(--accent)]">Grinding</span></h3>
                    {relatedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedPosts.map(p => (
                                <Link href={`/blog/${p.id}`} key={p.id} className="group flex gap-4 items-center bg-[var(--primary)] p-4 rounded-xl border border-white/5 hover:border-[var(--accent)] transition-all">
                                    <img src={p.image} alt={p.title} className="w-24 h-24 object-cover rounded-lg" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-1">{p.category}</p>
                                        <h4 className="font-bold uppercase italic text-lg group-hover:underline decoration-[var(--accent)] line-clamp-2">{p.title}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">More articles coming soon.</p>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
