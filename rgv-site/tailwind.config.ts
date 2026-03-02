import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9",
        accent: "#D946EF",
        background: "#FAFAF9",
        "text-main": "#0D0B1F",
        muted: "#94A3B8",
        "primary-light": "#EDE9FE",
        "primary-dark": "#4C1D95",
        "dark-bg": "#0A0816",
        "dark-surface": "#130F24",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(-4deg)" },
          "50%": { transform: "translateY(-20px) rotate(4deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
