'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ArrowRight } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES = ['All', 'Strength', 'Cardio', 'Mind & Body'];

// Images for categories
const CATEGORY_IMAGES: Record<string, string> = {
    'Strength': 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?q=80&w=1469&auto=format&fit=crop',
    'Cardio': 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop', // Boxing/Cardio vibe
    'Mind & Body': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1470&auto=format&fit=crop'
};

const CLASSES = [
    { id: 1, name: 'Powerlifting 101', time: '06:00 AM', trainer: 'Alex Sterling', category: 'Strength', spots: 5, day: 'Monday' },
    { id: 2, name: 'HIIT Inferno', time: '07:30 AM', trainer: 'Sarah Connor', category: 'Cardio', spots: 12, day: 'Monday' },
    { id: 3, name: 'Zen Yoga', time: '09:00 AM', trainer: 'Emma Stone', category: 'Mind & Body', spots: 8, day: 'Monday' },
    { id: 4, name: 'Crossfit WOD', time: '05:00 PM', trainer: 'Mike Tyson', category: 'Strength', spots: 20, day: 'Monday' },
    { id: 5, name: 'Spin Class', time: '06:30 PM', trainer: 'John Doe', category: 'Cardio', spots: 0, day: 'Monday' },
];

const Schedule = () => {
    const activeDayState = useState('Monday');
    const activeCategoryState = useState('All');

    // De-structure for usage
    const activeDay = activeDayState[0];
    const setActiveDay = activeDayState[1];

    const activeCategory = activeCategoryState[0];
    const setActiveCategory = activeCategoryState[1];

    const filteredClasses = CLASSES.filter(item => {
        return (
            (activeDay === item.day) &&
            (activeCategory === 'All' || item.category === activeCategory)
        );
    });

    return (
        <section id="schedule" className="section-padding bg-[#050505] relative overflow-hidden">
            {/* Background Noise */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <h3 className="text-[var(--accent)] font-bold tracking-[0.2em] text-sm mb-2 uppercase">Timetable</h3>
                        <h2 className="text-5xl font-bold uppercase italic">Class <span className="text-outline">Schedule</span></h2>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Days Scroll */}
                <div className="flex justify-between md:justify-start gap-4 md:gap-8 overflow-x-auto pb-8 mb-8 border-b border-white/10 scrollbar-hide">
                    {DAYS.map(day => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`text-lg md:text-2xl font-bold uppercase relative pb-2 transition-colors whitespace-nowrap ${activeDay === day ? 'text-white' : 'text-gray-600 hover:text-gray-400'
                                }`}
                        >
                            {day}
                            {activeDay === day && (
                                <motion.div
                                    layoutId="activeDayLine"
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)]"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Classes Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 gap-4"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredClasses.length > 0 ? (
                            filteredClasses.map((cls) => (
                                <motion.div
                                    key={cls.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 border border-white/5 rounded-2xl transition-all duration-500 overflow-hidden hover:scale-[1.01]"
                                >
                                    {/* Image Background for Item */}
                                    <div className="absolute inset-0 z-0">
                                        <div className="absolute inset-0 bg-black/80 z-10 transition-colors duration-500 group-hover:bg-black/60" />
                                        <img
                                            src={CATEGORY_IMAGES[cls.category] || CATEGORY_IMAGES['Strength']}
                                            alt={cls.category}
                                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 transform group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-20 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full">

                                        {/* Time Badge */}
                                        <div className="flex items-center gap-2 text-white/80 group-hover:text-white">
                                            <div className="p-2 rounded bg-white/10 backdrop-blur-md">
                                                <Clock size={16} className="text-[var(--accent)]" />
                                            </div>
                                            <span className="font-heading font-bold text-xl tracking-wide">{cls.time}</span>
                                        </div>

                                        <div className="flex-grow">
                                            <h4 className="text-3xl font-heading font-black uppercase italic mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-white group-hover:to-white transition-all">
                                                {cls.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest group-hover:text-accent transition-colors">
                                                with {cls.trainer}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-8 mt-6 md:mt-0">
                                            <div className="text-right">
                                                <span className={`block text-xs font-bold uppercase tracking-widest mb-1 ${cls.spots === 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {cls.spots === 0 ? 'Full' : 'Available'}
                                                </span>
                                                <div className="flex items-center gap-1 text-gray-400 text-sm group-hover:text-white transition-colors">
                                                    <Users size={14} /> {cls.spots} Spots
                                                </div>
                                            </div>

                                            <button
                                                disabled={cls.spots === 0}
                                                className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 ${cls.spots === 0
                                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                                    : 'bg-white/10 text-white group-hover:bg-[var(--accent)] group-hover:border-transparent'
                                                    }`}
                                            >
                                                <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-20 text-center text-gray-500 uppercase tracking-widest font-bold"
                            >
                                No classes scheduled for this category.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
};

export default Schedule;
