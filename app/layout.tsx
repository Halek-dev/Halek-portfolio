import type { Metadata } from "next";
import { Fraunces, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-display",
  display: "swap",
});
const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
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
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-bone font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
