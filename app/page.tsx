import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { defaultData as data } from "@/lib/data";
import { BRAND, HERO, SLICES, STEPS, TERMS, FINAL_CTA } from "@/lib/offer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `${BRAND} — one real piece of your product, built free`,
  description:
    "A working slice of your actual product — one core feature, a hero section, or one automation — built free in about three days. You keep it. In exchange: a testimonial and one real introduction.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${BRAND} — one real piece of your product, built free`,
    description:
      "A working slice of your actual product, built free in about three days. You keep it either way.",
    url: SITE_URL,
  },
};

export default function Home() {
  const proof = data.projects;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${BRAND} — free build slice`,
    serviceType: SLICES.map((s) => s.service),
    provider: {
      "@type": "Person",
      name: data.name,
      alternateName: data.handle,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    description: HERO.lede,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "One fixed-scope deliverable, one revision round, delivered in about three days.",
    },
  };

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main">
        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="mx-auto max-w-doc px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-3.5 text-sm">
            <span className="font-semibold">{data.role}</span>
            <span className="text-ink-50">Web apps · websites · automation</span>
            <span className="flex items-center gap-2 font-semibold text-red">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
              {HERO.eyebrow}
            </span>
          </div>

          <h1 className="rise mt-10 text-display font-extrabold md:mt-14">
            {HERO.headline.map((line, i) => (
              <span key={line} className="block">
                {line === HERO.accent ? <span className="text-red">{line}</span> : line}
                {i < HERO.headline.length - 1 && <span className="sr-only"> </span>}
              </span>
            ))}
          </h1>

          <p
            className="rise mt-9 max-w-read font-serif text-[1.14rem] leading-[1.66] text-ink-70"
            style={{ animationDelay: "90ms" }}
          >
            {HERO.lede}
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
            style={{ animationDelay: "160ms" }}
          >
            <Link
              href={HERO.ctaHref}
              className="bg-red px-7 py-4 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-red-deep"
            >
              {HERO.cta} →
            </Link>
            <a href="#proof" className="hit link-draw text-sm font-semibold text-ink-70">
              See what I&apos;ve already shipped
            </a>
          </div>

          <div className="rule-strip rise mt-12" style={{ animationDelay: "230ms" }}>
            {[
              ["Cost", "Nothing, ever"],
              ["Scope", "Fixed, agreed up front"],
              ["Revisions", "One round"],
              ["Delivery", "About three days"],
            ].map(([k, v]) => (
              <div key={k} className="rule-cell">
                <span className="block text-2xs font-semibold text-ink-50">{k}</span>
                <span className="mt-1 block text-[0.95rem] font-medium">{v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══ THE THREE SLICES ══════════════════════════════════ */}
        <section id="slices" className="scroll-mt-20 border-t border-rule bg-paper-2">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-20">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
              <h2 className="text-head font-extrabold">Pick your slice</h2>
              <span className="text-sm text-ink-50">Three services · one free deliverable each</span>
            </div>

            <p className="mt-5 max-w-read font-serif text-[1.08rem] leading-[1.66] text-ink-70">
              The scope is deliberately narrow. A slice you can judge in five minutes is worth more
              to both of us than a promise that takes a month to test.
            </p>

            <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
              {SLICES.map((s, i) => (
                <article key={s.id} className="flex flex-col border-t-2 border-ink pt-5">
                  <span className="text-2xs font-semibold tracking-[0.1em] text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[1.4rem] font-extrabold leading-tight">{s.service}</h3>

                  <p className="mt-3 text-[1.02rem] font-semibold leading-snug">{s.deliverable}</p>

                  <p className="mb-8 mt-4 font-serif text-[1.02rem] leading-[1.62] text-ink-70">
                    {s.detail}
                  </p>

                  {/* mt-auto pins all three spec blocks to one baseline
                      regardless of how long the prose above runs */}
                  <dl className="mt-auto border-t border-rule pt-4 text-[0.9rem]">
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-2xs font-semibold text-ink-50">
                        Ships in
                      </dt>
                      <dd className="font-medium">{s.ships}</dd>
                    </div>
                    <div className="mt-2.5 flex gap-3">
                      <dt className="w-24 shrink-0 text-2xs font-semibold text-ink-50">
                        Not included
                      </dt>
                      <dd className="text-ink-70">{s.notIncluded}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
        <section id="how" className="scroll-mt-20">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-24">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
              <h2 className="text-head font-extrabold">How it works</h2>
              <span className="text-sm text-ink-50">Form to delivered, four steps</span>
            </div>

            <ol className="mt-10 space-y-11">
              {STEPS.map((s) => (
                <li key={s.n} className="grid gap-x-10 gap-y-3 lg:grid-cols-[4rem_1fr]">
                  <span className="text-2xl font-extrabold tracking-[-0.03em] text-red">{s.n}</span>
                  <div>
                    <h3 className="text-[1.35rem] font-extrabold leading-tight">{s.title}</h3>
                    <p className="mt-3 max-w-read font-serif text-[1.08rem] leading-[1.66] text-ink-70">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ══ PROOF ═════════════════════════════════════════════ */}
        <section id="proof" className="scroll-mt-20 border-t border-rule bg-paper-2">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-20">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
              <h2 className="text-head font-extrabold">Built already</h2>
              <Link href="/work" className="hit link-draw text-sm font-semibold">
                All {proof.length} projects →
              </Link>
            </div>

            <p className="mt-5 max-w-read font-serif text-[1.08rem] leading-[1.66] text-ink-70">
              Every one of these is live and handling real users or real money. The free slice is a
              sample of the same work, not a different standard.
            </p>

            <ul className="mt-8">
              {proof.map((p) => {
                const metric = p.caseStudy?.metrics[0];
                const inner = (
                  <>
                    <span className="flex items-baseline gap-3">
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 shrink-0 translate-y-px rounded-full"
                        style={{ background: p.panel.bg }}
                      />
                      <span className="text-[1.1rem] font-bold transition-colors group-hover:text-red">
                        {p.name}
                      </span>
                    </span>
                    <span className="text-sm text-ink-70">{p.tagline}</span>
                    <span className="text-sm font-semibold text-red">
                      {metric ? `${metric.value} ${metric.label}` : p.stack[0]}
                    </span>
                  </>
                );

                const cls =
                  "group grid items-baseline gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[minmax(0,12rem)_1fr_auto]";

                return (
                  <li key={p.id}>
                    {p.caseStudy ? (
                      <Link href={`/work/${p.id}`} className={cls}>
                        {inner}
                      </Link>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ══ REFERRAL TERMS ════════════════════════════════════ */}
        <section id="terms" className="scroll-mt-20">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-24">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
              <h2 className="text-head font-extrabold">The exchange</h2>
              <span className="text-sm text-ink-50">Plainly, so there&apos;s nothing to discover later</span>
            </div>

            <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-2">
              {(
                [
                  ["What you give", TERMS.give],
                  ["What you get", TERMS.get],
                ] as const
              ).map(([heading, items]) => (
                <div key={heading}>
                  <h3 className="text-2xs font-semibold uppercase tracking-[0.1em] text-red">
                    {heading}
                  </h3>
                  <dl className="mt-4">
                    {items.map((t) => (
                      <div key={t.k} className="border-t border-rule py-5">
                        <dt className="text-[1.1rem] font-extrabold tracking-[-0.02em]">{t.k}</dt>
                        <dd className="mt-2 max-w-[46ch] font-serif text-[1.02rem] leading-[1.62] text-ink-70">
                          {t.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-read border-t-2 border-ink pt-5 text-[0.95rem] text-ink-70">
              <strong className="font-semibold text-ink">No obligation to hire me.</strong>{" "}
              The slice is free because it&apos;s the cheapest way for you to find out whether I&apos;m
              any good — not because it buys a commitment. If you don&apos;t want the full build,
              say so and we&apos;re done.
            </p>
          </div>
        </section>

        {/* ══ FINAL CTA ═════════════════════════════════════════ */}
        <section className="border-t border-ink bg-ink text-paper">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-24">
            <h2 className="max-w-[16ch] text-title font-extrabold">
              {FINAL_CTA.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-6 max-w-[52ch] font-serif text-[1.1rem] leading-[1.66] text-paper-3">
              {FINAL_CTA.body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={FINAL_CTA.ctaHref}
                className="bg-red px-7 py-4 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-red-deep"
              >
                {FINAL_CTA.cta} →
              </Link>
              <span className="text-[0.95rem] text-paper-4">
                Takes two minutes · no call required
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
