'use client';

import React, { useRef } from 'react';
import { motion, useInView, UseInViewOptions } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
    viewport?: UseInViewOptions;
}

export const ScrollReveal = ({
    children,
    width = '100%',
    delay = 0,
    direction = 'up',
    className = "",
    viewport = { once: true, amount: 0.2 }
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);

    const getVariants = () => {
        const distance = 40;

        switch (direction) {
            case 'up': return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
            case 'down': return { hidden: { opacity: 0, y: -distance }, visible: { opacity: 1, y: 0 } };
            case 'left': return { hidden: { opacity: 0, x: distance }, visible: { opacity: 1, x: 0 } };
            case 'right': return { hidden: { opacity: 0, x: -distance }, visible: { opacity: 1, x: 0 } };
            case 'none': return { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };
            default: return { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0 } };
        }
    };

    return (
        <div ref={ref} style={{ width, overflow: 'hidden' }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                {children}
            </motion.div>
        </div>
    );
};
