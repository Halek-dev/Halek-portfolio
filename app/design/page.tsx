"use client";

/**
 * /design — throwaway comparison route.
 * Three committed design directions rendered in the real stack with real fonts
 * and real project screenshots. Pick one, then this file gets deleted.
 */

// Kept for reference after direction A+C was chosen. Delete whenever:
//   rm -rf app/design
import { useState } from "react";
import {
  Libre_Franklin,
  Source_Serif_4,
  Chivo,
  Chivo_Mono,
  Bricolage_Grotesque,
  Public_Sans,
} from "next/font/google";

const franklin = Libre_Franklin({ subsets: ["latin"], variable: "--f-franklin", display: "swap" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--f-source", display: "swap" });
const chivo = Chivo({ subsets: ["latin"], variable: "--f-chivo", display: "swap" });
const chivoMono = Chivo_Mono({ subsets: ["latin"], variable: "--f-chivomono", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-bricolage", display: "swap" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--f-public", display: "swap" });

const FONTS = `${franklin.variable} ${sourceSerif.variable} ${chivo.variable} ${chivoMono.variable} ${bricolage.variable} ${publicSans.variable}`;

type Dir = "a" | "b" | "c";

const DIRECTIONS: { id: Dir; num: string; name: string; thesis: string }[] = [
  { id: "a", num: "01", name: "Ledger", thesis: "The page is a financial document." },
  { id: "b", num: "02", name: "Machine Room", thesis: "The page is an instrument panel." },
  { id: "c", num: "c", name: "Contact Sheet", thesis: "The work supplies the colour." },
];

export default function DesignDirections() {
  const [dir, setDir] = useState<Dir>("a");

  return (
    <div className={FONTS}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── switcher ─────────────────────────────────────────── */}
      <header className="sw">
        <div className="sw-in">
          <span className="sw-title">Halek — design directions</span>
          <div className="sw-tabs" role="tablist" aria-label="Design directions">
            {DIRECTIONS.map((d) => (
              <button
                key={d.id}
                role="tab"
                aria-selected={dir === d.id}
                onClick={() => setDir(d.id)}
                className={`sw-tab${dir === d.id ? " is-on" : ""}`}
              >
                <em>{d.id.toUpperCase()}</em> {d.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {dir === "a" && <Ledger />}
      {dir === "b" && <MachineRoom />}
      {dir === "c" && <ContactSheet />}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   A · LEDGER
   Reference: a settlement report, Swiss accounting stationery,
   a bank statement. Not "fintech navy-and-gold".
   Strategy: Restrained→Committed. Vermilion is used the way red
   ink is used in accounting — only on the figure that matters.
   ══════════════════════════════════════════════════════════════ */
function Ledger() {
  return (
    <main className="a">
      <div className="a-wrap">
        {/* masthead */}
        <div className="a-mast">
          <span className="a-mast-name">Olalekan Kazeem</span>
          <span className="a-mast-mid">Full-stack engineer · payments &amp; marketplaces</span>
          <span className="a-mast-status">
            <i /> Available — Q3 2026
          </span>
        </div>

        {/* hero */}
        <h1 className="a-h1">
          I build the parts of a product
          <br />
          that <span className="a-red">cannot be wrong</span>.
        </h1>

        <div className="a-strip">
          {[
            ["Based", "Lagos, NG"],
            ["Working", "Remote, worldwide"],
            ["Focus", "Escrow · payouts · ledgers"],
            ["Shipped", "5 live products"],
          ].map(([k, v]) => (
            <div key={k} className="a-cell">
              <span className="a-k">{k}</span>
              <span className="a-v">{v}</span>
            </div>
          ))}
        </div>

        <p className="a-lede">
          Money-moving software fails quietly. A fee rounds the wrong way, a webhook replays, a payout
          fires twice — and the damage is discovered in a spreadsheet three weeks later. I build the
          layer where that can&apos;t happen: reconciled ledgers, idempotent payment paths, and escrow
          flows that hold funds until the other side has actually delivered.
        </p>

        {/* work — statement rows, not cards */}
        <div className="a-sec">
          <h2 className="a-h2">Work</h2>
          <span className="a-sec-note">Selected · 2025–2026</span>
        </div>

        <a className="a-row" href="https://vaultmart.com.ng" target="_blank" rel="noopener noreferrer">
          <div className="a-row-head">
            <span className="a-idx">01</span>
            <div>
              <h3 className="a-row-name">VaultMart</h3>
              <p className="a-row-sub">Escrow-first P2P marketplace · Nigeria</p>
            </div>
            <span className="a-row-year">2026</span>
          </div>

          <img className="a-shot" src="/projects/vaultmart.png" alt="VaultMart marketplace homepage, escrow balance panel visible" />

          <div className="a-figs">
            {[
              ["₦87k", "held in escrow"],
              ["0.3%", "dispute rate"],
              ["48h", "auto-release window"],
              ["2", "payment providers"],
            ].map(([n, l]) => (
              <div key={l} className="a-fig">
                <span className="a-fig-n">{n}</span>
                <span className="a-fig-l">{l}</span>
              </div>
            ))}
          </div>

          <p className="a-row-body">
            Buyer funds sit in escrow until delivery is confirmed. I built the payments layer — the fee
            and commission engine, the two-provider failover, NIN/BVN vendor verification, dispute
            mediation, and automated affiliate payouts.
          </p>
          <span className="a-cta">Read the case study →</span>
        </a>

        <div className="a-row a-row--quiet">
          <div className="a-row-head">
            <span className="a-idx">02</span>
            <div>
              <h3 className="a-row-name">RanDall</h3>
              <p className="a-row-sub">Creator CRM · real-time inbox &amp; revenue attribution</p>
            </div>
            <span className="a-row-year">2026</span>
          </div>
        </div>
        <div className="a-row a-row--quiet">
          <div className="a-row-head">
            <span className="a-idx">03</span>
            <div>
              <h3 className="a-row-name">15&apos;06. Café</h3>
              <p className="a-row-sub">Ordering &amp; menu management · Osogbo</p>
            </div>
            <span className="a-row-year">2026</span>
          </div>
        </div>

        <Spec
          tone="light"
          name="Ledger"
          reference="Swiss accounting stationery · a settlement report · Financial Times tables"
          strategy="Restrained → Committed. One vermilion, used only on figures and status."
          type={[
            ["Display / UI", "Libre Franklin", "Franklin Gothic lineage. Newsroom authority, zero softness. Not a geometric."],
            ["Reading", "Source Serif 4", "Only for prose. Serif earns its place on paragraphs, never on headings."],
            ["Figures", "Libre Franklin", "font-variant-numeric: tabular-nums — columns align like a real statement."],
          ]}
          swatches={[
            ["--paper", "oklch(0.981 0 0)", "#f8f8f8"],
            ["--paper-2", "oklch(0.945 0 0)", "#eeeeee"],
            ["--rule", "oklch(0.875 0 0)", "#dcdcdc"],
            ["--ink-60", "oklch(0.470 0.010 265)", "#63666e"],
            ["--ink", "oklch(0.205 0.010 265)", "#24262b"],
            ["--red", "oklch(0.540 0.190 28)", "#bb3a1e"],
          ]}
          moves={[
            "Projects are ruled statement rows, not cards. No card grid anywhere on the site.",
            "Screenshots run full column width with a hairline border — the fake browser chrome is deleted.",
            "Real numbers from each product carry the credibility. No hero stat bar.",
            "Motion: almost none. A 120ms rule-draw on hover. The restraint is the voice.",
          ]}
          risk="Closest of the three to the saturated editorial-typographic lane. It stays out of it by having no display serif, no italic, and a functional (not decorative) accent — but it is the one to watch."
          bestIf="Your buyer is a founder or CTO de-risking a payments hire. This reads as the most trustworthy of the three."
        />
      </div>
    </main>
  );
}

/* ══════════════════════════════════════════════════════════════
   B · MACHINE ROOM
   Reference: Braun/Rams instrumentation, an OP-1 manual, a studio
   patchbay. NOT terminal-green hacker dark mode.
   Strategy: Committed. Warm graphite + one signal orange used as
   a status indicator, never as decoration.
   ══════════════════════════════════════════════════════════════ */
function MachineRoom() {
  return (
    <main className="b">
      <div className="b-wrap">
        <div className="b-bar">
          <span className="b-logo">HALEK</span>
          <span className="b-bar-mid">PAYMENTS · MARKETPLACES · LEDGERS</span>
          <span className="b-live">
            <i /> AVAILABLE
          </span>
        </div>

        <div className="b-hero">
          <div>
            <h1 className="b-h1">
              Systems that
              <br />
              move money
              <br />
              <span className="b-sig">without losing it.</span>
            </h1>
            <p className="b-lede">
              Five products in production. Escrow that holds until delivery, payouts that reconcile,
              fee engines that round the way the contract says they round.
            </p>
            <div className="b-btns">
              <button className="b-btn b-btn--sig">See the work</button>
              <button className="b-btn">Download CV</button>
            </div>
          </div>

          {/* readout — real numbers, per-product, not a SaaS hero stat bar */}
          <div className="b-readout">
            <div className="b-readout-top">
              <span>VAULTMART</span>
              <span className="b-dot">
                <i /> LIVE
              </span>
            </div>
            {[
              ["ESCROW HELD", "₦87,000"],
              ["ORDERS SETTLED", "7"],
              ["DISPUTE RATE", "0.30%"],
              ["AUTO-RELEASE", "48:00:00"],
              ["PROVIDERS", "2 / FAILOVER"],
            ].map(([k, v]) => (
              <div key={k} className="b-readout-row">
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
            <div className="b-meter">
              <span style={{ width: "97%" }} />
            </div>
            <span className="b-meter-l">UPTIME 99.7% · 90D</span>
          </div>
        </div>

        {/* channel strip — replaces the marquee */}
        <div className="b-strip">
          {["NEXT.JS", "TYPESCRIPT", "POSTGRES", "NODE", "PAYSTACK", "RAILWAY", "SENTRY", "TAILWIND"].map((t) => (
            <span key={t} className="b-chan">
              <i />
              {t}
            </span>
          ))}
        </div>

        {/* project unit */}
        <div className="b-sec">
          <h2 className="b-h2">UNITS IN SERVICE</h2>
          <span>03 FEATURED / 05 TOTAL</span>
        </div>

        <a className="b-unit" href="https://randall.lynxmediadigital.com" target="_blank" rel="noopener noreferrer">
          <div className="b-unit-shot">
            <span className="b-reg" />
            <img src="/projects/randall.png" alt="RanDall creator CRM dashboard with segmented audience lists" />
          </div>
          <div className="b-unit-spec">
            <h3>RanDall</h3>
            <p className="b-unit-tag">Creator CRM · multi-account operations</p>
            {[
              ["ROLE", "Sole engineer, design + build"],
              ["SHIPPED", "2026"],
              ["HANDLES", "Real-time inbox, scheduled sync"],
              ["SURFACE", "Segments · mass send · attribution"],
              ["STACK", "Next.js · Postgres · WebSocket"],
            ].map(([k, v]) => (
              <div key={k} className="b-unit-row">
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
            <span className="b-unit-cta">OPEN CASE FILE →</span>
          </div>
        </a>

        <Spec
          tone="dark"
          name="Machine Room"
          reference="Braun/Rams instrumentation · Teenage Engineering manual · a studio patchbay"
          strategy="Committed. Warm graphite carries ~70% of the surface; signal orange is functional only."
          type={[
            ["Everything", "Chivo", "One family, extreme weight contrast (900 display / 400 body). Argentine grotesque, underused, has actual character in the 'a' and 'g'."],
            ["Readouts", "Chivo Mono", "Mono is literal here — these are instrument readings that must align. Not costume."],
          ]}
          swatches={[
            ["--panel", "oklch(0.205 0.008 70)", "#232120"],
            ["--panel-2", "oklch(0.260 0.009 70)", "#302d2b"],
            ["--line", "oklch(0.340 0.010 70)", "#413d3a"],
            ["--label", "oklch(0.700 0.012 70)", "#a9a29c"],
            ["--text", "oklch(0.930 0.006 70)", "#eae7e4"],
            ["--signal", "oklch(0.720 0.175 55)", "#e2792c"],
          ]}
          moves={[
            "Warm graphite, not the cold blue-black you have now. Reads as machined metal, not as 'dark mode'.",
            "Radius ceiling: 2px. Everything squared — the single biggest break from the current rounded-3xl page.",
            "Every project is a 'unit' with a spec sheet and a live status LED. Screenshots get registration marks, not fake browser chrome.",
            "Motion: things snap and settle like a physical switch (120ms, ease-out-expo). No fades, no float.",
          ]}
          risk="Dark + mono is the reflex for developer portfolios. This escapes by being warm rather than cold, orange rather than green/lime, and instrumented rather than terminal — but it needs the discipline held everywhere or it collapses back into the default."
          bestIf="You want the portfolio to feel like a piece of equipment. Strongest personality of the three; slightly narrower audience."
        />
      </div>
    </main>
  );
}

/* ══════════════════════════════════════════════════════════════
   C · CONTACT SHEET
   The insight: five real, genuinely well-designed products already
   exist. Let them be the palette. Rigorously neutral white frame;
   each project drenches its own panel in its own brand colour.
   Strategy: Full palette / Drenched per section.
   ══════════════════════════════════════════════════════════════ */
function ContactSheet() {
  return (
    <main className="c">
      <div className="c-bar">
        <span className="c-logo">Halek</span>
        <nav className="c-nav">
          <a href="#">Work</a>
          <a href="#">Writing</a>
          <a href="#">About</a>
        </nav>
        <a className="c-hire" href="#">
          Available for work
        </a>
      </div>

      <section className="c-hero">
        <h1 className="c-h1">
          Five products.
          <br />
          All live. All mine
          <br />
          end&nbsp;to&nbsp;end.
        </h1>
        <div className="c-hero-side">
          <p>
            I&apos;m Olalekan — a full-stack engineer in Lagos. I take products from empty repo to live
            and revenue-generating: the escrow layer, the data model, the payout automation, and the
            interface on top of it.
          </p>
          <span className="c-hero-meta">Scroll for the work ↓</span>
        </div>
      </section>

      {/* drenched panels — each borrows the product's own colour */}
      <Panel
        bg="oklch(0.300 0.090 30)"
        fg="oklch(0.960 0.020 60)"
        accent="oklch(0.760 0.110 45)"
        idx="01"
        name="15'06. Café"
        tag="Ordering system · Osogbo, NG"
        body="A café ordering platform with a live menu, cart and checkout, dine-in / takeaway / delivery routing, and an admin surface for the owner to run the menu herself."
        stack="React · Vite · TypeScript"
        img="/projects/cafe1506.png"
        alt="15'06 Café ordering homepage, deep oxblood with a circular monogram"
      />
      <Panel
        bg="oklch(0.480 0.215 276)"
        fg="oklch(0.980 0.010 280)"
        accent="oklch(0.870 0.090 280)"
        idx="02"
        name="RanDall"
        tag="Creator CRM · real-time operations"
        body="Real-time inbox, auto-segmented audiences on a sync schedule, mass messaging with avoid-lists, deduplicated fan tracking, and revenue analytics by campaign and source."
        stack="Next.js · Postgres · WebSocket"
        img="/projects/randall.png"
        alt="RanDall CRM landing page, indigo accent on off-white"
        flip
      />
      <Panel
        bg="oklch(0.660 0.160 33)"
        fg="oklch(0.190 0.030 30)"
        accent="oklch(0.240 0.040 30)"
        idx="03"
        name="VaultMart"
        tag="Escrow-first marketplace · Nigeria"
        body="Buyer funds held in escrow until delivery is confirmed. Fee and commission engine, two-provider payment failover, NIN/BVN verification, dispute mediation, automated affiliate payouts."
        stack="Next.js · Postgres · Paystack"
        img="/projects/vaultmart.png"
        alt="VaultMart marketplace homepage with escrow balance panel"
      />

      <Spec
        tone="light"
        name="Contact Sheet"
        reference="A photographer's contact sheet · a gallery hang · Lagos riso print shop"
        strategy="Full palette / Drenched per section. The frame is achromatic; every panel is saturated."
        type={[
          ["Display", "Bricolage Grotesque", "Variable, with real letterform character (look at the 'g', 'R', 'a'). Distinctive without being a costume. Not on anyone's default list."],
          ["Body / UI", "Public Sans", "Plain, legible, gets out of the way. The display does all the talking."],
        ]}
        swatches={[
          ["--wall", "oklch(0.990 0 0)", "#fcfcfc"],
          ["--ink", "oklch(0.170 0 0)", "#1e1e1e"],
          ["panel · café", "oklch(0.300 0.090 30)", "#4a2318"],
          ["panel · randall", "oklch(0.480 0.215 276)", "#4b35d6"],
          ["panel · vaultmart", "oklch(0.660 0.160 33)", "#e0733f"],
          ["panel · mealmate", "oklch(0.200 0.020 40)", "#2a2320"],
        ]}
        moves={[
          "Your work is already well-designed and light-toned. A dark portfolio buries it; this one frames it.",
          "Full-bleed alternating panels. The screenshot is the hero of each section — big, flush, uncropped.",
          "The white chrome between panels never changes. Only the panels do. That discipline is what stops it becoming a mess.",
          "Motion: one orchestrated scroll where each panel's colour arrives before its content. Nothing else moves.",
        ]}
        risk="Highest ceiling and highest variance. It depends on the screenshots staying good — every new project has to bring a colour that works, and a weak screenshot has nowhere to hide."
        bestIf="You want to be hired for taste as well as engineering. This is the one a design-literate client remembers."
      />
    </main>
  );
}

function Panel({
  bg, fg, accent, idx, name, tag, body, stack, img, alt, flip,
}: {
  bg: string; fg: string; accent: string; idx: string; name: string;
  tag: string; body: string; stack: string; img: string; alt: string; flip?: boolean;
}) {
  return (
    <section
      className={`c-panel${flip ? " is-flip" : ""}`}
      style={{ ["--bg" as string]: bg, ["--fg" as string]: fg, ["--ac" as string]: accent }}
    >
      <div className="c-panel-txt">
        <span className="c-panel-idx">{idx}</span>
        <h2 className="c-panel-name">{name}</h2>
        <p className="c-panel-tag">{tag}</p>
        <p className="c-panel-body">{body}</p>
        <p className="c-panel-stack">{stack}</p>
        <span className="c-panel-cta">Visit live site →</span>
      </div>
      <div className="c-panel-shot">
        <img src={img} alt={alt} />
      </div>
    </section>
  );
}

/* ── shared spec block ─────────────────────────────────────── */
function Spec({
  tone, name, reference, strategy, type, swatches, moves, risk, bestIf,
}: {
  tone: "light" | "dark";
  name: string; reference: string; strategy: string;
  type: string[][]; swatches: string[][]; moves: string[]; risk: string; bestIf: string;
}) {
  return (
    <section className={`spec spec--${tone}`}>
      <div className="spec-in">
        <h2 className="spec-name">{name} — the system</h2>

        <div className="spec-grid">
          <div>
            <h3>Reference</h3>
            <p>{reference}</p>
            <h3>Colour strategy</h3>
            <p>{strategy}</p>
            <h3>Typography</h3>
            {type.map(([role, font, why]) => (
              <p key={role}>
                <b>{role} — {font}.</b> {why}
              </p>
            ))}
          </div>
          <div>
            <h3>Palette</h3>
            <div className="spec-sw">
              {swatches.map(([token, oklch, hex]) => (
                <div key={token} className="spec-sw-row">
                  <span className="spec-chip" style={{ background: oklch }} />
                  <code>{token}</code>
                  <code className="spec-dim">{oklch}</code>
                  <code className="spec-dim">{hex}</code>
                </div>
              ))}
            </div>
            <h3>Structural moves</h3>
            <ul>{moves.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
        </div>

        <div className="spec-foot">
          <div>
            <h3>Honest risk</h3>
            <p>{risk}</p>
          </div>
          <div>
            <h3>Pick this if</h3>
            <p>{bestIf}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════ */
const CSS = `
.sw{position:sticky;top:0;z-index:100;background:#101012;border-bottom:1px solid #2a2a2e;font-family:var(--f-public),system-ui,sans-serif}
.sw-in{max-width:1400px;margin:0 auto;padding:.7rem 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.sw-title{color:#8b8b93;font-size:.78rem;letter-spacing:.02em}
.sw-tabs{display:flex;gap:.35rem}
.sw-tab{background:transparent;border:1px solid #2a2a2e;color:#8b8b93;padding:.45rem .9rem;font-size:.8rem;cursor:pointer;border-radius:2px;transition:color .12s,border-color .12s,background .12s;font-family:inherit}
.sw-tab em{font-style:normal;opacity:.5;margin-right:.3rem}
.sw-tab:hover{color:#e8e8ea;border-color:#45454b}
.sw-tab.is-on{background:#e8e8ea;color:#101012;border-color:#e8e8ea}
.sw-tab.is-on em{opacity:.45}

/* ── A · LEDGER ─────────────────────────────────────────────── */
.a{--paper:oklch(0.981 0 0);--paper-2:oklch(0.945 0 0);--rule:oklch(0.875 0 0);
   --ink:oklch(0.205 0.010 265);--ink-60:oklch(0.470 0.010 265);--red:oklch(0.540 0.190 28);
   background:var(--paper);color:var(--ink);font-family:var(--f-franklin),system-ui,sans-serif;
   font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
.a-wrap{max-width:1080px;margin:0 auto;padding:0 clamp(1.25rem,4vw,3rem) 6rem}
.a-mast{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;flex-wrap:wrap;
        padding:1.5rem 0;border-bottom:1px solid var(--ink);font-size:.82rem}
.a-mast-name{font-weight:700;letter-spacing:-.01em}
.a-mast-mid{color:var(--ink-60)}
.a-mast-status{display:inline-flex;align-items:center;gap:.5rem;color:var(--red);font-weight:600}
.a-mast-status i{width:6px;height:6px;background:var(--red);border-radius:50%}
.a-h1{font-size:clamp(2.6rem,7vw,5.5rem);font-weight:800;line-height:.98;letter-spacing:-.035em;
      margin:clamp(3rem,8vw,5.5rem) 0 0;text-wrap:balance}
.a-red{color:var(--red)}
.a-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));
         margin-top:clamp(2.5rem,6vw,4rem);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.a-cell{padding:1rem 1.25rem 1rem 0;border-right:1px solid var(--rule)}
.a-cell:last-child{border-right:0}
.a-k{display:block;font-size:.7rem;font-weight:600;color:var(--ink-60);margin-bottom:.3rem}
.a-v{display:block;font-size:1rem;font-weight:500}
.a-lede{font-family:var(--f-source),Georgia,serif;font-size:1.18rem;line-height:1.62;max-width:66ch;
        margin-top:2.5rem;color:oklch(0.32 0.010 265);text-wrap:pretty}
.a-sec{display:flex;align-items:baseline;justify-content:space-between;
       margin-top:clamp(4rem,10vw,7rem);padding-bottom:.75rem;border-bottom:2px solid var(--ink)}
.a-h2{font-size:1.6rem;font-weight:700;letter-spacing:-.02em}
.a-sec-note{font-size:.78rem;color:var(--ink-60)}
.a-row{display:block;text-decoration:none;color:inherit;padding:2rem 0 2.5rem;border-bottom:1px solid var(--rule)}
.a-row--quiet{padding:1.25rem 0}
.a-row-head{display:grid;grid-template-columns:auto 1fr auto;gap:1.25rem;align-items:baseline}
.a-idx{font-size:.8rem;font-weight:600;color:var(--red)}
.a-row-name{font-size:clamp(1.5rem,3.5vw,2.1rem);font-weight:700;letter-spacing:-.025em}
.a-row-sub{color:var(--ink-60);font-size:.95rem;margin-top:.15rem}
.a-row-year{font-size:.8rem;color:var(--ink-60)}
.a-shot{display:block;width:100%;margin-top:1.5rem;border:1px solid var(--rule)}
.a-figs{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
        margin-top:1.5rem;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.a-fig{padding:.9rem 1rem .9rem 0;border-right:1px solid var(--rule)}
.a-fig:last-child{border-right:0}
.a-fig-n{display:block;font-size:1.5rem;font-weight:700;color:var(--red);letter-spacing:-.02em}
.a-fig-l{display:block;font-size:.74rem;color:var(--ink-60);margin-top:.15rem}
.a-row-body{font-family:var(--f-source),Georgia,serif;font-size:1.02rem;line-height:1.6;
            max-width:62ch;margin-top:1.25rem;color:oklch(0.34 0.010 265)}
.a-cta{display:inline-block;margin-top:1.1rem;font-size:.9rem;font-weight:600;
       border-bottom:2px solid var(--red);padding-bottom:2px}
.a-row:hover .a-cta{color:var(--red)}

/* ── B · MACHINE ROOM ───────────────────────────────────────── */
.b{--panel:oklch(0.205 0.008 70);--panel-2:oklch(0.260 0.009 70);--line:oklch(0.340 0.010 70);
   --label:oklch(0.700 0.012 70);--text:oklch(0.930 0.006 70);--signal:oklch(0.720 0.175 55);
   --live:oklch(0.780 0.150 145);
   background:var(--panel);color:var(--text);font-family:var(--f-chivo),system-ui,sans-serif;
   -webkit-font-smoothing:antialiased}
.b-wrap{max-width:1240px;margin:0 auto;padding:0 clamp(1.25rem,4vw,2.5rem) 6rem}
.b-bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;
       padding:1rem 0;border-bottom:1px solid var(--line);
       font-family:var(--f-chivomono),monospace;font-size:.72rem;letter-spacing:.06em}
.b-logo{font-family:var(--f-chivo);font-weight:900;font-size:1.05rem;letter-spacing:-.01em}
.b-bar-mid{color:var(--label)}
.b-live{display:inline-flex;align-items:center;gap:.45rem;color:var(--live)}
.b-live i{width:6px;height:6px;background:var(--live);border-radius:50%;box-shadow:0 0 8px var(--live)}
.b-hero{display:grid;grid-template-columns:1fr;gap:clamp(2.5rem,5vw,4rem);
        padding:clamp(3rem,8vw,5.5rem) 0}
@media(min-width:900px){.b-hero{grid-template-columns:1.35fr .9fr;align-items:start}}
.b-h1{font-size:clamp(2.6rem,6.5vw,5rem);font-weight:900;line-height:1.0;letter-spacing:-.035em;text-wrap:balance}
.b-sig{color:var(--signal)}
.b-lede{margin-top:1.75rem;max-width:52ch;font-size:1.08rem;line-height:1.68;color:var(--label)}
.b-btns{display:flex;gap:.6rem;margin-top:2rem;flex-wrap:wrap}
.b-btn{background:transparent;border:1px solid var(--line);color:var(--text);
       padding:.85rem 1.5rem;font-size:.82rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;
       border-radius:2px;cursor:pointer;font-family:inherit;transition:border-color .12s,background .12s}
.b-btn:hover{border-color:var(--text)}
.b-btn--sig{background:var(--signal);border-color:var(--signal);color:oklch(0.19 0.03 55)}
.b-btn--sig:hover{background:oklch(0.78 0.16 55);border-color:oklch(0.78 0.16 55)}
.b-readout{border:1px solid var(--line);background:var(--panel-2);padding:1.1rem;
           font-family:var(--f-chivomono),monospace;font-size:.74rem;letter-spacing:.03em}
.b-readout-top{display:flex;justify-content:space-between;padding-bottom:.8rem;
               border-bottom:1px solid var(--line);color:var(--label)}
.b-dot{display:inline-flex;align-items:center;gap:.4rem;color:var(--live)}
.b-dot i{width:5px;height:5px;background:var(--live);border-radius:50%;box-shadow:0 0 6px var(--live)}
.b-readout-row{display:flex;justify-content:space-between;padding:.62rem 0;border-bottom:1px dotted var(--line);color:var(--label)}
.b-readout-row b{color:var(--text);font-weight:500}
.b-meter{height:5px;background:oklch(0.30 0.008 70);margin-top:1rem}
.b-meter span{display:block;height:100%;background:var(--signal)}
.b-meter-l{display:block;margin-top:.5rem;color:var(--label);font-size:.68rem}
.b-strip{display:flex;flex-wrap:wrap;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.b-chan{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.4rem;
        border-right:1px solid var(--line);font-family:var(--f-chivomono),monospace;
        font-size:.7rem;letter-spacing:.08em;color:var(--label)}
.b-chan i{width:3px;height:11px;background:var(--signal);opacity:.75}
.b-sec{display:flex;justify-content:space-between;align-items:baseline;
       margin-top:clamp(3.5rem,9vw,6rem);padding-bottom:.9rem;border-bottom:1px solid var(--line);
       font-family:var(--f-chivomono),monospace;font-size:.72rem;letter-spacing:.08em;color:var(--label)}
.b-h2{font-size:.72rem;font-weight:400;letter-spacing:.14em;color:var(--text)}
.b-unit{display:grid;grid-template-columns:1fr;gap:0;text-decoration:none;color:inherit;
        border:1px solid var(--line);border-top:0}
@media(min-width:900px){.b-unit{grid-template-columns:1.25fr .95fr}}
.b-unit-shot{position:relative;background:oklch(0.24 0.008 70);padding:1.4rem;overflow:hidden}
.b-unit-shot img{display:block;width:100%;border:1px solid var(--line)}
.b-reg{position:absolute;top:.7rem;left:.7rem;width:12px;height:12px;
       border-left:1px solid var(--signal);border-top:1px solid var(--signal)}
.b-unit-spec{padding:1.6rem;border-top:1px solid var(--line)}
@media(min-width:900px){.b-unit-spec{border-top:0;border-left:1px solid var(--line)}}
.b-unit-spec h3{font-size:1.7rem;font-weight:900;letter-spacing:-.025em}
.b-unit-tag{color:var(--signal);font-size:.85rem;margin:.2rem 0 1.3rem}
.b-unit-row{display:flex;justify-content:space-between;gap:1rem;padding:.55rem 0;
            border-bottom:1px dotted var(--line);font-family:var(--f-chivomono),monospace;
            font-size:.7rem;letter-spacing:.03em;color:var(--label)}
.b-unit-row b{color:var(--text);font-weight:500;text-align:right}
.b-unit-cta{display:inline-block;margin-top:1.4rem;font-family:var(--f-chivomono),monospace;
            font-size:.72rem;letter-spacing:.08em;color:var(--signal)}

/* ── C · CONTACT SHEET ──────────────────────────────────────── */
.c{--wall:oklch(0.990 0 0);--ink:oklch(0.170 0 0);--ink-60:oklch(0.470 0 0);
   background:var(--wall);color:var(--ink);font-family:var(--f-public),system-ui,sans-serif;
   -webkit-font-smoothing:antialiased}
.c-bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;
       padding:1.35rem clamp(1.25rem,4vw,3rem);border-bottom:1px solid oklch(0.90 0 0)}
.c-logo{font-family:var(--f-bricolage),system-ui,sans-serif;font-weight:800;font-size:1.35rem;letter-spacing:-.03em}
.c-nav{display:none;gap:1.75rem;font-size:.92rem}
@media(min-width:720px){.c-nav{display:flex}}
.c-nav a{color:var(--ink-60);text-decoration:none}
.c-nav a:hover{color:var(--ink)}
.c-hire{font-size:.82rem;white-space:nowrap;text-decoration:none;color:var(--ink);
        border:1px solid var(--ink);padding:.55rem 1rem;border-radius:999px}
.c-hero{display:grid;grid-template-columns:1fr;gap:2.5rem;
        padding:clamp(3rem,9vw,7rem) clamp(1.25rem,4vw,3rem) clamp(3.5rem,9vw,6rem)}
@media(min-width:960px){.c-hero{grid-template-columns:1.45fr .8fr;align-items:end}}
.c-h1{font-family:var(--f-bricolage),system-ui,sans-serif;font-weight:800;
      font-size:clamp(3rem,9vw,6rem);line-height:.93;letter-spacing:-.045em;text-wrap:balance}
.c-hero-side p{font-size:1.05rem;line-height:1.66;color:oklch(0.36 0 0);max-width:44ch;text-wrap:pretty}
.c-hero-meta{display:block;margin-top:1.5rem;font-size:.82rem;color:var(--ink-60)}
.c-panel{background:var(--bg);color:var(--fg);display:grid;grid-template-columns:1fr;
         gap:clamp(2rem,5vw,4rem);padding:clamp(2.5rem,7vw,5.5rem) clamp(1.25rem,4vw,3rem);align-items:center}
@media(min-width:960px){
  .c-panel{grid-template-columns:.85fr 1.15fr}
  .c-panel.is-flip .c-panel-txt{order:2}
}
.c-panel-idx{font-size:.8rem;opacity:.6;letter-spacing:.08em}
.c-panel-name{font-family:var(--f-bricolage),system-ui,sans-serif;font-weight:800;
              font-size:clamp(2.2rem,5vw,3.4rem);line-height:1;letter-spacing:-.04em;margin-top:.6rem}
.c-panel-tag{color:var(--ac);font-size:1rem;margin-top:.5rem}
.c-panel-body{font-size:1rem;line-height:1.66;margin-top:1.4rem;max-width:46ch;opacity:.92;text-wrap:pretty}
.c-panel-stack{font-size:.82rem;margin-top:1.2rem;opacity:.65;letter-spacing:.01em}
.c-panel-cta{display:inline-block;margin-top:1.6rem;font-size:.9rem;font-weight:600;
             border-bottom:2px solid currentColor;padding-bottom:2px}
.c-panel-shot img{display:block;width:100%;box-shadow:0 24px 60px oklch(0 0 0/.28)}

/* ── shared spec ────────────────────────────────────────────── */
.spec{font-family:var(--f-public),system-ui,sans-serif;padding:clamp(3rem,7vw,5rem) 0 4rem;margin-top:4rem}
.spec--light{background:oklch(0.955 0 0);color:oklch(0.20 0 0);border-top:1px solid oklch(0.87 0 0)}
.spec--dark{background:oklch(0.155 0.006 70);color:oklch(0.92 0.005 70);border-top:1px solid oklch(0.30 0.01 70)}
.spec-in{max-width:1080px;margin:0 auto;padding:0 clamp(1.25rem,4vw,3rem)}
.spec-name{font-size:1.5rem;font-weight:700;letter-spacing:-.02em;margin-bottom:2rem}
.spec-grid{display:grid;grid-template-columns:1fr;gap:2.5rem}
@media(min-width:860px){.spec-grid{grid-template-columns:1fr 1fr}}
.spec h3{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
         opacity:.55;margin:1.75rem 0 .6rem}
.spec h3:first-child{margin-top:0}
.spec p{font-size:.95rem;line-height:1.62;margin-bottom:.6rem;max-width:60ch}
.spec ul{margin:0;padding-left:1.1rem}
.spec li{font-size:.95rem;line-height:1.6;margin-bottom:.55rem}
.spec-sw-row{display:grid;grid-template-columns:20px 1fr auto auto;gap:.7rem;align-items:center;
             padding:.35rem 0;font-size:.76rem}
.spec-chip{width:20px;height:20px;border-radius:2px;border:1px solid oklch(0.5 0 0/.35)}
.spec-dim{opacity:.55}
.spec code{font-family:var(--f-chivomono),ui-monospace,monospace}
.spec-foot{display:grid;grid-template-columns:1fr;gap:2rem;margin-top:2.5rem;padding-top:2rem;
           border-top:1px solid currentColor}
@media(min-width:860px){.spec-foot{grid-template-columns:1fr 1fr}}
.spec-foot{border-top-color:oklch(0.5 0 0/.28)}

@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;
