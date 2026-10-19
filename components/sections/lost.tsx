import { useTranslations } from "next-intl";
import { ArrowRightIcon } from "@/components/icons";
import { Link } from "@/i18n/navigation";

/** Animated "the feed stopped here" illustration + helpful links (404 / errors). */
export function LostIllustration() {
  return (
    <div aria-hidden className="relative mx-auto h-56 w-40">
      <div className="absolute inset-0 overflow-hidden rounded-[1.8rem] border border-border-strong bg-surface-2 p-1.5">
        <div className="flex h-full flex-col gap-1.5 overflow-hidden rounded-[1.4rem] bg-bg p-2 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-16 shrink-0 rounded-lg bg-accent/20 motion-safe:animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
      </div>
      <span className="absolute -end-4 -bottom-3 rounded-full bg-accent px-3 py-1.5 font-display text-sm font-bold text-accent-ink shadow-card">
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
          <Link href={l.href} className="group flex min-h-12 items-center justify-between rounded-xl border border-border bg-surface px-4 font-medium hover:border-border-strong">
            {l.label}
            <ArrowRightIcon className="size-4 text-muted transition-transform group-hover:translate-x-0.5" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
