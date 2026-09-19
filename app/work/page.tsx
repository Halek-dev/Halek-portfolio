import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyCard from "@/components/CaseStudyCard";
import {
  defaultData as data,
  getDecisionProjects,
  getOtherProjects,
  usableContacts,
} from "@/lib/data";
import { HERO } from "@/lib/offer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — escrow marketplaces, fintech and production web apps",
  description:
    "Four case studies: an escrow-first marketplace, a creator CRM, a café ordering system and a local-only batch video tool. Each one states the hardest technical decision and what it cost.",
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: "Work — Olalekan Kazeem (Halek)",
    description: "Four case studies, each stating the hardest technical decision and its tradeoff.",
    url: `${SITE_URL}/work`,
  },
};

export default function WorkIndex() {
  const studies = getDecisionProjects();
  const others = getOtherProjects();
  const contacts = usableContacts(data);

  return (
    <>
      <Nav />
      <main id="main">
        {/* ══ MASTHEAD ══════════════════════════════════════════ */}
        <section className="mx-auto max-w-doc px-5 pb-12 pt-12 sm:px-8 md:pb-16 md:pt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-3.5 text-sm">
            <span className="font-semibold">{data.name}</span>
            <span className="text-ink-50">{data.role}</span>
            <span className="text-ink-50">{data.location}</span>
          </div>

          <h1 className="mt-10 max-w-[16ch] text-display font-extrabold md:mt-14">
            I build the parts
            <br />
            of a product that
            <br />
            <span className="text-red">cannot be wrong.</span>
          </h1>

          <p className="mt-9 max-w-read font-serif text-[1.14rem] leading-[1.66] text-ink-70">
            {data.bio}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href={HERO.ctaHref}
              className="bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red"
            >
              {HERO.cta} →
            </Link>
            {data.email && (
              <a href={`mailto:${data.email}`} className="hit link-draw text-sm font-semibold">
                {data.email}
              </a>
            )}
            {data.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hit link-draw text-sm font-semibold text-ink-70"
              >
                Download CV
              </a>
            )}
          </div>
        </section>

        {/* ══ CASE STUDIES — the ink ground, decision-first ═════ */}
        <section aria-label="Case studies" className="border-t border-ink bg-ink text-paper">
          <div className="mx-auto max-w-doc px-5 py-12 sm:px-8 md:py-16">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-paper pb-3">
              <h2 className="text-head font-extrabold">Case studies</h2>
              <span className="text-sm text-paper-4">
                {studies.length} builds · the decision and what it cost
              </span>
            </div>

            <div className="mt-10">
              {studies.map((p, i) => (
                <CaseStudyCard key={p.id} project={p} index={i + 1} />
              ))}
            </div>

            {others.length > 0 && (
              <p className="mt-10 border-t border-rule-ink pt-6 text-[0.9rem] text-paper-4">
                Also shipped:{" "}
                {others.map((p, i) => (
                  <span key={p.id}>
                    {i > 0 && ", "}
                    <Link
                      href={`/work/${p.id}`}
                      className="hit text-paper-3 underline decoration-paper-4 underline-offset-4 transition-colors hover:text-paper"
                    >
                      {p.name}
                    </Link>
                    <span className="text-paper-4"> ({p.tagline})</span>
                  </span>
                ))}
                .
              </p>
            )}
          </div>
        </section>

        {/* ══ STACK ═════════════════════════════════════════════ */}
        <section id="skills" className="scroll-mt-20 border-t border-rule bg-paper-2">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-20">
            <div className="border-b-2 border-ink pb-3">
              <h2 className="text-head font-extrabold">What I work with</h2>
            </div>

            <dl className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              {data.skills.map((cat) => (
                <div key={cat.category} className="border-b border-rule py-6">
                  <dt className="text-2xs font-semibold uppercase tracking-[0.08em] text-red">
                    {cat.category}
                  </dt>
                  <dd>
                    <ul className="mt-3 space-y-1.5">
                      {cat.items.map((i) => (
                        <li key={i} className="text-[0.95rem] text-ink-70">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ══ TESTIMONIALS — renders only when real ═════════════ */}
        {data.testimonials.length > 0 && (
          <section className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-24">
            <div className="border-b-2 border-ink pb-3">
              <h2 className="text-head font-extrabold">What people say</h2>
            </div>
            <div className="grid gap-x-12 md:grid-cols-2">
              {data.testimonials.map((t) => (
                <figure key={t.name + t.quote} className="border-b border-rule py-9">
                  <blockquote className="max-w-[34ch] text-xl font-medium leading-snug tracking-[-0.02em]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-ink-50"> — {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ══ CTA ═══════════════════════════════════════════════ */}
        <section id="contact" className="scroll-mt-20 border-t border-ink bg-ink text-paper">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-24">
            <h2 className="max-w-[16ch] text-title font-extrabold">
              Want a piece of this
              <br />
              built for you, free?
            </h2>

            <p className="mt-6 max-w-[52ch] font-serif text-[1.1rem] leading-[1.66] text-paper-3">
              I build one working slice of your product — a core feature, a hero section, or one
              automation — in about three days, at no cost. You keep it either way.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={HERO.ctaHref}
                className="bg-red px-7 py-4 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-red-deep"
              >
                {HERO.cta} →
              </Link>

              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group"
                >
                  <span className="block text-2xs font-semibold uppercase tracking-[0.08em] text-paper-4">
                    {c.label}
                  </span>
                  <span className="mt-1 block border-b border-transparent text-[0.95rem] transition-colors group-hover:border-paper">
                    {c.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
