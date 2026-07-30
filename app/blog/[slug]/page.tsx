import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts, getAllSlugs, getPost } from "@/lib/blog";
import { defaultData } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og.png"],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // Projects whose case studies cite this post — the writing and the work
  // point at each other rather than living in separate silos.
  const usedIn = defaultData.projects.filter((p) => p.caseStudy?.writing.includes(post.slug));

  // Nearest neighbours by shared tag, falling back to recency.
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const related = others
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, 3)
    .map((r) => r.p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: defaultData.name,
      alternateName: defaultData.handle,
      url: SITE_URL,
    },
    keywords: post.keywords.join(", "),
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main" className="mx-auto max-w-doc px-5 sm:px-8">
        <article className="pt-10 md:pt-14">
          <Link href="/blog" className="hit text-sm text-ink-50 transition-colors hover:text-ink">
            ← All writing
          </Link>

          <header className="mt-7 border-b-2 border-ink pb-6">
            <h1 className="max-w-[22ch] text-title font-extrabold">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1.5 text-2xs text-ink-50">
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
              {post.tags.length > 0 && <span>{post.tags.join("  ·  ")}</span>}
            </div>
          </header>

          <div className="prose-doc mt-10">
            <MDXRemote source={post.content} />
          </div>
        </article>

        {/* ── the work this technique is actually running in ── */}
        {usedIn.length > 0 && (
          <section className="mt-16 border-t border-rule pt-8">
            <h2 className="text-2xs font-semibold uppercase tracking-[0.1em] text-red">
              Running in production
            </h2>
            <ul className="mt-4">
              {usedIn.map((p) => (
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

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="border-b-2 border-ink pb-2.5 text-2xs font-semibold uppercase tracking-[0.1em]">
              Read next
            </h2>
            <ul>
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid gap-x-6 gap-y-1 border-b border-rule py-4 transition-colors hover:bg-paper-2 sm:grid-cols-[1fr_auto] sm:items-baseline"
                  >
                    <span className="max-w-[52ch] text-[1.05rem] font-bold leading-snug transition-colors group-hover:text-red">
                      {p.title}
                    </span>
                    <span className="whitespace-nowrap text-2xs text-ink-50">{p.readingTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-4 mt-14 border-t-2 border-ink py-12">
          <h2 className="max-w-[20ch] text-title font-extrabold">Need something like this built?</h2>
          <p className="mt-4 max-w-[52ch] font-serif text-[1.1rem] leading-[1.66] text-ink-70">
            I take on remote contracts for marketplaces, fintech and SaaS products.
          </p>
          <div className="mt-7">
            {defaultData.email ? (
              <a
                href={`mailto:${defaultData.email}`}
                className="inline-block bg-red px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red-deep"
              >
                {defaultData.email}
              </a>
            ) : (
              <Link
                href="/#contact"
                className="inline-block bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red"
              >
                Get in touch →
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
