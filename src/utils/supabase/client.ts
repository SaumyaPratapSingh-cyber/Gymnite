import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

    if (supabaseUrl.includes('placeholder')) {
        console.warn('Supabase URL is missing or using placeholder! Authentication will likely fail with "Failed to Fetch".');
    }

    return createBrowserClient(
        supabaseUrl,
        supabaseKey
    )
}
