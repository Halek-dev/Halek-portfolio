"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { defaultData } from "@/lib/data";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/#skills", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

/**
 * The masthead of a document, not a floating pill nav: a rule under the
 * page, the name on the left, status on the right.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Route change closes the menu; Escape closes it from the keyboard.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-nav border-b border-ink bg-paper">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-doc items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
      >
        <Link
          href="/"
          className="py-1 text-[0.95rem] font-extrabold tracking-[-0.03em] transition-colors hover:text-red"
        >
          {defaultData.name}
          <span className="text-red">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`py-1 text-sm transition-colors hover:text-ink ${
                isActive(l.href) ? "text-ink" : "text-ink-50"
              }`}
            >
              {l.label}
            </a>
          ))}
          <span className="flex items-center gap-2 text-sm font-semibold text-red">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-red motion-safe:animate-pulse"
            />
            {defaultData.availability.startsWith("Available") ? "Available" : "Status"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-1 flex items-center gap-2 px-1 py-1 text-sm font-semibold md:hidden"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-[1.5px] w-4 bg-ink transition-transform duration-200 ease-out-quint ${
                open ? "top-1.5 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] w-4 bg-ink transition-transform duration-200 ease-out-quint ${
                open ? "top-1.5 -rotate-45" : "top-2.5"
              }`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-rule bg-paper md:hidden">
          <div className="mx-auto max-w-doc px-5 py-2 sm:px-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-rule py-3.5 text-base font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="my-4 block bg-red px-5 py-3.5 text-center text-sm font-semibold text-paper"
            >
              Hire me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
