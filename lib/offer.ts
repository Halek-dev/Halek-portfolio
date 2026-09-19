// ─────────────────────────────────────────────────────────────
// The free-slice offer. All landing-page copy lives here so the
// page stays layout and lib/offer.ts stays argument.
//
// Rules of thumb for editing:
//  · Every claim must be one you can defend on a call.
//  · No invented scarcity, no "limited spots", no countdown.
//    The constraints (fixed scope, one revision, ~3 days) do the work.
// ─────────────────────────────────────────────────────────────

export const BRAND = "HALEK";

export type Slice = {
  id: string;
  /** What the client thinks they need. */
  service: string;
  /** The free deliverable, stated so narrowly it can't be argued with. */
  deliverable: string;
  /** Prose: what they actually receive. */
  detail: string;
  /** Hard boundary — what is explicitly not included. */
  notIncluded: string;
  ships: string;
};

export const SLICES: Slice[] = [
  {
    id: "web-app",
    service: "Web app",
    deliverable: "One core feature, working, on a live link",
    detail:
      "You pick the single feature the product doesn't work without — the booking flow, the checkout, the dashboard that does the one calculation. I build that, wired to a real database, deployed to a URL you can open on your phone and hand to someone else.",
    notIncluded: "Auth, admin, billing, and the other screens — that's the full build.",
    ships: "~3 days",
  },
  {
    id: "website",
    service: "Website",
    deliverable: "Hero plus one full section, in your real brand",
    detail:
      "Not a template with your logo dropped in. Your actual colours, type and copy, built responsive and deployed. Enough of the page that you can see exactly what the finished site looks like before you commit to it.",
    notIncluded: "The remaining sections, CMS and forms — that's the full build.",
    ships: "~3 days",
  },
  {
    id: "automation",
    service: "Automation",
    deliverable: "One automation that saves a countable thing",
    detail:
      "We find a task you do by hand on a schedule, and I automate it end to end. Countable means we agree the number up front — hours a week, or errors a month — and you can check afterwards whether it moved.",
    notIncluded: "The rest of the workflow and any dashboards around it.",
    ships: "~3 days",
  },
];

export type Step = {
  n: string;
  title: string;
  body: string;
};

export const STEPS: Step[] = [
  {
    n: "01",
    title: "You tell me what you're building",
    body: "Two minutes on the form. If writing it out is the hard part, skip it and we'll talk it through on whichever channel you prefer — I ask for three so we're never stuck waiting on one inbox.",
  },
  {
    n: "02",
    title: "I review and pick the slice",
    body: "I read every submission myself. If it's a fit, I come back with the exact thing I'll build, written down, so we both know what \"done\" means before I start. If it isn't a fit, I say so quickly rather than leaving you in a queue.",
  },
  {
    n: "03",
    title: "I build it in about three days",
    body: "You get a live link and a project page here to watch it move — onboarding, in progress, review, delivered — plus a chat thread with me. One round of revisions is included, and the scope stays fixed.",
  },
  {
    n: "04",
    title: "You keep it, and we settle up",
    body: "The slice is yours regardless of what happens next. In exchange: a testimonial once you've seen the work, and one real introduction to someone who might need a build. If you want the rest of it built, we talk about the full project then — never before.",
  },
];

/** The exchange, stated plainly enough to be a contract. */
export const TERMS = {
  give: [
    {
      k: "A testimonial",
      v: "Written after you've seen the work, not before. If the slice isn't good, don't write one — I'd rather know.",
    },
    {
      k: "One real introduction",
      v: "To someone in your network who might actually need a build. Real means it happened: a forwarded email, a group intro, a message you can show me. A name with no intro doesn't count.",
    },
  ],
  get: [
    {
      k: "The slice, kept",
      v: "Yours either way. Code, deployment and all. There is no clause where you give it back.",
    },
    {
      k: "10–15% referral fee",
      v: "On any project value that comes out of your introduction. Cash, not a discount, and paid only after that client has paid me. If nothing comes of it, you owe nothing and neither do I.",
    },
  ],
};

export const HERO = {
  eyebrow: "Free build · one core feature · ships in about three days",
  headline: ["One real piece", "of your product.", "Built free."],
  /** The word set in red — must appear in `headline`. */
  accent: "Built free.",
  lede: "Not a mockup, not a discovery call, not a deck. A working slice of the actual thing, deployed to a link you can open on your phone. You keep it whether or not you ever hire me. What I want back is a testimonial once you've seen it, and one honest introduction.",
  cta: "Claim a free build",
  ctaHref: "/start",
};

export const FINAL_CTA = {
  headline: ["Pick the piece", "you want proven."],
  body: "Web app, website or automation. Tell me what you're building and I'll tell you within a day whether it's a fit — and if it isn't, I'll say so plainly rather than park you in a queue.",
  cta: "Claim a free build",
  ctaHref: "/start",
};
