"use client";

import { CheckIcon, SearchIcon } from "@/components/icons";
import { useLoopVisibility } from "@/components/motion/use-loop-visibility";
import { cn } from "@/lib/utils";

/**
 * Hero phone: an endless stream of short videos → the Reelless shield sweeps over → a calm
 * screen with a search bar and a friend's message. One 8s CSS loop (see `.hero-*` in
 * globals.css) — no animation library, so it costs almost nothing on first load.
 * Paused off-screen; reduced motion shows the calm frame only.
 */

export type HeroPhoneLabels = {
  label: string;
  search: string;
  message: string;
  friend: string;
  status: string;
};

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
      <svg
        viewBox="0 0 24 24"
        className="absolute top-1/2 left-1/2 size-9 -translate-1/2 text-white/85"
      >
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

export function HeroPhone({ labels }: { labels: HeroPhoneLabels }) {
  const { ref, active } = useLoopVisibility<HTMLDivElement>();

  return (
    <div
      ref={ref}
      role="img"
      aria-label={labels.label}
      data-paused={!active}
      className="hero-phone relative mx-auto w-[min(78vw,290px)]"
    >
      <div aria-hidden className="hero-glow absolute -inset-10 -z-10 rounded-full blur-3xl" />
      <div
        aria-hidden
        className="border-border-strong bg-surface-2 relative aspect-[9/18.5] overflow-hidden rounded-[2.6rem] border p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)]"
      >
        <div className="bg-bg relative h-full overflow-hidden rounded-[2.1rem]">
          <div className="text-muted absolute inset-x-0 top-0 z-20 flex h-8 items-center justify-between px-5 text-[0.6rem] font-semibold">
            <span>9:41</span>
            <span className="bg-fg/90 h-4 w-16 rounded-full" />
            <span className="flex gap-1">
              <span className="bg-muted/70 h-2 w-3 rounded-sm" />
              <span className="bg-muted/70 h-2 w-4 rounded-sm" />
            </span>
          </div>

          <div className="hero-stream absolute inset-x-2 top-9 bottom-0 overflow-hidden">
            <div className="hero-conveyor flex flex-col">
              {[0, 1, 2, 3, 0, 1, 2, 3].map((n, i) => (
                <StreamCard key={i} i={n} />
              ))}
            </div>
          </div>

          <div className="hero-calm absolute inset-0 flex flex-col gap-4 p-4 pt-10">
            <div className="border-border bg-surface text-muted shadow-card flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm">
              <SearchIcon className="size-4" />
              <span>{labels.search}</span>
            </div>
            <div className="hero-calm-message mt-2 flex items-end gap-2">
              <span className="bg-calm-soft text-calm-text grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold">
                {labels.friend.slice(0, 1)}
              </span>
              <div className="border-border bg-surface shadow-card max-w-[80%] rounded-2xl rounded-es-md border px-3.5 py-2.5 text-sm">
                <p className="text-calm-text text-[0.7rem] font-semibold">{labels.friend}</p>
                <p className="leading-snug">{labels.message}</p>
              </div>
            </div>
            <div className="space-y-2 opacity-70">
              <span className="bg-fg/10 block h-2 w-3/4 rounded-full" />
              <span className="bg-fg/10 block h-2 w-1/2 rounded-full" />
            </div>
            <div className="hero-calm-status bg-calm-soft text-calm-text mt-auto inline-flex items-center gap-2 self-center rounded-full px-3.5 py-2 text-xs font-semibold">
              <CheckIcon className="size-3.5" />
              {labels.status}
            </div>
          </div>

          <div className="hero-shield pointer-events-none absolute inset-0 z-10 grid place-items-center">
            <div className="hero-shield-fill bg-accent/85 absolute inset-0" />
            <svg viewBox="0 0 32 32" className="hero-shield-icon relative size-24">
              <path
                d="M16 2.5 5 6.8v8.1C5 22 9.8 27.6 16 29.5c6.2-1.9 11-7.5 11-14.6V6.8L16 2.5Z"
                fill="var(--accent-ink)"
              />
              <path
                className="hero-shield-check"
                d="m11 16 3.6 3.6L21.5 12"
                fill="none"
                stroke="var(--accent)"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
