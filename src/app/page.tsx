'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BentoGrid from '@/components/BentoGrid';
import Schedule from '@/components/Schedule';
import Pricing from '@/components/Pricing';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion } from 'framer-motion';
import { Check, Star, Users, Dumbbell, Trophy, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

// --- DATA ---
const STATS = [
  { label: 'Members', value: '2.5k+', icon: Users },
  { label: 'Equipment', value: '500+', icon: Dumbbell },
  { label: 'Trainers', value: '40+', icon: Star },
  { label: 'Awards', value: '15', icon: Trophy },
];

const TRAINERS = [
  { name: 'ALEX STERLING', role: 'Strength Coach', img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=1000' },
  { name: 'SARAH CONNOR', role: 'Crossfit Expert', img: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?auto=format&fit=crop&q=80&w=1000' },
  { name: 'MIKE TYSON', role: 'Boxing Coach', img: 'https://images.unsplash.com/photo-1612963663503-545262dcae54?auto=format&fit=crop&q=80&w=1000' }, // Changed image
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--primary)] text-white overflow-hidden selection:bg-[var(--accent)] selection:text-white">
      <Navbar />

      {/* --- HERO SECTION (VIDEO) --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--primary)] z-10" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 z-10 mix-blend-overlay"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Cinematic Content */}
        <div className="relative z-20 container-custom h-full flex flex-col justify-center">
          <ScrollReveal direction='up' className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-[var(--accent)]"></div>
              <span className="text-[var(--accent)] font-bold tracking-[0.4em] text-sm md:text-base uppercase animate-pulse">
                Welcome to the Asylum
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-bold text-white uppercase italic leading-[0.85] mb-8 drop-shadow-2xl">
              Forge Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Ultimate</span> <span className="text-outline-bold text-[var(--accent)]">Physique</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light border-l-2 border-white/20 pl-6">
              Stop exercising. Start training. Join the elite community dedicated to breaking limits and redefining human potential.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <button className="btn-primary group">
                <span className="relative z-10 flex items-center gap-2">Start Your Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>

              <button className="flex items-center gap-4 group cursor-pointer hover:text-[var(--accent)] transition-colors">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-all">
                  <Play size={20} className="ml-1 fill-current" />
                </div>
                <span className="font-bold uppercase tracking-widest text-sm">Watch Reel</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--accent)] to-transparent"></div>
        </motion.div>
      </section>

      {/* --- STATS STRIP --- */}
      <div className="relative z-30 bg-[#0a0a0a] border-y border-white/5 backdrop-blur-md">
        <div className="container-custom py-12 flex flex-wrap justify-between items-center gap-8">
          {STATS.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction='none' width='fit-content'>
              <div className="flex items-center gap-5 group cursor-default">
                <div className="p-3 bg-white/5 rounded-2xl text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-500">
                  <stat.icon size={28} />
                </div>
                <div>
                  <h3 className="text-4xl font-heading font-bold text-white leading-none mb-1 group-hover:scale-110 origin-left transition-transform">{stat.value}</h3>
                  <p className="text-gray-500 font-bold text-xs tracking-widest uppercase group-hover:text-gray-300">{stat.label}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* --- BENTO GRID (SERVICES) --- */}
      <BentoGrid />

      {/* --- WHY CHOOSE US --- */}
      <section className="section-padding bg-[var(--primary)] relative overflow-hidden">
        {/* Decorative Big Text */}
        <h2 className="absolute top-1/2 right-[-10%] -translate-y-1/2 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none">
          LEGACY
        </h2>

        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--accent)]/20 blur-[100px] rounded-full" />
            <ScrollReveal direction="right">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-[300px] object-cover mt-12 border border-white/10" alt="Gym Interior" />
                <img src="https://images.unsplash.com/photo-1623874514711-0f321325f318?q=80&w=1000&auto=format&fit=crop" className="rounded-2xl w-full h-[300px] object-cover mb-12 border border-white/10" alt="Weights" />
              </div>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal>
              <h3 className="text-[var(--accent)] font-bold tracking-[0.2em] text-sm mb-4 uppercase flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[var(--accent)]"></span> Why Choose Us
              </h3>
              <h2 className="text-5xl lg:text-7xl font-bold mb-8 italic uppercase leading-[0.9]">
                We Are The <br /><span className="text-outline">Anomlay</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l border-white/10 pl-6">
                We don't sell memberships; we sell a mindset. Gymnite is designed for those who demand excellence from themselves and their environment.
              </p>
            </ScrollReveal>

            <ul className="space-y-6 mb-12">
              {['24/7 Biometric Access', 'Free Diet & Supplement Consultation', 'Cryotherapy & Infrared Saunas', 'Luxury Locker Rooms & Showers'].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction='left'>
                  <li className="flex items-center gap-4 text-white hover:translate-x-2 transition-transform cursor-default group">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-wide">{item}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>

            <ScrollReveal delay={0.4}>
              <button className="btn-outline">Tour The Facility</button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- SCHEDULE --- */}
      <Schedule />

      {/* --- PRICING --- */}
      <Pricing />

      {/* --- TRAINERS --- */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal className="mb-16 flex justify-between items-end">
            <div>
              <h3 className="text-[var(--accent)] font-bold tracking-widest text-sm mb-2 uppercase">The Squad</h3>
              <h2 className="text-5xl font-bold uppercase italic">Expert Coaches</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
              Meet All Trainers <ArrowRight size={16} />
            </button>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAINERS.map((trainer, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden h-[500px] rounded-2xl cursor-pointer">
                  <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[var(--accent)] font-bold tracking-widest text-xs mb-2 uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">{trainer.role}</p>
                    <h3 className="text-4xl font-heading font-bold uppercase italic text-white">{trainer.name.split(' ')[0]} <span className="text-outline">{trainer.name.split(' ')[1]}</span></h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
