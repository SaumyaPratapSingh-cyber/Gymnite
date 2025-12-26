'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    image_url: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="group relative bg-secondary rounded-none overflow-hidden hover:shadow-glow transition-shadow duration-300">
            {/* Image Container */}
            <div className="relative h-[400px] overflow-hidden bg-black/50">
                <img
                    src={product.image_url || '/images/placeholder.jpg'}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent opacity-60" />

                {/* Floating Add Button (Appears on Hover) */}
                <div className="absolute bottom-4 right-4 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onAddToCart(product.id)}
                        className="bg-accent text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
                    >
                        <ShoppingCart size={20} />
                    </motion.button>
                </div>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 text-xs font-bold tracking-widest text-gray-400 uppercase bg-black/60 px-2 py-1 backdrop-blur-sm">
                    {product.category}
                </span>
            </div>

            {/* Details */}
            <div className="p-4 border-t border-white/5 relative z-10 bg-secondary">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-heading font-medium text-white tracking-wide uppercase line-clamp-1">
                        {product.title}
                    </h3>
                </div>

                <p className="text-accent font-bold text-xl font-heading">
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
