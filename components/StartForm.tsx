"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { submitLead } from "@/app/start/actions";
import { CHANNEL_META, CONTACT_CHANNELS, type ContactChannel } from "@/lib/supabase/types";

const FIELD =
  "w-full border border-rule-2 bg-paper px-3.5 py-3 text-[0.95rem] outline-none transition-colors focus:border-ink";
const FIELD_BAD = "border-red";
const LABEL = "block text-2xs font-semibold uppercase tracking-[0.07em] text-ink-50";

/** Default channel per slot; the user can change any of them. */
const DEFAULT_CHANNELS: ContactChannel[] = ["email", "whatsapp", "telegram"];

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1.5 text-[0.82rem] font-medium text-red">
      {msg}
    </p>
  );
}

export default function StartForm() {
  const [channels, setChannels] = useState<ContactChannel[]>(DEFAULT_CHANNELS);
  const [skip, setSkip] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  function setChannel(i: number, next: ContactChannel) {
    setChannels((prev) => {
      const out = [...prev];
      // If the chosen channel is already in another slot, swap them
      // rather than silently producing a duplicate.
      const clash = out.indexOf(next);
      if (clash !== -1 && clash !== i) out[clash] = out[i];
      out[i] = next;
      return out;
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await submitLead(data);
      if (res.ok) {
        setDone(true);
        setErrors({});
        setFormError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrors(res.fieldErrors ?? {});
        setFormError(res.error);
        // Move focus to the summary so screen readers announce the failure.
        requestAnimationFrame(() => errorRef.current?.focus());
      }
    });
  }

  // ── confirmation ─────────────────────────────────────────────
  if (done) {
    return (
      <div className="py-12 md:py-16">
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-red">
          Received
        </p>
        <h2 className="mt-4 max-w-[18ch] text-title font-extrabold">
          You&apos;re in the queue.
        </h2>
        <p className="mt-6 max-w-read font-serif text-[1.14rem] leading-[1.66] text-ink-70">
          I read every submission myself, so this takes a day or so rather than a minute. If it&apos;s
          a fit, I&apos;ll come back on one of the channels you gave me with the exact slice I&apos;d
          build and what &ldquo;done&rdquo; looks like. If it isn&apos;t, I&apos;ll tell you that
          plainly instead of leaving you waiting.
        </p>

        <div className="rule-strip mt-10">
          {[
            ["Status", "Pending review"],
            ["You'll hear back", "Within a day"],
            ["Next step", "I confirm the slice"],
            ["Then", "About three days to build"],
          ].map(([k, v]) => (
            <div key={k} className="rule-cell">
              <span className="block text-2xs font-semibold text-ink-50">{k}</span>
              <span className="mt-1 block text-[0.95rem] font-medium">{v}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href="/work"
            className="bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-red"
          >
            See what I&apos;ve built →
          </Link>
          <Link href="/blog" className="hit link-draw text-sm font-semibold text-ink-70">
            Read something while you wait
          </Link>
        </div>
      </div>
    );
  }

  // ── form ─────────────────────────────────────────────────────
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="pb-8">
      {formError && (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 border-l-2 border-red bg-red-wash px-4 py-3 text-[0.95rem] font-medium text-ink outline-none"
        >
          {formError}
        </p>
      )}

      {/* ── who ── */}
      <fieldset className="border-t-2 border-ink pt-6">
        <legend className="sr-only">About you</legend>
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-red">01 · Who you are</p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={LABEL}>
              Your name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-err" : undefined}
              className={`mt-1.5 ${FIELD} ${errors.name ? FIELD_BAD : ""}`}
            />
            <span id="name-err">
              <Err msg={errors.name} />
            </span>
          </div>

          <div>
            <label htmlFor="business" className={LABEL}>
              Business or project name
            </label>
            <input
              id="business"
              name="business"
              autoComplete="organization"
              required
              aria-invalid={!!errors.business}
              aria-describedby={errors.business ? "business-err" : undefined}
              className={`mt-1.5 ${FIELD} ${errors.business ? FIELD_BAD : ""}`}
            />
            <span id="business-err">
              <Err msg={errors.business} />
            </span>
          </div>
        </div>
      </fieldset>

      {/* ── what ── */}
      <fieldset className="mt-12 border-t-2 border-ink pt-6">
        <legend className="sr-only">What you&apos;re building</legend>
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-red">
          02 · What you&apos;re building
        </p>

        <label htmlFor="project_description" className={`${LABEL} mt-5`}>
          The short version
        </label>
        <p className="mt-1.5 max-w-[58ch] text-[0.9rem] text-ink-50">
          What it does and who it&apos;s for. A few sentences is plenty — I&apos;m looking for enough
          to work out which slice would prove the most.
        </p>
        <textarea
          id="project_description"
          name="project_description"
          rows={5}
          disabled={skip}
          aria-invalid={!!errors.project_description}
          aria-describedby={errors.project_description ? "desc-err" : undefined}
          className={`mt-2.5 ${FIELD} resize-y leading-relaxed disabled:cursor-not-allowed disabled:bg-paper-3 disabled:text-ink-50 ${
            errors.project_description ? FIELD_BAD : ""
          }`}
        />
        <span id="desc-err">
          <Err msg={errors.project_description} />
        </span>

        <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-[0.95rem]">
          <input
            type="checkbox"
            name="skip_description"
            checked={skip}
            onChange={(e) => setSkip(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[oklch(0.540_0.190_28)]"
          />
          <span className="text-ink-70">
            Skip this — I&apos;ll explain it in chat.
          </span>
        </label>
      </fieldset>

      {/* ── how to reach you ── */}
      <fieldset className="mt-12 border-t-2 border-ink pt-6">
        <legend className="sr-only">How to reach you</legend>
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-red">
          03 · How to reach you
        </p>

        <p className="mt-5 max-w-[58ch] text-[0.9rem] text-ink-50">
          Three different channels, so a dead inbox or a changed number never costs us the project.
          Pick whichever three you actually check.
        </p>

        <div className="mt-5 space-y-4">
          {channels.map((channel, i) => {
            const meta = CHANNEL_META[channel];
            const valErr = errors[`channel_value_${i}`];
            const chErr = errors[`channel_${i}`];
            return (
              <div key={i} className="grid gap-2.5 sm:grid-cols-[minmax(0,10rem)_1fr]">
                <div>
                  <label htmlFor={`channel_${i}`} className="sr-only">
                    Contact channel {i + 1}
                  </label>
                  <select
                    id={`channel_${i}`}
                    name={`channel_${i}`}
                    value={channel}
                    onChange={(e) => setChannel(i, e.target.value as ContactChannel)}
                    className={`${FIELD} cursor-pointer ${chErr ? FIELD_BAD : ""}`}
                  >
                    {CONTACT_CHANNELS.map((c) => (
                      <option key={c} value={c}>
                        {CHANNEL_META[c].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={`channel_value_${i}`} className="sr-only">
                    {meta.label} details
                  </label>
                  <input
                    id={`channel_value_${i}`}
                    name={`channel_value_${i}`}
                    type={meta.type}
                    inputMode={meta.inputMode}
                    placeholder={meta.placeholder}
                    autoComplete={channel === "email" ? "email" : "off"}
                    aria-invalid={!!valErr}
                    aria-describedby={valErr ? `channel-value-err-${i}` : undefined}
                    className={`${FIELD} ${valErr ? FIELD_BAD : ""}`}
                  />
                  <span id={`channel-value-err-${i}`}>
                    <Err msg={valErr ?? chErr} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* ── referral ── */}
      <fieldset className="mt-12 border-t-2 border-ink pt-6">
        <legend className="sr-only">Referral</legend>
        <p className="text-2xs font-semibold uppercase tracking-[0.1em] text-red">
          04 · Who sent you
        </p>

        <label htmlFor="referrer" className={`${LABEL} mt-5`}>
          Who referred you?
        </label>
        <p className="mt-1.5 max-w-[58ch] text-[0.9rem] text-ink-50">
          A name is enough. If they&apos;re owed a referral fee, this is what makes sure they get
          it. Leave it blank if you found me yourself.
        </p>
        <input
          id="referrer"
          name="referrer"
          className={`mt-2.5 ${FIELD} sm:max-w-md`}
        />
      </fieldset>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-12 border-t-2 border-ink pt-7">
        <button
          type="submit"
          disabled={pending}
          className="bg-red px-7 py-4 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-red-deep disabled:cursor-not-allowed disabled:bg-ink-50"
        >
          {pending ? "Sending…" : "Join the queue →"}
        </button>
        <p aria-live="polite" className="mt-4 text-[0.9rem] text-ink-50">
          {pending
            ? "Sending…"
            : "No call required. I'll reply on one of the channels above."}
        </p>
      </div>
    </form>
  );
}
