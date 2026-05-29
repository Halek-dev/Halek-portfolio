"use client";
import { useState } from "react";
import Link from "next/link";
import { usePortfolioData } from "@/components/usePortfolioData";
import { PortfolioData, Project } from "@/lib/data";

// Set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local (falls back to the literal below).
// NOTE: NEXT_PUBLIC_ vars are bundled into client JS and readable by anyone who
// inspects the page. The admin only edits your local browser copy, so this is
// convenience, not real security.
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "change-me-halek";

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
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-edge bg-surface p-8">
          <h1 className="font-display text-2xl font-semibold">Admin access</h1>
          <p className="mt-2 text-sm text-muted">Enter your password to edit content.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setAuthed(pw === ADMIN_PASSWORD)}
            placeholder="Password"
            className="mt-4 w-full rounded-xl border border-edge bg-ink px-4 py-3 text-bone outline-none focus:border-accent"
          />
          <button
            onClick={() => setAuthed(pw === ADMIN_PASSWORD)}
            className="mt-3 w-full rounded-xl bg-accent py-3 font-medium text-ink"
          >
            Unlock
          </button>
          {pw && pw !== ADMIN_PASSWORD && (
            <p className="mt-3 text-sm text-red-400">Wrong password.</p>
          )}
          <Link href="/" className="mt-4 block text-center text-xs text-muted">
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
  const addProject = () => {
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
        },
      ],
    });
  };
  const removeProject = (i: number) =>
    update({ projects: d.projects.filter((_, idx) => idx !== i) });

  const input =
    "w-full rounded-lg border border-edge bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-accent";
  const label = "block font-mono text-xs uppercase tracking-widest text-muted mb-1";

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="sticky top-0 z-20 -mx-6 mb-8 flex items-center justify-between border-b border-edge bg-ink/90 px-6 py-4 backdrop-blur">
        <h1 className="font-display text-2xl font-semibold">Editor</h1>
        <div className="flex items-center gap-2">
          {msg && <span className="text-sm text-accent">{msg}</span>}
          <button onClick={exportJson} className="rounded-lg border border-edge px-3 py-2 text-sm">
            Export JSON
          </button>
          <label className="cursor-pointer rounded-lg border border-edge px-3 py-2 text-sm">
            Import
            <input type="file" accept="application/json" onChange={importJson} className="hidden" />
          </label>
          <button onClick={saveAll} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink">
            Save
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-accent2/30 bg-accent2/10 p-4 text-sm text-bone/80">
        Edits save to <strong>this browser only</strong>. To publish changes to the live site,
        click <strong>Export JSON</strong>, replace <code className="text-accent">data/portfolio-data.json</code> in
        your repo, and push to redeploy.
      </div>

      {/* ANALYTICS */}
      <section className="mt-8 space-y-3 rounded-2xl border border-edge bg-surface p-6">
        <h2 className="font-display text-xl">Daily visits</h2>
        <p className="text-sm text-muted">
          Real per-day visitor counts are tracked by <strong>Vercel Analytics</strong> (already wired
          into the site). Visitor data can't be securely pulled into this browser-only panel, so you
          read it in your Vercel dashboard — it shows daily visitors, page views, top pages, and
          referrers.
        </p>
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink"
        >
          Open Vercel Analytics →
        </a>
        <p className="text-xs text-muted">
          In Vercel: select your project → <strong>Analytics</strong> tab. Enable it once (free tier)
          on first visit. Data appears within a day of going live.
        </p>
      </section>

      {/* PROFILE */}
      <section className="mt-8 space-y-4 rounded-2xl border border-edge bg-surface p-6">
        <h2 className="font-display text-xl">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className={label}>Name</span>
            <input className={input} value={d.name} onChange={(e) => update({ name: e.target.value })} />
          </div>
          <div>
            <span className={label}>Handle</span>
            <input className={input} value={d.handle} onChange={(e) => update({ handle: e.target.value })} />
          </div>
          <div>
            <span className={label}>Role</span>
            <input className={input} value={d.role} onChange={(e) => update({ role: e.target.value })} />
          </div>
          <div>
            <span className={label}>Location</span>
            <input className={input} value={d.location} onChange={(e) => update({ location: e.target.value })} />
          </div>
        </div>
        <div>
          <span className={label}>Bio</span>
          <textarea
            className={`${input} h-28`}
            value={d.bio}
            onChange={(e) => update({ bio: e.target.value })}
          />
        </div>
      </section>

      {/* CONTACTS */}
      <section className="mt-6 space-y-4 rounded-2xl border border-edge bg-surface p-6">
        <h2 className="font-display text-xl">Contacts</h2>
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
                placeholder="Link (https:// or mailto:)"
                value={c.href}
                onChange={(e) => {
                  const contacts = [...d.contacts];
                  contacts[i] = { ...c, href: e.target.value };
                  update({ contacts });
                }}
              />
              <button
                onClick={() => update({ contacts: d.contacts.filter((_, idx) => idx !== i) })}
                className="rounded-lg border border-edge px-3 text-muted hover:text-red-400"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => update({ contacts: [...d.contacts, { label: "", value: "", href: "" }] })}
          className="rounded-lg border border-edge px-4 py-2 text-sm"
        >
          + Add contact
        </button>
      </section>

      {/* PROJECTS */}
      <section className="mt-6 space-y-4 rounded-2xl border border-edge bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">Projects</h2>
          <button onClick={addProject} className="rounded-lg border border-edge px-4 py-2 text-sm">
            + Add project
          </button>
        </div>
        {d.projects.map((p, i) => (
          <div key={p.id} className="space-y-3 rounded-xl border border-edge bg-ink p-4">
            <div className="flex items-center justify-between">
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
                className="ml-3 rounded-lg border border-edge px-3 py-2 text-muted hover:text-red-400"
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
            <input
              className={input}
              placeholder="Image path (e.g. /projects/vaultmart.png — put file in public/projects/)"
              value={p.image ?? ""}
              onChange={(e) => updateProject(i, { image: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={p.featured}
                onChange={(e) => updateProject(i, { featured: e.target.checked })}
              />
              Featured (large card)
            </label>
          </div>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-6 space-y-4 rounded-2xl border border-edge bg-surface p-6">
        <h2 className="font-display text-xl">Testimonials</h2>
        {(d.testimonials ?? []).map((t, i) => (
          <div key={i} className="space-y-2 rounded-xl border border-edge bg-ink p-4">
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
                onClick={() => update({ testimonials: d.testimonials.filter((_, idx) => idx !== i) })}
                className="rounded-lg border border-edge px-3 text-muted hover:text-red-400"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            update({ testimonials: [...(d.testimonials ?? []), { quote: "", name: "", role: "" }] })
          }
          className="rounded-lg border border-edge px-4 py-2 text-sm"
        >
          + Add testimonial
        </button>
      </section>

      {/* RESUME */}
      <section className="mt-6 space-y-3 rounded-2xl border border-edge bg-surface p-6">
        <h2 className="font-display text-xl">CV / Resume</h2>
        <p className="text-sm text-muted">
          Drop your PDF into <code className="text-accent">public/</code> (e.g.{" "}
          <code className="text-accent">resume.pdf</code>) and set the path below. Leave blank to hide
          the Download CV button.
        </p>
        <input
          className={input}
          placeholder="/resume.pdf"
          value={d.resumeUrl ?? ""}
          onChange={(e) => update({ resumeUrl: e.target.value })}
        />
      </section>

      {/* SKILLS */}
      <section className="mt-6 space-y-4 rounded-2xl border border-edge bg-surface p-6">
        <h2 className="font-display text-xl">Skills</h2>
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
                skills[i] = { ...s, items: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) };
                update({ skills });
              }}
            />
            <button
              onClick={() => update({ skills: d.skills.filter((_, idx) => idx !== i) })}
              className="rounded-lg border border-edge px-3 text-muted hover:text-red-400"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => update({ skills: [...d.skills, { category: "", items: [] }] })}
          className="rounded-lg border border-edge px-4 py-2 text-sm"
        >
          + Add skill group
        </button>
      </section>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => {
            if (confirm("Reset all content to defaults? This clears your saved edits.")) reset();
            setDraft(null);
          }}
          className="text-sm text-muted hover:text-red-400"
        >
          Reset to defaults
        </button>
        <Link href="/" className="text-sm text-muted hover:text-bone">
          View site →
        </Link>
      </div>
    </div>
  );
}
