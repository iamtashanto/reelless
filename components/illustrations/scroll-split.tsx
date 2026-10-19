import { CheckIcon } from "@/components/icons";

const CARDS = Array.from({ length: 14 }, (_, i) => i);

function ConveyorCard({ i }: { i: number }) {
  const tone = ["bg-accent/30", "bg-fg/10", "bg-calm/25", "bg-accent/15"][i % 4];
  return (
    <div className={`relative mb-2.5 h-24 shrink-0 overflow-hidden rounded-xl ${tone}`}>
      <span className="bg-fg/25 absolute start-3 bottom-3 h-1.5 w-16 rounded-full" />
      <span className="bg-fg/20 absolute end-3 top-3 size-3 rounded-full" />
      <svg
        viewBox="0 0 24 24"
        className="text-fg/40 absolute top-1/2 left-1/2 size-6 -translate-1/2"
      >
        <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export type SplitLabels = {
  label: string;
  endless: string;
  intentional: string;
  endlessCaption: string;
  intentionalCaption: string;
};

/**
 * Scroll-driven split: the left feed accelerates as the section scrolls past, the right card
 * settles in. Pure CSS (`.split-*` in globals.css); static where unsupported or reduced motion.
 */
export function ScrollSplit({ labels }: { labels: SplitLabels }) {
  return (
    <div role="img" aria-label={labels.label} className="split">
      <div className="grid grid-cols-2 gap-3 sm:gap-5" aria-hidden>
        <div className="border-border bg-surface rounded-3xl border p-3 sm:p-4">
          <p className="text-accent-text mb-3 px-1 text-sm font-semibold">{labels.endless}</p>
          <div className="relative h-72 overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] sm:h-80">
            <div className="split-conveyor flex flex-col">
              {CARDS.concat(CARDS).map((n, i) => (
                <ConveyorCard key={i} i={n} />
              ))}
            </div>
          </div>
          <p className="text-muted mt-3 px-1 text-xs">{labels.endlessCaption}</p>
        </div>
        <div className="border-border bg-surface rounded-3xl border p-3 sm:p-4">
          <p className="text-calm-text mb-3 px-1 text-sm font-semibold">{labels.intentional}</p>
          <div className="bg-calm-soft grid h-72 place-items-center rounded-2xl sm:h-80">
            <div className="split-calm border-border bg-surface shadow-card w-[82%] rounded-2xl border p-4">
              <div className="bg-calm text-bg mb-3 grid size-10 place-items-center rounded-full">
                <CheckIcon className="size-5" strokeWidth={2.5} />
              </div>
              <span className="bg-fg/15 block h-2 w-4/5 rounded-full" />
              <span className="bg-fg/10 mt-2 block h-2 w-3/5 rounded-full" />
            </div>
          </div>
          <p className="text-muted mt-3 px-1 text-xs">{labels.intentionalCaption}</p>
        </div>
      </div>
    </div>
  );
}
