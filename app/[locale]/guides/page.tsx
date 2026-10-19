import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { GuideCard } from "@/components/guides/guide-card";
import { GuidesBrowser } from "@/components/guides/guides-browser";
import { PageHero } from "@/components/sections/page-hero";
import { listGuides } from "@/lib/content";
import { currentLocale, pageMetadata } from "@/lib/page";

export const generateMetadata = () => pageMetadata("guides", "/guides");

const CATEGORIES = ["how-to", "habits", "research"] as const;

export default async function GuidesPage() {
  const t = await getTranslations("guides");
  const locale = await currentLocale();
  const guides = await listGuides(locale);

  const cards = guides.map((g) => ({
    slug: g.slug,
    category: g.category,
    text: `${g.title} ${g.description} ${g.tags.join(" ")}`,
    node: (
      <GuideCard
        guide={g}
        categoryLabel={t(`categories.${g.category}`)}
        readingLabel={t("readingTime", { minutes: g.readingMinutes })}
      />
    ),
  }));

  const staticList = (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <li key={c.slug}>{c.node}</li>
      ))}
    </ul>
  );

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="container-page py-14 md:py-20">
        {guides.some((g) => g.fallback) ? (
          <p role="note" className="mb-8 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-muted">
            {(await getTranslations("common"))("translationFallback")}
          </p>
        ) : null}
        {/* The full list renders statically (and for no-JS); search & filters hydrate on top. */}
        <Suspense fallback={staticList}>
          <GuidesBrowser
            items={cards}
            categories={CATEGORIES.map((id) => ({ id, label: t(`categories.${id}`) }))}
            labels={{ all: t("all"), search: t("searchPlaceholder"), empty: t("empty") }}
          />
        </Suspense>
      </div>
    </>
  );
}
