# Halek — Portfolio + Blog

A Next.js portfolio with a password-gated admin editor and an SEO-optimized MDX blog.

## Quick start (local)

```bash
npm install
npm run dev
```

Open http://localhost:3000 — and http://localhost:3000/admin for the editor.

---

## Before you deploy — 3 things to change

1. **Your domain**: edit `lib/site.ts` → set `SITE_URL` to your real URL (e.g. `https://halek.dev`). This powers canonical URLs, sitemap, and OpenGraph tags.
2. **Admin password**: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_ADMIN_PASSWORD`. (Note: `NEXT_PUBLIC_` vars are bundled into the client JS and visible to anyone who inspects the page — convenience, not real security. The admin only edits your local browser copy, so that's fine here.) On Vercel, add the same variable under Project → Settings → Environment Variables.
3. **Your contacts**: open `/admin`, fill in your real Email / GitHub / LinkedIn / X links, hit **Save** → **Export JSON**, and replace the contents of `data/portfolio-data.json` with the export (or just edit `lib/data.ts` directly), then push.

## Deploy to Vercel (recommended for Next.js)

1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo → Deploy. No env vars needed.
3. Add your custom domain in Vercel project settings.

(Railway works too: New Project → Deploy from GitHub → it auto-detects Next.js.)

---

## How editing works

- **Portfolio content** (bio, skills, projects, contacts): edit live at `/admin`. Saves to your browser's localStorage.
- **To publish those edits to the public site**: in `/admin` click **Export JSON**, paste into `lib/data.ts` (the `defaultData` object) or `data/portfolio-data.json`, and push. localStorage is per-browser, so visitors only see what's in the code.
- **Blog posts**: add a new `.mdx` file in `content/blog/`. Copy an existing one for the frontmatter format (title, description, date, tags, keywords). Push → it auto-deploys, gets its own URL, sitemap entry, and meta tags.

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

## Project preview screenshots

Each project shows a desktop screenshot inside a browser frame. To add yours:

1. Drop the image into `public/projects/` (e.g. `public/projects/vaultmart.png`).
2. The seed data already points to `/projects/<id>.png` for each project — so if you name files to match (`vaultmart.png`, `randall.png`, `spoofer.png`, `mealmate.png`, `cafe1506.png`), they just appear.
3. Or set/override the path per project in `/admin` (the "Image path" field).

Recommended: ~1200px wide, 16:10 aspect, captured at the top of the page. Until you add one, the card shows a neat "screenshot coming soon" placeholder.

## Branding assets & extras (already included)

- **OG share image** (`public/og.png`) — shows when you share any link on LinkedIn/X/WhatsApp. To customize, replace the file (1200×630).
- **Favicon** (`public/favicon.ico`, `icon.png`, `apple-icon.png`) — the browser-tab icon. Replace to rebrand.
- **Testimonials** — edit in `/admin` (Testimonials section). The seed has placeholders — swap in real client quotes. Even one real quote beats two fake ones; delete any you can't fill.
- **CV / Resume** — drop your PDF into `public/` (e.g. `public/resume.pdf`) and the "Download CV" button in the hero works automatically. Set/clear the path in `/admin` → CV / Resume. Leave blank to hide the button.

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
Next.js 14 (App Router) · TypeScript · Tailwind · MDX (next-mdx-remote) · static generation for blog.
