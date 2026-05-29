"use client";

// A desktop browser-chrome frame around a project screenshot.
// Falls back to a tasteful placeholder when no image is set yet.
export default function BrowserPreview({
  image,
  url,
  name,
}: {
  image?: string;
  url: string;
  name: string;
}) {
  let host = url;
  try {
    host = new URL(url).host;
  } catch {}

  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-ink shadow-2xl shadow-black/40">
      {/* chrome bar */}
      <div className="flex items-center gap-2 border-b border-edge bg-surface px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 truncate rounded-md bg-ink px-3 py-1 font-mono text-[11px] text-muted">
          {host}
        </span>
      </div>
      {/* viewport */}
      <div className="aspect-[16/10] w-full bg-gradient-to-br from-surface to-ink">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${name} desktop preview`}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs text-muted">screenshot coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
}
