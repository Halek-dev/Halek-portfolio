import Link from "next/link";
import type { Project } from "@/lib/data";

/**
 * A case study on the ink ground: problem, decision, tradeoff, stack, link.
 *
 * The decision is the focal point by construction — it sits in the wide
 * column behind a red rule, at the largest body size on the card, at full
 * --paper strength, while every other block is set smaller and muted. The
 * project name is deliberately quieter than the decision: the name is a
 * label, the decision is the thing worth reading.
 *
 * No entrance animation, no reveal, no transform. Hover changes colour on
 * links and nothing else moves.
 */
export default function CaseStudyCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cs = project.caseStudy;
  if (!cs?.decision) return null;

  let host = project.url;
  try {
    host = new URL(project.url).host.replace(/^www\./, "");
  } catch {
    /* a malformed url still renders as written */
  }

  const label = "text-2xs font-semibold uppercase tracking-[0.1em]";

  return (
    <article className="border-t border-rule-ink py-9 first:border-t-0 first:pt-0 lg:py-11 lg:first:pt-0">
      {/* ── identifier ── */}
      <div className="flex items-baseline justify-between gap-4">
        <span className={`${label} text-red-ink`}>
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-2xs text-paper-4">{project.year}</span>
      </div>

      <h3 className="mt-2.5 text-[1.3rem] font-extrabold tracking-[-0.03em] text-paper">
        {project.name}
      </h3>
      <p className="mt-1 text-[0.95rem] leading-snug text-paper-4">{project.tagline}</p>

      {/* Reading order is the same at every width: problem, decision, cost,
          then stack. Stack used to sit in the rail with the problem, which on
          a phone put a list of technologies between the problem and the
          decision it motivates. */}
      <div className="mt-7 grid gap-7 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-11">
        {/* ── supporting rail ── */}
        <div>
          <h4 className={`${label} text-paper-4`}>Problem</h4>
          <p className="mt-2 text-[0.925rem] leading-[1.6] text-paper-3">{cs.problemShort}</p>
        </div>

        {/* ── the focal point ── */}
        <div className="border-l-2 border-red-ink pl-5 lg:pl-7">
          <h4 className={`${label} text-red-ink`}>Hardest decision</h4>
          <p className="mt-2.5 text-[1.28rem] font-bold leading-[1.28] tracking-[-0.022em] text-paper sm:text-[1.4rem]">
            {cs.decision}
          </p>

          <h4 className={`${label} mt-6 text-paper-4`}>What it cost</h4>
          <p className="mt-2 max-w-[64ch] text-[0.95rem] leading-[1.62] text-paper-3">
            {cs.tradeoff}
          </p>
        </div>
      </div>

      {/* ── stack ── */}
      <div className="mt-7 border-t border-rule-ink pt-4 lg:grid lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-11">
        <h4 className={`${label} text-paper-4`}>Stack</h4>
        <p className="mt-1.5 text-[0.875rem] leading-[1.6] text-paper-3 lg:mt-0">
          {project.stack.join("  ·  ")}
        </p>
      </div>

      {/* ── exits ── */}
      <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2">
        <Link
          href={`/work/${project.id}`}
          className="hit border-b border-paper-4 pb-0.5 text-[0.9rem] font-semibold text-paper transition-colors hover:border-red-ink hover:text-red-ink"
        >
          Full case study →
        </Link>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hit text-[0.9rem] text-paper-4 transition-colors hover:text-paper"
        >
          {host} ↗
        </a>
      </div>
    </article>
  );
}
