'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ArrowRight } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES = ['All', 'Strength', 'Cardio', 'Mind & Body'];

// Mock Data
const CLASSES = [
    { id: 1, name: 'Powerlifting 101', time: '06:00 AM', trainer: 'Alex Sterling', category: 'Strength', spots: 5, day: 'Monday' },
    { id: 2, name: 'HIIT Inferno', time: '07:30 AM', trainer: 'Sarah Connor', category: 'Cardio', spots: 12, day: 'Monday' },
    { id: 3, name: 'Zen Yoga', time: '09:00 AM', trainer: 'Emma Stone', category: 'Mind & Body', spots: 8, day: 'Monday' },
    { id: 4, name: 'Crossfit WOD', time: '05:00 PM', trainer: 'Mike Tyson', category: 'Strength', spots: 20, day: 'Monday' },
    { id: 5, name: 'Spin Class', time: '06:30 PM', trainer: 'John Doe', category: 'Cardio', spots: 0, day: 'Monday' }, // Full
    // ... repeatable for demo logic
];

const Schedule = () => {
    const [activeDay, setActiveDay] = useState('Monday');
    const [activeCategory, setActiveCategory] = useState('All');

    // Filter Logic
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
                                    className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 bg-[#0f0f0f] border border-white/5 hover:border-[var(--accent)] rounded-2xl transition-all duration-300 hover:bg-[#151515]"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Clock size={16} className="text-[var(--accent)]" />
                                            <span className="font-heading font-bold text-xl text-white tracking-wide">{cls.time}</span>
                                        </div>

                                        <div>
                                            <h4 className="text-2xl font-bold uppercase italic mb-1 group-hover:text-[var(--accent)] transition-colors">{cls.name}</h4>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">with {cls.trainer}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-8 mt-6 md:mt-0">
                                        <div className="text-right">
                                            <span className={`block text-xs font-bold uppercase tracking-widest mb-1 ${cls.spots === 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                {cls.spots === 0 ? 'Full' : 'Available'}
                                            </span>
                                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                                                <Users size={14} /> {cls.spots} Spots
                                            </div>
                                        </div>

                                        <button
                                            disabled={cls.spots === 0}
                                            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 ${cls.spots === 0
                                                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                                    : 'bg-white/10 text-white group-hover:bg-[var(--accent)]'
                                                }`}
                                        >
                                            <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                        </button>
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
