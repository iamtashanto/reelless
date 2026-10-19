"use client";

import { useLocale } from "next-intl";
import { useRef } from "react";
import { GlobeIcon } from "@/components/icons";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ label, align = "end" }: { label: string; align?: "start" | "end" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  return (
    <details ref={ref} className="group relative">
      <summary
        aria-label={label}
        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg"
      >
        <GlobeIcon className="size-[1.15rem]" />
        <span className="uppercase">{locale}</span>
      </summary>
      <ul
        className={cn(
          "absolute top-full z-50 mt-2 min-w-44 rounded-2xl border border-border bg-surface p-1.5 shadow-card",
          align === "end" ? "end-0" : "start-0",
        )}
      >
        {routing.locales.map((code) => (
          <li key={code}>
            <Link
              href={pathname}
              locale={code as Locale}
              hrefLang={code}
              lang={code}
              aria-current={code === locale ? "true" : undefined}
              onClick={() => ref.current?.removeAttribute("open")}
              className={cn(
                "flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-sm transition-colors hover:bg-surface-2",
                code === locale && "font-semibold text-accent-text",
              )}
            >
              {localeLabels[code as Locale].native}
              <span className="text-xs text-muted uppercase">{code}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
