"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { CheckIcon } from "@/components/icons";

const CARDS = Array.from({ length: 14 }, (_, i) => i);

function ConveyorCard({ i }: { i: number }) {
  const tone = ["bg-accent/30", "bg-fg/10", "bg-calm/25", "bg-accent/15"][i % 4];
  return (
    <div className={`mb-2.5 h-24 shrink-0 rounded-xl ${tone} relative overflow-hidden`}>
      <span className="absolute start-3 bottom-3 h-1.5 w-16 rounded-full bg-fg/25" />
      <span className="absolute end-3 top-3 size-3 rounded-full bg-fg/20" />
      <svg viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 size-6 -translate-1/2 text-fg/40">
        <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function Panels({
  labels,
  y,
  blur,
  calmScale,
  calmOpacity,
}: {
  labels: SplitLabels;
  y?: MotionValue<string>;
  blur?: MotionValue<string>;
  calmScale?: MotionValue<number>;
  calmOpacity?: MotionValue<number>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5" aria-hidden>
      <div className="rounded-3xl border border-border bg-surface p-3 sm:p-4">
        <p className="mb-3 px-1 text-sm font-semibold text-accent-text">{labels.endless}</p>
        <div className="relative h-72 overflow-hidden rounded-2xl sm:h-80 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <m.div className="flex flex-col" style={{ y, filter: blur }}>
            {CARDS.concat(CARDS).map((n, i) => (
              <ConveyorCard key={i} i={n} />
            ))}
          </m.div>
        </div>
        <p className="mt-3 px-1 text-xs text-muted">{labels.endlessCaption}</p>
      </div>
      <div className="rounded-3xl border border-border bg-surface p-3 sm:p-4">
        <p className="mb-3 px-1 text-sm font-semibold text-calm-text">{labels.intentional}</p>
        <div className="grid h-72 place-items-center rounded-2xl bg-calm-soft sm:h-80">
          <m.div
            className="w-[82%] rounded-2xl border border-border bg-surface p-4 shadow-card"
            style={{ scale: calmScale, opacity: calmOpacity }}
          >
            <div className="mb-3 grid size-10 place-items-center rounded-full bg-calm text-bg">
              <CheckIcon className="size-5" strokeWidth={2.5} />
            </div>
            <span className="block h-2 w-4/5 rounded-full bg-fg/15" />
            <span className="mt-2 block h-2 w-3/5 rounded-full bg-fg/10" />
          </m.div>
        </div>
        <p className="mt-3 px-1 text-xs text-muted">{labels.intentionalCaption}</p>
      </div>
    </div>
  );
}

export type SplitLabels = {
  label: string;
  endless: string;
  intentional: string;
  endlessCaption: string;
  intentionalCaption: string;
};

/** Scroll-driven: the left feed accelerates as you scroll, the right card settles in. */
export function ScrollSplit({ labels }: { labels: SplitLabels }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Quadratic easing makes the conveyor accelerate rather than move at constant speed.
  const y = useTransform(scrollYProgress, (p) => `${-Math.pow(p, 2) * 50}%`);
  const blur = useTransform(scrollYProgress, [0.3, 0.9], ["blur(0px)", "blur(2.5px)"]);
  const calmScale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1]);
  const calmOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0.35, 1]);

  return (
    <div ref={ref} role="img" aria-label={labels.label}>
      {reduce ? (
        <Panels labels={labels} />
      ) : (
        <Panels labels={labels} y={y} blur={blur} calmScale={calmScale} calmOpacity={calmOpacity} />
      )}
    </div>
  );
}
