'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, AlertTriangle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    stock_quantity: number;
    is_active: boolean;
}

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState<Product | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'SUPPLEMENTS',
        price: '',
        stock_quantity: '',
        image_url: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        } finally {
            setLoading(false);
        }
    }

    // Filter Logic
    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
            alert('Error deleting product');
        } else {
            setProducts(products.filter(p => p.id !== id));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const payload = {
            title: formData.title,
            category: formData.category,
            price: parseFloat(formData.price),
            stock_quantity: parseInt(formData.stock_quantity),
            image_url: formData.image_url,
            is_active: true
        };

        if (isEditing) {
            // Update
            const { error } = await supabase
                .from('products')
                .update(payload)
                .eq('id', isEditing.id);

            if (!error) fetchProducts();
        } else {
            // Create
            const { error } = await supabase
                .from('products')
                .insert([payload]);

            if (!error) fetchProducts();
        }

        closeModal();
    }

    function openModal(product?: Product) {
        if (product) {
            setIsEditing(product);
            setFormData({
                title: product.title,
                category: product.category,
                price: product.price.toString(),
                stock_quantity: product.stock_quantity.toString(),
                image_url: '' // simplified for demo
            });
        } else {
            setIsEditing(null);
            setFormData({ title: '', category: 'SUPPLEMENTS', price: '', stock_quantity: '', image_url: '' });
        }
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setIsEditing(null);
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white">INVENTORY MANAGER</h1>
                    <p className="text-gray-400 text-sm">Manage your gym gear, supplements, and merchandise.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-accent hover:bg-red-700 text-white px-5 py-3 rounded-lg font-bold shadow-glow transition-all"
                >
                    <Plus size={20} />
                    ADD PRODUCT
                </button>
            </div>

            {/* Search & Toolbar */}
            <div className="bg-secondary p-4 rounded-xl border border-white/5 mb-6 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-accent"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-secondary rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#1a1a1a] border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Product Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading inventory...</td></tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No products found.</td></tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-white">{product.title}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded bg-white/5 text-gray-300 text-xs font-bold border border-white/10">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-accent font-bold">${product.price.toFixed(2)}</td>
                                    <td className="p-4">
                                        {product.stock_quantity < 5 ? (
                                            <div className="flex items-center gap-2 text-red-500 font-bold">
                                                <AlertTriangle size={16} />
                                                {product.stock_quantity} (LOW)
                                            </div>
                                        ) : (
                                            <span className="text-green-500 font-bold">{product.stock_quantity}</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openModal(product)} className="p-2 text-gray-400 hover:text-white bg-black hover:bg-accent rounded transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 bg-black hover:bg-white/10 rounded transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-secondary w-full max-w-lg rounded-xl border border-white/10 shadow-2xl relative z-10 p-6"
                        >
                            <h2 className="text-2xl font-heading font-bold text-white mb-6">
                                {isEditing ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-500 text-xs font-bold mb-1">PRODUCT TITLE</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-primary border border-white/10 p-3 rounded text-white focus:border-accent outline-none" placeholder="e.g. Whey Gold Standard" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-500 text-xs font-bold mb-1">CATEGORY</label>
                                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-primary border border-white/10 p-3 rounded text-white focus:border-accent outline-none">
                                            <option value="SUPPLEMENTS">Supplements</option>
                                            <option value="GEAR">Gear</option>
                                            <option value="MERCH">Merch</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-xs font-bold mb-1">PRICE ($)</label>
                                        <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full bg-primary border border-white/10 p-3 rounded text-white focus:border-accent outline-none" placeholder="0.00" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-500 text-xs font-bold mb-1">STOCK QUANTITY</label>
                                    <input required type="number" value={formData.stock_quantity} onChange={e => setFormData({ ...formData, stock_quantity: e.target.value })} className="w-full bg-primary border border-white/10 p-3 rounded text-white focus:border-accent outline-none" placeholder="0" />
                                </div>

                                <div>
                                    <label className="block text-gray-500 text-xs font-bold mb-1">IMAGE URL</label>
                                    <input value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} className="w-full bg-primary border border-white/10 p-3 rounded text-white focus:border-accent outline-none" placeholder="https://..." />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button type="button" onClick={closeModal} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded transition-colors">CANCEL</button>
                                    <button type="submit" className="flex-1 bg-accent hover:bg-red-600 text-white font-bold py-3 rounded transition-colors">
                                        {isEditing ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
