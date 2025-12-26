'use client';

import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-[#0f0f0f] border-t border-white/5 pt-20 pb-10">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand Column */}
                <div>
                    <h2 className="text-3xl font-heading font-bold italic mb-6">
                        GYM<span className="text-[var(--accent)]">NITE</span>
                    </h2>
                    <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                        The ultimate destination for champions. Forge your legacy with premium equipment, expert trainers, and a community that never quits.
                    </p>
                    <div className="flex gap-4">
                        {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-none hover:bg-[var(--accent)] transition-colors text-white">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold mb-8">QUICK LINKS</h3>
                    <ul className="space-y-4 text-[var(--text-muted)] font-body">
                        {['About Us', 'Our Classes', 'Trainers', 'Pricing', 'Contact'].map(link => (
                            <li key={link}>
                                <Link href="#" className="hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-[var(--accent)]"></span> {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-xl font-bold mb-8">PROGRAMS</h3>
                    <ul className="space-y-4 text-[var(--text-muted)] font-body">
                        {['Body Building', 'Weight Loss', 'CrossFit', 'Personal Training', 'Yoga'].map(link => (
                            <li key={link}>
                                <Link href="#" className="hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-[var(--accent)]"></span> {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-bold mb-8">CONTACT US</h3>
                    <div className="space-y-6 text-[var(--text-muted)]">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-[var(--accent)] shrink-0" size={24} />
                            <p>123 Fitness Blvd, Muscle City, SP 90210</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="text-[var(--accent)] shrink-0" size={24} />
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="text-[var(--accent)] shrink-0" size={24} />
                            <p>info@gymnite.com</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="text-[var(--accent)] shrink-0" size={24} />
                            <div>
                                <p>Mon - Fri: 5am - 11pm</p>
                                <p>Sat - Sun: 7am - 9pm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Credits */}
            <div className="container-custom border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[var(--text-muted)] text-sm">
                <p>&copy; {new Date().getFullYear()} Gymnite. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-white">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
