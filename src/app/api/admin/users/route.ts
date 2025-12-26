import { NextResponse } from 'next/server';

export async function GET() {
    const users = [
        { id: 1, role: 'admin', email: 'admin@example.com' },
        { id: 2, role: 'staff', email: 'staff@example.com' },
    ];
    return NextResponse.json(users);
}
