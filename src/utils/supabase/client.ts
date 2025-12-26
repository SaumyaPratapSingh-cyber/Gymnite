import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase client: NEXT_PUBLIC_SUPABASE_URL or ANON_KEY is missing. Auth will fail.')
        // Return dummy values to satisfy types but not crash initialization
        return createBrowserClient('https://missing.supabase.co', 'missing')
    }

    return createBrowserClient(
        supabaseUrl,
        supabaseKey
    )
}
