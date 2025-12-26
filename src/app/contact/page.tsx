'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[var(--primary)] text-white pt-24">
            <Navbar />

            <section className="py-24 container-custom">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-heading font-black italic uppercase mb-4">
                        Comms <span className="text-[var(--accent)]">Center</span>
                    </h1>
                    <p className="text-gray-400">Initiate protocol. We are listening.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-[#111] border border-white/5 p-8 rounded-2xl">
                        <form className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="group relative">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Code Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-white/20 p-3 text-white focus:outline-none peer" placeholder="JOHN DOE" />
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 peer-focus:w-full" />
                                </div>
                                <div className="group relative">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Signal (Email)</label>
                                    <input type="email" className="w-full bg-transparent border-b border-white/20 p-3 text-white focus:outline-none peer" placeholder="john@example.com" />
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 peer-focus:w-full" />
                                </div>
                            </div>
                            <div className="group relative">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Subject</label>
                                <input type="text" className="w-full bg-transparent border-b border-white/20 p-3 text-white focus:outline-none peer" placeholder="Order Inquiry" />
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 peer-focus:w-full" />
                            </div>
                            <div className="group relative">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Transmission</label>
                                <textarea rows={5} className="w-full bg-transparent border-b border-white/20 p-3 text-white focus:outline-none peer resize-none" placeholder="Type your message..." />
                                <span className="absolute bottom-1.5 left-0 w-0 h-[2px] bg-accent transition-all duration-300 peer-focus:w-full" />
                            </div>

                            <button className="btn-primary w-full group relative overflow-hidden">
                                <span className="relative z-10">Send Transmission</span>
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="space-y-8 flex flex-col justify-center">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center text-[var(--accent)]">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold uppercase text-lg mb-1">Base of Operations</h3>
                                <p className="text-gray-400">101 Iron Paradise Blvd<br />Muscle Beach, CA 90291</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center text-[var(--accent)]">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold uppercase text-lg mb-1">Secure Channel</h3>
                                <p className="text-gray-400">support@gymnite.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center text-[var(--accent)]">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold uppercase text-lg mb-1">Direct Line</h3>
                                <p className="text-gray-400">+1 (555) 000-0000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
