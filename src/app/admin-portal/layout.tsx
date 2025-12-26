'use client';
import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    // Simple auth check using cookie 'admin-auth'
    const authCookie = typeof document !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('admin-auth='))?.split('=')[1] : null;
    // Skip auth check on the login page to avoid redirect loop
    if (!authCookie && pathname !== '/admin-portal/login') {
        router.push('/admin-portal/login');
    }
    return (
        <div className="flex min-h-screen bg-[var(--primary)]">
            <AdminSidebar />
            <div className="flex-1 w-full flex flex-col relative z-0 overflow-y-auto h-screen">
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
