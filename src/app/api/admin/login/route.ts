import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (email === 'testmail@gmail.com' && password === '1234') {
            const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
            // Set a simple httpOnly cookie for auth
            response.cookies.set('admin-auth', 'true', {
                httpOnly: true,
                path: '/',
                // In production you would set secure: true and sameSite: 'lax' etc.
            });
            return response;
        }
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }
}
