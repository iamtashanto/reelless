"use client";

import { AnimatePresence, m } from "motion/react";
import { CheckIcon } from "@/components/icons";

/** Inline, polite status toast. Rendered inside a persistent aria-live region. */
export function Toast({ message, tone = "success" }: { message: string | null; tone?: "success" | "error" }) {
  return (
    <div aria-live="polite" role="status" className="min-h-0">
      <AnimatePresence>
        {message ? (
          <m.div
            key={message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={
              tone === "success"
                ? "mt-4 flex items-start gap-3 rounded-xl border border-calm/40 bg-calm-soft p-4 text-sm text-fg"
                : "mt-4 rounded-xl border border-accent/40 bg-accent-soft p-4 text-sm text-fg"
            }
          >
            {tone === "success" ? <CheckIcon className="mt-0.5 size-4 shrink-0 text-calm-text" /> : null}
            <span>{message}</span>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
