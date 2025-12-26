'use client';
import React, { useEffect, useState } from 'react';

type Order = {
    id: number;
    member: string;
    service: string;
    amount: number;
    date: string;
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch('/api/admin/orders')
            .then((res) => res.json())
            .then(setOrders)
            .catch(console.error);
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <table className="min-w-full bg-[#111] text-white">
                <thead>
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Member</th>
                        <th className="p-2 text-left">Service</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o) => (
                        <tr key={o.id} className="border-t border-white/10">
                            <td className="p-2">{o.id}</td>
                            <td className="p-2">{o.member}</td>
                            <td className="p-2">{o.service}</td>
                            <td className="p-2">${o.amount}</td>
                            <td className="p-2">{o.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
