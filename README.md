# Halek — Portfolio + Blog

A Next.js portfolio with case studies, a password-gated admin editor, and an SEO-optimized MDX blog.

## Quick start (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000 — and http://localhost:3000/admin for the editor.

In development a **dev-only checklist** floats in the bottom-left corner listing anything
still unconfigured. It renders `null` in production, so it can never ship. When it disappears,
you're set.

---

## Before you deploy — 5 things to change

1. **Your domain**: set `NEXT_PUBLIC_SITE_URL` in your Vercel project settings, or edit the
   fallback in `lib/site.ts`. This powers `metadataBase`, every canonical URL, the sitemap,
   robots.txt and every OG image. Getting it wrong means broken social previews and
   mis-indexed pages.
2. **Your email**: set `email` in `lib/data.ts`. It's the primary conversion path on the site.
   While it's `""` the email CTA is hidden rather than rendering a placeholder.
3. **Your links**: add LinkedIn / X to `contacts` in `lib/data.ts`. Entries with an empty or
   `#` href are filtered out at render, so nothing broken ships.
4. **Admin password**: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_ADMIN_PASSWORD`.
   (`NEXT_PUBLIC_` vars are bundled into client JS and visible to anyone who inspects the page —
   convenience, not real security. The admin only edits your local browser copy, so that's fine.)
   On Vercel, add the same variable under Project → Settings → Environment Variables.
5. **Real project years**: all five projects are currently dated `2026`. Uniform dates read as
   filler — set the real ones in `lib/data.ts`.

Optional but worth it: real testimonials (the section stays hidden while empty — an empty
section beats an invented one) and `public/resume.pdf` (the CV button stays hidden until it exists).

## Deploy to Vercel (recommended for Next.js)

1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo → Deploy. No env vars needed.
3. Add your custom domain in Vercel project settings.

(Railway works too: New Project → Deploy from GitHub → it auto-detects Next.js.)

---

## How editing works

`lib/data.ts` is the single source of truth. Public pages are **server components** that read it
directly, so they ship no content JavaScript at all.

- **Portfolio content** (bio, skills, projects, contacts): draft at `/admin`, which saves to your
  browser's localStorage. To publish, click **Export JSON** and paste the result over the
  `defaultData` object in `lib/data.ts`, then commit and push. localStorage is per-browser —
  visitors only ever see what's committed.
- **Case-study prose** lives in `lib/data.ts` under each project's `caseStudy`. It's long-form,
  so edit it in the file rather than through the admin's textareas.
- **Blog posts**: add a `.mdx` file in `content/blog/`. Copy an existing one for the frontmatter
  format (title, description, date, tags, keywords). Push → it auto-deploys with its own URL,
  sitemap entry, JSON-LD and meta tags.

### Routes

| Route | What it is |
|---|---|
| `/` | Masthead, hero, five drenched project panels, recent writing, stack, contact |
| `/work/[slug]` | Case study — drenched header, problem, numbered sections, figures rail, related posts |
| `/blog` | Archive grouped by year |
| `/blog/[slug]` | Post + "running in production" links back to the work that uses the technique |
| `/admin` | Password-gated drafting editor |
| `/design` | Internal comparison of the three design directions. `noindex`. Delete with `rm -rf app/design` |

The blog and the case studies point at each other: a case study lists the posts explaining its
techniques, and each post lists the products those techniques run in.

---

## Keyword strategy (for ranking & attracting clients)

These are the search clusters this site is built to rank for. I can't pull live search volumes (that needs Ahrefs/Semrush/Google Keyword Planner), but these are the buyer-intent terms remote clients use when hiring a developer with your profile. **The three starter blog posts already target the first three clusters.** Write more posts around the rest.

### Cluster 1 — Escrow / marketplace (your strongest differentiator)
- how to build an escrow marketplace
- escrow marketplace development
- escrow payment system architecture
- hire escrow marketplace developer
- p2p marketplace developer
- marketplace MVP development

### Cluster 2 — Payments / fintech
- paystack developer / paystack next.js integration
- payment gateway integration developer
- fintech app developer
- payout automation / instant payout system
- build a payment system

### Cluster 3 — SaaS / MVP / hire
- hire full-stack developer
- next.js developer for hire
- build a saas mvp
- freelance developer for startup
- ship a web app fast
- react developer for hire

### Cluster 4 — Stack-specific long-tail (easy to rank, high intent)
- next.js + postgresql developer
- typescript full-stack developer
- vite react developer
- tailwind developer for hire

### Cluster 5 — Vertical / niche (low competition)
- creator CRM developer
- food ordering app developer
- restaurant ordering system developer
- subscription app developer

### How to use this
- One post per specific long-tail phrase, title containing the phrase.
- Each post links internally to `/#contact` and `/#work` (already done in starters) and to 1–2 other posts — this internal linking is what builds topical authority.
- Get a few real backlinks: your GitHub profile, dev.to / Hashnode cross-posts (with canonical pointing back here), LinkedIn, relevant communities.
- Submit your sitemap (`/sitemap.xml`) to Google Search Console after deploy.

