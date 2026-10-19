"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};
const useMounted = () => useSyncExternalStore(subscribe, () => true, () => false);

/** Header button: flips between light and dark (based on what's currently shown). */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {/* Both icons render; CSS shows the right one so there's no hydration flash. */}
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </button>
  );
}

/** Three-way control (System / Light / Dark) used in the footer and mobile menu. */
export function ThemeSegmented({
  labels,
}: {
  labels: { legend: string; system: string; light: string; dark: string };
}) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const current = mounted ? (theme ?? "system") : "system";
  const options = [
    { value: "system", label: labels.system, Icon: MonitorIcon },
    { value: "light", label: labels.light, Icon: SunIcon },
    { value: "dark", label: labels.dark, Icon: MoonIcon },
  ] as const;
  return (
    <fieldset>
      <legend className="sr-only">{labels.legend}</legend>
      <div className="inline-flex rounded-full border border-border bg-surface p-1">
        {options.map(({ value, label, Icon }) => (
          <label
            key={value}
            className={cn(
              "inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent",
              current === value && "bg-surface-2 text-fg",
            )}
          >
            <input
              type="radio"
              name="theme"
              value={value}
              checked={current === value}
              onChange={() => setTheme(value)}
              className="sr-only"
            />
            <Icon className="size-4" />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
