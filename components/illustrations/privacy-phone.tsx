"use client";

import { useLoopVisibility } from "@/components/motion/use-loop-visibility";

// Particle targets on the phone's inner edge (offsets from the lock, viewBox units). Each one
// flies out, hits the boundary and bounces back — data never leaves the device.
const PARTICLES = [
  { x: -60, y: -120 },
  { x: 60, y: -130 },
  { x: -72, y: -20 },
  { x: 72, y: 0 },
  { x: -40, y: 110 },
  { x: 50, y: 130 },
  { x: 0, y: -150 },
  { x: 0, y: 155 },
];

/** CSS-animated (`.privacy-*` in globals.css); paused off-screen, hidden for reduced motion. */
export function PrivacyPhone({ label }: { label: string }) {
  const { ref, active } = useLoopVisibility<HTMLDivElement>();
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-paused={!active}
      className="relative mx-auto w-[min(70vw,260px)]"
    >
      <div aria-hidden className="bg-calm/20 absolute -inset-8 -z-10 rounded-full blur-3xl" />
      <svg aria-hidden viewBox="0 0 200 380" className="w-full">
        <rect
          x="6"
          y="6"
          width="188"
          height="368"
          rx="34"
          fill="var(--surface)"
          stroke="var(--border-strong)"
          strokeWidth="2"
        />
        <rect x="16" y="16" width="168" height="348" rx="26" fill="var(--bg)" />
        <rect x="76" y="24" width="48" height="10" rx="5" fill="var(--fg)" opacity=".85" />
        <rect
          className="privacy-boundary"
          x="16"
          y="16"
          width="168"
          height="348"
          rx="26"
          fill="none"
          stroke="var(--calm)"
          strokeWidth="2"
        />
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            className="privacy-particle"
            cx="100"
            cy="190"
            r="4.5"
            fill={i % 2 ? "var(--accent)" : "var(--calm)"}
            style={
              {
                "--dx": `${p.x}px`,
                "--dy": `${p.y}px`,
                animationDelay: `${i * 0.28}s`,
              } as React.CSSProperties
            }
          />
        ))}
        <g transform="translate(100 190)">
          <circle r="34" fill="var(--calm-soft)" />
          <rect x="-15" y="-4" width="30" height="24" rx="6" fill="var(--calm)" />
          <path
            d="M-9 -4v-7a9 9 0 0 1 18 0v7"
            fill="none"
            stroke="var(--calm)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cy="7" r="3" fill="var(--bg)" />
        </g>
      </svg>
    </div>
  );
}
