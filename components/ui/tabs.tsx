"use client";

import { createContext, useContext, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal WAI-ARIA tabs (automatic activation, arrow/Home/End keys). Inactive panels stay in
 * the DOM with `hidden`, so their content is still indexable.
 */
type Ctx = { value: string; setValue: (v: string) => void; baseId: string };
const TabsContext = createContext<Ctx | null>(null);
const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs>");
  return ctx;
};

export function Tabs({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const baseId = useId();
  return (
    <TabsContext.Provider value={{ value, setValue, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const onKeyDown = (e: React.KeyboardEvent) => {
    const tabs = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
    const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    const rtl = getComputedStyle(ref.current!).direction === "rtl";
    const next = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
    let target: HTMLButtonElement | undefined;
    if (next) target = tabs[(index + next + tabs.length) % tabs.length];
    if (e.key === "Home") target = tabs[0];
    if (e.key === "End") target = tabs[tabs.length - 1];
    if (target) {
      e.preventDefault();
      target.focus();
      target.click();
    }
  };
  return (
    <div
      ref={ref}
      role="tablist"
      onKeyDown={onKeyDown}
      className={cn(
        "border-border bg-surface inline-flex max-w-full gap-1 overflow-x-auto rounded-full border p-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: active, setValue, baseId } = useTabs();
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => setValue(value)}
      className={cn(
        "text-muted hover:text-fg aria-selected:bg-fg aria-selected:text-bg min-h-11 rounded-full px-5 text-sm font-semibold transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: active, baseId } = useTabs();
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={active !== value}
      tabIndex={0}
      className={cn("mt-8 focus-visible:outline-none", className)}
    >
      {children}
    </div>
  );
}
