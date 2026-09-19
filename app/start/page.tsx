import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StartForm from "@/components/StartForm";
import { SLICES } from "@/lib/offer";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Claim a free build",
  description:
    "Tell me what you're building and I'll build one working slice of it free, in about three days. Two minutes, no call required.",
  alternates: { canonical: `${SITE_URL}/start` },
  // A form page has nothing to rank for and shouldn't compete with the
  // landing page in search results.
  robots: { index: false, follow: true },
};

export default function Start() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-doc px-5 sm:px-8">
        <header className="pb-10 pt-12 md:pt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink pb-3.5 text-sm">
            <span className="font-semibold">Claim a free build</span>
            <span className="text-ink-50">Four questions · about two minutes</span>
          </div>

          <h1 className="rise mt-10 max-w-[16ch] text-display font-extrabold md:mt-12">
            Tell me what
            <br />
            <span className="text-red">you&apos;re building.</span>
          </h1>

          <p
            className="rise mt-8 max-w-read font-serif text-[1.14rem] leading-[1.66] text-ink-70"
            style={{ animationDelay: "90ms" }}
          >
            I read every one of these myself. If it&apos;s a fit, I&apos;ll come back with the exact
            slice I&apos;d build and what &ldquo;done&rdquo; means, before I write any code. If it
            isn&apos;t, I&apos;ll say so quickly rather than leave you in a queue.
          </p>

          <ul
            className="rise mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[0.9rem] text-ink-50"
            style={{ animationDelay: "160ms" }}
          >
            {SLICES.map((s) => (
              <li key={s.id}>
                <span className="font-semibold text-ink">{s.service}</span> — {s.deliverable}
              </li>
            ))}
          </ul>
        </header>

        <div className="rise" style={{ animationDelay: "230ms" }}>
          <StartForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
