"use client";

import { useState } from "react";
import { LinkIcon } from "@/components/icons";

/** Plain share links — no third-party scripts or embeds. */
export function ShareButtons({
  url,
  title,
  labels,
}: {
  url: string;
  title: string;
  labels: {
    share: string;
    x: string;
    facebook: string;
    linkedin: string;
    whatsapp: string;
    copy: string;
    copied: string;
  };
}) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: labels.x, short: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    {
      label: labels.facebook,
      short: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    {
      label: labels.linkedin,
      short: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    { label: labels.whatsapp, short: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
  ];
  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{labels.share}</p>
      <ul className="flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.short}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="border-border-strong text-muted hover:text-fg inline-flex min-h-10 items-center rounded-full border px-3.5 text-sm"
            >
              {l.short}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                /* clipboard unavailable */
              }
            }}
            className="border-border-strong text-muted hover:text-fg inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm"
          >
            <LinkIcon className="size-4" />
            <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
