import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ProfileEditor from '@/components/dashboard/ProfileEditor';

export default async function SettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-heading font-black italic uppercase text-white mb-2">
                Account <span className="text-[var(--accent)]">Settings</span>
            </h1>
            <p className="text-gray-400 mb-12">Manage your credentials and shipping protocols.</p>

            <ProfileEditor user={user} />
        </div>
    );
}
