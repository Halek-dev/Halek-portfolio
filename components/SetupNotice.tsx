import { defaultData } from "@/lib/data";
import { SITE_URL_IS_PLACEHOLDER, SITE_URL } from "@/lib/site";

/**
 * Development-only checklist. Renders nothing in production builds, so it
 * can never ship — it exists so unconfigured placeholders are impossible
 * to forget rather than discovered by a client.
 */
export default function SetupNotice() {
  if (process.env.NODE_ENV === "production") return null;

  const todo: string[] = [];

  if (SITE_URL_IS_PLACEHOLDER) {
    todo.push(
      `SITE_URL is the fallback (${SITE_URL}). Set NEXT_PUBLIC_SITE_URL or edit lib/site.ts — this feeds canonicals, sitemap, robots and every OG image.`
    );
  }
  if (!defaultData.email) {
    todo.push("No email set in lib/data.ts — the contact section's primary CTA is hidden.");
  }
  if (!defaultData.resumeUrl) {
    todo.push("No resumeUrl — the Download CV button is hidden. Add public/resume.pdf.");
  }
  if (defaultData.testimonials.length === 0) {
    todo.push("No testimonials — that section is hidden. Add real quotes when you have them.");
  }
  const years = new Set(defaultData.projects.map((p) => p.year));
  if (years.size === 1) {
    todo.push(
      `All ${defaultData.projects.length} projects are dated ${[...years][0]}. Uniform dates read as filler — set real ones.`
    );
  }

  if (todo.length === 0) return null;

  return (
    <aside className="fixed bottom-3 left-3 z-menu max-w-sm border border-ink bg-paper p-3 text-xs shadow-lg">
      <p className="font-semibold uppercase tracking-[0.08em] text-red">
        Dev only — {todo.length} thing{todo.length > 1 ? "s" : ""} to set
      </p>
      <ul className="mt-2 space-y-1.5 text-ink-70">
        {todo.map((t) => (
          <li key={t} className="leading-snug">
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}
