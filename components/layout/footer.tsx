import { getTranslations } from "next-intl/server";
import { ArrowUpRightIcon, LogoMark } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/site.config";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeSegmented } from "./theme-toggle";

// Evaluated once per server start (not per render) — fine for a copyright year.
const YEAR = new Date().getFullYear();

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const columns = [
    {
      title: t("product"),
      links: [
        { href: "/features", label: nav("features") },
        { href: "/how-it-works", label: nav("howItWorks") },
        { href: "/platforms", label: nav("platforms") },
        { href: "/pricing", label: nav("pricing") },
        { href: "/download", label: t("download") },
      ],
    },
    {
      title: t("resources"),
      links: [
        { href: "/guides", label: nav("guides") },
        { href: "/faq", label: nav("faq") },
        { href: "/changelog", label: t("changelog") },
      ],
    },
    {
      title: t("company"),
      links: [
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/privacy", label: t("privacy") },
        { href: "/terms", label: t("terms") },
        { href: "/accessibility-disclosure", label: t("accessibility") },
        { href: "/cookies", label: t("cookies") },
      ],
    },
  ];

  const social = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="border-border bg-bg-elev border-t">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2">
              <LogoMark className="size-7" />
              <span className="font-display text-lg font-bold tracking-tight">Reelless</span>
            </Link>
            <p className="text-muted mt-3 max-w-xs">{t("tagline")}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <LanguageSwitcher label={nav("changeLanguage")} align="start" />
              <ThemeSegmented
                labels={{
                  legend: nav("theme"),
                  system: nav("themeSystem"),
                  light: nav("themeLight"),
                  dark: nav("themeDark"),
                }}
              />
            </div>
            {social.length > 0 ? (
              <ul className="mt-6 flex gap-4 text-sm" aria-label={t("social")}>
                {social.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      rel="noopener me"
                      target="_blank"
                      className="text-muted hover:text-fg capitalize"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-sans text-sm font-semibold tracking-normal">{col.title}</h2>
                <ul className="mt-3 space-y-1">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted hover:text-fg inline-flex min-h-9 items-center text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-muted mt-12 max-w-3xl text-xs leading-relaxed">{t("disclaimer")}</p>

        <div className="border-border text-muted mt-6 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year: YEAR })}</p>
          <p>
            {t("credit")}{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener"
              className="group text-fg relative inline-flex items-center gap-0.5 font-medium"
            >
              {siteConfig.developer.name}
              <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span
                aria-hidden
                className="bg-accent ease-out-soft absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right"
              />
              <span className="sr-only">{t("opensNewTab")}</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
