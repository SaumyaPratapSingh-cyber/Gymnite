import { Shield, Zap, Crown, User, Calendar, Clock } from 'lucide-react';

export type Plan = {
    id: string;
    name: string;
    monthlyPrice: string;
    yearlyPrice: string; // Typically 10x monthly
    description: string;
    features: string[];
    icon: any;
    highlight: boolean;
    type: 'membership' | 'service'; // Differentiate between recurring and one-time
    period?: string; // e.g. 'Daily', 'One-Time'
};

export const PLANS: Plan[] = [
    {
        id: 'recruit',
        name: 'Recruit',
        monthlyPrice: '0',
        yearlyPrice: '0',
        description: 'For those just starting their journey.',
        features: ['Access to Gym Floor', 'Locker Room Access', 'Free WiFi', '1 Guest Pass/Month'],
        icon: Shield,
        highlight: false,
        type: 'membership'
    },
    {
        id: 'soldier',
        name: 'Soldier',
        monthlyPrice: '29',
        yearlyPrice: '290',
        description: 'Unlock your full potential.',
        features: ['All Recruit Features', 'Unlimited Classes', 'Sauna & Steam Room', 'Free Solarium', '5 Guest Passes/Month'],
        icon: Zap,
        highlight: true,
        type: 'membership'
    },
    {
        id: 'warlord',
        name: 'Warlord',
        monthlyPrice: '99',
        yearlyPrice: '990',
        description: 'Dominate the competition.',
        features: ['All Soldier Features', 'Personal Trainer (2x/mo)', 'Nutrition Plan', 'Private Locker', 'Priority Support'],
        icon: Crown,
        highlight: false,
        type: 'membership'
    }
];

export const DAILY_SERVICES: Plan[] = [
    {
        id: 'day-pass',
        name: 'Day Pass',
        monthlyPrice: '15', // Reusing field for single price to keep type simple, or interpret as 'price'
        yearlyPrice: '15',
        description: 'Full access for a single day.',
        features: ['Gym Floor Access', 'Locker Room', 'Classes included', 'Valid for 24h'],
        icon: Calendar,
        highlight: false,
        type: 'service',
        period: 'One-Time'
    },
    {
        id: 'week-pass',
        name: 'Week Pass',
        monthlyPrice: '45',
        yearlyPrice: '45',
        description: 'Perfect for travelers.',
        features: ['7 Days Full Access', 'All Amenities', 'No Commitment', 'Classes included'],
        icon: Clock,
        highlight: false,
        type: 'service',
        period: 'One-Time'
    },
    {
        id: 'pt-session',
        name: '1-on-1 Session',
        monthlyPrice: '60',
        yearlyPrice: '60',
        description: 'Single personal training session.',
        features: ['1 Hour Session', 'Expert Assessment', 'Custom Workout', 'Post-workout Shake'],
        icon: User,
        highlight: true,
        type: 'service',
        period: 'One-Time'
    }
];
