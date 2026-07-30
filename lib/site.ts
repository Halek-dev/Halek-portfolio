// ─────────────────────────────────────────────────────────────
// Site-level configuration.
//
// ⚠️ SET THIS BEFORE YOUR NEXT DEPLOY.
// SITE_URL feeds metadataBase, every canonical URL, the sitemap,
// robots.txt and every OG image. While it is wrong, social shares
// render broken previews and search engines index the wrong host.
//
// Either set NEXT_PUBLIC_SITE_URL in your Vercel project settings,
// or replace the fallback string below with your real domain.
// ─────────────────────────────────────────────────────────────

const FALLBACK_SITE_URL = "https://halek.dev"; // ← replace with your real domain

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/$/, "");

/** True when SITE_URL is still the un-configured fallback. */
export const SITE_URL_IS_PLACEHOLDER = !process.env.NEXT_PUBLIC_SITE_URL;
