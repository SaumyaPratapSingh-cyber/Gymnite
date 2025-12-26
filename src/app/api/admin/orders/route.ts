import { NextResponse } from 'next/server';

export async function GET() {
    // Placeholder orders data
    const orders = [
        { id: 1, member: 'John Doe', service: 'Personal Training', amount: 100, date: '2025-12-01' },
        { id: 2, member: 'Jane Smith', service: 'Yoga Class', amount: 50, date: '2025-12-03' },
    ];
    return NextResponse.json(orders);
}
