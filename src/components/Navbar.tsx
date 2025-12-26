'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

import { useCart } from '@/context/CartContext';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { cartCount, setCartOpen } = useCart();

    // Scroll detection
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check for user session
        import('@/utils/supabase/client').then(({ createClient }) => {
            const supabase = createClient();
            supabase.auth.getUser().then(({ data }) => {
                setUser(data?.user || null);
            });
        });
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Classes', href: '/classes' },
        { name: 'Shop', href: '/shop' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 }
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
            >
                <div className="glass-card rounded-full px-6 py-4 flex justify-between items-center shadow-lg backdrop-blur-3xl bg-black/60 border border-white/10">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-heading font-bold italic tracking-tighter">
                        GYM<span className="text-accent">NITE</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors text-white/80"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-6">
                        <button
                            onClick={() => setCartOpen(true)}
                            className="text-white hover:text-accent transition-colors relative"
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_var(--accent)]">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {user ? (
                            <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold uppercase hover:text-accent transition-colors text-white/80">
                                <User size={18} />
                            </Link>
                        ) : (
                            <Link href="/login" className="flex items-center gap-2 text-xs font-bold uppercase hover:text-accent transition-colors text-white/80">
                                <User size={18} />
                            </Link>
                        )}

                        {!user && (
                            <Link href="/signup" className="bg-accent text-white text-[10px] font-bold uppercase px-4 py-2 rounded-full hover:bg-orange-600 transition-colors tracking-wider shadow-[0_0_15px_rgba(255,69,0,0.4)]">
                                Join
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-white"
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-0 bg-[#0f0f0f] z-[60] flex flex-col"
                        >
                            <div className="p-6 flex justify-between items-center border-b border-white/10">
                                <Link href="/" className="text-2xl font-bold italic">
                                    GYM<span className="text-accent">NITE</span>
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
                                        className="text-2xl font-heading font-bold uppercase tracking-widest hover:text-accent transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="flex flex-col w-full gap-4 mt-8">
                                    <button className="bg-accent text-white py-4 font-bold uppercase tracking-widest rounded-none">Join Class Now</button>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
};

export default Navbar;
