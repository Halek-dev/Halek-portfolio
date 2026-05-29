import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import { getAllSlugs, getPost } from "@/lib/blog";
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
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Olalekan Kazeem", alternateName: "Halek" },
    keywords: post.keywords.join(", "),
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <main className="relative z-10">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/blog" className="font-mono text-sm text-muted hover:text-bone">
          ← all posts
        </Link>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 font-mono text-sm text-muted">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="prose-blog mt-10">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-16 rounded-3xl border border-edge bg-surface p-8">
          <h3 className="font-display text-2xl font-semibold">Need something like this built?</h3>
          <p className="mt-2 text-muted">
            I take on remote contracts for marketplaces, fintech and SaaS products.
          </p>
          <Link
            href="/#contact"
            className="mt-4 inline-block rounded-full bg-accent px-6 py-3 font-medium text-ink"
          >
            Get in touch →
          </Link>
        </div>
      </article>
    </main>
  );
}