---

---

## The design system

**Direction: Ledger × Contact Sheet.** The page is a financial document — chroma-0 paper,
near-black ink, one vermilion used the way red ink is used in accounting, on figures and status
only. That document breaks open for the work: each project gets a full-bleed panel drenched in
its own product's brand colour.

The reasoning is that the products are already well-designed and mostly light-toned. A dark
portfolio buries them; a neutral document frames them. See `DESIGN-RESEARCH.md` for the full
audit and the two directions not chosen.

- **Type**: Libre Franklin (Franklin Gothic lineage — newsroom authority) for everything;
  Source Serif 4 for prose only. Tokens in `app/globals.css`, scale in `tailwind.config.ts`.
- **Colour**: all OKLCH. Surface and ink ramps in `:root`; per-project panel colours in `lib/data.ts`.
- **Motion**: hero entrance via plain keyframes (never gated on a class toggle, so content is
  visible even if the animation never runs), plus a scroll-linked settle on screenshots behind
  `@supports (animation-timeline: view())`. Full `prefers-reduced-motion` alternative.

### Two rules worth knowing before you edit

1. **Never dim panel text with `opacity`.** On the lighter panel backgrounds (VaultMart's coral)
   a 70% opacity drops small text to ~3.5:1. Each panel has an explicit `mut` role for muted
   text instead. `fg`, `ac` and `mut` must each clear 4.5:1 against `bg`.
2. **Tailwind's `/opacity` modifier does not work on these colour tokens.** They resolve to a
   bare `var()`, so `text-paper-3/60` silently emits *nothing*. Use a solid token, or an
   arbitrary literal like `text-[oklch(0.928_0_0/0.6)]`.

## Project preview screenshots

Each project shows a full-width desktop screenshot on its drenched panel.

1. Drop the image into `public/projects/` (e.g. `public/projects/vaultmart.png`).
2. The data points at `/projects/<id>.png` for each project, so matching filenames just appear.
3. Or set the path per project in `/admin` (the "Image path" field).

Recommended: ~1900px wide, captured at the top of the page. Also set **alt text** describing the
actual thing ("an escrow balance panel showing funds held for a live order"), not the category.

**Adding a new project** also means picking its four panel colours. Borrow them from the
product's own brand, then check each against `bg` — the admin's panel-colour fields show a
live swatch for each.

## Branding assets & extras (already included)

- **OG share image** (`public/og.png`) — shows when you share any link on LinkedIn/X/WhatsApp. To customize, replace the file (1200×630).
- **Favicon** (`public/favicon.ico`, `icon.png`, `apple-icon.png`) — the browser-tab icon. Replace to rebrand.
- **Testimonials** — edit in `/admin` (Testimonials section). Currently empty, so the section doesn't render. Add real client quotes only; one real quote beats two invented ones, and an invented one is worse than none.
- **CV / Resume** — drop your PDF into `public/` (e.g. `public/resume.pdf`) and set the path in `/admin` → CV / Resume. Blank hides the button rather than 404ing.

## Visit tracking (Vercel Analytics)

Real per-day visitor tracking is built in via `@vercel/analytics`. After deploying:

1. Go to your project on vercel.com → **Analytics** tab → enable (free tier).
2. Within a day you'll see daily visitors, page views, top pages, and referrers.
3. The `/admin` panel has a "Daily visits" card linking straight there.

Why not in the admin panel directly? The admin runs in your browser; pulling visitor data needs a server with auth. Vercel's dashboard is the secure place to read it — the admin just links you there.

## The blog: 20 posts, internal linking, and backlinks

This ships with **20 SEO posts** covering all your keyword clusters: escrow/marketplace, fintech/payments, Next.js architecture, MVP/process, CRM, food-ordering, waitlists, hiring, TypeScript, deployment. Each has unique target keywords in its frontmatter and links internally to related posts and to `/#contact` — that internal linking is what builds topical authority.

**About backlinks (important):** backlinks are *other sites linking to yours* — they can't be written into your own posts; they're earned. To get them:

- Add your portfolio URL to your GitHub profile, LinkedIn, and X bio.
- Cross-post 2-3 articles to dev.to and Hashnode with a canonical link pointing back here (so you get the backlink without duplicate-content penalties).
- Answer relevant questions on Stack Overflow / Reddit / IndieHackers and link a post where genuinely useful.
- List yourself in developer directories.
- After deploy, submit `/sitemap.xml` in Google Search Console so Google finds all 20 posts.

**A note on more posts:** I capped this at 20 strong, distinct posts on purpose. Google's 2024 spam updates demote sites that bulk-publish thin generated content, so 20 useful posts will rank better than 50 thin ones. Add more over time, one genuinely useful piece at a time.

## Tech
Next.js 14 (App Router) · TypeScript · Tailwind · MDX (next-mdx-remote) · fully static.

Every route prerenders. The homepage ships 138 B of route JavaScript; the only client
components on the public site are the nav (for the mobile menu) and Vercel Analytics.
