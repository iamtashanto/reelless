"use client";

import { m } from "motion/react";
import { useLoopVisibility } from "@/components/motion/use-loop-visibility";

/** Generic Android-style settings list with an accessibility toggle switching on. */
export function SettingsToggle({ label }: { label: string }) {
  const { ref, inView, reduce } = useLoopVisibility<HTMLDivElement>();
  const on = reduce || inView;
  return (
    <div ref={ref} role="img" aria-label={label} className="mx-auto w-full max-w-xs">
      <div aria-hidden className="rounded-[2rem] border border-border-strong bg-surface-2 p-2 shadow-card">
        <div className="space-y-2 rounded-[1.6rem] bg-bg p-4">
          <span className="block h-2.5 w-24 rounded-full bg-fg/30" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-surface p-3">
              <div className="space-y-1.5">
                <span className="block h-2 w-20 rounded-full bg-fg/20" />
                <span className="block h-1.5 w-28 rounded-full bg-fg/10" />
              </div>
              <span className="h-5 w-9 rounded-full bg-fg/15" />
            </div>
          ))}
          <div className="flex items-center justify-between rounded-xl border border-accent/50 bg-surface p-3">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 32 32" className="size-6">
                <path d="M16 2.5 5 6.8v8.1C5 22 9.8 27.6 16 29.5c6.2-1.9 11-7.5 11-14.6V6.8L16 2.5Z" fill="var(--accent)" />
              </svg>
              <span className="block h-2 w-16 rounded-full bg-fg/40" />
            </div>
            <m.span
              className="relative h-5 w-9 rounded-full"
              initial={{ backgroundColor: "var(--border-strong)" }}
              animate={{ backgroundColor: on ? "var(--calm)" : "var(--border-strong)" }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <m.span
                className="absolute top-0.5 size-4 rounded-full bg-white shadow"
                initial={{ insetInlineStart: 2 }}
                animate={{ insetInlineStart: on ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.6 }}
              />
            </m.span>
          </div>
        </div>
      </div>
    </div>
  );
}
