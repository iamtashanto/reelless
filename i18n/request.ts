import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "./routing";
import en from "../messages/en.json";

type Messages = typeof en;

function deepMerge(base: Messages, override: Partial<Messages>): Messages {
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = (base as Record<string, unknown>)[key];
    out[key] =
      value && typeof value === "object" && !Array.isArray(value) && baseValue
        ? deepMerge(baseValue as Messages, value as Partial<Messages>)
        : value;
  }
  return out as Messages;
}

async function readRootLocale() {
  try {
    return await rootLocale();
  } catch {
    // Not available outside the [locale] tree (e.g. app/not-found.tsx) or in Server Actions,
    // which always pass an explicit locale.
    return undefined;
  }
}

export default getRequestConfig(async ({ locale: explicit }) => {
  // Read the locale from the root [locale] segment via next/root-params, so pages never need
  // to await `params` just to set up translations (keeps navigations instant).
  const requested = explicit ?? (await readRootLocale());
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  // `ar` is an RTL pseudo-locale that reuses English copy.
  if (locale === "en" || locale === "ar") return { locale, messages: en };

  // Missing keys in a translation fall back to English instead of rendering the key.
  const translated = (await import(`../messages/${locale}.json`)).default as Partial<Messages>;
  return { locale, messages: deepMerge(en, translated) };
});
