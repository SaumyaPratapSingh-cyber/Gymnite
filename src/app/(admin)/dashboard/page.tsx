import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { User, Package, Trophy, Settings, Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import RecentOrders from '@/components/dashboard/RecentOrders';
import DigitalMemberCard from '@/components/dashboard/DigitalMemberCard';
import QuickActions from '@/components/dashboard/QuickActions';
import ZoneAccess from '@/components/dashboard/ZoneAccess';

export default async function Dashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    // Check if user has a plan
    const hasPlan = user.user_metadata.plan && user.user_metadata.status;

    // In a real app, we would fetch/insert profile data from a 'profiles' table here.
    // For now, we will use the user metadata.
    const fullName = user.user_metadata.full_name || 'Athlete';
    const email = user.email;

    const planData = user.user_metadata.plan || 'No Active Plan';
    const status = user.user_metadata.status || 'Inactive';

    let daysLeft = 0;
    if (user.user_metadata.subscription_start) {
        const startDate = new Date(user.user_metadata.subscription_start);
        const expiryDate = new Date(startDate);
        expiryDate.setDate(expiryDate.getDate() + 30);
        daysLeft = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    }

    const loyaltyPoints = user.user_metadata.loyalty_points || 0;
    const recentOrdersCount = user.user_metadata.recent_orders_count || 0;

    // Find detailed plan info - keeping this simple local map for now
    const PLANS = [
        {
            id: 'recruit',
            name: 'Recruit',
            features: ['Access to Gym Floor', 'Locker Room Access', 'Free WiFi', '1 Guest Pass/Month'],
        },
        {
            id: 'soldier',
            name: 'Soldier',
            features: ['All Recruit Features', 'Unlimited Classes', 'Sauna & Steam Room', 'Free Solarium', '5 Guest Passes/Month'],
        },
        {
            id: 'warlord',
            name: 'Warlord',
            features: ['All Soldier Features', 'Personal Trainer (2x/mo)', 'Nutrition Plan', 'Private Locker', 'Priority Support'],
        }
    ];

    // Check for plan match
    const selectedPlan = PLANS.find(p => p.id === user.user_metadata.plan);
    const planFeatures = selectedPlan ? selectedPlan.features : [];

    // Greeting based on time
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : (hour < 18 ? 'Good Afternoon' : 'Good Evening');

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#050505]">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">{greeting}, Operative</h2>
                    <h1 className="text-4xl md:text-5xl font-heading font-black italic uppercase text-white leading-none">
                        {fullName.split(' ')[0]} <span className="text-[var(--accent)] text-outline">HQ</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/settings" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Settings size={18} />
                    </Link>
                    <form action="/auth/signout" method="post">
                        <button className="px-5 py-2.5 bg-white/5 border border-white/10 text-xs font-bold uppercase rounded-xl hover:bg-red-950/30 hover:text-red-400 hover:border-red-900/30 transition-all transition-colors">
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Col 1: Identity & Quick Actions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Digital Card Area */}
                    <div className="bg-[#0a0a0a] border border-white/5 p-1 rounded-3xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" /> Digital Identification
                                </h3>
                                {status === 'active' ? (
                                    <span className="text-xs font-mono text-gray-500">{daysLeft} Days Remaining</span>
                                ) : (
                                    <Link href="/onboarding/plans" className="text-xs text-[var(--accent)] font-bold uppercase hover:underline">Activate Now</Link>
                                )}
                            </div>

                            {/* The Card Component */}
                            <div className="max-w-md mx-auto transform hover:scale-[1.02] transition-transform duration-500">
                                <DigitalMemberCard user={user} planName={planData} status={status} />
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4 pl-2">Quick Operations</h3>
                        <QuickActions />
                    </div>
                </div>

                {/* Col 2: Stats Column */}
                <div className="space-y-6">
                    {/* Points Stat */}
                    <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:border-[var(--accent)]/30 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Trophy size={80} />
                        </div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Loyalty Points</h3>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-4xl md:text-5xl font-black italic text-white">{loyaltyPoints}</span>
                            <span className="text-sm font-bold text-[var(--accent)]">PTS</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
                            <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 w-[15%] h-full" />
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase">Top 15% of Recruits</p>
                    </div>

                    {/* Features List */}
                    <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/5 flex-grow min-h-[250px] relative">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                            <Flame size={16} className="text-[var(--accent)]" />
                            {planData.replace('-', ' ')} Privileges
                        </h3>
                        {planFeatures.length > 0 ? (
                            <ul className="space-y-3">
                                {planFeatures.map((feat, i) => (
                                    <li key={i} className="text-xs md:text-sm text-gray-400 flex items-start gap-3 group">
                                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[var(--accent)]/40 group-hover:bg-[var(--accent)] transition-colors" />
                                        <span className="group-hover:text-white transition-colors">{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8 text-gray-500 text-xs uppercase">
                                <p className="mb-4">No Active Privileges</p>
                                <Link href="/onboarding/plans" className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 text-white transition-colors">
                                    View Plans
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Zone Access Module */}
            <ZoneAccess zones={user.user_metadata.zones || []} />

            {/* Bottom Section: Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentOrders />
                </div>

                {/* Promo/Ad Card */}
                <div className="bg-gradient-to-br from-[var(--accent)] to-red-900 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end min-h-[200px] group cursor-pointer">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="relative z-10">
                        <span className="bg-white text-black text-[10px] font-black uppercase px-2 py-1 rounded mb-2 inline-block">New Drop</span>
                        <h3 className="text-2xl font-black italic uppercase text-white mb-1">Summer Gear</h3>
                        <p className="text-white/80 text-sm mb-4">Upgrade your arsenal with the latest fit.</p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase text-white underline">
                            Shop Now <ArrowRight size={14} />
                        </div>
                    </div>
                    {/* Abstract shape */}
                    <Package className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>
        </div>
    );
}
