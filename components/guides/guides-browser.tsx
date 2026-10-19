"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Item = { slug: string; category: string; text: string; node: React.ReactNode };

/** Client-side search (?q=) and category filter over server-rendered guide cards. */
export function GuidesBrowser({
  items,
  categories,
  labels,
}: {
  items: Item[];
  categories: { id: string; label: string }[];
  labels: { all: string; search: string; empty: string };
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (category === "all" || i.category === category) && (!q || i.text.toLowerCase().includes(q)),
    );
  }, [items, query, category]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label={labels.all} className="flex flex-wrap gap-2">
          {[{ id: "all", label: labels.all }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                category === c.id
                  ? "border-fg bg-fg text-bg"
                  : "border-border-strong bg-surface text-muted hover:text-fg",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">{labels.search}</span>
          <SearchIcon className="text-muted pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="border-border-strong bg-surface focus:border-accent block min-h-11 w-full rounded-full border ps-10 pe-4 text-sm focus:outline-none"
          />
        </label>
      </div>
      <p className="sr-only" aria-live="polite">{`${visible.length}`}</p>
      {visible.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((i) => (
            <li key={i.slug}>{i.node}</li>
          ))}
        </ul>
      ) : (
        <p className="border-border bg-surface text-muted rounded-2xl border p-8 text-center">
          {labels.empty}
        </p>
      )}
    </>
  );
}
