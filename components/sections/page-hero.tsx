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
    <section className={cn("grain relative overflow-hidden border-b border-border", className)}>
      <div aria-hidden className="bg-grid absolute inset-0 -z-20 opacity-50" />
      <div aria-hidden className="absolute -top-40 start-1/2 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl rtl:translate-x-1/2" />
      <div className="container-page pt-14 pb-14 md:pt-20 md:pb-20">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-4xl text-h1">{title}</h1>
        {intro ? <div className="mt-6 max-w-3xl text-lead text-muted">{intro}</div> : null}
        {children}
      </div>
    </section>
  );
}

export function TranslationNotice({ text }: { text: string }) {
  return (
    <div className="container-page pt-6">
      <p role="note" className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-muted">
        {text}
      </p>
    </div>
  );
}
