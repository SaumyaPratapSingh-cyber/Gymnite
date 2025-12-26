'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Package, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/admin-portal' },
        { name: 'Orders', icon: LayoutDashboard, href: '/admin-portal/orders' },
        { name: 'Members', icon: Users, href: '/admin-portal/members' },
        { name: 'Inventory', icon: Package, href: '/admin-portal/inventory' },
        { name: 'Users', icon: Users, href: '/admin-portal/users' },
        { name: 'Services', icon: Package, href: '/admin-portal/services' },
        { name: 'Leads (CRM)', icon: Users, href: '/admin-portal/leads' },
    ];

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 h-screen sticky top-0 flex flex-col">
            <div className="p-8 border-b border-white/5">
                <Link href="/" className="text-2xl font-heading font-black italic uppercase tracking-tighter block text-center">
                    Gym<span className="text-[var(--accent)]">Nite</span> <span className="text-[10px] block text-gray-500 font-sans font-normal tracking-wide not-italic mt-1">Admin Command</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm uppercase tracking-wide ${isActive
                                ? 'bg-[var(--accent)] text-white shadow-lg shadow-red-900/20'
                                : 'text-gray-500 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm uppercase tracking-wide"
                >
                    <LogOut size={18} />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
