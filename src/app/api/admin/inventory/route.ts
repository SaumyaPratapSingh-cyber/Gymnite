import { NextResponse } from 'next/server';

export async function GET() {
    const inventory = [
        { id: 1, name: 'Treadmill', stock: 5, status: 'Good' },
        { id: 2, name: 'Yoga Mat', stock: 20, status: 'New' },
    ];
    return NextResponse.json(inventory);
}
