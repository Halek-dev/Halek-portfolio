// ─────────────────────────────────────────────────────────────
// Source of truth for everything the public site renders.
//
// Public pages are server components and read this file directly.
// The /admin panel is a drafting tool: it edits a copy in your
// browser's localStorage, and "Export JSON" gives you a file to
// paste back over `defaultData` here. Commit, push, redeploy.
//
// ⚠️ SEARCH THIS FILE FOR "TODO" BEFORE YOUR NEXT DEPLOY.
// ─────────────────────────────────────────────────────────────

/**
 * Full-bleed panel colours for a project section. All OKLCH.
 *
 * Every role is an explicit, contrast-checked colour. Do NOT dim text with
 * `opacity` on these panels: on the lighter backgrounds (VaultMart's coral)
 * a 70% opacity drops small text to ~3.5:1. `mut` exists so hierarchy never
 * costs legibility.
 */
export type Panel = {
  /** Panel background — pulled from the product's own brand colour. */
  bg: string;
  /** Primary text. Must clear 4.5:1 against `bg`. */
  fg: string;
  /** Accent — tagline. Must clear 4.5:1 against `bg`. */
  ac: string;
  /** Muted text — labels, stack, metadata. Must clear 4.5:1 against `bg`. */
  mut: string;
};

export type CaseSection = {
  heading: string;
  body: string;
};

export type CaseStudy = {
  /** One paragraph: the problem, in the client's words. */
  problem: string;
  role: string;
  timeline: string;
  /** Hard numbers. Only include figures you can defend. */
  metrics: { value: string; label: string }[];
  sections: CaseSection[];
  /** Slugs from content/blog that explain the techniques used here. */
  writing: string[];
};

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
  /** e.g. "/projects/vaultmart.png" — files live in public/projects/ */
  image?: string;
  /** Alt text is part of the voice. Describe the thing, not the category. */
  alt?: string;
  panel: Panel;
  caseStudy?: CaseStudy;
};

export type PortfolioData = {
  name: string;
  handle: string;
  role: string;
  bio: string;
  /** Short, first-person, used in the hero. */
  lede: string;
  location: string;
  availability: string;
  /** Primary conversion path. Leave "" to hide the email CTA entirely. */
  email: string;
  skills: { category: string; items: string[] }[];
  projects: Project[];
  contacts: { label: string; value: string; href: string }[];
  testimonials: { quote: string; name: string; role: string }[];
  /** e.g. "/resume.pdf" — drop the file in public/. "" hides the button. */
  resumeUrl: string;
};

