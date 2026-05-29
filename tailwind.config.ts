import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: "#0a0a0f",
        surface: "#12121a",
        edge: "#1f1f2e",
        muted: "#8a8aa0",
        bone: "#e8e6e0",
        accent: "#d4ff3f",
        accent2: "#7c5cff",
      },
    },
  },
  plugins: [],
};
export default config;
