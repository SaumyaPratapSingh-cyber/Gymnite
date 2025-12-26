'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#' },
        { name: 'Classes', href: '#' },
        { name: 'Shop', href: '/shop' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/leads' }, // Linking contact to leads for now as a placeholder or could be a real contact page
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container-custom flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-heading font-bold italic tracking-tighter">
                        GYM<span className="text-[var(--accent)]">NITE</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-6">
                        <button className="text-white hover:text-[var(--accent)] transition-colors relative">
                            <ShoppingBag size={24} />
                            <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>
                        </button>

                        <button className="flex items-center gap-2 text-sm font-bold uppercase hover:text-[var(--accent)] transition-colors">
                            <User size={20} /> Login
                        </button>

                        <button className="btn-primary py-3 px-6 text-xs">
                            Join Now
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-white"
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 bg-[#0f0f0f] z-[60] flex flex-col"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-white/10">
                            <Link href="/" className="text-2xl font-bold italic">
                                GYM<span className="text-[var(--accent)]">NITE</span>
                            </Link>
                            <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-center items-center gap-8 p-8">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-2xl font-heading font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="flex flex-col w-full gap-4 mt-8">
                                <button className="btn-primary w-full text-center">Join Class Now</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
