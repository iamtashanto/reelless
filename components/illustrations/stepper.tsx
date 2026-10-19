import { MessageIcon, PhoneIcon, ShieldIcon } from "@/components/icons";

const ICONS = [PhoneIcon, ShieldIcon, MessageIcon];

export type Step = { title: string; body: string; label: string };

/**
 * Three steps joined by a line that draws itself as you scroll — CSS scroll-driven animation
 * (`animation-timeline: view()`, see `.step-*` in globals.css). Zero JavaScript; browsers
 * without scroll timelines, and reduced-motion users, see the finished line.
 */
export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="stepper relative grid gap-10 md:grid-cols-3 md:gap-8">
      <span
        aria-hidden
        className="bg-border-strong absolute start-7 top-7 bottom-7 w-0.5 md:hidden"
      />
      <span
        aria-hidden
        className="step-line-y bg-accent absolute start-7 top-7 bottom-7 w-0.5 md:hidden"
      />
      <span
        aria-hidden
        className="bg-border-strong absolute start-[16.66%] end-[16.66%] top-7 hidden h-0.5 md:block"
      />
      <span
        aria-hidden
        className="step-line-x bg-accent absolute start-[16.66%] end-[16.66%] top-7 hidden h-0.5 md:block"
      />
      {steps.map((step, i) => {
        const Icon = ICONS[i];
        return (
          <li
            key={step.title}
            className="relative flex gap-5 md:flex-col md:items-center md:text-center"
          >
            <div className="step-dot border-border-strong bg-surface shadow-card relative grid size-14 shrink-0 place-items-center rounded-2xl border">
              <Icon className="relative size-6" />
            </div>
            <div>
              <p className="text-muted text-sm font-semibold">{step.label}</p>
              <h3 className="text-h3 mt-1">{step.title}</h3>
              <p className="text-muted mt-2 max-w-sm md:mx-auto">{step.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
