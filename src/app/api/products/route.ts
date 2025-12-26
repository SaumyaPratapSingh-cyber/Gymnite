import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Client (Ensure env vars are set)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/products
 * Fetch all active products
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        let query = supabase
            .from('products')
            .select('*')
            .eq('is_active', true);

        if (category) {
            query = query.eq('category', category.toUpperCase());
        }

        const { data: products, error } = await query;

        if (error) {
            throw error;
        }

        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * POST /api/products
 * Create a new product (Admin only - protected by Middleware or RLS, simpler check here)
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Quick validation
        if (!body.title || !body.price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('products')
            .insert([
                {
                    title: body.title,
                    description: body.description,
                    price: body.price,
                    category: body.category,
                    stock_quantity: body.stock_quantity || 0,
                    image_url: body.image_url,
                    is_active: true
                }
            ])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
