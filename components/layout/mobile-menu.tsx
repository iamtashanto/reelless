"use client";

import { AnimatePresence, m } from "motion/react";
import { Dialog } from "radix-ui";
import { useState } from "react";
import { MenuIcon, XIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { waitlistHref } from "@/lib/nav";
import { ThemeSegmented } from "./theme-toggle";

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
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label={labels.open}
        className="inline-flex size-11 items-center justify-center rounded-full text-fg hover:bg-surface-2 lg:hidden"
      >
        <MenuIcon className="size-6" />
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-50 bg-bg/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <m.div
                className="fixed inset-x-2 top-2 z-50 rounded-3xl border border-border bg-surface p-5 shadow-card focus:outline-none"
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Dialog.Title className="font-display text-lg font-semibold">{labels.title}</Dialog.Title>
                  <Dialog.Close
                    aria-label={labels.close}
                    className="inline-flex size-11 items-center justify-center rounded-full hover:bg-surface-2"
                  >
                    <XIcon className="size-6" />
                  </Dialog.Close>
                </div>
                <nav aria-label={labels.title}>
                  <ul className="grid gap-1">
                    {items.map((item, i) => (
                      <m.li
                        key={item.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex min-h-12 items-center rounded-xl px-3 font-display text-xl font-medium hover:bg-surface-2"
                        >
                          {item.label}
                        </Link>
                      </m.li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5">
                  <ThemeSegmented labels={labels.theme} />
                  <Link
                    href={waitlistHref}
                    onClick={() => setOpen(false)}
                    className={buttonClasses("primary", "lg", "w-full")}
                  >
                    {labels.cta}
                  </Link>
                </div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
