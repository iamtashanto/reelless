"use client";

import { useRef } from "react";
import { MenuIcon, XIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { waitlistHref } from "@/lib/nav";
import { ThemeSegmented } from "./theme-toggle";

/**
 * Mobile navigation sheet on the native <dialog> element: focus trapping, Escape to close and
 * an inert background come from the browser, with no extra JavaScript library.
 */
export function MobileMenu({
  items,
  labels,
}: {
  items: { href: string; label: string }[];
  labels: {
    open: string;
    close: string;
    title: string;
    cta: string;
    theme: { legend: string; system: string; light: string; dark: string };
  };
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label={labels.open}
        aria-haspopup="dialog"
        onClick={() => ref.current?.showModal()}
        className="text-fg hover:bg-surface-2 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
      >
        <MenuIcon className="size-6" />
      </button>
      <dialog
        ref={ref}
        aria-labelledby="mobile-menu-title"
        onClick={(e) => {
          // Clicking the backdrop (the dialog element itself) closes the menu.
          if (e.target === e.currentTarget) close();
        }}
        className="mobile-sheet border-border bg-surface text-fg shadow-card backdrop:bg-bg/70 m-0 ms-2 mt-2 w-[calc(100%-1rem)] max-w-none rounded-3xl border p-5 backdrop:backdrop-blur-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <p id="mobile-menu-title" className="font-display text-lg font-semibold">
            {labels.title}
          </p>
          <button
            type="button"
            aria-label={labels.close}
            onClick={close}
            className="hover:bg-surface-2 inline-flex size-11 items-center justify-center rounded-full"
          >
            <XIcon className="size-6" />
          </button>
        </div>
        <nav aria-label={labels.title}>
          <ul className="grid gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="font-display hover:bg-surface-2 flex min-h-12 items-center rounded-xl px-3 text-xl font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-border mt-5 flex flex-col gap-4 border-t pt-5">
          <ThemeSegmented labels={labels.theme} />
          <Link
            href={waitlistHref}
            onClick={close}
            className={buttonClasses("primary", "lg", "w-full")}
          >
            {labels.cta}
          </Link>
        </div>
      </dialog>
    </>
  );
}
