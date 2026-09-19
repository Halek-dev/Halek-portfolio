import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// ─────────────────────────────────────────────────────────────
// Server-side Supabase client, using the SERVICE ROLE key.
//
// This key bypasses row level security. It must never reach the
// browser. Two guards keep that true:
//   1. `import "server-only"` — importing this from a client
//      component is a build-time error, not a runtime surprise.
//   2. The env var has no NEXT_PUBLIC_ prefix, so Next will not
//      inline it into client bundles.
//
// Every table is default-deny under RLS, so this module is the
// only way anything is read or written. That is the point.
// ─────────────────────────────────────────────────────────────

export type Db = SupabaseClient<Database>;

/** True when both server-side Supabase env vars are present. */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

let cached: Db | null = null;

/**
 * Returns the service-role client, or throws with an actionable message.
 * Callers that need to degrade gracefully should check
 * `isSupabaseConfigured()` first rather than catching this.
 */
export function getServiceClient(): Db {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    const missing = [
      !url && "NEXT_PUBLIC_SUPABASE_URL",
      !serviceKey && "SUPABASE_SERVICE_ROLE_KEY",
    ]
      .filter(Boolean)
      .join(" and ");
    throw new Error(
      `Supabase is not configured: ${missing} missing. ` +
        `Add it to .env.local (and to your Vercel project settings for production).`
    );
  }

  cached = createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-halek-source": "server" } },
  });

  return cached;
}
