import Link from "next/link";
import type { Project } from "@/lib/data";

/**
 * A full-bleed section drenched in the product's own brand colour.
 * The document chrome around it never changes; only these do. That
 * discipline is what keeps five saturated panels from becoming noise.
 */
export default function ProjectPanel({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip?: boolean;
}) {
  const { panel, caseStudy } = project;

  return (
    <section
      aria-labelledby={`panel-${project.id}`}
      style={
        {
          "--bg": panel.bg,
          "--fg": panel.fg,
          "--ac": panel.ac,
          "--mut": panel.mut,
        } as React.CSSProperties
      }
      className="bg-[var(--bg)] text-[var(--fg)]"
    >
      <div
        className={`mx-auto grid max-w-doc items-center gap-8 px-5 py-14 sm:px-8 md:gap-14 md:py-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:py-24 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <span className="text-2xs font-semibold tracking-[0.1em] text-[var(--mut)]">
            {String(index).padStart(2, "0")} / {project.year}
          </span>

          <h3
            id={`panel-${project.id}`}
            className="mt-3 text-title font-extrabold"
          >
            {project.name}
          </h3>

          <p className="mt-2 text-base text-[var(--ac)] sm:text-lg">{project.tagline}</p>

          <p className="mt-5 max-w-[46ch] text-[0.975rem] leading-relaxed">
            {project.description}
          </p>

          {caseStudy && caseStudy.metrics.length > 0 && (
            <dl className="mt-7 flex flex-wrap gap-x-9 gap-y-4">
              {caseStudy.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-2xl font-extrabold tracking-[-0.03em]">
                      {m.value}
                    </span>
                    <span className="mt-0.5 block text-2xs text-[var(--mut)]">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-7 text-[0.82rem] text-[var(--mut)]">{project.stack.join("  ·  ")}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            {caseStudy && (
              <Link
                href={`/work/${project.id}`}
                className="hit border-b-2 border-current pb-0.5 text-[0.95rem] font-semibold transition-opacity hover:opacity-75"
              >
                Read the case study →
              </Link>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-0.5 text-[0.95rem] text-[var(--mut)] transition-colors hover:text-[var(--fg)]"
            >
              Visit live site ↗
            </a>
          </div>
        </div>

        {project.image && (
          <div className="panel-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.alt ?? `${project.name} — product screenshot`}
              width={1920}
              height={960}
              loading="lazy"
              decoding="async"
              className="block w-full shadow-[0_24px_70px_oklch(0_0_0/0.32)]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
