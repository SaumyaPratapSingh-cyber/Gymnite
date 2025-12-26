'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
        const x = (clientX - (left + width / 2)) * 0.3; // Magnetic strength
        const y = (clientY - (top + height / 2)) * 0.3;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block"
        >
            <button
                onClick={onClick}
                className={`relative overflow-hidden group btn-primary cursor-pointer ${className}`}
            >
                {/* Liquid Fill Layer */}
                <span className="absolute inset-0 w-full h-full bg-white/20 scale-0 rounded-full group-hover:scale-[2.5] transition-transform duration-700 ease-out z-0 origin-center pointer-events-none" />

                {/* Content */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                    {children}
                </span>
            </button>
        </motion.div>
    );
};

export default MagneticButton;
