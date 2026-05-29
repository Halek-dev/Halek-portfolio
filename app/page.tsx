"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import BrowserPreview from "@/components/BrowserPreview";
import { usePortfolioData } from "@/components/usePortfolioData";

export default function Home() {
  const { data, loaded } = usePortfolioData();
  const featured = data.projects.filter((p) => p.featured);
  const rest = data.projects.filter((p) => !p.featured);

  return (
    <main className="relative z-10">
      <Nav />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="rise" style={{ animationDelay: "0ms" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-4 py-1.5 text-xs uppercase tracking-widest text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Available for remote work
          </span>
        </div>
        <h1
          className="rise mt-8 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          style={{ animationDelay: "80ms" }}
        >
          I build software
          <br />
          that handles
          <br />
          <span className="text-accent">real money.</span>
        </h1>
        <p
          className="rise mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          {data.bio}
        </p>
        <div className="rise mt-10 flex flex-wrap gap-4" style={{ animationDelay: "240ms" }}>
          <Link
            href="#work"
            className="rounded-full bg-accent px-7 py-3.5 font-medium text-ink transition-transform hover:scale-105"
          >
            See my work
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-edge px-7 py-3.5 font-medium text-bone transition-colors hover:border-bone"
          >
            Get in touch
          </Link>
          {data.resumeUrl && (
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-edge px-7 py-3.5 font-medium text-bone transition-colors hover:border-bone"
            >
              Download CV
            </a>
          )}
        </div>
        <p className="mt-6 font-mono text-sm text-muted">
          {data.handle} · {data.location}
        </p>
      </section>

      {/* MARQUEE */}
      <div className="relative overflow-hidden border-y border-edge bg-surface/50 py-5">
        <div className="marquee flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {["Next.js", "React", "TypeScript", "PostgreSQL", "Node.js", "Paystack", "Escrow Systems", "Tailwind"].map(
                (t) => (
                  <span key={t} className="mx-6 font-display text-2xl text-bone/40">
                    {t} <span className="text-accent">/</span>
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Selected work
          </h2>
          <span className="font-mono text-sm text-muted">{data.projects.length} projects</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-edge bg-surface p-8 transition-all hover:border-accent/40"
            >
              <BrowserPreview image={p.image} url={p.url} name={p.name} />
              <div className="mt-6 flex items-start justify-between">
                <h3 className="font-display text-3xl font-semibold tracking-tight">{p.name}</h3>
                <span className="font-mono text-xs text-muted">{p.year}</span>
              </div>
              <p className="mt-1 text-accent">{p.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-edge px-3 py-1 font-mono text-xs text-bone/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-bone transition-colors group-hover:text-accent">
                Visit live site →
              </span>
            </a>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {rest.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-edge bg-surface/60 p-6 transition-all hover:border-accent2/40"
              >
                <BrowserPreview image={p.image} url={p.url} name={p.name} />
                <div className="mt-5 flex items-start justify-between">
                  <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                </div>
                <p className="mt-1 text-sm text-accent2">{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-xs text-bone/50">
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          What I work with
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.skills.map((cat) => (
            <div key={cat.category} className="rounded-3xl border border-edge bg-surface p-6">
              <h3 className="font-mono text-sm uppercase tracking-widest text-accent">
                {cat.category}
              </h3>
              <ul className="mt-4 space-y-2">
                {cat.items.map((i) => (
                  <li key={i} className="text-bone/80">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="mb-12 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            What people say
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {data.testimonials.map((t, i) => (
              <figure key={i} className="rounded-3xl border border-edge bg-surface p-8">
                <blockquote className="font-display text-xl leading-relaxed text-bone/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent2/20 font-mono text-sm text-accent2">
                    {t.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block text-bone">{t.name}</span>
                    <span className="block font-mono text-xs text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-[2rem] border border-edge bg-gradient-to-br from-surface to-ink p-10 md:p-16">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Let's build
            <br />
            <span className="text-accent">something solid.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Open to remote contracts and freelance projects worldwide — fintech, marketplaces,
            SaaS, and anything that needs to be reliable under real load.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-2xl border border-edge bg-surface/60 p-5 transition-colors hover:border-accent/50"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-muted">
                  {c.label}
                </div>
                <div className="mt-1 truncate text-bone">{c.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-edge pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-sm text-muted">
            © {new Date().getFullYear()} {data.name} ({data.handle})
          </p>
          <Link href="/admin" className="font-mono text-xs text-edge transition-colors hover:text-muted">
            admin
          </Link>
        </div>
      </footer>
    </main>
  );
}
