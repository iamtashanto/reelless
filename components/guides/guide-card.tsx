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
    <article className="group border-border bg-surface shadow-card hover:border-border-strong relative flex h-full flex-col rounded-2xl border p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5">
      <div
        className="from-accent/25 via-surface-2 to-calm/25 mb-5 h-28 overflow-hidden rounded-xl bg-linear-to-br"
        aria-hidden
      >
        <div className="flex h-full items-end gap-1.5 p-4 opacity-70">
          {[60, 85, 45, 70, 30].map((h, i) => (
            <span key={i} className="bg-fg/10 w-full rounded-md" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <p className="text-accent-text text-xs font-semibold tracking-wide uppercase">
        {categoryLabel}
      </p>
      <h3 className="mt-2 font-sans text-lg leading-snug font-semibold tracking-normal">
        <Link
          href={`/guides/${guide.slug}`}
          className="group-has-[:focus-visible]:underline after:absolute after:inset-0 focus-visible:outline-none"
        >
          {guide.title}
        </Link>
      </h3>
      <p className="text-muted mt-2 line-clamp-3 text-sm">{guide.description}</p>
      <p className="text-muted mt-auto pt-5 text-xs">{readingLabel}</p>
    </article>
  );
}
