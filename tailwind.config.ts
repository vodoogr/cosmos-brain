import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "on-primary-fixed-variant": "#004a77",
                "surface-container": "#201f1f",
                "surface-container-low": "#1c1b1b",
                "on-tertiary-fixed-variant": "#004f54",
                "tertiary-container": "#00adb8",
                "surface-tint": "#98cbff",
                "on-surface": "#e5e2e1",
                "on-secondary": "#480081",
                "surface-container-highest": "#353534",
                "on-secondary-fixed": "#2c0051",
                "tertiary-fixed-dim": "#00dbe9",
                "surface-variant": "#353534",
                "on-tertiary": "#00363a",
                "on-tertiary-container": "#003a3f",
                "secondary-fixed-dim": "#dcb8ff",
                "surface-container-lowest": "#0e0e0e",
                "secondary-fixed": "#efdbff",
                "surface-container-high": "#2a2a2a",
                "on-secondary-fixed-variant": "#6700b5",
                "on-primary-fixed": "#001d33",
                "secondary": "#dcb8ff",
                "inverse-primary": "#00629d",
                "inverse-on-surface": "#313030",
                "error": "#ffb4ab",
                "on-primary-container": "#00375a",
                "background": "#131313",
                "tertiary-fixed": "#7df4ff",
                "primary": "#98cbff",
                "error-container": "#93000a",
                "tertiary": "#00dbe9",
                "on-surface-variant": "#bec7d4",
                "on-error-container": "#ffdad6",
                "surface": "#131313",
                "on-background": "#e5e2e1",
                "on-primary": "#003354",
                "outline": "#88919d",
                "inverse-surface": "#e5e2e1",
                "on-error": "#690005",
                "on-tertiary-fixed": "#002022",
                "secondary-container": "#7701d0",
                "surface-dim": "#131313",
                "surface-bright": "#3a3939",
                "primary-fixed": "#cfe5ff",
                "primary-container": "#00a3ff",
                "outline-variant": "#3f4852",
                "on-secondary-container": "#dcb7ff",
                "primary-fixed-dim": "#98cbff"
            },
            fontFamily: {
                "headline": ["Space Grotesk"],
                "body": ["Inter"],
                "label": ["Inter"]
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
