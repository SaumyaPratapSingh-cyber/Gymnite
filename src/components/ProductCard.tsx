'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingBag, Star, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
    const { addToCart } = useCart();

    // Mouse Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Stronger tilt
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
    const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[450px] w-full rounded-xl bg-black/40 backdrop-blur-sm border border-white/5 group perspective-1000 cursor-pointer"
        >
            {/* Holographic Border Gradient */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent p-[1px] opacity-20 group-hover:opacity-100 group-hover:from-accent group-hover:to-purple-500 transition-all duration-500 z-0" />

            {/* Inner Card */}
            <div className="relative h-full w-full rounded-xl bg-[#0a0a0a] overflow-hidden z-10">

                {/* Image Layer with Depth */}
                <motion.div
                    style={{ filter: `brightness(${brightness})`, translateZ: 50 }}
                    className="h-[75%] w-full overflow-hidden relative"
                >
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase py-1 px-3 rounded border border-white/10 shadow-xl">{category}</span>
                    </div>

                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Overlay Scanline */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-0 group-hover:opacity-20 transition-opacity mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                    {/* Floating Add to Cart Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart({ id, name, price, image, category });
                            }}
                            className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-[0_0_20px_var(--accent)] hover:bg-white hover:text-accent transition-colors"
                        >
                            <ShoppingBag size={20} />
                        </button>
                    </motion.div>
                </motion.div>

                {/* Info Layer */}
                <div className="p-6 h-[25%] flex flex-col justify-between relative bg-[#0f0f0f] border-t border-white/5 group-hover:bg-[#151515] transition-colors">
                    <div className="flex justify-between items-start">
                        <h3 className="text-white font-heading font-bold uppercase italic text-lg leading-tight group-hover:text-accent transition-colors w-[70%]">{name}</h3>
                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-yellow-500 mb-1">
                                <Star size={10} fill="currentColor" />
                                <span className="text-[10px] font-bold">5.0</span>
                            </div>
                            <p className="text-xl font-mono text-white font-bold">${price}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating 'Holo' elements slightly outside */}
            <motion.div
                style={{ translateZ: 80, x: -20, y: -20 }}
                className="absolute -top-2 -left-2 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
                <Zap size={24} className="animate-pulse" />
            </motion.div>
        </motion.div>
    );
};

export default ProductCard;
