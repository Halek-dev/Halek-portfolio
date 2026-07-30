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
    default: "Olalekan Kazeem (Halek) — Full-Stack Developer",
    template: "%s · Halek",
  },
  description:
    "Full-stack developer building escrow marketplaces, fintech apps, creator CRMs and production web platforms with Next.js, React and PostgreSQL. Available for remote work worldwide.",
  keywords: [
    "full-stack developer",
    "next.js developer for hire",
    "escrow marketplace developer",
    "fintech developer",
    "react developer",
    "saas developer",
    "freelance web developer",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    title: "Olalekan Kazeem (Halek) — Full-Stack Developer",
    description:
      "Full-stack developer building escrow marketplaces, fintech apps and production web platforms.",
    url: SITE_URL,
    siteName: "Halek",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Halek — Full-Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olalekan Kazeem (Halek) — Full-Stack Developer",
    description:
      "Full-stack developer building escrow marketplaces, fintech apps and production web platforms.",
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
