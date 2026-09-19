import type { Metadata } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";
import SetupNotice from "@/components/SetupNotice";

// Franklin Gothic lineage: newsroom authority, no softness, and a
// weight range wide enough to carry the whole page on its own.
const sans = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Reserved for prose. The serif earns its place on paragraphs, never on headings.
const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
  title: {
    default: "HALEK — one real piece of your product, built free",
    template: "%s · HALEK",
  },
  description:
    "A working slice of your actual product — one core feature, a hero section, or one automation — built free in about three days. You keep it. Full-stack builds with Next.js, TypeScript and PostgreSQL.",
  keywords: [
    "free web app prototype",
    "free website build",
    "full-stack developer",
    "next.js developer for hire",
    "escrow marketplace developer",
    "fintech developer",
    "react developer",
    "saas developer",
    "freelance web developer",
    "business automation developer",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    title: "HALEK — one real piece of your product, built free",
    description:
      "A working slice of your actual product, built free in about three days. You keep it either way.",
    url: SITE_URL,
    siteName: "HALEK",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "HALEK — free build slice" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HALEK — one real piece of your product, built free",
    description:
      "A working slice of your actual product, built free in about three days. You keep it either way.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-menu focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        {children}
        <SetupNotice />
        <Analytics />
      </body>
    </html>
  );
}
