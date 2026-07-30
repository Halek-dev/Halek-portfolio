import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { defaultData, getCaseStudyProjects, getProject } from "@/lib/data";
import { getPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project?.caseStudy) return {};

  const title = `${project.name} — ${project.tagline}`;
  const description = project.caseStudy.problem.slice(0, 155).trimEnd() + "…";

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/work/${project.id}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/work/${project.id}`,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project?.caseStudy) notFound();

  const cs = project.caseStudy;
  const { panel } = project;

  const related = cs.writing.map((slug) => getPost(slug)).filter((p): p is NonNullable<typeof p> => !!p);

  const others = getCaseStudyProjects().filter((p) => p.id !== project.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: `${SITE_URL}/work/${project.id}`,
    dateCreated: project.year,
    creator: { "@type": "Person", name: defaultData.name, alternateName: defaultData.handle },
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main">
        {/* ══ drenched header — the panel colour carries over ═════ */}
        <header
          style={
            {
              "--bg": panel.bg,
              "--fg": panel.fg,
              "--ac": panel.ac,
              "--mut": panel.mut,
            } as React.CSSProperties
          }
          className="bg-[var(--bg)] text-[var(--fg)]"
        >
          <div className="mx-auto max-w-doc px-5 py-12 sm:px-8 md:py-16">
            <Link href="/#work" className="hit text-sm text-[var(--mut)] transition-colors hover:text-[var(--fg)]">
              ← All work
            </Link>

            <h1 className="mt-7 text-display font-extrabold">{project.name}</h1>
            <p className="mt-3 text-lg text-[var(--ac)] sm:text-xl">{project.tagline}</p>

            <dl className="mt-11 grid gap-x-8 gap-y-6 border-t border-[color-mix(in_oklch,currentColor_28%,transparent)] pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Role", cs.role],
                ["Timeline", cs.timeline],
                ["Stack", project.stack.join(", ")],
                ["Live at", new URL(project.url).host],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-2xs font-semibold uppercase tracking-[0.08em] text-[var(--mut)]">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>

            {project.image && (
              <div className="panel-shot mt-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.alt ?? `${project.name} — product screenshot`}
                  width={1920}
                  height={960}
                  className="block w-full shadow-[0_28px_80px_oklch(0_0_0/0.34)]"
                />
              </div>
            )}
          </div>
        </header>

        {/* ══ the document resumes ═══════════════════════════════ */}
        <div className="mx-auto max-w-doc px-5 sm:px-8">
          <section className="grid gap-x-14 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <div>
              <h2 className="text-2xs font-semibold uppercase tracking-[0.1em] text-red">
                The problem
              </h2>
              <p className="mt-4 max-w-read font-serif text-[1.2rem] leading-[1.62] text-ink">
                {cs.problem}
              </p>

              <div className="mt-14 space-y-12">
                {cs.sections.map((s, i) => (
                  <section key={s.heading}>
                    <div className="flex items-baseline gap-4 border-b border-rule pb-2.5">
                      <span className="text-sm font-bold text-red">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[1.35rem] font-extrabold leading-tight">{s.heading}</h3>
                    </div>
                    <p className="mt-4 max-w-read font-serif text-[1.1rem] leading-[1.68] text-ink-70">
                      {s.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            {/* ── figures rail ── */}
            <aside className="mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-24">
                {cs.metrics.length > 0 && (
                  <>
                    <h2 className="border-b-2 border-ink pb-2 text-2xs font-semibold uppercase tracking-[0.1em]">
                      Figures
                    </h2>
                    <dl>
                      {cs.metrics.map((m) => (
                        <div key={m.label} className="border-b border-rule py-3.5">
                          <dd className="text-2xl font-extrabold tracking-[-0.03em] text-red">
                            {m.value}
                          </dd>
                          <dt className="mt-0.5 text-2xs text-ink-50">{m.label}</dt>
                        </div>
                      ))}
                    </dl>
                  </>
                )}

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 block bg-ink px-5 py-3.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-red"
                >
                  Visit {new URL(project.url).host} ↗
                </a>
              </div>
            </aside>
          </section>

          {/* ══ the writing that explains the techniques ═════════ */}
          {related.length > 0 && (
            <section className="border-t border-rule py-14 md:py-16">
              <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
                <h2 className="text-head font-extrabold">How this works, in detail</h2>
                <span className="text-sm text-ink-50">{related.length} posts</span>
              </div>
              <p className="mt-4 max-w-read text-[0.975rem] text-ink-70">
                I wrote up the techniques behind this build as I went.
              </p>

              <ul className="mt-6">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group grid gap-x-6 gap-y-1 border-b border-rule py-4 transition-colors hover:bg-paper-2 sm:grid-cols-[1fr_auto] sm:items-baseline"
                    >
                      <span className="text-[1.05rem] font-bold leading-snug transition-colors group-hover:text-red">
                        {p.title}
                      </span>
                      <span className="whitespace-nowrap text-2xs text-ink-50">
                        {p.readingTime}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ══ next ══════════════════════════════════════════════ */}
          {others.length > 0 && (
            <section className="border-t border-rule py-14 md:py-16">
              <h2 className="border-b-2 border-ink pb-3 text-head font-extrabold">Other work</h2>
              <ul>
                {others.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/work/${p.id}`}
                      className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4"
                    >
                      <span className="flex items-baseline gap-3">
                        <span
                          aria-hidden
                          className="h-2.5 w-2.5 translate-y-px rounded-full"
                          style={{ background: p.panel.bg }}
                        />
                        <span className="text-[1.05rem] font-bold transition-colors group-hover:text-red">
                          {p.name}
                        </span>
                      </span>
                      <span className="text-sm text-ink-50">{p.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ══ CTA ═══════════════════════════════════════════════ */}
          <section className="border-t-2 border-ink py-14 md:py-16">
            <h2 className="max-w-[18ch] text-title font-extrabold">
              Need something like this built?
            </h2>
            <p className="mt-4 max-w-[52ch] font-serif text-[1.1rem] leading-[1.66] text-ink-70">
              I take on remote contracts for marketplaces, fintech and SaaS products.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              {defaultData.email ? (
                <a
                  href={`mailto:${defaultData.email}`}
                  className="bg-red px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red-deep"
                >
                  {defaultData.email}
                </a>
              ) : (
                <Link
                  href="/#contact"
                  className="bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red"
                >
                  Get in touch →
                </Link>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
