export interface Coach {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
    experience: string[];
    specialties: string[];
}

export const COACHES: Coach[] = [
    {
        id: 1,
        name: 'Alex "The Titan" Mercer',
        role: 'Head Strength Coach',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887&auto=format&fit=crop',
        bio: 'A former competitive powerlifter with over 15 years of experience in strength conditioning. Alex believes in building a foundation of raw power before sculpting the aesthetic.',
        experience: [
            '15+ Years Strength Training',
            'Former National Powerlifting Champion',
            'Certified CSCS Specialist',
            'trained 500+ Athletes'
        ],
        specialties: ['Powerlifting', 'Hypertrophy', 'Injury Prevention']
    },
    {
        id: 2,
        name: 'Sarah "Viper" Jenkins',
        role: 'Lead HIIT Instructor',
        image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887&auto=format&fit=crop',
        bio: 'Sarah brings an intensity that is unmatched. Her military background influences her high-octane training style, ensuring you leave every session empty but fulfilled.',
        experience: [
            '8 Years Military Fitness Instructor',
            'CrossFit Level 3 Trainer',
            'Spartan Race Finisher (x10)',
            'Specialist in Metabolic Conditioning'
        ],
        specialties: ['HIIT', 'Endurance', 'Military Fitness']
    },
    {
        id: 3,
        name: 'Marcus "Zen" Wei',
        role: 'Mobility & Recovery Specialist',
        image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1887&auto=format&fit=crop',
        bio: 'Balance is key. Marcus combines ancient martial arts discipline with modern physiotherapy to ensure your body recovers as hard as it trains.',
        experience: [
            '12 Years Martial Arts Practitioner',
            'Licensed Physiotherapist',
            'Yoga Alliance RYT 500',
            'Focus on Longevity and Joint Health'
        ],
        specialties: ['Mobility', 'Rehabilitation', 'Yoga']
    }
];
