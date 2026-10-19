"use client";

import { useRef } from "react";
import { useInViewport } from "@/components/motion/hooks";

/** Generic Android-style settings list with an accessibility toggle switching on (CSS transition). */
export function SettingsToggle({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInViewport(ref, { once: true });
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      data-on={on}
      className="settings-toggle mx-auto w-full max-w-xs"
    >
      <div
        aria-hidden
        className="border-border-strong bg-surface-2 shadow-card rounded-[2rem] border p-2"
      >
        <div className="bg-bg space-y-2 rounded-[1.6rem] p-4">
          <span className="bg-fg/30 block h-2.5 w-24 rounded-full" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-surface flex items-center justify-between rounded-xl p-3">
              <div className="space-y-1.5">
                <span className="bg-fg/20 block h-2 w-20 rounded-full" />
                <span className="bg-fg/10 block h-1.5 w-28 rounded-full" />
              </div>
              <span className="bg-fg/15 h-5 w-9 rounded-full" />
            </div>
          ))}
          <div className="border-accent/50 bg-surface flex items-center justify-between rounded-xl border p-3">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 32 32" className="size-6">
                <path
                  d="M16 2.5 5 6.8v8.1C5 22 9.8 27.6 16 29.5c6.2-1.9 11-7.5 11-14.6V6.8L16 2.5Z"
                  fill="var(--accent)"
                />
              </svg>
              <span className="bg-fg/40 block h-2 w-16 rounded-full" />
            </div>
            <span className="settings-switch relative h-5 w-9 rounded-full">
              <span className="settings-knob absolute top-0.5 size-4 rounded-full bg-white shadow" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
