"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/#work", label: "Work" },
    { href: "/#skills", label: "Skills" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];
  return (
    <nav className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="font-display text-xl font-semibold tracking-tight">
        Halek<span className="text-accent">.</span>
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-muted transition-colors hover:text-bone"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-ink transition-transform hover:scale-105"
        >
          Hire me
        </Link>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="text-bone md:hidden"
        aria-label="Menu"
      >
        <div className="space-y-1.5">
          <span className="block h-0.5 w-6 bg-bone" />
          <span className="block h-0.5 w-6 bg-bone" />
        </div>
      </button>
      {open && (
        <div className="absolute right-6 top-20 flex flex-col gap-4 rounded-2xl border border-edge bg-surface p-6 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted hover:text-bone"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
