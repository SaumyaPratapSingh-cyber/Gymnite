'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, Calendar, CheckCircle, Clock } from 'lucide-react';

interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    status: 'NEW' | 'CONTACTED' | 'CONVERTED';
    created_at: string;
}

// Mock data in case DB is empty for demo
const MOCK_LEADS: Lead[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0100', message: 'Interested in personal training pricing.', status: 'NEW', created_at: new Date().toISOString() },
    { id: '2', name: 'Sarah Smith', email: 'sarah.fit@gmail.com', phone: '+1 555-0123', message: 'Do you offer morning yoga classes?', status: 'CONTACTED', created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', name: 'Mike Ross', email: 'mike.r@corp.com', status: 'CONVERTED', created_at: new Date(Date.now() - 172800000).toISOString() },
];

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    async function fetchLeads() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error || !data || data.length === 0) {
                // Fallback to mock data if empty or error (for demo purposes)
                setLeads(MOCK_LEADS);
            } else {
                setLeads(data);
            }
        } catch (error) {
            console.error('Error fetching leads:', error);
            setLeads(MOCK_LEADS);
        } finally {
            setLoading(false);
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'NEW': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
            case 'CONTACTED': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
            case 'CONVERTED': return 'bg-green-500/20 text-green-500 border-green-500/50';
            default: return 'bg-gray-500/20 text-gray-500';
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-white">LEADS CRM</h1>
                <p className="text-gray-400 text-sm">Track and manage potential member inquiries.</p>
            </div>

            <div className="grid gap-4">
                {leads.map((lead) => (
                    <div key={lead.id} className="bg-secondary border border-white/5 p-6 rounded-xl hover:border-accent/50 transition-colors flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-heading font-bold text-white uppercase">{lead.name}</h3>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(lead.status)}`}>
                                    {lead.status}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-accent" />
                                    {lead.email}
                                </div>
                                {lead.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-accent" />
                                        {lead.phone}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-accent" />
                                    {new Date(lead.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            {lead.message && (
                                <div className="bg-primary/50 p-3 rounded-lg border border-white/5 text-gray-300 text-sm italic">
                                    "{lead.message}"
                                </div>
                            )}
                        </div>

                        <div className="flex md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                            <button className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 px-4 py-2 rounded font-bold text-xs transition-colors">
                                <Clock size={14} /> Mark Contacted
                            </button>
                            <button className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-green-500/20 text-gray-300 hover:text-green-400 px-4 py-2 rounded font-bold text-xs transition-colors">
                                <CheckCircle size={14} /> Mark Converted
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
