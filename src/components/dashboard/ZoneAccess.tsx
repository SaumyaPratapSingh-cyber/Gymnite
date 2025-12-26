'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, QrCode, Clock, ArrowRight, Lock, Key } from 'lucide-react';

interface Zone {
    id: string;
    name: string;
    purchaseDate: string;
    accessId: string;
    price: string;
    validUntil: string;
}

interface ZoneAccessProps {
    zones: Zone[];
}

export default function ZoneAccess({ zones }: ZoneAccessProps) {
    if (!zones || zones.length === 0) return null;

    return (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 mb-8 relative overflow-hidden">
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />

            <div className="relative z-10 flex justify-between items-center mb-8">
                <h3 className="text-white font-heading font-black uppercase italic text-xl flex items-center gap-3">
                    <Key size={20} className="text-accent" /> Clearance Levels
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Biometrics Active
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {zones.map((zone, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden group hover:border-accent/50 transition-all duration-500"
                    >
                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent" />

                        <div className="p-6 pl-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-xl font-heading font-black italic text-white uppercase leading-none mb-1">
                                        {decodeURIComponent(zone.name)}
                                    </h4>
                                    <span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                                        Active
                                    </span>
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    <QrCode size={32} className="text-black" />
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-white/5 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Clearance ID</span>
                                    <span className="font-mono text-xs text-accent font-bold tracking-widest">{zone.accessId}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Expires</span>
                                    <span className="text-xs text-white font-bold">{new Date(zone.validUntil).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-accent text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(255,69,0,0.3)]">
                                <Lock size={12} /> Authenticate
                            </button>
                        </div>

                        {/* Deco */}
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-white/20" />
                        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border border-white/20" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
