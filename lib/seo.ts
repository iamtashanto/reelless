import type { Metadata } from "next";
import { localeTags, ogLocales, routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/site.config";

/** Path for a page in a given locale, e.g. ("bn", "/pricing") → "/bn/pricing". */
export function localizedPath(locale: string, path = "/") {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export function absolute(path: string) {
  return `${siteConfig.url}${path}`;
}

/** hreflang map for all *public* locales (the ar RTL preview is never advertised). */
export function languageAlternates(path: string, available: readonly string[] = routing.locales) {
  const langs: Record<string, string> = {};
  for (const locale of available) {
    if (locale === "ar") continue;
    langs[localeTags[locale as Locale]] = absolute(localizedPath(locale, path));
  }
  langs["x-default"] = absolute(localizedPath(routing.defaultLocale, path));
  return langs;
}

export function ogImageUrl(title: string, eyebrow?: string) {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/og?${params.toString()}`;
}

type BuildMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  /** Short label printed above the title on the OG image. */
  eyebrow?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Locales this page actually exists in (defaults to all). */
  availableLocales?: readonly string[];
  noIndex?: boolean;
  /** Use the title verbatim instead of the "%s" template. */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  locale,
  path,
  title,
  description,
  eyebrow,
  type = "website",
  publishedTime,
  modifiedTime,
  availableLocales,
  noIndex,
  absoluteTitle = true,
}: BuildMetadataInput): Metadata {
  const url = absolute(localizedPath(locale, path));
  const image = ogImageUrl(title.replace(/ — Reelless$/, ""), eyebrow);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path, availableLocales),
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: ogLocales[locale as Locale] ?? "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors: [siteConfig.developer.url] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    // The `ar` RTL preview locale is a dev-only check and must never be indexed.
    robots:
      noIndex || locale === "ar" ? { index: false, follow: true } : { index: true, follow: true },
  };
}
