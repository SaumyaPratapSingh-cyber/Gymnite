export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    isNew?: boolean;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Void Black Pump Cover',
        price: 45,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop',
        description: 'Engineered for the shadows. This oversized pump cover hides your gains until the moment is right. Premium cotton blend with moisture-wicking technology.',
        isNew: true
    },
    {
        id: 2,
        name: 'Neon Ignite Stringer',
        price: 32,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop',
        description: 'Maximum exposure, maximum mobility. The Neon Ignite Stringer is built for back days that demand freedom of movement.',
        isNew: true
    },
    {
        id: 3,
        name: 'Cyberpunk Lifting Straps',
        price: 25,
        category: 'Gear',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        description: 'Grip normally fails before your muscles do. Not anymore. Heavy-duty cyberpunk aesthetics meet industrial-grade durability.',
        isNew: false
    },
    {
        id: 4,
        name: 'Isolate: Zero Carb',
        price: 89,
        category: 'Supplements',
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop',
        description: 'Pure protein for pure gains. Zero fillers, zero carbs, 100% anabolic potential. Chocolate Fudge flavor.',
        isNew: false
    },
    {
        id: 5,
        name: 'Neural Focus Pre-Workout',
        price: 55,
        category: 'Supplements',
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop',
        description: 'Laser focus for heavy compounds. This formula connects mind and muscle for contractions you have never felt before.',
        isNew: true
    },
    {
        id: 6,
        name: 'Titan Leather Belt',
        price: 120,
        category: 'Gear',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
        description: 'Protect your spine during PR attempts. 10mm thick genuine leather with a quick-release lever.',
        isNew: false
    },
    {
        id: 7,
        name: 'Vapor Shorts',
        price: 40,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop',
        description: 'Lightweight, breathable, and squat-proof. The ideal shorts for high-intensity interval training.',
        isNew: false
    },
    {
        id: 8,
        name: 'Creatine Monohydrate',
        price: 35,
        category: 'Supplements',
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop',
        description: 'The most researched supplement on the planet. 5g pure micronized creatine per serving for explosive power.',
        isNew: false
    }
];
