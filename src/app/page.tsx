'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BentoGrid from '@/components/BentoGrid';
import Schedule from '@/components/Schedule';
import Pricing from '@/components/Pricing';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check, Star, Users, Dumbbell, Trophy, ArrowRight, Play, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import { COACHES } from '@/data/coaches';

// --- DATA ---
const STATS = [
  { label: 'Members', value: '2.5k+', icon: Users },
  { label: 'Equipment', value: '500+', icon: Dumbbell },
  { label: 'Trainers', value: '40+', icon: Star },
  { label: 'Awards', value: '15', icon: Trophy },
];

export default function Home() {
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [showReel, setShowReel] = useState(false);
  const { scrollY } = useScroll();

  // Parallax & Transform Hooks
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const scaleText = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-accent selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
      <Navbar />

      {/* --- HERO SECTION (CINEMATIC V3) --- */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Video Layer */}
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505] z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 blur-[1px]"
          >
            <source src="https://videos.pexels.com/video-files/855828/855828-hd_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Content Layer */}
        <div className="relative z-20 container-custom h-full flex flex-col justify-center items-center text-center">
          <motion.div style={{ y: yText, scale: scaleText }} className="relative">
            <div className="flex justify-center items-center gap-4 mb-8">
              <motion.div
                initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] bg-accent"
              />
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="text-accent font-black tracking-[0.5em] text-xs md:text-sm uppercase"
              >
                Est. 2024
              </motion.span>
              <motion.div
                initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] bg-accent"
              />
            </div>

            <h1 className="text-6xl md:text-9xl font-heading font-black text-white uppercase italic leading-[0.8] tracking-tighter mix-blend-difference mb-8">
              <span className="block overflow-hidden"><motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="block">Pure</motion.span></span>
              <span className="block overflow-hidden text-outline-bold text-transparent"><motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} className="block">Uncut</motion.span></span>
              <span className="block overflow-hidden text-accent"><motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }} className="block">Power</motion.span></span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
              className="flex flex-col md:flex-row gap-6 mt-12 justify-center items-center"
            >
              <Link href="/plans">
                <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 clip-path-slant group">
                  <span className="flex items-center gap-2 relative z-10">Start Training <ArrowRight className="group-hover:translate-x-1" /></span>
                </button>
              </Link>
              <button onClick={() => setShowReel(true)} className="group flex items-center gap-4 text-white hover:text-accent transition-colors">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                  <Play size={16} className="ml-1 fill-current" />
                </div>
                <span className="uppercase font-bold tracking-[0.2em] text-xs">Play Reel</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          style={{ opacity: opacityHero }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 animate-pulse">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent"></div>
        </motion.div>
      </section>

      {/* --- STATS STRIP (Floating Glass) --- */}
      <section className="relative z-30 -mt-20 px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex flex-wrap justify-between items-center gap-8 shadow-2xl shadow-accent/5"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start group cursor-default">
                <div className="flex items-end gap-2 mb-2">
                  <h3 className="text-5xl font-heading font-black text-white leading-none italic group-hover:text-accent transition-colors duration-500">{stat.value}</h3>
                  <stat.icon size={24} className="text-white/20 mb-1 group-hover:text-accent transition-colors" />
                </div>
                <p className="text-gray-500 font-bold text-[10px] tracking-[0.3em] uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- MANIFESTO (Big Text) --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-heading font-black uppercase leading-tight mb-8">
                We Don't Just Build <span className="text-accent italic">Bodies</span>.<br /> We Forge <span className="text-outline">Legacies</span>.
              </h2>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                In a world of quick fixes and cheap dopamine, Gymnite stands as the last bastion of hard work. No shortcuts. No excuses. Just iron, sweat, and glory.
              </p>
            </ScrollReveal>
          </div>
        </div>
        {/* Background 'GYMNITE' kinetic text could go here if global styles allow */}
      </section>

      {/* --- WHY US (Asymmetric Grid) --- */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-4xl font-heading font-black italic uppercase mb-8">
                Why We <span className="text-accent relative inline-block">Dominate <span className="absolute bottom-0 left-0 w-full h-1 bg-accent/50 transform skew-x-12"></span></span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: 'Military-Grade Equipment', desc: 'Hammer Strength & Eleiko purely. No plastic feeling.' },
                  { title: '24/7 Biometric Access', desc: 'Secure, seamless entry. The grind never sleeps.' },
                  { title: 'The Wolfpack', desc: 'A community of high-performers. Iron sharpens iron.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                      <CheckCircle size={20} className="text-white/50 group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase italic text-white group-hover:translate-x-2 transition-transform">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <div className="relative h-[600px] hidden md:block group">
              <motion.div
                whileHover={{ scale: 0.95 }}
                className="absolute right-0 top-0 w-3/4 h-3/4 rounded-3xl overflow-hidden border border-white/10"
              >
                <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute left-0 bottom-0 w-3/4 h-3/4 rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10"
              >
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <span className="text-6xl font-heading font-black text-transparent text-outline-bold opacity-30">ORIGIN</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES (Bento) --- */}
      <BentoGrid />

      {/* --- SCHEDULE --- */}
      <Schedule />

      {/* --- PRICING --- */}
      <Pricing />

      {/* --- TRAINERS (Carousel V3) --- */}
      <section className="py-32 bg-[#050505] overflow-hidden">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-6xl font-heading font-black italic uppercase">The <span className="text-accent">Squad</span></h2>
            <Link href="/trainers" className="text-xs font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors flex items-center gap-2">
              View Full Roster <ArrowRight size={14} />
            </Link>
          </div>

          {/* Horizontal Scroll Area */}
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x scrollbar-hide">
            {COACHES.map((coach, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 0.98 }}
                className="min-w-[300px] md:min-w-[400px] h-[550px] relative rounded-3xl overflow-hidden cursor-pointer group snap-center border border-white/5"
                onClick={() => setSelectedCoach(coach)}
              >
                <img src={coach.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <h3 className="text-4xl font-heading font-black italic text-white uppercase leading-none mb-2">{coach.name}</h3>
                  <p className="text-sm font-bold bg-accent text-black inline-block px-2 py-1 uppercase tracking-wider">{coach.role}</p>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <span className="text-black font-black uppercase tracking-widest text-lg border-2 border-black px-6 py-2">Inspect Coach</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Modal */}
      <AnimatePresence>
        {selectedCoach && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedCoach(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
              onClick={e => e.stopPropagation()}
            >
              <div className="h-64 md:h-full relative">
                <img src={selectedCoach.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] md:bg-gradient-to-r md:from-transparent md:to-[#111]" />
              </div>
              <div className="p-8 md:p-12 relative">
                <button onClick={() => setSelectedCoach(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                  <X size={24} />
                </button>

                <h2 className="text-3xl font-heading font-black italic uppercase mb-2">{selectedCoach.name}</h2>
                <p className="text-[var(--accent)] font-bold uppercase tracking-widest text-sm mb-6">{selectedCoach.role}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Background Info</h4>
                    <p className="text-gray-300 leading-relaxed text-sm">{selectedCoach.bio}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Combat Experience</h4>
                    <ul className="space-y-2">
                      {selectedCoach.experience.map((exp: string, i: number) => (
                        <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCoach.specialties.map((spec: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-white/5 rounded text-xs font-bold uppercase text-gray-300 border border-white/10">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Watch Reel Modal */}
      <AnimatePresence>
        {showReel && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-xl" onClick={() => setShowReel(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowReel(false)}
                className="absolute top-6 right-6 z-50 bg-black/50 hover:bg-[var(--accent)] text-white p-2 rounded-full backdrop-blur-md transition-all duration-300 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="w-full h-full relative overflow-hidden pointer-events-none">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/PSrPv5RXzgs?autoplay=1&mute=1&controls=0&loop=1&playlist=PSrPv5RXzgs&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3"
                  title="Gym Cinematic Video"
                  className="w-full h-full object-cover scale-[1.35]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
