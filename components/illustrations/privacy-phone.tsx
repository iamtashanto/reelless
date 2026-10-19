"use client";

import { m } from "motion/react";
import { useLoopVisibility } from "@/components/motion/use-loop-visibility";

// Particle targets on the phone's inner edge (viewBox units). Each one flies out, hits the
// boundary and bounces back to the lock — data never leaves the device.
const PARTICLES = [
  { x: 40, y: 70 },
  { x: 160, y: 60 },
  { x: 28, y: 170 },
  { x: 172, y: 190 },
  { x: 60, y: 300 },
  { x: 150, y: 320 },
  { x: 100, y: 40 },
  { x: 100, y: 345 },
];
const CENTER = { x: 100, y: 190 };

export function PrivacyPhone({ label }: { label: string }) {
  const { ref, active, reduce } = useLoopVisibility<HTMLDivElement>();
  return (
    <div ref={ref} role="img" aria-label={label} className="relative mx-auto w-[min(70vw,260px)]">
      <div aria-hidden className="absolute -inset-8 -z-10 rounded-full bg-calm/20 blur-3xl" />
      <svg aria-hidden viewBox="0 0 200 380" className="w-full">
        <rect x="6" y="6" width="188" height="368" rx="34" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="2" />
        <rect x="16" y="16" width="168" height="348" rx="26" fill="var(--bg)" />
        <rect x="76" y="24" width="48" height="10" rx="5" fill="var(--fg)" opacity=".85" />
        {/* boundary pulse */}
        <m.rect
          x="16" y="16" width="168" height="348" rx="26" fill="none" stroke="var(--calm)" strokeWidth="2"
          initial={{ opacity: 0.25 }}
          animate={active ? { opacity: [0.2, 0.7, 0.2] } : { opacity: 0.35 }}
          transition={active ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
        {PARTICLES.map((p, i) => (
          <m.circle
            key={i}
            r="4.5"
            fill={i % 2 ? "var(--accent)" : "var(--calm)"}
            initial={{ cx: CENTER.x, cy: CENTER.y, opacity: reduce ? 0 : 0.9 }}
            animate={
              active
                ? { cx: [CENTER.x, p.x, CENTER.x], cy: [CENTER.y, p.y, CENTER.y], opacity: [0, 1, 0] }
                : { cx: CENTER.x, cy: CENTER.y, opacity: 0 }
            }
            transition={
              active
                ? { duration: 2.2, times: [0, 0.45, 1], ease: ["easeOut", "easeIn"], repeat: Infinity, delay: i * 0.28, repeatDelay: 0.4 }
                : { duration: 0.2 }
            }
          />
        ))}
        {/* lock */}
        <g transform="translate(100 190)">
          <circle r="34" fill="var(--calm-soft)" />
          <rect x="-15" y="-4" width="30" height="24" rx="6" fill="var(--calm)" />
          <path d="M-9 -4v-7a9 9 0 0 1 18 0v7" fill="none" stroke="var(--calm)" strokeWidth="4" strokeLinecap="round" />
          <circle cy="7" r="3" fill="var(--bg)" />
        </g>
      </svg>
    </div>
  );
}
