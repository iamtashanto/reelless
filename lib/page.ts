import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { buildMetadata } from "./seo";

/** Current locale from the root [locale] segment (no `params` await needed). */
export async function currentLocale() {
  return (await rootLocale()) as string;
}

/** Metadata for a page whose title/description live under `meta.<key>` in messages. */
export async function pageMetadata(
  key: string,
  path: string,
  extra: Partial<Parameters<typeof buildMetadata>[0]> = {},
): Promise<Metadata> {
  const locale = await currentLocale();
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    path,
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    ...extra,
  });
}
