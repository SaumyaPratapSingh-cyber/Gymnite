'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag, Eye } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    isNew?: boolean;
}

const ProductCard = ({ product }: { product: Product }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative w-full bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden cursor-pointer"
            whileHover={{ y: -10 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative h-[400px] w-full overflow-hidden bg-gray-900">
                {product.isNew && (
                    <div className="absolute top-4 left-4 z-20 bg-[var(--accent)] text-white text-[10px] font-bold uppercase px-3 py-1 tracking-widest">
                        New Drop
                    </div>
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors transform hover:scale-110">
                        <ShoppingBag size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-black/50 text-white border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors transform hover:scale-110">
                        <Eye size={20} />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{product.category}</p>
                        <h3 className="text-white text-lg font-bold font-heading uppercase italic tracking-wide group-hover:text-[var(--accent)] transition-colors">{product.name}</h3>
                    </div>
                    <span className="text-white font-bold text-lg">${product.price}</span>
                </div>

                {/* Quick Size Selector (Visible on Hover) */}
                <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="flex gap-2">
                        {['S', 'M', 'L', 'XL'].map(size => (
                            <button key={size} className="flex-1 py-2 border border-white/20 rounded text-xs font-bold hover:bg-white hover:text-black transition-colors uppercase">
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
