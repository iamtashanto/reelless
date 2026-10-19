"use client";

import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { PhoneIcon, ShieldIcon, MessageIcon } from "@/components/icons";

const ICONS = [PhoneIcon, ShieldIcon, MessageIcon];

export type Step = { title: string; body: string };

function StepDot({ index, progress }: { index: number; progress?: MotionValue<number> }) {
  const threshold = index / 2; // 0, .5, 1
  const fallback = useMotionValue(1);
  const fill = useTransform<number, number>(progress ?? fallback, (p) => (p >= threshold - 0.02 ? 1 : 0));
  const color = useTransform<number, string>(fill, (f) => (f ? "var(--accent-ink)" : "var(--fg)"));
  const Icon = ICONS[index];
  return (
    <div className="relative grid size-14 shrink-0 place-items-center rounded-2xl border border-border-strong bg-surface shadow-card">
      <m.span className="absolute inset-0 rounded-2xl bg-accent" style={{ opacity: fill }} />
      <m.span className="relative" style={{ color }}>
        <Icon className="size-6" />
      </m.span>
    </div>
  );
}

/** Three steps joined by a line that draws itself as you scroll (pathLength). */
export function Stepper({ steps }: { steps: (Step & { label: string })[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const p = reduce ? undefined : progress;

  return (
    <ol ref={ref} className="relative grid gap-10 md:grid-cols-3 md:gap-8">
      {/* vertical line (mobile) */}
      <svg aria-hidden className="absolute start-7 top-7 bottom-7 w-0.5 md:hidden" preserveAspectRatio="none" viewBox="0 0 2 100">
        <line x1="1" y1="0" x2="1" y2="100" stroke="var(--border-strong)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <m.line x1="1" y1="0" x2="1" y2="100" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: p ?? 1 }} />
      </svg>
      {/* horizontal line (desktop) */}
      <svg aria-hidden className="absolute top-7 hidden h-0.5 md:block" style={{ insetInlineStart: "calc(16.66% - 0px)", insetInlineEnd: "calc(16.66%)" }} preserveAspectRatio="none" viewBox="0 0 100 2">
        <line x1="0" y1="1" x2="100" y2="1" stroke="var(--border-strong)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <m.line x1="0" y1="1" x2="100" y2="1" stroke="var(--accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: p ?? 1 }} className="rtl:origin-right rtl:-scale-x-100" />
      </svg>
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
          <StepDot index={i} progress={p} />
          <div>
            <p className="text-sm font-semibold text-muted">{step.label}</p>
            <h3 className="mt-1 text-h3">{step.title}</h3>
            <p className="mt-2 max-w-sm text-muted md:mx-auto">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
