import { NextResponse } from 'next/server';

export async function GET() {
    const members = [
        { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2025-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2025-02-20' },
    ];
    return NextResponse.json(members);
}
