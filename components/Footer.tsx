import Link from "next/link";
import { defaultData, usableContacts } from "@/lib/data";
import { BRAND, HERO } from "@/lib/offer";

export default function Footer() {
  const contacts = usableContacts(defaultData);

  return (
    <footer className="border-t border-ink">
      <div className="mx-auto max-w-doc px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-sm text-ink-50">
            © {new Date().getFullYear()} {BRAND} — {defaultData.name}, {defaultData.location}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hit link-draw text-ink-70 hover:text-ink"
              >
                {c.label}
              </a>
            ))}
            <Link href="/work" className="hit link-draw text-ink-70 hover:text-ink">
              Work
            </Link>
            <Link href="/blog" className="hit link-draw text-ink-70 hover:text-ink">
              Writing
            </Link>
            <Link href={HERO.ctaHref} className="hit font-semibold text-red hover:text-red-deep">
              {HERO.cta}
            </Link>
            <Link href="/admin" className="hit text-ink-50 transition-colors hover:text-ink">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
