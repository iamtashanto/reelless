import { defineRouting } from "next-intl/routing";

/**
 * Launch locales: en (default) and bn.
 * Set NEXT_PUBLIC_ENABLE_RTL_PREVIEW=true to add a temporary `ar` pseudo-locale (English copy,
 * right-to-left layout) for checking RTL readiness before real Arabic translations exist.
 * Planned: ar, es, hi — add the code here, a messages/<code>.json file, and a label below.
 */
const rtlPreview = process.env.NEXT_PUBLIC_ENABLE_RTL_PREVIEW === "true";

export const locales = rtlPreview ? (["en", "bn", "ar"] as const) : (["en", "bn"] as const);
export type Locale = "en" | "bn" | "ar";

export const routing = defineRouting({
  locales: locales as unknown as Locale[],
  defaultLocale: "en",
  localePrefix: "always",
});

export const rtlLocales: readonly Locale[] = ["ar"];
export const isRtl = (locale: string) => rtlLocales.includes(locale as Locale);

export const localeLabels: Record<Locale, { native: string; english: string }> = {
  en: { native: "English", english: "English" },
  bn: { native: "বাংলা", english: "Bengali" },
  ar: { native: "العربية (RTL preview)", english: "Arabic (preview)" },
};

/** BCP 47 tags used for hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = { en: "en", bn: "bn-BD", ar: "ar" };
export const ogLocales: Record<Locale, string> = { en: "en_US", bn: "bn_BD", ar: "ar_AR" };
