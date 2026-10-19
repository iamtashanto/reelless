import { Link } from "@/i18n/navigation";
import type { GuideMeta } from "@/lib/content";

export function GuideCard({
  guide,
  categoryLabel,
  readingLabel,
}: {
  guide: GuideMeta;
  categoryLabel: string;
  readingLabel: string;
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong">
      <div className="mb-5 h-28 overflow-hidden rounded-xl bg-linear-to-br from-accent/25 via-surface-2 to-calm/25" aria-hidden>
        <div className="flex h-full items-end gap-1.5 p-4 opacity-70">
          {[60, 85, 45, 70, 30].map((h, i) => (
            <span key={i} className="w-full rounded-md bg-fg/10" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <p className="text-xs font-semibold tracking-wide text-accent-text uppercase">{categoryLabel}</p>
      <h3 className="mt-2 font-sans text-lg leading-snug font-semibold tracking-normal">
        <Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-has-[:focus-visible]:underline">
          {guide.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{guide.description}</p>
      <p className="mt-auto pt-5 text-xs text-muted">{readingLabel}</p>
    </article>
  );
}
