import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectPanel from "@/components/ProjectPanel";
import { defaultData as data, usableContacts } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  const projects = data.projects;
  const contacts = usableContacts(data);
  const posts = getAllPosts().slice(0, 4);
  const totalPosts = getAllPosts().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    alternateName: data.handle,
    jobTitle: data.role,
    url: SITE_URL,
    address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    knowsAbout: data.skills.flatMap((s) => s.items),
    sameAs: contacts.filter((c) => c.href.startsWith("http")).map((c) => c.href),
  };

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main">
        {/* ══ MASTHEAD ══════════════════════════════════════════ */}
        <section className="mx-auto max-w-doc px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-3.5 text-sm">
            <span className="font-semibold">{data.role}</span>
            <span className="text-ink-50">Payments · marketplaces · ledgers</span>
            <span className="flex items-center gap-2 font-semibold text-red">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
              {data.availability}
            </span>
          </div>

          <h1 className="rise mt-10 text-display font-extrabold md:mt-14">
            I build the parts
            <br />
            of a product that
            <br />
            <span className="text-red">cannot be wrong.</span>
          </h1>

          <div
            className="rule-strip rise mt-11 md:mt-14"
            style={{ animationDelay: "90ms" }}
          >
            {[
              ["Based", data.location],
              ["Working", "Remote, worldwide"],
              ["Focus", "Escrow · payouts · ledgers"],
              ["Shipped", `${projects.length} live products`],
            ].map(([k, v]) => (
              <div key={k} className="rule-cell">
                <span className="block text-2xs font-semibold text-ink-50">{k}</span>
                <span className="mt-1 block text-[0.95rem] font-medium">{v}</span>
              </div>
            ))}
          </div>

          <p
            className="rise mt-10 max-w-read font-serif text-[1.14rem] leading-[1.66] text-ink-70"
            style={{ animationDelay: "160ms" }}
          >
            {data.bio}
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
            style={{ animationDelay: "230ms" }}
          >
            <a
              href="#work"
              className="bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red"
            >
              See the work
            </a>
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="hit link-draw text-sm font-semibold"
              >
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

        {/* ══ WORK — the document breaks for drenched panels ═════ */}
        <section id="work" className="scroll-mt-20">
          <div className="mx-auto max-w-doc px-5 sm:px-8">
            <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
              <h2 className="text-head font-extrabold">Selected work</h2>
              <span className="text-sm text-ink-50">
                {projects.length} live · 2025–2026
              </span>
            </div>
          </div>

          {projects.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i + 1} flip={i % 2 === 1} />
          ))}
        </section>

        {/* ══ WRITING ═══════════════════════════════════════════ */}
        {posts.length > 0 && (
          <section className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-24">
            <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
              <h2 className="text-head font-extrabold">Writing</h2>
              <Link href="/blog" className="hit link-draw text-sm font-semibold">
                All {totalPosts} posts →
              </Link>
            </div>

            <ul>
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid gap-x-6 gap-y-1 border-b border-rule py-5 transition-colors hover:bg-paper-2 sm:grid-cols-[1fr_auto] sm:items-baseline"
                  >
                    <div>
                      <h3 className="text-[1.15rem] font-bold leading-snug transition-colors group-hover:text-red">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 max-w-[62ch] text-[0.925rem] leading-relaxed text-ink-70">
                        {p.description}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-2xs text-ink-50">
                      {p.date} · {p.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ══ STACK ═════════════════════════════════════════════ */}
        <section id="skills" className="scroll-mt-20 border-t border-rule bg-paper-2">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-20">
            <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
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

        {/* ══ CONTACT ═══════════════════════════════════════════ */}
        <section id="contact" className="scroll-mt-20 border-t border-ink bg-ink text-paper">
          <div className="mx-auto max-w-doc px-5 py-16 sm:px-8 md:py-24">
            <h2 className="max-w-[16ch] text-title font-extrabold">
              Let&apos;s build something
              <br />
              that holds up.
            </h2>

            <p className="mt-6 max-w-[52ch] font-serif text-[1.1rem] leading-[1.66] text-paper-3">
              Open to remote contracts and freelance work worldwide — fintech, marketplaces, SaaS,
              and anything that has to stay correct under real load.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {data.email ? (
                <a
                  href={`mailto:${data.email}`}
                  className="bg-red px-7 py-4 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-red-deep"
                >
                  {data.email}
                </a>
              ) : (
                <span className="border border-[oklch(0.928_0_0/0.3)] px-7 py-4 text-[0.95rem] text-paper-3">
                  Email not configured yet
                </span>
              )}

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
