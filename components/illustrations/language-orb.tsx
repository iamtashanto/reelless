"use client";

import { useLoopVisibility } from "@/components/motion/use-loop-visibility";

// Generic words for "short videos" in several scripts — no logos, no product names.
const WORDS = [
  { text: "Shorts", lang: "en" },
  { text: "শর্টস", lang: "bn" },
  { text: "ريلز", lang: "ar" },
  { text: "Reels", lang: "en" },
  { text: "शॉर्ट्स", lang: "hi" },
  { text: "Cortos", lang: "es" },
];

/** Words orbit a line-drawn globe. CSS animation, paused off-screen and for reduced motion. */
export function LanguageOrb({ label }: { label: string }) {
  const { ref, active } = useLoopVisibility<HTMLDivElement>();
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-paused={!active}
      className="relative mx-auto aspect-square w-full max-w-[420px] [container-type:inline-size]"
    >
      <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-[18%] text-fg/30">
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          <circle cx="100" cy="100" r="80" />
          <ellipse cx="100" cy="100" rx="32" ry="80" />
          <ellipse cx="100" cy="100" rx="62" ry="80" />
          <path d="M20 100h160M30 62h140M30 138h140" />
        </g>
        <circle cx="100" cy="100" r="80" fill="url(#orbGlow)" />
        <defs>
          <radialGradient id="orbGlow" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="var(--calm)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--calm)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <div aria-hidden className="absolute inset-[6%] rounded-full border border-dashed border-border-strong" />
      <ul
        aria-hidden
        className="absolute inset-0 motion-safe:animate-[orbit_36s_linear_infinite]"
      >
        {WORDS.map((w, i) => {
          const angle = (i / WORDS.length) * 360;
          return (
            <li
              key={w.text}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `rotate(${angle}deg) translateY(-42cqw) rotate(${-angle}deg)` }}
            >
              <span className="block motion-safe:animate-[counter-orbit_36s_linear_infinite]">
                <span
                  lang={w.lang}
                  dir="auto"
                  className={`block -translate-1/2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap shadow-card ${i % 2 ? "text-accent-text" : ""}`}
                >
                  {w.text}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
