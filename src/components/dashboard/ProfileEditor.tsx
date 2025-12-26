'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfileEditor({ user }: { user: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        full_name: user.user_metadata.full_name || '',
        phone: user.user_metadata.phone || '',
        address: user.user_metadata.address || '',
    });

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: form.full_name,
                phone: form.phone,
                address: form.address,
            }
        });

        setLoading(false);
        if (error) {
            setMessage('Failed to update profile.');
        } else {
            setMessage('Profile updated successfully.');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleUpdate} className="bg-[#111] border border-white/5 rounded-2xl p-8 max-w-2xl">
            <h3 className="text-xl font-bold italic uppercase mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[var(--accent)]" /> Public Dossier
            </h3>

            {message && (
                <div className={`p-4 mb-6 rounded text-sm font-bold text-center ${message.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {message}
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Display Name</label>
                    <input
                        type="text"
                        value={form.full_name}
                        onChange={e => setForm({ ...form, full_name: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Contact Signal (Phone)</label>
                        <input
                            type="text"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Base of Operations (Address)</label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--accent)] focus:outline-none"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary flex items-center gap-2 px-8"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    );
}
