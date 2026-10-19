"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { CheckIcon, SearchIcon } from "@/components/icons";
import { useLoopVisibility } from "@/components/motion/use-loop-visibility";
import { cn } from "@/lib/utils";

type Phase = "scroll" | "shield" | "calm";

// One ~8s loop: 3.4s of frantic scrolling → shield sweep → 3.6s of calm.
const TIMELINE: { phase: Phase; ms: number }[] = [
  { phase: "scroll", ms: 3400 },
  { phase: "shield", ms: 1000 },
  { phase: "calm", ms: 3600 },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Abstract short-video card — our own generic UI, not any real app. */
function StreamCard({ i }: { i: number }) {
  const hues = [
    "from-accent/70 via-accent/20 to-calm/40",
    "from-calm/60 via-fg/10 to-accent/50",
    "from-fg/30 via-accent/40 to-fg/10",
    "from-accent/40 via-calm/30 to-fg/20",
  ];
  return (
    <div
      className={cn(
        "relative mb-2 h-[170px] shrink-0 overflow-hidden rounded-xl bg-linear-to-br",
        hues[i % hues.length],
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_45%)]" />
      <svg viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 size-9 -translate-1/2 text-white/85">
        <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" />
      </svg>
      <div className="absolute end-2 bottom-3 flex flex-col items-center gap-2.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className="size-4 rounded-full bg-white/70" />
        ))}
      </div>
      <div className="absolute start-3 bottom-3 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="size-4 rounded-full bg-white/80" />
          <span className="h-1.5 w-14 rounded-full bg-white/80" />
        </div>
        <span className="block h-1.5 w-24 rounded-full bg-white/60" />
      </div>
    </div>
  );
}

function CalmScreen({ labels }: { labels: HeroPhoneLabels }) {
  return (
    <m.div
      className="absolute inset-0 flex flex-col gap-4 p-4 pt-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
    >
      <div className="flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm text-muted shadow-card">
        <SearchIcon className="size-4" />
        <span>{labels.search}</span>
      </div>
      <m.div
        className="mt-2 flex items-end gap-2"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.45 }}
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-calm-soft text-xs font-semibold text-calm-text">
          {labels.friend.slice(0, 1)}
        </span>
        <div className="max-w-[80%] rounded-2xl rounded-es-md border border-border bg-surface px-3.5 py-2.5 text-sm shadow-card">
          <p className="text-[0.7rem] font-semibold text-calm-text">{labels.friend}</p>
          <p className="leading-snug">{labels.message}</p>
        </div>
      </m.div>
      <div className="space-y-2 opacity-70">
        <span className="block h-2 w-3/4 rounded-full bg-fg/10" />
        <span className="block h-2 w-1/2 rounded-full bg-fg/10" />
      </div>
      <m.div
        className="mt-auto inline-flex items-center gap-2 self-center rounded-full bg-calm-soft px-3.5 py-2 text-xs font-semibold text-calm-text"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease, delay: 0.8 }}
      >
        <CheckIcon className="size-3.5" />
        {labels.status}
      </m.div>
    </m.div>
  );
}

export type HeroPhoneLabels = {
  label: string;
  search: string;
  message: string;
  friend: string;
  status: string;
};

export function HeroPhone({ labels }: { labels: HeroPhoneLabels }) {
  const { ref, active, reduce } = useLoopVisibility<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const phase: Phase = reduce ? "calm" : TIMELINE[step].phase;

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % TIMELINE.length), TIMELINE[step].ms);
    return () => window.clearTimeout(id);
  }, [active, step]);

  const streaming = phase !== "calm";

  return (
    <div
      ref={ref}
      role="img"
      aria-label={labels.label}
      className="relative mx-auto w-[min(78vw,290px)]"
    >
      {/* glow */}
      <div
        aria-hidden
        className={cn(
          "absolute -inset-10 -z-10 rounded-full blur-3xl transition-colors duration-1000",
          streaming ? "bg-accent/25" : "bg-calm/25",
        )}
      />
      <div
        aria-hidden
        className="relative aspect-[9/18.5] overflow-hidden rounded-[2.6rem] border border-border-strong bg-surface-2 p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)]"
      >
        <div className="relative h-full overflow-hidden rounded-[2.1rem] bg-bg">
          {/* status bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-between px-5 text-[0.6rem] font-semibold text-muted">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-fg/90" />
            <span className="flex gap-1">
              <span className="h-2 w-3 rounded-sm bg-muted/70" />
              <span className="h-2 w-4 rounded-sm bg-muted/70" />
            </span>
          </div>

          {/* endless stream */}
          <AnimatePresence>
            {streaming ? (
              <m.div
                key="stream"
                className="absolute inset-x-2 top-9 bottom-0 overflow-hidden"
                initial={{ opacity: 1 }}
                animate={{
                  opacity: 1,
                  filter: phase === "shield" ? "blur(3px)" : "blur(0px)",
                }}
                exit={{ opacity: 0, scaleY: 0.2, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease }}
                style={{ transformOrigin: "50% 50%" }}
              >
                <div
                  data-paused={phase !== "scroll" || !active}
                  className="h-full"
                >
                  <div
                    className="flex flex-col"
                    style={{ animation: "conveyor 1.6s linear infinite" }}
                  >
                    {[0, 1, 2, 3, 0, 1, 2, 3].map((n, i) => (
                      <StreamCard key={i} i={n} />
                    ))}
                  </div>
                </div>
              </m.div>
            ) : (
              <CalmScreen key="calm" labels={labels} />
            )}
          </AnimatePresence>

          {/* shield sweep */}
          <AnimatePresence>
            {phase === "shield" ? (
              <m.div
                key="shield"
                className="absolute inset-0 z-10 grid place-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <m.div
                  className="absolute inset-0 bg-accent/85"
                  initial={{ clipPath: "circle(0% at 50% 50%)" }}
                  animate={{ clipPath: "circle(75% at 50% 50%)" }}
                  transition={{ duration: 0.55, ease }}
                />
                <m.svg
                  viewBox="0 0 32 32"
                  className="relative size-24"
                  initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                >
                  <path
                    d="M16 2.5 5 6.8v8.1C5 22 9.8 27.6 16 29.5c6.2-1.9 11-7.5 11-14.6V6.8L16 2.5Z"
                    fill="var(--accent-ink)"
                  />
                  <m.path
                    d="m11 16 3.6 3.6L21.5 12"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                  />
                </m.svg>
              </m.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
