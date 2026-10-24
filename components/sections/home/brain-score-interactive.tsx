"use client";

import { useState } from "react";
import {
  BreathIcon,
  CheckIcon,
  FocusIcon,
  ShieldIcon,
  SparkIcon,
  TimerIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";

export type TierTranslation = {
  name: string;
  badge: string;
  title: string;
  desc: string;
  intervention: string;
  goal: string;
};

export type BrainScoreLabels = {
  clarityIndex: string;
  liveScoreHint: string;
  interventionTitle: string;
  habitGoalTitle: string;
  breathingBadge: string;
  breathingTitle: string;
  breathingSubtitle: string;
  inhale: string;
  exhale: string;
  toggleBreathing: string;
  breathingFootnote: string;
  focusBadge: string;
  focusTitle: string;
  focusSubtitle: string;
  sprintDuration: string;
  sprintShieldInfo: string;
  focusFootnote: string;
  tiers: Record<string, TierTranslation>;
};

type TierConfig = {
  id: string;
  emoji: string;
  min: number;
  max: number;
  colorClass: string;
  accentBg: string;
  badgeTone: "calm" | "accent" | "outline";
};

const TIERS: TierConfig[] = [
  {
    id: "peak",
    emoji: "🧠",
    min: 85,
    max: 100,
    colorClass: "text-emerald-500 dark:text-emerald-400",
    accentBg: "from-emerald-500/20 via-teal-500/10 to-transparent",
    badgeTone: "calm",
  },
  {
    id: "calm",
    emoji: "🌿",
    min: 65,
    max: 84,
    colorClass: "text-teal-500 dark:text-teal-400",
    accentBg: "from-teal-500/20 via-sky-500/10 to-transparent",
    badgeTone: "calm",
  },
  {
    id: "dopamine",
    emoji: "⚡",
    min: 45,
    max: 64,
    colorClass: "text-amber-500 dark:text-amber-400",
    accentBg: "from-amber-500/20 via-orange-500/10 to-transparent",
    badgeTone: "accent",
  },
  {
    id: "rotting",
    emoji: "🔥",
    min: 20,
    max: 44,
    colorClass: "text-rose-500 dark:text-rose-400",
    accentBg: "from-rose-500/20 via-red-500/10 to-transparent",
    badgeTone: "accent",
  },
  {
    id: "zombie",
    emoji: "🧟",
    min: 0,
    max: 19,
    colorClass: "text-purple-500 dark:text-purple-400",
    accentBg: "from-purple-500/20 via-rose-500/10 to-transparent",
    badgeTone: "outline",
  },
];

export function BrainrotScoreInteractive({ labels }: { labels: BrainScoreLabels }) {
  const [activeTierId, setActiveTierId] = useState<string>("peak");
  const [breathingActive, setBreathingActive] = useState<boolean>(true);
  const [selectedSprint, setSelectedSprint] = useState<number>(25);

  const activeTier = TIERS.find((t) => t.id === activeTierId) ?? TIERS[0];
  const tierInfo = labels.tiers[activeTier.id] ?? {
    name: activeTier.id,
    badge: "",
    title: "",
    desc: "",
    intervention: "",
    goal: "",
  };
  const demoScore = Math.round((activeTier.min + activeTier.max) / 2);

  return (
    <>
      {/* Apple Glass Frosted Clarity Gauge & Tier Selector */}
      <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/80 bg-surface/75 p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-linear-to-br ${activeTier.accentBg} blur-3xl transition-all duration-700`}
        />

        {/* Tier Tabs */}
        <div className="relative z-10 flex flex-wrap gap-2 pb-8 border-b border-border/60">
          {TIERS.map((tier) => {
            const selected = tier.id === activeTierId;
            const current = labels.tiers[tier.id];
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveTierId(tier.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selected
                    ? "bg-accent text-accent-ink shadow-md scale-105"
                    : "bg-surface-2/80 text-muted hover:bg-surface-2 hover:text-fg"
                }`}
              >
                <span className="text-base">{tier.emoji}</span>
                <span>{current?.name ?? tier.id}</span>
                <span className="text-xs opacity-75">
                  ({tier.min}–{tier.max}%)
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tier Display */}
        <div className="relative z-10 mt-8 grid items-center gap-8 lg:grid-cols-12">
          {/* Left: Gauge Circle */}
          <div className="flex flex-col items-center justify-center text-center lg:col-span-5">
            <div className="relative flex size-48 items-center justify-center rounded-full border-4 border-border/70 bg-surface shadow-inner sm:size-56">
              <svg className="absolute inset-0 size-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  className="stroke-border/40"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="40%"
                  className="transition-all duration-700 ease-out"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * demoScore) / 100}
                  strokeLinecap="round"
                  style={{ color: "var(--accent)" }}
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold font-display sm:text-4xl">{demoScore}%</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted mt-1">
                  {labels.clarityIndex}
                </span>
                <Badge tone={activeTier.badgeTone} className="mt-2 text-xs">
                  {activeTier.emoji} {tierInfo.badge}
                </Badge>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted max-w-xs">{labels.liveScoreHint}</p>
          </div>

          {/* Right: Tier Details & Shield Interventions */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeTier.emoji}</span>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{tierInfo.title}</h3>
            </div>
            <p className="mt-3 text-muted text-base leading-relaxed">{tierInfo.desc}</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-surface/50 p-3.5 backdrop-blur-sm">
                <ShieldIcon className="mt-0.5 size-5 shrink-0 text-calm-text" />
                <div>
                  <h4 className="text-sm font-semibold">{labels.interventionTitle}</h4>
                  <p className="text-xs text-muted mt-0.5">{tierInfo.intervention}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-surface/50 p-3.5 backdrop-blur-sm">
                <SparkIcon className="mt-0.5 size-5 shrink-0 text-accent-text" />
                <div>
                  <h4 className="text-sm font-semibold">{labels.habitGoalTitle}</h4>
                  <p className="text-xs text-muted mt-0.5">{tierInfo.goal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Spotlight Cards: Mindful Breathing & Focus Sprints */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Card 1: Mindful Breathing Intervention */}
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface/80 p-6 shadow-card backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-2xl bg-calm-soft text-calm-text">
              <BreathIcon className="size-6" />
            </span>
            <Badge tone="calm">{labels.breathingBadge}</Badge>
          </div>

          <h3 className="mt-5 font-display text-xl font-bold sm:text-2xl">
            {labels.breathingTitle}
          </h3>
          <p className="mt-2 text-sm text-muted">{labels.breathingSubtitle}</p>

          {/* Interactive Breathing Bubble */}
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-surface-2/40 py-8">
            <div
              className={`relative flex size-28 items-center justify-center rounded-full bg-linear-to-tr from-calm/30 via-calm/10 to-transparent transition-all duration-1000 ${
                breathingActive ? "scale-125 shadow-lg shadow-calm/20" : "scale-90"
              }`}
            >
              <div className="size-16 rounded-full bg-calm text-white grid place-items-center font-semibold text-xs tracking-wide">
                {breathingActive ? labels.inhale : labels.exhale}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setBreathingActive(!breathingActive)}
              className="mt-6 text-xs font-medium text-calm-text hover:underline"
            >
              {labels.toggleBreathing}
            </button>
          </div>
          <p className="mt-4 text-xs text-muted leading-relaxed">{labels.breathingFootnote}</p>
        </div>

        {/* Card 2: Deep Focus Sprint */}
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface/80 p-6 shadow-card backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-text">
              <FocusIcon className="size-6" />
            </span>
            <Badge tone="accent">{labels.focusBadge}</Badge>
          </div>

          <h3 className="mt-5 font-display text-xl font-bold sm:text-2xl">{labels.focusTitle}</h3>
          <p className="mt-2 text-sm text-muted">{labels.focusSubtitle}</p>

          {/* Quick Sprint Selector */}
          <div className="mt-6 rounded-2xl border border-border/60 bg-surface-2/40 p-5">
            <div className="flex items-center justify-between text-sm font-semibold mb-3">
              <span className="flex items-center gap-2">
                <TimerIcon className="size-4 text-accent-text" />
                {labels.sprintDuration}
              </span>
              <span className="text-accent font-mono text-base">{selectedSprint} min</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[15, 25, 45].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setSelectedSprint(mins)}
                  className={`rounded-xl py-2.5 text-center text-xs font-semibold transition-all ${
                    selectedSprint === mins
                      ? "bg-accent text-accent-ink shadow-sm"
                      : "bg-surface border border-border/70 text-muted hover:text-fg"
                  }`}
                >
                  {mins}m Sprint
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <CheckIcon className="size-3.5 text-calm-text shrink-0" />
              <span>{labels.sprintShieldInfo}</span>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted leading-relaxed">{labels.focusFootnote}</p>
        </div>
      </div>
    </>
  );
}
