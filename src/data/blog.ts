export const CATEGORIES = ['All', 'Training', 'Nutrition', 'Mindset', 'Recovery'];

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // HTML content
    category: string;
    readTime: string;
    image: string;
    author: {
        name: string;
        role: string;
        image: string;
    };
    featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
    // --- TRAINING ---
    {
        id: 'science-of-hypertrophy',
        title: 'The Science of Hypertrophy: Volume vs Intensity',
        excerpt: 'Stop guessing. Here is the definitive guide to growing muscle based on the latest 2024 studies.',
        category: 'Training',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
        featured: true,
        author: { name: 'Dr. Mike Israetel', role: 'PhD, Sport Physiology', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200' },
        content: `
      <p class="lead">The debate between high volume and high intensity has raged for decades. Put simply: Volume is the driver, but Intensity is the key.</p>
      <h3>Mechanical Tension</h3>
      <p>Lifting heavy weights through a full range of motion creates mechanical tension, the primary stimulus for muscle growth.</p>
      <blockquote>"You don't grow in the gym. You grow while you sleep."</blockquote>
      <h3>Practical Tips</h3>
      <ul>
        <li>Train each muscle group 2x per week.</li>
        <li>Focus on compound movements first.</li>
        <li>Progressive overload is non-negotiable.</li>
      </ul>
    `
    },
    {
        id: 'progressive-overload-guide',
        title: 'Progressive Overload: The Only Law That Matters',
        excerpt: 'If you aren\'t adding weight, reps, or better form, you aren\'t growing. Period.',
        category: 'Training',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1517963879466-e9b5ce382569?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Jeff Nippard', role: 'Natural Pro Bodybuilder', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
        content: `
      <p class="lead">The concept is simple: do more today than you did yesterday.</p>
      <p>It doesn't always mean adding weight to the bar. It can mean:</p>
      <ul>
        <li>Doing one more rep.</li>
        <li>Resting less between sets.</li>
        <li>Performing the rep with better control (tempo).</li>
      </ul>
    `
    },
    {
        id: 'legs-push-pull-split',
        title: 'Why Push/Pull/Legs is the Ultimate Split',
        excerpt: 'Balancing frequency and recovery is the key to natural bodybuilding. PPL might be the answer.',
        category: 'Training',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'John Meadows', role: 'IFBB Pro', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' },
        content: `<p>PPL allows for high frequency (hitting muscles every 3-4 days) while managing fatigue. It groups synergistic muscles together.</p>`
    },
    {
        id: 'mastering-the-squat',
        title: 'Mastering the Squat: Depth, Stance, and Bracing',
        excerpt: 'Your knees don\'t hurt because you squat; they hurt because you squat wrong.',
        category: 'Training',
        readTime: '10 min',
        image: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Layne Norton', role: 'PhD, Powerlifting Coach', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Squat depth is non-negotiable for glute development. Learn to brace your core ("Valsalva maneuver") to protect your spine.</p>`
    },
    {
        id: 'cardio-for-lifters',
        title: 'Cardio for Meatheads: How to Not Lose Gains',
        excerpt: 'You need a heart to pump blood to those muscles. Here is how to condition without atrophy.',
        category: 'Training',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1538805060504-2595d0fcabbd?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Alex Viada', role: 'Hybrid Athlete', image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Low intensity steady state (LISS) cardio improves your recovery capacity between sets. It doesn't kill gains; it potentiates them.</p>`
    },

    // --- NUTRITION ---
    {
        id: 'intermittent-fasting-truth',
        title: 'Intermittent Fasting: Magic Pill or Just a Tool?',
        excerpt: 'Can you build muscle while fasting? We analyze the metabolic effects of time-restricted feeding.',
        category: 'Nutrition',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1627483298606-1293872f1acd?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Dr. Rhonda Patrick', role: 'Biomedical Scientist', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Fasting is great for fat loss due to calorie restriction, but for optimal muscle protein synthesis, frequent meals (4-5x day) are superior.</p>`
    },
    {
        id: 'protein-myth-busting',
        title: 'How Much Protein Do You ACTUALLY Need?',
        excerpt: 'Is 1g per lb of bodyweight a myth? Let\'s look at the nitrogen balance studies.',
        category: 'Nutrition',
        readTime: '7 min',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Alan Aragon', role: 'Nutrition Researcher', image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Current science suggests 0.7g - 1g per pound of bodyweight is the sweet spot. Anything more yields diminishing returns.</p>`
    },
    {
        id: 'creatine-guide',
        title: 'Creatine Monohydrate: The Only Supplement You Need',
        excerpt: 'It\'s cheap, it works, and it\'s safe. Stop buying expensive proprietary blends.',
        category: 'Nutrition',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Examine.com', role: 'Research Group', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
        content: `<p>5 grams a day. Every day. It increases ATP stores, allowing for more power output and volume.</p>`
    },
    {
        id: 'grocery-run-bodybuilder',
        title: 'The $100 Bodybuilding Grocery Run',
        excerpt: 'Eating big on a budget. Eggs, rice, oats, and ground beef.',
        category: 'Nutrition',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Stan Efferding', role: 'The Rhino', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200' },
        content: `<p>The Vertical Diet focuses on easily digestible foods. Rice, beef, eggs, and spinach are cheap and effective.</p>`
    },
    {
        id: 'sugar-performance',
        title: 'Intra-Workout Carbs: Performance Enhancer?',
        excerpt: 'When to use simple sugars to fuel grueling leg days.',
        category: 'Nutrition',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Dr. Andy Galpin', role: 'Human Performance', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
        content: `<p>For sessions over 90 minutes, intra-workout carbs can blunt cortisol and maintain performance.</p>`
    },

    // --- MINDSET ---
    {
        id: 'stoic-lifter',
        title: 'Forging Iron Will: A Stoic Approach',
        excerpt: 'The gym is a training ground for the mind as much as the body.',
        category: 'Mindset',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1517931524326-bdd55a541177?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Ryan Holiday', role: 'Author', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200' },
        content: `<p>The obstacle is the way. The heavy weight is not a curse, it is an opportunity to practice fortitude.</p>`
    },
    {
        id: 'discipline-vs-motivation',
        title: 'Discipline > Motivation',
        excerpt: 'Motivation is a feeling. Discipline is a practice. Learn the difference.',
        category: 'Mindset',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1514995669114-6081e934b69e?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'David Goggins', role: 'Ultramarathon Runner', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
        content: `<p>You have to do the work when you don't feel like it. That is the definition of a professional.</p>`
    },
    {
        id: 'gym-anxiety',
        title: 'Overcoming "Gymtimidation"',
        excerpt: 'Everyone started somewhere. How to walk into the weight room with confidence.',
        category: 'Mindset',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1580261450046-d0a300803c82?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Meg Squats', role: 'Powerlifter', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Most people are too focused on themselves to judge you. Have a plan, put your headphones on, and execute.</p>`
    },
    {
        id: 'failure-as-fuel',
        title: 'Using Failure as Fuel',
        excerpt: 'Missed lifts are just feedback. Analyze, adjust, and attack again.',
        category: 'Mindset',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Jocko Willink', role: 'Retired Navy SEAL', image: 'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Good. You failed. Now you know where your weakness is.</p>`
    },
    {
        id: 'visualization-techniques',
        title: 'Visualization: Lift It in Your Mind First',
        excerpt: 'How Arnold used visualization to sculpt his physique before even touching the iron.',
        category: 'Mindset',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Arnold S.', role: 'The GOAT', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200' },
        content: `<p>If you can't see it in your mind, you can't build it with your body. Visualize the pump.</p>`
    },

    // --- RECOVERY ---
    {
        id: 'sleep-anabolic',
        title: 'Sleep: The Forgotten Anabolic Steroid',
        excerpt: 'Why 6 hours isn\'t enough if you want to be elite.',
        category: 'Recovery',
        readTime: '5 min',
        image: 'https://images.unsplash.com/photo-1520206183501-b80df610434f?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Matthew Walker', role: 'Sleep Scientist', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Sleep is when the repair happens. 7-9 hours is non-negotiable for maximum hypertrophy.</p>`
    },
    {
        id: 'cold-plunge-science',
        title: 'Cold Plunges: Hype or Health?',
        excerpt: 'Does freezing water actually help recovery, or does it kill hypertrophy?',
        category: 'Recovery',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Andrew Huberman', role: 'Neuroscientist', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Cold water immersion reduces inflammation, which is good for recovery but can blunt the hypertrophy signal if done immediately post-workout.</p>`
    },
    {
        id: 'active-recovery-ideas',
        title: 'Active Recovery: Don\'t Just Sit on the Couch',
        excerpt: 'Walking, yoga, and mobility work to flush blood and speed up repair.',
        category: 'Recovery',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1552674605-46f538355272?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Kelly Starrett', role: 'Mobility Expert', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200' },
        content: `<p>Motion is lotion. Light movement helps flush metabolic waste products from the muscles.</p>`
    },
    {
        id: 'massage-guns-worth-it',
        title: 'Are Massage Guns Worth the Hype?',
        excerpt: 'Percussive therapy explained.',
        category: 'Recovery',
        readTime: '3 min',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
        author: { name: 'Physio Team', role: 'Gymnite Med', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
        content: `<p>They provide temporary relief and improved blood flow, but they don't replace proper mobility work.</p>`
    },
];
