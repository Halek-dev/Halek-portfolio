import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Notes on full-stack development, fintech & escrow systems",
  description:
    "Articles on building escrow marketplaces, fintech apps, payment integrations, Next.js architecture and shipping production SaaS — by full-stack developer Halek.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main className="relative z-10">
      <Nav />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
          The <span className="text-accent">Blog</span>
        </h1>
        <p className="mt-4 text-lg text-muted">
          Practical notes on building marketplaces, fintech systems, and production web apps.
        </p>

        <div className="mt-12 space-y-2">
          {posts.length === 0 && (
            <p className="text-muted">No posts yet — add MDX files to <code>content/blog</code>.</p>
          )}
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block rounded-2xl border border-transparent p-6 transition-all hover:border-edge hover:bg-surface"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {p.title}
                </h2>
                <span className="shrink-0 font-mono text-xs text-muted">{p.date}</span>
              </div>
              <p className="mt-2 text-muted">{p.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-muted">{p.readingTime}</span>
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-edge px-2.5 py-0.5 font-mono text-xs text-bone/60">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
