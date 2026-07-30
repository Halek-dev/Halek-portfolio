import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing — notes on escrow, payments and shipping production software",
  description:
    "Articles on building escrow marketplaces, fintech apps, payment integrations, Next.js architecture and shipping production SaaS — by full-stack developer Halek.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  // Group by year so the archive reads as a record rather than a feed.
  const byYear = posts.reduce<Record<string, typeof posts>>((acc, p) => {
    const year = (p.date || "").slice(0, 4) || "Undated";
    (acc[year] ||= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort().reverse();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-doc px-5 sm:px-8">
        <header className="pb-10 pt-12 md:pb-14 md:pt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-3.5 text-sm">
            <span className="font-semibold">Writing</span>
            <span className="text-ink-50">
              {posts.length} posts · escrow, payments, architecture
            </span>
          </div>

          <h1 className="mt-10 max-w-[18ch] text-display font-extrabold md:mt-14">
            Notes from
            <br />
            <span className="text-red">shipping it.</span>
          </h1>

          <p className="mt-8 max-w-read font-serif text-[1.14rem] leading-[1.66] text-ink-70">
            What I learned building escrow marketplaces, payment integrations and production web
            apps — written down while it was still fresh, mostly so I&apos;d stop making the same
            mistakes twice.
          </p>
        </header>

        {posts.length === 0 && (
          <p className="py-16 text-ink-50">
            No posts yet — add MDX files to <code>content/blog</code>.
          </p>
        )}

        {years.map((year) => (
          <section key={year} className="pb-6">
            <div className="sticky top-[3.6rem] z-sticky flex items-baseline justify-between border-b-2 border-ink bg-paper py-2.5">
              <h2 className="text-head font-extrabold">{year}</h2>
              <span className="text-sm text-ink-50">{byYear[year].length} posts</span>
            </div>

            <ul>
              {byYear[year].map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid gap-x-8 gap-y-2 border-b border-rule py-6 transition-colors hover:bg-paper-2 md:grid-cols-[7rem_1fr]"
                  >
                    <span className="pt-1 text-2xs text-ink-50">
                      {p.date}
                      <span className="mt-0.5 block">{p.readingTime}</span>
                    </span>

                    <div>
                      <h3 className="max-w-[34ch] text-[1.3rem] font-extrabold leading-tight tracking-[-0.025em] transition-colors group-hover:text-red">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-read text-[0.975rem] leading-relaxed text-ink-70">
                        {p.description}
                      </p>
                      {p.tags.length > 0 && (
                        <p className="mt-3 text-2xs text-ink-50">{p.tags.join("  ·  ")}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mb-4 mt-10 border-t-2 border-ink py-14">
          <h2 className="max-w-[20ch] text-title font-extrabold">
            Want this built rather than explained?
          </h2>
          <Link
            href="/#contact"
            className="mt-7 inline-block bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red"
          >
            Get in touch →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