export const defaultData: PortfolioData = {
  name: "Olalekan Kazeem",
  handle: "Halek",
  role: "Full-Stack Developer",
  location: "Lagos, Nigeria",
  availability: "Available for remote contracts",

  // TODO ── Your email is the primary conversion path on this site.
  // While this is "", the contact section hides the email CTA entirely.
  // Fill it in and the whole contact block comes alive.
  email: "",

  lede: "I build the parts of a product that cannot be wrong.",

  bio: "Money-moving software fails quietly. A fee rounds the wrong way, a webhook replays, a payout fires twice — and the damage surfaces in a spreadsheet three weeks later. I build the layer where that can't happen: reconciled ledgers, idempotent payment paths, and escrow flows that hold funds until the other side has actually delivered. Five products in production, taken from empty repo to live, across Next.js, TypeScript and PostgreSQL.",

  skills: [
    { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vite"] },
    { category: "Backend", items: ["Node.js", "PostgreSQL", "REST APIs", "Server Actions", "Cron / Background Jobs"] },
    { category: "Payments & Fintech", items: ["Paystack", "Escrow Systems", "Payout Automation", "Fee / Commission Engines"] },
    { category: "Infra & Tooling", items: ["Railway", "Vercel", "Git", "Sentry", "GitHub Actions"] },
  ],

  projects: [
    {
      id: "vaultmart",
      name: "VaultMart",
      tagline: "Escrow-first P2P marketplace",
      description:
        "A marketplace where buyer funds are held in escrow until delivery is confirmed. Chat-first buying, 48-hour auto-release, verified vendors, dispute mediation, tiered vendor plans, and a creator affiliate program with automated commission payouts.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Paystack", "Railway", "Sentry"],
      url: "https://vaultmart.com.ng",
      year: "2026",
      featured: true,
      image: "/projects/vaultmart.png",
      alt: "VaultMart marketplace homepage — an escrow balance panel showing funds held for a live order",
      panel: {
        bg: "oklch(0.660 0.160 33)",
        fg: "oklch(0.190 0.030 30)",
        // The lightest panel background on the site, so these run darker than
        // the other panels' — 0.270 measured only 4.58:1, too close to the line.
        ac: "oklch(0.245 0.042 30)",
        mut: "oklch(0.255 0.040 30)",
      },
      caseStudy: {
        problem:
          "Peer-to-peer commerce in Nigeria runs on trust that mostly isn't there. The buyer pays first and hopes; the seller ships first and hopes. Both sides lose often enough that the safe move is not to transact at all. VaultMart's premise is to remove the hoping: the money is real, it's committed, and neither side can touch it until delivery is confirmed.",
        role: "Sole engineer — payments layer, data model, vendor and buyer flows, design",
        timeline: "2026 · in production",
        // NOTE: these figures are read from the live site as of this build.
        // Update them (or the screenshot) as the numbers move.
        metrics: [
          { value: "₦87k", label: "held in escrow" },
          { value: "0.3%", label: "dispute rate" },
          { value: "48h", label: "auto-release window" },
          { value: "2", label: "payment providers" },
        ],
        sections: [
          {
            heading: "Money has one path in and one path out",
            body: "Every naira that enters the system does so through a single verified webhook path, and leaves through a single payout path. Both are idempotent and keyed on the provider's transaction reference, so a retried webhook or a double-clicked payout is a no-op rather than a duplicate credit. The webhook signature is verified against the raw request body before anything else happens — a parsed-and-re-serialised body changes bytes and silently breaks the check.",
          },
          {
            heading: "Escrow is a state machine, not a balance",
            body: "Funds don't sit in an account with a number on it. Each order moves through explicit states — held, delivered, confirmed, released, disputed, refunded — and only specific transitions are legal. Auto-release after 48 hours is a scheduled job that can only act on orders in the delivered state, which means a stuck or replayed job cannot release money that was never delivered.",
          },
          {
            heading: "Two providers, because one provider is a single point of failure",
            body: "A marketplace that can't take payment is closed. Payment initiation runs through a provider abstraction with failover, so an outage at one processor degrades the checkout rather than stopping it. The reconciliation layer treats both providers as untrusted sources and settles against the internal ledger, not the other way around.",
          },
          {
            heading: "Verification and disputes are product surfaces, not admin chores",
            body: "Vendors verify through NIN/BVN and OTP before they can list. Disputes open a mediated thread with the order's full state history attached, so the decision is made against a record rather than two conflicting stories. Tiered vendor plans and an affiliate program with automated commission payouts run off the same fee engine that prices the core transaction.",
          },
        ],
        writing: [
          "how-to-build-an-escrow-marketplace",
          "two-provider-payment-architecture",
          "paystack-webhook-security",
          "marketplace-dispute-resolution",
          "payout-automation-nigeria",
          "postgres-schema-design-marketplace",
        ],
      },
    },

    {
      id: "randall",
      name: "RanDall",
      tagline: "Creator CRM for multi-account operations",
      description:
        "An operations CRM with a real-time inbox, auto-segmented audience lists synced on a schedule, mass messaging with smart avoid-lists, a deduplicated fan tracker, revenue analytics by campaign and source, and a scheduling composer.",
      stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Real-time"],
      url: "https://randall.lynxmediadigital.com",
      year: "2026",
      featured: true,
      image: "/projects/randall.png",
      alt: "RanDall creator CRM landing page — indigo accent on off-white, with the dashboard shell below",
      panel: {
        bg: "oklch(0.480 0.215 276)",
        fg: "oklch(0.980 0.010 280)",
        ac: "oklch(0.870 0.090 280)",
        mut: "oklch(0.895 0.050 280)",
      },
      caseStudy: {
        problem:
          "Creators running several accounts at once end up doing operations work by hand across a dozen browser tabs: who has been messaged, who has already bought, which campaign actually produced revenue. The information exists but it isn't joined up, so decisions get made on memory. RanDall's job is to make the whole book of business legible in one place.",
        role: "Sole engineer — design and build",
        timeline: "2026 · in production",
        metrics: [
          { value: "Real-time", label: "inbox sync" },
          { value: "Multi", label: "account workspace" },
          { value: "Per-source", label: "revenue attribution" },
        ],
        sections: [
          {
            heading: "One deduplicated identity per person",
            body: "The same person can appear across several connected accounts under different handles. The fan tracker resolves those into a single record, so counts, spend history and message state are per-person rather than per-handle. Everything downstream — segments, avoid-lists, attribution — depends on that record being right, so it's the part with the most care in it.",
          },
          {
            heading: "Segments that stay true without being rebuilt",
            body: "Audience lists are defined by rules and re-evaluated on a sync schedule rather than captured as static snapshots. A segment like 'bought in the last 30 days, not messaged this week' is correct whenever it's opened, which is what makes mass messaging with avoid-lists safe to run.",
          },
          {
            heading: "Attribution the operator will actually trust",
            body: "Revenue is attributed by campaign and by source, tracked from the message that produced it. The analytics view answers the only question that matters when deciding what to do next week: which of these actually made money.",
          },
        ],
        writing: ["building-a-crm-from-scratch"],
      },
    },

    {
      id: "cafe1506",
      name: "15'06. Café",
      tagline: "Ordering system for a café in Osogbo",
      description:
        "An online ordering platform — doughnuts, banana bread, boba, coffee — with a live menu, cart and checkout, dine-in / takeaway / delivery routing, and an admin surface so the owner runs her own menu.",
      stack: ["React", "Vite", "TypeScript"],
      url: "https://cafe-app-teal.vercel.app",
      year: "2026",
      featured: true,
      image: "/projects/cafe1506.png",
      alt: "15'06. Café ordering homepage — drenched oxblood with a circular monogram and a menu call to action",
      panel: {
        bg: "oklch(0.300 0.090 30)",
        fg: "oklch(0.960 0.020 60)",
        ac: "oklch(0.760 0.110 45)",
        mut: "oklch(0.845 0.045 45)",
      },
      caseStudy: {
        problem:
          "A café taking orders over WhatsApp loses them the moment things get busy — the messages arrive faster than anyone can read them, and there is no record of what was promised to whom. The ask was a real ordering surface that the owner could run herself, without needing a developer to change a price.",
        role: "Sole engineer — design and build",
        timeline: "2026 · live",
        metrics: [
          { value: "3", label: "fulfilment modes" },
          { value: "Owner-run", label: "menu management" },
        ],
        sections: [
          {
            heading: "The menu is data, not markup",
            body: "Items, prices and availability live behind an admin surface the owner uses directly. Selling out of banana bread is a toggle, not a deploy. This is usually the difference between a site that stays accurate and one that quietly goes stale within a month.",
          },
          {
            heading: "Fulfilment mode changes the whole order",
            body: "Dine-in, takeaway and delivery need different information at different moments — a table number, a pickup time, an address and a delivery fee. Rather than one form with conditional fields bolted on, the choice is made early and the checkout adapts around it.",
          },
        ],
        writing: ["food-ordering-app-development"],
      },
    },

    {
      id: "mealmate",
      name: "MealMate",
      tagline: "Nigerian meal subscription & delivery",
      description:
        "A meal-subscription service delivering three home-cooked Nigerian meals a day — breakfast, lunch and dinner — made fresh in Lagos. Marketing site and waitlist flow with a rotating daily-menu showcase.",
      stack: ["React", "Vite", "TypeScript"],
      url: "https://mealmate-red-five.vercel.app",
      year: "2026",
      featured: false,
      image: "/projects/mealmate.png",
      alt: "MealMate waitlist page — cream and tomato red, with the day's three meals stacked beside the headline",
      panel: {
        bg: "oklch(0.200 0.020 40)",
        fg: "oklch(0.960 0.010 40)",
        ac: "oklch(0.680 0.190 33)",
        mut: "oklch(0.800 0.020 40)",
      },
      caseStudy: {
        problem:
          "A pre-launch food business needs to prove demand before it cooks anything. The site's only job is to make the offer concrete enough that someone hands over an email address.",
        role: "Sole engineer — design and build",
        timeline: "2026 · live",
        metrics: [{ value: "3", label: "meals shown daily" }],
        sections: [
          {
            heading: "Show the actual food, not the concept",
            body: "The page leads with today's three real meals by name and drop-off window. A subscription is an abstract commitment; jollof and grilled chicken at 1pm is not. The waitlist form sits directly against that, with nothing between wanting it and joining.",
          },
        ],
        writing: ["waitlist-landing-page-that-converts"],
      },
    },

    {
      id: "spoofer",
      name: "Video Spoofer",
      tagline: "Batch video variation tool",
      description:
        "A privacy-first tool that generates multiple unique versions of uploaded videos in batch — configurable versions per file, with a processing tracker, maintenance mode and a changelog. Media never leaves the local network during processing.",
      stack: ["React", "TypeScript", "Video Processing"],
      url: "https://spoofer.lynxmediadigital.com",
      year: "2026",
      featured: false,
      image: "/projects/spoofer.png",
      alt: "Video Spoofer interface — dark green terminal styling with a drop zone and a versions-per-video slider",
      panel: {
        bg: "oklch(0.260 0.055 165)",
        fg: "oklch(0.950 0.010 165)",
        ac: "oklch(0.800 0.150 160)",
        mut: "oklch(0.835 0.030 165)",
      },
      caseStudy: {
        problem:
          "Producing many variants of the same video by hand is slow, and the usual cloud tools require uploading client media to somebody else's server. The constraint shaped the build: batch throughput, and nothing leaves the network.",
        role: "Sole engineer — design and build",
        timeline: "2026 · live",
        metrics: [{ value: "Local", label: "processing only" }],
        sections: [
          {
            heading: "The constraint is the feature",
            body: "Processing runs locally, so the privacy claim is structural rather than a policy promise. A processing tracker shows per-file progress across a batch, and maintenance mode plus a visible changelog mean the tool can be worked on without leaving users guessing why it's behaving differently.",
          },
        ],
        writing: [],
      },
    },
  ],

  contacts: [
    { label: "GitHub", value: "github.com/Halek-dev", href: "https://github.com/Halek-dev" },
    // TODO ── Add your real links. Entries with an empty or "#" href are
    // filtered out at render time, so nothing broken ships:
    // { label: "LinkedIn", value: "linkedin.com/in/…", href: "https://linkedin.com/in/…" },
    // { label: "X", value: "@…", href: "https://x.com/…" },
  ],

  // TODO ── Real quotes only. The "What people say" section does not
  // render at all while this array is empty, which is the correct
  // behaviour — an empty section beats an invented one.
  testimonials: [],

  // TODO ── Drop your PDF at public/resume.pdf and set this to "/resume.pdf".
  // While it is "", the Download CV button is hidden rather than 404ing.
  resumeUrl: "",
};

/** Projects that have enough written up to justify a case-study page. */
export function getCaseStudyProjects(): Project[] {
  return defaultData.projects.filter((p) => p.caseStudy);
}

export function getProject(id: string): Project | undefined {
  return defaultData.projects.find((p) => p.id === id);
}

/** Drops contacts that were never filled in. */
export function usableContacts(data: PortfolioData) {
  return data.contacts.filter(
    (c) => c.href && c.href !== "#" && !c.href.includes("example.com") && c.value
  );
}
