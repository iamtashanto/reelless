import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type AccordionItem = { id: string; q: string; a: React.ReactNode };

/**
 * Zero-JS accordion built on native <details>. Content stays in the DOM (good for SEO and
 * find-in-page), keyboard and screen-reader support come from the platform.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <div
      className={cn(
        "divide-border border-border bg-surface divide-y rounded-2xl border",
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.id} id={item.id} data-accordion className="group scroll-mt-28">
          <summary className="hover:text-accent-text flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start font-medium transition-colors sm:px-6">
            <h3 className="font-sans text-base font-semibold tracking-normal sm:text-[1.05rem]">
              {item.q}
            </h3>
            <ChevronDownIcon className="text-muted size-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="text-muted px-5 pb-5 sm:px-6">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
