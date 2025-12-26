import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#000000", // Pure Black
                secondary: "#111111", // Dark Grey
                accent: "#FF0033", // Gymate Bright Red
            },
            fontFamily: {
                heading: ["var(--font-oswald)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            boxShadow: {
                "glow": "0 0 20px rgba(255, 0, 51, 0.5)",
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.text-outline': {
                    '-webkit-text-stroke': '1px rgba(255, 255, 255, 0.2)',
                    'color': 'transparent',
                },
                '.text-outline-bold': {
                    '-webkit-text-stroke': '2px rgba(255, 255, 255, 0.3)',
                    'color': 'transparent',
                },
            })
        })
    ],
};
export default config;
