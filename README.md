# GYMNITE - Elite Performance Ecosystem

**Welcome to the future of fitness management.**

Gymnite is a high-performance, visually immersive web platform designed for premier athletic facilities. It seamlessly bridges the gap between digital convenience and physical excellence, offering a comprehensive ecosystem for members and administrators alike.

## 🚀 Overview

Built with a "hyper-modern" aesthetic using the latest web technologies, Gymnite provides:
-   **For Members:** A frictionless experience to join, manage subscriptions, book elite facility zones, and purchase gear.
-   **For Admins:** A centralized command center to oversee inventory, orders, member data, and leads.

## ✨ Key Features

### 🌐 Public Experience
-   **Cinematic Landing:** Immersive parallax scrolling and high-fidelity visuals.
-   **Bento-Grid Design:** Modern, modular layout for showcasing amenities and features.
-   **Service Browsing:** Detailed view of classes, memberships, and facility zones.

### 👤 Member Portal
-   **Digital Access Card:** personalized QR/ID for facility entry.
-   **Zone Access:** Purchase and manage access to specialized zones (e.g., Pro Weight Zone, Cardio Theater).
-   **Loyalty System:** Earn points (XP) for training consistency and purchases.
-   **Gear Shop:** Integrated e-commerce for gym apparel and supplements.

### 🛡️ Admin Command Center
-   **Dashboard:** Real-time overview of gym performance and stats.
-   **Inventory Management:** Track stock levels for the pro shop.
-   **Order Processing:** Manage and fulfill member orders.
-   **Member Database:** Detailed records of all enlisted athletes.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) - The React Framework for the Web.
-   **Language:** [TypeScript](https://www.typescriptlang.org/) - For type-safe code.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
-   **Animations:** [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library.
-   **Backend & Auth:** [Supabase](https://supabase.com/) - The open source Firebase alternative.
-   **Deployment:** [Vercel](https://vercel.com/) - Develop. Preview. Ship.

## 🏁 Getting Started

### Prerequisites
-   Node.js 18+ installed.
-   A Supabase project created.

### Environment Setup
Create a `.env.local` file in the root directory and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/gymnite.git
    cd gymnite
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  **Crucial:** Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel Project Settings > Environment Variables.
4.  Deploy!

---

*Forged in code. Built for strength.*
