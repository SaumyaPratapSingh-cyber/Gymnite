import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/dashboard'

    if (token_hash && type) {
        const supabase = await createClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (!error) {
            // Redirect to the dashboard
            const redirectTo = request.nextUrl.clone()
            redirectTo.pathname = next
            redirectTo.searchParams.delete('token_hash')
            redirectTo.searchParams.delete('type')
            return NextResponse.redirect(redirectTo)
        }
    }

    // Redirect to error page
    const errorUrl = request.nextUrl.clone()
    errorUrl.pathname = '/login'
    errorUrl.searchParams.set('error', 'Invalid or expired verification link')
    return NextResponse.redirect(errorUrl)
}
