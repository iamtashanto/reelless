import { getFormatter, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { PageHero, TranslationNotice } from "@/components/sections/page-hero";
import { getPageDoc } from "@/lib/content";
import { currentLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function legalMetadata(slug: string, metaKey: string) {
  const locale = await currentLocale();
  const t = await getTranslations({ locale, namespace: "meta" });
  const doc = await getPageDoc(slug, locale);
  return buildMetadata({
    locale,
    path: `/${slug}`,
    title: t(`${metaKey}.title`),
    description: t(`${metaKey}.description`),
    availableLocales: doc?.fallback ? ["en"] : undefined,
  });
}

/** Long-form legal/policy page from content/pages/<locale>/<slug>.mdx with an on-page TOC. */
export async function LegalPage({ slug }: { slug: string }) {
  const locale = await currentLocale();
  const doc = await getPageDoc(slug, locale);
  if (!doc) notFound();
  const common = await getTranslations("common");
  const format = await getFormatter();

  return (
    <>
      {doc.fallback ? <TranslationNotice text={common("translationFallback")} /> : null}
      <PageHero title={doc.h1 ?? doc.title} intro={doc.intro}>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          {doc.updated ? (
            <span className="text-muted">
              {common("lastUpdated", {
                date: format.dateTime(new Date(doc.updated), { dateStyle: "long" }),
              })}
            </span>
          ) : null}
          <span className="border-accent/60 bg-accent-soft text-accent-text rounded-full border border-dashed px-3 py-1 font-medium">
            {common("reviewNotice")}
          </span>
        </div>
      </PageHero>
      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        {doc.headings.length > 2 ? (
          <aside className="lg:order-2 lg:col-span-4">
            <nav
              aria-label={common("onThisPage")}
              className="border-border bg-surface rounded-2xl border p-5 lg:sticky lg:top-24"
            >
              <p className="mb-3 text-sm font-semibold">{common("onThisPage")}</p>
              <ol className="space-y-1 text-sm">
                {doc.headings
                  .filter((h) => h.level === 2)
                  .map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-muted hover:text-fg inline-flex min-h-8 items-center"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
              </ol>
            </nav>
          </aside>
        ) : null}
        <article className="prose-reelless lg:order-1 lg:col-span-8" lang={doc.locale}>
          <Mdx source={doc.body} locale={locale} />
        </article>
      </div>
    </>
  );
}
