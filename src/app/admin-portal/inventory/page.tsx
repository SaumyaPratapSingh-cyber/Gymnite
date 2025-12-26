import React, { useEffect, useState } from 'react';

type InventoryItem = {
    id: number;
    name: string;
    stock: number;
    status: string;
};

export default function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);

    useEffect(() => {
        fetch('/api/admin/inventory')
            .then((res) => res.json())
            .then(setItems)
            .catch(console.error);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Inventory</h1>
            <table className="min-w-full bg-[#111] text-white">
                <thead>
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Stock</th>
                        <th className="p-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-t border-white/10">
                            <td className="p-2">{item.id}</td>
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{item.stock}</td>
                            <td className="p-2">{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
