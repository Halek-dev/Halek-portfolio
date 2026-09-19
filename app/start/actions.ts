"use server";

import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { CONTACT_CHANNELS, type ContactChannel, type LeadContact } from "@/lib/supabase/types";

// ─────────────────────────────────────────────────────────────
// The submit path for /start.
//
// This runs on the server with the service-role key, so the form
// posts to code we control rather than writing to the database
// directly from the browser. That means the client cannot set its
// own `status`, cannot read anyone else's lead, and cannot bypass
// any of the validation below by editing the request.
//
// Everything here is re-validated even though the form validates
// too. Client-side validation is a convenience for honest users;
// it is not a control.
// ─────────────────────────────────────────────────────────────

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const LIMITS = {
  name: 120,
  business: 160,
  description: 4000,
  referrer: 160,
  contactValue: 200,
} as const;

function clean(v: FormDataEntryValue | null, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Deliberately loose — international numbers vary more than any regex expects. */
const PHONE_RE = /^\+?[\d\s().-]{7,}$/;

function validateChannelValue(channel: ContactChannel, value: string): string | null {
  switch (channel) {
    case "email":
      return EMAIL_RE.test(value) ? null : "Doesn't look like an email address.";
    case "whatsapp":
    case "sms":
      return PHONE_RE.test(value) ? null : "Include the country code, e.g. +234…";
    case "telegram":
      return value.length >= 3 ? null : "Your @username or phone number.";
    case "imessage":
      return value.length >= 3 ? null : "The Apple ID or number you use for iMessage.";
  }
}

export async function submitLead(formData: FormData): Promise<SubmitResult> {
  // Honeypot: a field hidden from humans. Bots fill everything in.
  // Return ok so the bot has nothing to learn from the response.
  if (clean(formData.get("company_website"), 200)) return { ok: true };

  const fieldErrors: Record<string, string> = {};

  const name = clean(formData.get("name"), LIMITS.name);
  const business = clean(formData.get("business"), LIMITS.business);
  const referrer = clean(formData.get("referrer"), LIMITS.referrer);
  const skipDescription = formData.get("skip_description") === "on";
  const description = clean(formData.get("project_description"), LIMITS.description);

  if (!name) fieldErrors.name = "Required.";
  if (!business) fieldErrors.business = "Required.";
  if (!skipDescription && !description) {
    fieldErrors.project_description =
      "Tell me what you're building, or tick the box to explain it in chat.";
  }

  // ── three distinct contact channels ──
  const contacts: LeadContact[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < 3; i++) {
    const channel = clean(formData.get(`channel_${i}`), 32) as ContactChannel;
    const value = clean(formData.get(`channel_value_${i}`), LIMITS.contactValue);

    if (!CONTACT_CHANNELS.includes(channel)) {
      fieldErrors[`channel_${i}`] = "Pick a channel.";
      continue;
    }
    if (seen.has(channel)) {
      fieldErrors[`channel_${i}`] = "Already used — pick a different channel.";
      continue;
    }
    if (!value) {
      fieldErrors[`channel_value_${i}`] = "Required.";
      continue;
    }

    const problem = validateChannelValue(channel, value);
    if (problem) {
      fieldErrors[`channel_value_${i}`] = problem;
      continue;
    }

    seen.add(channel);
    contacts.push({ channel, value });
  }

  if (contacts.length !== 3 && Object.keys(fieldErrors).length === 0) {
    fieldErrors.channel_0 = "Three contact channels are required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Some fields need another look.", fieldErrors };
  }

  if (!isSupabaseConfigured()) {
    // Fail loudly rather than silently dropping a real lead on the floor.
    console.error("[submitLead] Supabase env vars missing — lead was NOT saved.");
    return {
      ok: false,
      error:
        "The form isn't connected to the database yet. Email me directly and I'll pick it up from there.",
    };
  }

  const { error } = await getServiceClient()
    .from("leads")
    .insert({
      name,
      business,
      project_description: skipDescription || !description ? null : description,
      contacts,
      referrer: referrer || null,
      // `status` is intentionally not settable from the form — the
      // column default is 'pending' and only the admin can change it.
    });

  if (error) {
    console.error("[submitLead] insert failed:", error.message, error.details ?? "");
    return {
      ok: false,
      error: "Something went wrong saving that. Try again in a moment.",
    };
  }

  return { ok: true };
}
