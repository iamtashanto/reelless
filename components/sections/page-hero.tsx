import { Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("grain border-border relative overflow-hidden border-b", className)}>
      <div aria-hidden className="bg-grid absolute inset-0 -z-20 opacity-50" />
      <div
        aria-hidden
        className="bg-accent/10 absolute start-1/2 -top-40 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full blur-3xl rtl:translate-x-1/2"
      />
      <div className="container-page pt-14 pb-14 md:pt-20 md:pb-20">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="text-h1 max-w-4xl">{title}</h1>
        {intro ? <div className="text-lead text-muted mt-6 max-w-3xl">{intro}</div> : null}
        {children}
      </div>
    </section>
  );
}

export function TranslationNotice({ text }: { text: string }) {
  return (
    <div className="container-page pt-6">
      <p
        role="note"
        className="border-border bg-surface-2 text-muted rounded-xl border px-4 py-3 text-sm"
      >
        {text}
      </p>
    </div>
  );
}
