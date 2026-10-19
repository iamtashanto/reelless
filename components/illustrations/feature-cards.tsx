"use client";

import { animate, m, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EyeOffIcon, SearchIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

/** Plays once when scrolled into view; replays on hover/focus. Reduced motion → end state. */
function usePlay() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const played = reduce || inView;
  const replay = () => {
    if (!reduce) setRun((r) => r + 1);
  };
  return { ref, played, run, reduce: !!reduce, replay };
}

function Frame({
  label,
  children,
  onReplay,
  innerRef,
}: {
  label: string;
  children: React.ReactNode;
  onReplay: () => void;
  innerRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      role="img"
      aria-label={label}
      onPointerEnter={onReplay}
      className="relative h-44 overflow-hidden rounded-xl border border-border bg-bg p-4"
    >
      <div aria-hidden className="h-full">
        {children}
      </div>
    </div>
  );
}

/* 1. Search-only: recommendation tiles fade away, the search bar stays. */
export function SearchOnlyAnim({ label }: { label: string }) {
  const { ref, played, run, replay } = usePlay();
  return (
    <Frame label={label} innerRef={ref} onReplay={replay}>
      <div key={run} className="relative h-full">
        <m.div
          className="flex min-h-9 items-center gap-2 rounded-full border border-border-strong bg-surface px-3 text-xs text-muted"
          initial={{ y: 0 }}
          animate={played ? { y: 44 } : { y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.9 }}
        >
          <SearchIcon className="size-3.5" />
          <span className="h-1.5 w-20 rounded-full bg-fg/15" />
        </m.div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <m.span
              key={i}
              className="h-11 rounded-lg bg-accent/20"
              initial={{ opacity: 1, scale: 1 }}
              animate={played ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.08 }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* 2. Friends-first: suggested posts slide out, the friend's post stays. */
export function FriendsFirstAnim({
  label,
  suggested,
  friend,
}: {
  label: string;
  suggested: string;
  friend: string;
}) {
  const { ref, played, run, replay } = usePlay();
  const rows = [
    { kind: "suggested", text: suggested },
    { kind: "friend", text: friend },
    { kind: "suggested", text: suggested },
  ] as const;
  return (
    <Frame label={label} innerRef={ref} onReplay={replay}>
      <div key={run} className="flex h-full flex-col justify-center gap-2">
        {rows.map((row, i) =>
          row.kind === "friend" ? (
            <m.div
              key={i}
              layout
              className="flex items-center gap-2 rounded-lg border border-calm/40 bg-calm-soft px-3 py-2.5 text-xs font-semibold text-calm-text"
            >
              <span className="size-5 rounded-full bg-calm/60" />
              {row.text}
            </m.div>
          ) : (
            <m.div
              key={i}
              className="flex items-center gap-2 overflow-hidden rounded-lg border border-border bg-surface px-3 text-xs text-muted"
              initial={{ x: 0, opacity: 1, height: 38 }}
              animate={played ? { x: "110%", opacity: 0, height: 0 } : { x: 0, opacity: 1, height: 38 }}
              transition={{ duration: 0.55, ease, delay: 0.3 + i * 0.12 }}
            >
              <span className="size-5 shrink-0 rounded-full bg-fg/15" />
              {row.text}
            </m.div>
          ),
        )}
      </div>
    </Frame>
  );
}

/* 3. Keyword filter: a tagged post blurs, then folds away. */
export function KeywordAnim({ label, tag }: { label: string; tag: string }) {
  const { ref, played, run, replay } = usePlay();
  return (
    <Frame label={label} innerRef={ref} onReplay={replay}>
      <div key={run} className="flex h-full flex-col justify-center gap-2">
        <div className="rounded-lg border border-border bg-surface p-2.5">
          <span className="block h-1.5 w-3/4 rounded-full bg-fg/15" />
        </div>
        <m.div
          className="relative overflow-hidden rounded-lg border border-accent/40 bg-surface"
          initial={{ height: 64 }}
          animate={played ? { height: 30 } : { height: 64 }}
          transition={{ duration: 0.5, ease, delay: 1.1 }}
        >
          <m.div
            className="p-2.5"
            initial={{ filter: "blur(0px)" }}
            animate={played ? { filter: "blur(5px)", opacity: 0 } : { filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="inline-block rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-semibold text-accent-text">
              {tag}
            </span>
            <span className="mt-2 block h-1.5 w-4/5 rounded-full bg-fg/15" />
            <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-fg/10" />
          </m.div>
          <m.div
            className="absolute inset-0 flex items-center gap-1.5 px-2.5 text-[0.7rem] font-medium text-muted"
            initial={{ opacity: 0 }}
            animate={played ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.3 }}
          >
            <EyeOffIcon className="size-3.5" /> {tag}
          </m.div>
        </m.div>
        <div className="rounded-lg border border-border bg-surface p-2.5">
          <span className="block h-1.5 w-2/3 rounded-full bg-fg/15" />
        </div>
      </div>
    </Frame>
  );
}

/* 4. Daily allowance: a ring timer fills; the minutes left count down. */
export function LimitRingAnim({ label, left }: { label: string; left: string }) {
  const { ref, played, run, reduce, replay } = usePlay();
  const progress = useMotionValue(reduce ? 0.7 : 0);
  const minutes = useTransform(progress, (p) => Math.round(10 - p * 10));
  const [shown, setShown] = useState(reduce ? 3 : 10);
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = useTransform(progress, (p) => c * (1 - p));

  useEffect(() => minutes.on("change", (v) => setShown(v)), [minutes]);
  useEffect(() => {
    if (!played) return;
    if (reduce) {
      progress.set(0.7);
      return;
    }
    progress.set(0);
    const controls = animate(progress, 0.7, { duration: 1.6, ease, delay: 0.2 });
    return () => controls.stop();
  }, [played, run, reduce, progress]);

  return (
    <Frame label={label} innerRef={ref} onReplay={replay}>
      <div className="grid h-full place-items-center">
        <div className="relative size-32">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle cx="60" cy="60" r={r} fill="none" stroke="var(--border-strong)" strokeWidth="9" />
            <m.circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={c}
              style={{ strokeDashoffset: offset }}
            />
          </svg>
          <div className="absolute inset-0 grid place-content-center text-center">
            <span className="font-display text-3xl font-bold tabular-nums">{shown}</span>
            <span className="text-[0.7rem] text-muted">{left}</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 5. Stats: bars grow from zero, values count up. Example data, clearly labeled. */
const SAMPLE = [42, 35, 28, 22, 18, 12, 9];

function CountUp({ to, play, reduce }: { to: number; play: boolean; reduce: boolean }) {
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!play || reduce) return;
    const controls = animate(0, to, { duration: 1.1, ease, onUpdate: (n) => setV(Math.round(n)) });
    return () => controls.stop();
  }, [play, to, reduce]);
  return <>{reduce ? to : v}</>;
}

export function StatsBarsAnim({ label, example, days }: { label: string; example: string; days: string[] }) {
  const { ref, played, run, reduce, replay } = usePlay();
  const max = Math.max(...SAMPLE);
  return (
    <Frame label={label} innerRef={ref} onReplay={replay}>
      <span className="absolute end-3 top-3 rounded-full bg-surface-2 px-2 py-0.5 text-[0.65rem] font-semibold text-muted">
        {example}
      </span>
      <div key={run} className="flex h-full items-end gap-1.5 pt-6">
        {SAMPLE.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[0.65rem] text-muted tabular-nums">
              <CountUp to={v} play={played} reduce={reduce} />
            </span>
            <m.span
              className="block w-full rounded-t-[4px] bg-accent"
              style={{ originY: 1 }}
              initial={{ height: 0 }}
              animate={played ? { height: `${(v / max) * 78}px` } : { height: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.06 }}
            />
            <span className="text-[0.6rem] text-muted">{days[i]}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 6. Shelf cover: a row of short videos in a feed gets covered by a calm panel. */
export function ShelfCoverAnim({ label, hidden }: { label: string; hidden: string }) {
  const { ref, played, run, replay } = usePlay();
  return (
    <Frame label={label} innerRef={ref} onReplay={replay}>
      <div key={run} className="flex h-full flex-col justify-center gap-2">
        <div className="rounded-lg border border-border bg-surface p-2.5">
          <span className="block h-1.5 w-2/3 rounded-full bg-fg/15" />
        </div>
        <div className="relative">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-16 flex-1 rounded-md bg-linear-to-b from-accent/40 to-accent/10" />
            ))}
          </div>
          <m.div
            className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-md border border-calm/40 bg-calm-soft text-[0.7rem] font-semibold text-calm-text backdrop-blur-sm"
            style={{ originX: 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={played ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.5 }}
          >
            <EyeOffIcon className="size-3.5" /> {hidden}
          </m.div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-2.5">
          <span className="block h-1.5 w-1/2 rounded-full bg-fg/15" />
        </div>
      </div>
    </Frame>
  );
}
