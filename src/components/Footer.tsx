'use client';

import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-black relative pt-32 pb-10 overflow-hidden">
            {/* Massive Background Text */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.03]">
                <h1 className="text-[20vw] font-black font-heading italic text-white leading-none">
                    GYMNITE
                </h1>
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    {/* Brand Column - Spans 4 */}
                    <div className="md:col-span-4">
                        <Link href="/" className="inline-block mb-8 group">
                            <h2 className="text-4xl font-heading font-black italic text-white tracking-tighter group-hover:text-accent transition-colors duration-300">
                                GYM<span className="text-accent group-hover:text-white transition-colors duration-300">NITE</span>
                            </h2>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-8 max-w-sm font-medium">
                            The ultimate destination for champions. Forge your legacy with premium equipment, expert trainers, and a community that never quits.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center rounded-xl hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 group">
                                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 - Spans 2 */}
                    <div className="md:col-span-2">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Navigation</h3>
                        <ul className="space-y-4">
                            {['About Us', 'Our Classes', 'Trainers', 'Shop', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 - Spans 2 */}
                    <div className="md:col-span-2">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Programs</h3>
                        <ul className="space-y-4">
                            {['Body Building', 'Weight Loss', 'CrossFit', 'Personal Training', 'Yoga'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column - Spans 4 */}
                    <div className="md:col-span-4 rounded-3xl bg-white/5 border border-white/5 p-8 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-white uppercase italic mb-6">Visit Our HQ</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-black/50 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-bold mb-1">Muscle City, SP 90210</p>
                                    <p className="text-gray-400 text-sm">123 Fitness Blvd, Building A</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-black/50 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-bold mb-1">info@gymnite.com</p>
                                    <p className="text-gray-400 text-sm">Support 24/7</p>
                                </div>
                            </div>

                            <button className="w-full mt-4 py-4 bg-accent text-white font-bold uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group">
                                Get Directions <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm font-bold tracking-wide">
                        &copy; {new Date().getFullYear()} GYMNITE INC.
                    </p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-gray-500 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">Privacy</Link>
                        <Link href="#" className="text-gray-500 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">Terms</Link>
                        <Link href="#" className="text-gray-500 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
