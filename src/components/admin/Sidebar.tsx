'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Orders', href: '/orders', icon: ShoppingBag }, // We can make this a real page or just redirect to dashboard for now
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-secondary border-r border-white/5 flex flex-col h-screen sticky top-0">
            {/* Brand */}
            <div className="p-8 border-b border-white/5">
                <Link href="/dashboard" className="text-2xl font-heading font-bold tracking-tighter text-white italic">
                    GYM<span className="text-accent">NITE</span>
                    <span className="block text-[10px] text-gray-500 font-body not-italic tracking-widest mt-1">MEMBER PORTAL</span>
                </Link>
            </div>

            <div className="px-4 pt-4">
                <Link href="/" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest p-2 border border-white/5 hover:border-white/20 rounded">
                    &larr; Back to Website
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-accent/10 border-l-4 border-accent"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}

                            <Icon size={20} className={`relative z-10 ${isActive ? 'text-accent' : 'group-hover:text-gray-200'}`} />
                            <span className={`relative z-10 font-bold tracking-wide text-sm ${isActive ? 'text-white' : ''}`}>
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 text-red-500 px-4 py-3 rounded-lg hover:bg-red-500/10 w-full transition-colors font-bold text-sm">
                    <LogOut size={20} />
                    LOGOUT
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
