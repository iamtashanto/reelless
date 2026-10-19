"use client";

import { useRef } from "react";
import { FlameIcon, HourglassIcon, ShieldIcon } from "@/components/icons";
import { useInViewport, usePrefersReducedMotion } from "@/components/motion/hooks";
import { useCountUp } from "@/components/motion/use-count-up";

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

function Count({
  to,
  play,
  reduce,
  format,
}: {
  to: number;
  play: boolean;
  reduce: boolean;
  format?: (n: number) => string;
}) {
  const n = useCountUp(to, play, reduce);
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

/** Bars grow and numbers count up when scrolled into view (CSS transitions, `.stats-*`). */
export function StatsDashboard({ labels }: { labels: DashboardLabels }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewport(ref, { once: true, rootMargin: "0px 0px -15% 0px" });
  const reduce = usePrefersReducedMotion();
  const play = inView || reduce;
  const maxDaily = Math.max(...DAILY);
  const maxApp = Math.max(...BY_APP.map((a) => a.minutes));
  const hm = (mins: number) =>
    `${Math.floor(mins / 60)}${labels.hours} ${mins % 60}${labels.minutes}`;

  return (
    <div
      ref={ref}
      data-play={play}
      className="stats border-border bg-surface shadow-card rounded-3xl border p-4 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="bg-surface-2 text-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
          <span aria-hidden className="bg-muted size-1.5 rounded-full" />
          {labels.example}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          {
            Icon: HourglassIcon,
            label: labels.timeSaved,
            value: <Count to={400} play={play} reduce={reduce} format={hm} />,
          },
          {
            Icon: ShieldIcon,
            label: labels.reelsAvoided,
            value: <Count to={412} play={play} reduce={reduce} />,
          },
          {
            Icon: FlameIcon,
            label: labels.streak,
            value: <Count to={5} play={play} reduce={reduce} />,
          },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="border-border bg-bg rounded-2xl border p-3 sm:p-4">
            <Icon className="text-muted size-4 sm:size-5" />
            <p className="font-display mt-2 text-xl font-bold tabular-nums sm:text-3xl">{value}</p>
            <p className="text-muted mt-0.5 text-xs leading-tight sm:text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        {/* Daily short-form minutes: single series, direct labels, no legend */}
        <figure className="border-border bg-bg relative rounded-2xl border p-4 lg:col-span-3">
          <figcaption className="mb-4 text-sm font-semibold">{labels.shortForm}</figcaption>
          <div className="flex h-40 items-end gap-2" aria-hidden>
            {DAILY.map((v, i) => (
              <div
                key={i}
                className="group relative flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                title={`${labels.days[i]}: ${v} ${labels.minutes}`}
              >
                <span className="text-muted text-xs tabular-nums">{v}</span>
                <span
                  className="stats-bar bg-accent block w-full max-w-10 rounded-t-[4px] group-hover:opacity-80"
                  style={
                    {
                      "--h": `${(v / maxDaily) * 80}%`,
                      transitionDelay: `${100 + i * 70}ms`,
                    } as React.CSSProperties
                  }
                />
                <span className="text-muted text-xs">{labels.days[i]}</span>
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
        <figure className="border-border bg-bg rounded-2xl border p-4 lg:col-span-2">
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
                <div className="bg-surface-2 h-2 rounded-full" aria-hidden>
                  <div
                    className="stats-hbar bg-accent h-full rounded-full"
                    style={
                      {
                        "--w": `${(app.minutes / maxApp) * 100}%`,
                        transitionDelay: `${300 + i * 80}ms`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </figure>
      </div>

      {/* Heatmap: sequential single hue */}
      <figure className="border-border bg-bg mt-4 rounded-2xl border p-4">
        <figcaption className="mb-4 text-sm font-semibold">{labels.heatmap}</figcaption>
        <div className="overflow-x-auto" aria-hidden>
          <div className="text-muted grid min-w-[300px] grid-cols-[2.5rem_repeat(6,1fr)] gap-[2px] text-xs">
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
                  <span
                    key={h}
                    title={`${labels.days[d]} ${HEAT_BLOCKS[h]}:00`}
                    className="stats-cell bg-accent h-6 rounded-[4px]"
                    style={
                      {
                        "--o": HEAT_STEPS[v],
                        transitionDelay: `${400 + (d * 6 + h) * 12}ms`,
                      } as React.CSSProperties
                    }
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
