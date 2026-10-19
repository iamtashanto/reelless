"use client";

import { animate, m, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FlameIcon, HourglassIcon, ShieldIcon } from "@/components/icons";

// EXAMPLE DATA ONLY — illustrative, not real users. Labeled as such in the UI.
const DAILY = [48, 36, 31, 22, 19, 14, 11];
const BY_APP = [
  { name: "YouTube", minutes: 52 },
  { name: "Instagram", minutes: 41 },
  { name: "Facebook", minutes: 28 },
  { name: "TikTok", minutes: 18 },
];
// 7 days × 6 three-hour blocks (06–09 … 21–24), intensity 0–4.
const HEAT = [
  [1, 0, 2, 1, 3, 4],
  [1, 1, 1, 0, 3, 4],
  [0, 0, 2, 1, 2, 3],
  [1, 0, 1, 1, 2, 3],
  [0, 1, 1, 0, 2, 2],
  [2, 1, 2, 2, 3, 2],
  [2, 1, 1, 2, 2, 1],
];
const HEAT_BLOCKS = ["06", "09", "12", "15", "18", "21"];
// Sequential: one hue (coral), light → dark via opacity on the surface.
const HEAT_STEPS = [0.08, 0.25, 0.45, 0.7, 1];

const ease = [0.22, 1, 0.36, 1] as const;

function Count({ to, play, reduce, format }: { to: number; play: boolean; reduce: boolean; format?: (n: number) => string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!play || reduce) return;
    const c = animate(0, to, { duration: 1.2, ease, onUpdate: (n) => setV(n) });
    return () => c.stop();
  }, [play, reduce, to]);
  const n = reduce ? to : Math.round(v);
  return <>{format ? format(n) : n}</>;
}

export type DashboardLabels = {
  example: string;
  timeSaved: string;
  reelsAvoided: string;
  streak: string;
  shortForm: string;
  byPlatform: string;
  heatmap: string;
  days: string[];
  hours: string;
  minutes: string;
};

export function StatsDashboard({ labels }: { labels: DashboardLabels }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = !!useReducedMotion();
  const play = inView || reduce;
  const maxDaily = Math.max(...DAILY);
  const maxApp = Math.max(...BY_APP.map((a) => a.minutes));
  const hm = (mins: number) => `${Math.floor(mins / 60)}${labels.hours} ${mins % 60}${labels.minutes}`;

  return (
    <div ref={ref} className="rounded-3xl border border-border bg-surface p-4 shadow-card sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-muted">
          <span aria-hidden className="size-1.5 rounded-full bg-muted" />
          {labels.example}
        </span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { Icon: HourglassIcon, label: labels.timeSaved, value: <Count to={400} play={play} reduce={reduce} format={hm} /> },
          { Icon: ShieldIcon, label: labels.reelsAvoided, value: <Count to={412} play={play} reduce={reduce} /> },
          { Icon: FlameIcon, label: labels.streak, value: <Count to={5} play={play} reduce={reduce} /> },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-border bg-bg p-3 sm:p-4">
            <Icon className="size-4 text-muted sm:size-5" />
            <p className="mt-2 font-display text-xl font-bold tabular-nums sm:text-3xl">{value}</p>
            <p className="mt-0.5 text-xs leading-tight text-muted sm:text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        {/* Daily short-form minutes: single series, direct labels, no legend */}
        <figure className="rounded-2xl border border-border bg-bg p-4 lg:col-span-3">
          <figcaption className="mb-4 text-sm font-semibold">{labels.shortForm}</figcaption>
          <div className="flex h-40 items-end gap-2" aria-hidden>
            {DAILY.map((v, i) => (
              <div key={i} className="group relative flex h-full flex-1 flex-col items-center justify-end gap-1.5" title={`${labels.days[i]}: ${v} ${labels.minutes}`}>
                <span className="text-xs text-muted tabular-nums">{v}</span>
                <m.span
                  className="block w-full max-w-10 rounded-t-[4px] bg-accent transition-opacity group-hover:opacity-80"
                  initial={{ height: reduce ? `${(v / maxDaily) * 80}%` : 0 }}
                  animate={play ? { height: `${(v / maxDaily) * 80}%` } : { height: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.07 }}
                />
                <span className="text-xs text-muted">{labels.days[i]}</span>
              </div>
            ))}
          </div>
          <table className="sr-only">
            <caption>{`${labels.shortForm} (${labels.example})`}</caption>
            <tbody>
              {DAILY.map((v, i) => (
                <tr key={i}>
                  <th scope="row">{labels.days[i]}</th>
                  <td>{`${v} ${labels.minutes}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>

        {/* By app: horizontal bars, single hue, names as direct labels */}
        <figure className="rounded-2xl border border-border bg-bg p-4 lg:col-span-2">
          <figcaption className="mb-4 text-sm font-semibold">{labels.byPlatform}</figcaption>
          <ul className="space-y-3">
            {BY_APP.map((app, i) => (
              <li key={app.name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{app.name}</span>
                  <span className="text-muted tabular-nums">
                    {app.minutes} {labels.minutes}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-surface-2" aria-hidden>
                  <m.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: reduce ? `${(app.minutes / maxApp) * 100}%` : 0 }}
                    animate={play ? { width: `${(app.minutes / maxApp) * 100}%` } : { width: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.08 }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </figure>
      </div>

      {/* Heatmap: sequential single hue */}
      <figure className="mt-4 rounded-2xl border border-border bg-bg p-4">
        <figcaption className="mb-4 text-sm font-semibold">{labels.heatmap}</figcaption>
        <div className="overflow-x-auto" aria-hidden>
          <div className="grid min-w-[300px] grid-cols-[2.5rem_repeat(6,1fr)] gap-[2px] text-xs text-muted">
            <span />
            {HEAT_BLOCKS.map((h) => (
              <span key={h} className="pb-1 text-center tabular-nums">
                {h}
              </span>
            ))}
            {HEAT.map((row, d) => (
              <div key={d} className="contents">
                <span className="flex items-center">{labels.days[d]}</span>
                {row.map((v, h) => (
                  <m.span
                    key={h}
                    title={`${labels.days[d]} ${HEAT_BLOCKS[h]}:00`}
                    className="h-6 rounded-[4px] bg-accent"
                    initial={{ opacity: reduce ? HEAT_STEPS[v] : 0 }}
                    animate={play ? { opacity: HEAT_STEPS[v] } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + (d * 6 + h) * 0.012 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </figure>
    </div>
  );
}
