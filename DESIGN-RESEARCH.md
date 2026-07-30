# Portfolio audit + redesign research

Investigation of the current site, and the reasoning behind the three directions at `/design`.

---

## 1. The central problem

**The wrapper fights the work it's showing.**

Your five products are, visually, genuinely good — and they share a family resemblance:

| Product | Palette | Register |
|---|---|---|
| VaultMart | warm sand + coral, near-black type | confident, editorial |
| MealMate | cream + tomato red, high-contrast display serif | warm, appetising |
| 15'06. Café | drenched oxblood + bone | committed, single-colour |
| RanDall | off-white + indigo, serif display | premium, calm |
| Video Spoofer | dark green terminal | the one deliberate outlier |

Four of five are **light, warm, saturated, typographically confident**.

The portfolio housing them is **cold near-black (`#0a0a0f`), lime `#d4ff3f`, violet `#7c5cff`, radial glow, film grain**. It shares nothing with any of them. Worse, it shrinks each light screenshot into a small fake browser window on a dark field, so they read as muddy grey rectangles instead of the confident work they are.

Right now the portfolio makes your work look worse than it is. That's the single highest-value thing to fix.

There's a second-order problem: a client who lands on this page sees a portfolio in one visual language, then clicks through to five products in a completely different one. It reads as "someone else designed those," which is the opposite of the impression you need.

---

## 2. Why it reads as AI-generated

Not an insult — it's a specific, listable set of tells, and every one of them is in the current build.

**Typography.** `Fraunces` + `Outfit` is close to the single most-generated font pairing of the last two years. `JetBrains Mono` for labels completes the set. All three are on every "AI default" list going.

**Palette.** Near-black background + acid lime accent + violet secondary + a radial gradient glow behind the hero is *the* generated developer-portfolio palette. The `--grain` noise overlay at 0.035 opacity is the standard "make it feel designed" move.

**Structure.** In order down the page:
- Pill badge with a pulsing dot — "Available for remote work"
- Three-line hero with the last line in the accent colour
- Infinite tech-stack marquee
- `rounded-3xl` bordered card grid — twice
- Four identical skill cards, icon-less but otherwise the template
- Two testimonial cards
- Gradient CTA box, `rounded-[2rem]`

That's a template. Not a bad one, but any experienced client has seen this exact sequence dozens of times, and increasingly they know why.

**Fake browser chrome** (`BrowserPreview.tsx`) — the three traffic-light dots and a URL bar around each screenshot. It was a nice touch in 2019. It now reads as filler, and it steals ~15% of the height that should belong to the actual screenshot.

**Uniform entrance animation** — the same `rise` keyframe with a stagger delay on every hero element. There is no `prefers-reduced-motion` alternative anywhere in `globals.css`, and the marquee runs forever regardless.

---

## 3. Credibility bugs currently shipping

These are worth more than any visual change. A client who spots one stops reading.

| Location | Issue |
|---|---|
| `lib/site.ts:2` | `SITE_URL = "https://your-domain.com"` — this feeds `metadataBase`, every canonical URL, the sitemap, robots.txt, and every OG image. Social shares and search indexing are both broken. |
| `lib/data.ts:119-122` | Contacts render live as `you@example.com`, `"Add in admin"`, and `href="#"`. Your email — the primary conversion path — is a placeholder. |
| `lib/data.ts:126-137` | Two testimonials attributed to **"Add a real client"** are rendering publicly under a heading that says "What people say". This is the worst one. |
| `lib/data.ts:139` | `resumeUrl: "/resume.pdf"` but there's no `resume.pdf` in `public/` — the "Download CV" button 404s. |
| `lib/data.ts` | All five projects are dated `2026`. Uniform dates read as filler rather than history. |

---

## 4. Architecture notes

**The admin panel is misleading by design.** `usePortfolioData` reads `localStorage`; `/admin` writes to `localStorage`. Edits are visible only in the browser that made them. The banner does say this, and the export-JSON-and-commit workflow is a reasonable choice for a solo site — but `data/portfolio-data.json` currently holds only three keys and isn't read by anything. `lib/data.ts` is the real source of truth. Two files claiming the same job, one of them dead.

**The homepage is entirely client-rendered.** `app/page.tsx` is `"use client"` purely to read `localStorage`. Content still server-renders from `defaultData`, so SEO isn't broken — but you're shipping React state, an effect, and a hydration pass for content that never changes between users.

**The blog is your best undervalued asset.** Twenty MDX posts, properly front-mattered, with keywords, reading time, JSON-LD, and per-post canonicals. That's a real SEO surface aimed at exactly the right queries ("escrow marketplace developer", "Paystack webhook security"). It gets one nav link and no presence at all on the homepage.

