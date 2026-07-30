"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioData } from "@/components/usePortfolioData";
import type { PortfolioData, Project } from "@/lib/data";

// NOTE: NEXT_PUBLIC_ vars are bundled into client JS and readable by anyone
// who inspects the page. This panel only edits your local browser copy, so
// the password is convenience, not security.
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "change-me-halek";

const BLANK_PANEL = {
  bg: "oklch(0.300 0.090 30)",
  fg: "oklch(0.960 0.020 60)",
  ac: "oklch(0.760 0.110 45)",
  mut: "oklch(0.845 0.045 45)",
};

export default function Admin() {
  const { data, save, reset, loaded } = usePortfolioData();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [draft, setDraft] = useState<PortfolioData | null>(null);
  const [msg, setMsg] = useState("");

  const d = draft ?? data;
  const update = (patch: Partial<PortfolioData>) => setDraft({ ...d, ...patch });

  if (!loaded) return null;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-sm border border-ink p-7">
          <h1 className="text-xl font-extrabold tracking-[-0.03em]">Editor</h1>
          <p className="mt-1.5 text-sm text-ink-50">Enter your password to edit content.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setAuthed(pw === ADMIN_PASSWORD)}
            placeholder="Password"
            aria-label="Admin password"
            className="mt-5 w-full border border-rule-2 bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-ink"
          />
          <button
            onClick={() => setAuthed(pw === ADMIN_PASSWORD)}
            className="mt-2.5 w-full bg-ink py-3 text-sm font-semibold text-paper transition-colors hover:bg-red"
          >
            Unlock
          </button>
          {pw && pw !== ADMIN_PASSWORD && (
            <p className="mt-3 text-sm text-red">Wrong password.</p>
          )}
          <Link href="/" className="mt-5 block text-center text-2xs text-ink-50">
            ← back to site
          </Link>
        </div>
      </div>
    );
  }

  const saveAll = () => {
    if (draft) save(draft);
    setMsg("Saved to this browser.");
    setTimeout(() => setMsg(""), 2500);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((t) => {
      try {
        setDraft(JSON.parse(t));
        setMsg("Imported — review and Save.");
      } catch {
        setMsg("Invalid JSON file.");
      }
      setTimeout(() => setMsg(""), 3000);
    });
  };

  const updateProject = (i: number, patch: Partial<Project>) => {
    const projects = [...d.projects];
    projects[i] = { ...projects[i], ...patch };
    update({ projects });
  };
  const updatePanel = (i: number, key: "bg" | "fg" | "ac" | "mut", value: string) => {
    const projects = [...d.projects];
    projects[i] = { ...projects[i], panel: { ...projects[i].panel, [key]: value } };
    update({ projects });
  };
  const addProject = () =>
    update({
      projects: [
        ...d.projects,
        {
          id: `proj-${Date.now()}`,
          name: "New Project",
          tagline: "",
          description: "",
          stack: [],
          url: "",
          year: String(new Date().getFullYear()),
          featured: false,
          image: "",
          alt: "",
          panel: { ...BLANK_PANEL },
        },
      ],
    });
  const removeProject = (i: number) =>
    update({ projects: d.projects.filter((_, idx) => idx !== i) });

  const input =
    "w-full border border-rule-2 bg-paper px-3 py-2 text-sm outline-none focus:border-ink";
  const label = "block text-2xs font-semibold uppercase tracking-[0.07em] text-ink-50 mb-1";
  const section = "mt-6 border border-rule bg-paper-2 p-6";
  const h2 = "text-lg font-extrabold tracking-[-0.03em]";

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      <div className="sticky top-0 z-nav -mx-5 mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-ink bg-paper px-5 py-3.5 sm:-mx-8 sm:px-8">
        <h1 className={h2}>Editor</h1>
        <div className="flex flex-wrap items-center gap-2">
          {msg && <span className="text-sm font-medium text-red">{msg}</span>}
          <button onClick={exportJson} className="border border-rule-2 px-3 py-2 text-sm">
            Export JSON
          </button>
          <label className="cursor-pointer border border-rule-2 px-3 py-2 text-sm">
            Import
            <input type="file" accept="application/json" onChange={importJson} className="hidden" />
          </label>
          <button
            onClick={saveAll}
            className="bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-red"
          >
            Save
          </button>
        </div>
      </div>

      <div className="border-l-0 border-t-2 border-ink bg-paper-2 p-4 text-sm text-ink-70">
        Edits save to <strong className="text-ink">this browser only</strong>. To publish, click{" "}
        <strong className="text-ink">Export JSON</strong>, paste the result over{" "}
        <code className="bg-paper-3 px-1">defaultData</code> in{" "}
        <code className="bg-paper-3 px-1">lib/data.ts</code>, then commit and push.
        <br />
        <span className="mt-2 block text-ink-50">
          Case-study prose is long-form and lives in <code>lib/data.ts</code> — edit it there rather
          than through a textarea grid.
        </span>
      </div>

      {/* ANALYTICS */}
      <section className={section}>
        <h2 className={h2}>Daily visits</h2>
        <p className="mt-2 text-sm text-ink-70">
          Per-day visitor counts are tracked by <strong className="text-ink">Vercel Analytics</strong>,
          already wired into the site. That data can&apos;t be securely pulled into a browser-only
          panel, so read it in your Vercel dashboard.
        </p>
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-ink px-4 py-2 text-sm font-semibold text-paper"
        >
          Open Vercel Analytics →
        </a>
      </section>

      {/* PROFILE */}
      <section className={section}>
        <h2 className={h2}>Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {([
            ["Name", "name"],
            ["Handle", "handle"],
            ["Role", "role"],
            ["Location", "location"],
            ["Availability", "availability"],
            ["Email (primary CTA)", "email"],
          ] as const).map(([lbl, key]) => (
            <div key={key}>
              <span className={label}>{lbl}</span>
              <input
                className={input}
                value={(d[key] as string) ?? ""}
                onChange={(e) => update({ [key]: e.target.value } as Partial<PortfolioData>)}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <span className={label}>Bio (hero paragraph)</span>
          <textarea
            className={`${input} h-32`}
            value={d.bio}
            onChange={(e) => update({ bio: e.target.value })}
          />
        </div>
      </section>

      {/* CONTACTS */}
      <section className={section}>
        <h2 className={h2}>Contacts</h2>
        <p className="mt-1.5 text-sm text-ink-50">
          Entries with an empty or <code>#</code> link are hidden on the live site.
        </p>
        <div className="mt-4 space-y-2">
          {d.contacts.map((c, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-3">
              <input
                className={input}
                placeholder="Label"
                value={c.label}
                onChange={(e) => {
                  const contacts = [...d.contacts];
                  contacts[i] = { ...c, label: e.target.value };
                  update({ contacts });
                }}
              />
              <input
                className={input}
                placeholder="Display text"
                value={c.value}
                onChange={(e) => {
                  const contacts = [...d.contacts];
                  contacts[i] = { ...c, value: e.target.value };
                  update({ contacts });
                }}
              />
              <div className="flex gap-2">
                <input
                  className={input}
                  placeholder="https:// or mailto:"
                  value={c.href}
                  onChange={(e) => {
                    const contacts = [...d.contacts];
                    contacts[i] = { ...c, href: e.target.value };
                    update({ contacts });
                  }}
                />
                <button
                  onClick={() => update({ contacts: d.contacts.filter((_, x) => x !== i) })}
                  aria-label={`Remove ${c.label || "contact"}`}
                  className="border border-rule-2 px-3 text-ink-50 hover:text-red"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => update({ contacts: [...d.contacts, { label: "", value: "", href: "" }] })}
          className="mt-3 border border-rule-2 px-4 py-2 text-sm"
        >
          + Add contact
        </button>
      </section>

      {/* PROJECTS */}
      <section className={section}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className={h2}>Projects</h2>
          <button onClick={addProject} className="border border-rule-2 px-4 py-2 text-sm">
            + Add project
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {d.projects.map((p, i) => (
            <div key={p.id} className="space-y-3 border border-rule bg-paper p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="grid flex-1 gap-2 sm:grid-cols-2">
                  <input
                    className={input}
                    placeholder="Name"
                    value={p.name}
                    onChange={(e) => updateProject(i, { name: e.target.value })}
                  />
                  <input
                    className={input}
                    placeholder="Tagline"
                    value={p.tagline}
                    onChange={(e) => updateProject(i, { tagline: e.target.value })}
                  />
                </div>
                <button
                  onClick={() => removeProject(i)}
                  className="border border-rule-2 px-3 py-2 text-sm text-ink-50 hover:text-red"
                >
                  Delete
                </button>
              </div>

              <textarea
                className={`${input} h-20`}
                placeholder="Description"
                value={p.description}
                onChange={(e) => updateProject(i, { description: e.target.value })}
              />

              <div className="grid gap-2 sm:grid-cols-3">
                <input
                  className={input}
                  placeholder="Live URL"
                  value={p.url}
                  onChange={(e) => updateProject(i, { url: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Year"
                  value={p.year}
                  onChange={(e) => updateProject(i, { year: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Stack (comma separated)"
                  value={p.stack.join(", ")}
                  onChange={(e) =>
                    updateProject(i, {
                      stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  className={input}
                  placeholder="/projects/name.png"
                  value={p.image ?? ""}
                  onChange={(e) => updateProject(i, { image: e.target.value })}
                />
                <input
                  className={input}
                  placeholder="Alt text — describe the thing, not the category"
                  value={p.alt ?? ""}
                  onChange={(e) => updateProject(i, { alt: e.target.value })}
                />
              </div>

              {/* panel colours */}
              <div>
                <span className={label}>
                  Panel colours — OKLCH. Borrow the product&apos;s own brand colour.
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(["bg", "fg", "ac", "mut"] as const).map((key) => (
                    <div key={key} className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-8 w-8 shrink-0 border border-rule-2"
                        style={{ background: p.panel?.[key] ?? "transparent" }}
                      />
                      <input
                        className={input}
                        placeholder={key}
                        value={p.panel?.[key] ?? ""}
                        onChange={(e) => updatePanel(i, key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-1.5 text-2xs text-ink-50">
                  fg, ac and mut must each clear 4.5:1 against bg. Never dim panel text with opacity — use mut.
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm text-ink-70">
                <input
                  type="checkbox"
                  checked={p.featured}
                  onChange={(e) => updateProject(i, { featured: e.target.checked })}
                />
                Featured
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={section}>
        <h2 className={h2}>Testimonials</h2>
        <p className="mt-1.5 text-sm text-ink-50">
          Real quotes only. The section is hidden entirely while this is empty — which is correct.
        </p>
        <div className="mt-4 space-y-3">
          {(d.testimonials ?? []).map((t, i) => (
            <div key={i} className="space-y-2 border border-rule bg-paper p-4">
              <textarea
                className={`${input} h-20`}
                placeholder="Quote"
                value={t.quote}
                onChange={(e) => {
                  const testimonials = [...d.testimonials];
                  testimonials[i] = { ...t, quote: e.target.value };
                  update({ testimonials });
                }}
              />
              <div className="grid gap-2 sm:grid-cols-[2fr_2fr_auto]">
                <input
                  className={input}
                  placeholder="Name"
                  value={t.name}
                  onChange={(e) => {
                    const testimonials = [...d.testimonials];
                    testimonials[i] = { ...t, name: e.target.value };
                    update({ testimonials });
                  }}
                />
                <input
                  className={input}
                  placeholder="Role / Company"
                  value={t.role}
                  onChange={(e) => {
                    const testimonials = [...d.testimonials];
                    testimonials[i] = { ...t, role: e.target.value };
                    update({ testimonials });
                  }}
                />
                <button
                  onClick={() => update({ testimonials: d.testimonials.filter((_, x) => x !== i) })}
                  aria-label="Remove testimonial"
                  className="border border-rule-2 px-3 text-ink-50 hover:text-red"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            update({ testimonials: [...(d.testimonials ?? []), { quote: "", name: "", role: "" }] })
          }
          className="mt-3 border border-rule-2 px-4 py-2 text-sm"
        >
          + Add testimonial
        </button>
      </section>

      {/* RESUME */}
      <section className={section}>
        <h2 className={h2}>CV / Resume</h2>
        <p className="mt-1.5 text-sm text-ink-70">
          Drop your PDF into <code className="bg-paper-3 px-1">public/</code> and set the path.
          Leave blank to hide the button rather than 404.
        </p>
        <input
          className={`${input} mt-3`}
          placeholder="/resume.pdf"
          value={d.resumeUrl ?? ""}
          onChange={(e) => update({ resumeUrl: e.target.value })}
        />
      </section>

      {/* SKILLS */}
      <section className={section}>
        <h2 className={h2}>Skills</h2>
        <div className="mt-4 space-y-2">
          {d.skills.map((s, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
              <input
                className={input}
                placeholder="Category"
                value={s.category}
                onChange={(e) => {
                  const skills = [...d.skills];
                  skills[i] = { ...s, category: e.target.value };
                  update({ skills });
                }}
              />
              <input
                className={input}
                placeholder="Items (comma separated)"
                value={s.items.join(", ")}
                onChange={(e) => {
                  const skills = [...d.skills];
                  skills[i] = {
                    ...s,
                    items: e.target.value.split(",").map((x) => x.trim()).filter(Boolean),
                  };
                  update({ skills });
                }}
              />
              <button
                onClick={() => update({ skills: d.skills.filter((_, x) => x !== i) })}
                aria-label={`Remove ${s.category || "skill group"}`}
                className="border border-rule-2 px-3 text-ink-50 hover:text-red"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => update({ skills: [...d.skills, { category: "", items: [] }] })}
          className="mt-3 border border-rule-2 px-4 py-2 text-sm"
        >
          + Add skill group
        </button>
      </section>

      <div className="mt-8 flex items-center justify-between border-t border-rule pt-5">
        <button
          onClick={() => {
            if (confirm("Reset all content to defaults? This clears your saved edits.")) {
              reset();
              setDraft(null);
            }
          }}
          className="text-sm text-ink-50 hover:text-red"
        >
          Reset to defaults
        </button>
        <Link href="/" className="text-sm text-ink-50 hover:text-ink">
          View site →
        </Link>
      </div>
    </div>
  );
}
