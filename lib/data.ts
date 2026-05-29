// Default seed data. The admin panel overrides this in localStorage.
// To change what PUBLIC visitors see, edit this file (or use admin "Export JSON"
// and paste the result back here), then push to redeploy.

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  url: string;
  repo?: string;
  year: string;
  featured: boolean;
  image?: string; // e.g. "/projects/vaultmart.png" — put files in public/projects/
};

export type PortfolioData = {
  name: string;
  handle: string;
  role: string;
  bio: string;
  location: string;
  skills: { category: string; items: string[] }[];
  projects: Project[];
  contacts: { label: string; value: string; href: string }[];
  testimonials: { quote: string; name: string; role: string }[];
  resumeUrl: string; // e.g. "/resume.pdf" — drop the file in public/
};

export const defaultData: PortfolioData = {
  name: "Olalekan Kazeem",
  handle: "Halek",
  role: "Full-Stack Developer",
  location: "Lagos, Nigeria — working with clients worldwide",
  bio: "I build production web applications end to end — from escrow-secured marketplaces handling real money to creator CRMs, ordering systems, and internal tooling. My focus is shipping reliable, well-architected products: clean data models, payment integrations that don't lose funds, and interfaces people actually want to use. I work the full stack across Next.js and React, with a track record of taking ideas from empty repo to live, revenue-generating product.",
  skills: [
    {
      category: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vite"],
    },
    {
      category: "Backend",
      items: ["Node.js", "PostgreSQL", "REST APIs", "Server Actions", "Cron / Background Jobs"],
    },
    {
      category: "Payments & Fintech",
      items: ["Paystack", "Escrow Systems", "Payout Automation", "Fee / Commission Engines"],
    },
    {
      category: "Infra & Tooling",
      items: ["Railway", "Vercel", "Git", "Sentry", "GitHub Actions"],
    },
  ],
  projects: [
    {
      id: "vaultmart",
      image: "/projects/vaultmart.png",
      name: "VaultMart",
      tagline: "Nigeria's escrow-first P2P marketplace",
      description:
        "A full marketplace where buyer funds are held in escrow until delivery is confirmed. Chat-first buying, 48-hour auto-release, verified vendors (NIN/BVN/OTP), dispute mediation, a multi-tier vendor plan, and a creator affiliate program with automated commission payouts. Built the payments layer, fee engine, and the entire vendor/buyer flow.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Paystack", "Railway", "Sentry"],
      url: "https://vaultmart.com.ng",
      year: "2026",
      featured: true,
    },
    {
      id: "randall",
      image: "/projects/randall.png",
      name: "RanDall",
      tagline: "Creator CRM for multi-account management",
      description:
        "A premium operations CRM with a real-time inbox, auto-segmented audience lists synced on a schedule, mass messaging with smart avoid-lists, a deduplicated fan tracker, revenue analytics by campaign and source, and a scheduling composer for posts and paid content. Designed to feel like Linear, work like Notion.",
      stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Real-time"],
      url: "https://randall.lynxmediadigital.com",
      year: "2026",
      featured: true,
    },
    {
      id: "spoofer",
      image: "/projects/spoofer.png",
      name: "Video Spoofer",
      tagline: "Batch video variation tool",
      description:
        "A privacy-first tool that generates multiple unique versions of uploaded videos in batch — configurable versions per file, with a processing tracker, maintenance mode, and changelog. Built so media never leaves the local network during processing.",
      stack: ["React", "TypeScript", "Video Processing"],
      url: "https://spoofer.lynxmediadigital.com",
      year: "2026",
      featured: false,
    },
    {
      id: "mealmate",
      image: "/projects/mealmate.png",
      name: "MealMate",
      tagline: "Nigerian meal subscription & delivery",
      description:
        "A meal-subscription service delivering three home-cooked Nigerian meals a day — breakfast, lunch and dinner — made fresh in Lagos and delivered warm. Built the marketing site and waitlist flow with a daily-menu showcase, as a fast single-page app.",
      stack: ["React", "Vite", "TypeScript"],
      url: "https://mealmate-red-five.vercel.app",
      year: "2026",
      featured: false,
    },
    {
      id: "cafe1506",
      image: "/projects/cafe1506.png",
      name: "15'06. Café",
      tagline: "Café ordering system",
      description:
        "An online ordering platform for a café in Osogbo — doughnuts, banana bread, boba, coffee and more — with a live menu, cart and checkout, dine-in / takeaway / delivery options, and an admin side for managing the menu.",
      stack: ["React", "Vite", "TypeScript"],
      url: "https://cafe-app-teal.vercel.app",
      year: "2026",
      featured: false,
    },
  ],
  contacts: [
    // Add your real links in the admin panel. These are placeholders.
    { label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
    { label: "GitHub", value: "github.com/Halek-dev", href: "https://github.com/Halek-dev" },
    { label: "LinkedIn", value: "Add in admin", href: "#" },
    { label: "X / Twitter", value: "Add in admin", href: "#" },
  ],
  testimonials: [
    // Replace these with real quotes from people you've built for (edit in admin).
    {
      quote:
        "Took our marketplace from an idea to a live, escrow-protected platform handling real orders. Reliable where it counted.",
      name: "Add a real client",
      role: "Founder",
    },
    {
      quote:
        "Shipped fast without cutting corners on the parts that mattered. Clear communication the whole way through.",
      name: "Add a real client",
      role: "Product Lead",
    },
  ],
  resumeUrl: "/resume.pdf",
};