**No project depth.** Every project is a paragraph in a card. For someone being hired to hold other people's money, the buying question is *"how does this person think?"* — and there's nowhere on the site that answers it. No case studies, no architecture notes, no "here's what went wrong and what I did." You have the material; the VaultMart screenshot alone shows ₦87k protected, 7 orders, 9+ verified vendors, 0.3% dispute rate.

---

## 5. Accessibility & polish

- No `prefers-reduced-motion` handling anywhere.
- `text-bone/40` (marquee) and `text-bone/50` (secondary project stacks) fall below 4.5:1 on `#0a0a0f`.
- No `:focus-visible` styling — keyboard navigation is invisible.
- Mobile menu (`Nav.tsx`) has no close affordance (the icon never changes state), no `aria-expanded`, and omits the "Hire me" CTA that desktop gets.
- Nav has no active-page state.
- `<Link>` used for `#work` / `#contact` in-page anchors; plain `<a>` is correct and avoids the router round-trip.

---

## 6. The three directions

Method: reject the first reflex, then reject the second.

- **First reflex** for "developer portfolio" → dark mode, mono type, terminal green/lime, grain, gradient glow. That is precisely what exists today. Rejected.
- **Second reflex** — "a developer portfolio that *isn't* dark-terminal" → display serif in italic, small mono labels, hairline rules, monochrome restraint. Editorial-typographic. Also currently saturated — and notably, it's already the language of your own client work, so borrowing it wholesale would make the portfolio a weaker copy of the projects it contains. Rejected as a wholesale lane.

What's left has to come from the actual brief. The scene: **a founder at 11pm deciding who to trust with the payments layer of the thing they're betting a year on.** They aren't shopping for a designer who codes. They're de-risking. The question in their head is *"will this person lose my money?"*

Three answers to that question:

### A · Ledger
*The page is a financial document.* Reference: Swiss accounting stationery, a settlement report, FT tables. Off-white at true chroma-0 (**not** the cream/sand AI default), near-black ink, one vermilion used the way red ink is used in accounting — only on figures and status. Libre Franklin (Franklin Gothic lineage — newsroom authority, no softness) with Source Serif 4 for prose only. Projects become **ruled statement rows**, not cards. Screenshots run full column width, hairline border, no browser chrome. Almost no motion; the restraint is the voice.

**Risk:** closest of the three to the editorial lane. It stays out by having no display serif, no italic, and a functional rather than decorative accent — but it's the one to watch.

### B · Machine Room
*The page is an instrument panel.* Reference: Braun/Rams instrumentation, a Teenage Engineering manual, a studio patchbay — deliberately **not** terminal-green hacker dark. Warm graphite (`oklch(0.205 0.008 70)`) rather than your current cold blue-black, so it reads as machined metal instead of "dark mode". One signal orange, used only as status. Chivo throughout at extreme weight contrast (900/400) plus Chivo Mono for readouts, where mono is literal rather than costume. Radius ceiling 2px — everything squared, which is the sharpest break from the current `rounded-3xl` page. Each project is a *unit* with a spec sheet and a live status LED.

**Risk:** dark + mono is the reflex for dev portfolios. This escapes by being warm not cold, orange not lime, instrumented not terminal — but the discipline has to hold everywhere or it collapses back into the default.

### C · Contact Sheet
*The work supplies the colour.* The insight: five real, well-designed products already exist. A rigorously achromatic white frame that never changes, and each project **drenches its own full-bleed panel in its own brand colour** — oxblood for 15'06, indigo for RanDall, coral for VaultMart. Bricolage Grotesque (variable, real letterform character) over Public Sans. Screenshots are huge, flush, uncropped. This is the direct answer to problem #1: instead of a dark page burying light work, the page frames it.

**Risk:** highest ceiling, highest variance. It depends on the screenshots staying good — every new project has to bring a colour that works, and a weak screenshot has nowhere to hide.

---

## 7. Recommendation

**C for the homepage's work section, A for everything else** is the strongest combination, and they're compatible: A's document grammar (ruled rows, tabular figures, vermilion-on-paper) is a natural chrome around C's drenched panels, and both are light.

If you want one whole direction as-is: **A**. It's the one that answers the founder's actual question, it makes the blog's twenty posts look like a body of work rather than a side feature, and it ages the slowest.

**B** is the most distinctive and the most fun, with the narrowest audience — it wins you agency and product-studio work and reads as slightly costumed to a non-technical founder.

Regardless of choice, section 3 should be fixed today; it's a 20-minute job with a bigger effect than the redesign.
