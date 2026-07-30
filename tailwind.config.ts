import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Iowan Old Style", "Georgia", "serif"],
      },
      colors: {
        // NOTE: these resolve to bare `var()`, so Tailwind's `/opacity`
        // modifier does NOT work on them — it silently emits nothing.
        // Use a solid token, or an arbitrary literal like
        // `text-[oklch(0.928_0_0/0.6)]`, instead of `text-paper-3/60`.
        paper: {
          DEFAULT: "var(--paper)",
          2: "var(--paper-2)",
          3: "var(--paper-3)",
          4: "var(--paper-4)",
        },
        rule: {
          DEFAULT: "var(--rule)",
          2: "var(--rule-2)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          70: "var(--ink-70)",
          50: "var(--ink-50)",
        },
        red: {
          DEFAULT: "var(--red)",
          deep: "var(--red-deep)",
          wash: "var(--red-wash)",
        },
      },
      // Modular scale, 1.25 ratio, fluid at the display end.
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1.35", letterSpacing: "0.06em" }],
        label: ["0.72rem", { lineHeight: "1.3", letterSpacing: "0.055em" }],
        display: ["clamp(2.6rem, 7vw, 5.25rem)", { lineHeight: "0.96", letterSpacing: "-0.04em" }],
        title: ["clamp(2rem, 4.5vw, 3.25rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        head: ["clamp(1.5rem, 2.6vw, 2rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        doc: "72rem",
        read: "68ch",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.30, 1)",
      },
      zIndex: {
        sticky: "100",
        nav: "200",
        overlay: "300",
        menu: "400",
      },
    },
  },
  plugins: [],
};

export default config;
