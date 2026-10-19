import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";

/** Animated "the feed stopped here" illustration + helpful links (404 / errors). */
export function LostIllustration() {
  return (
    <div aria-hidden className="relative mx-auto h-56 w-40">
      <div className="border-border-strong bg-surface-2 absolute inset-0 overflow-hidden rounded-[1.8rem] border p-1.5">
        <div className="bg-bg flex h-full flex-col gap-1.5 overflow-hidden rounded-[1.4rem] [mask-image:linear-gradient(to_bottom,black_40%,transparent)] p-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="bg-accent/20 block h-16 shrink-0 rounded-lg motion-safe:animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
      <span className="bg-accent font-display text-accent-ink shadow-card absolute -end-4 -bottom-3 rounded-full px-3 py-1.5 text-sm font-bold">
        404
      </span>
    </div>
  );
}

export function PopularLinks() {
  const nav = useTranslations("nav");
  const footer = useTranslations("footer");
  const links = [
    { href: "/", label: nav("home") },
    { href: "/features", label: nav("features") },
    { href: "/how-it-works", label: nav("howItWorks") },
    { href: "/guides", label: nav("guides") },
    { href: "/faq", label: nav("faq") },
    { href: "/contact", label: footer("contact") },
  ];
  return (
    <ul className="mt-8 grid gap-2 sm:grid-cols-2">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="group border-border bg-surface hover:border-border-strong flex min-h-12 items-center justify-between rounded-xl border px-4 font-medium"
          >
            {l.label}
            <ArrowRightIcon className="text-muted size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
