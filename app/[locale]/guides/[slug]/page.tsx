import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { GuideCard } from "@/components/guides/guide-card";
import { ShareButtons } from "@/components/guides/share-buttons";
import { Mdx } from "@/components/mdx";
import { FinalCta } from "@/components/sections/home/more";
import { TranslationNotice } from "@/components/sections/page-hero";
import { Link } from "@/i18n/navigation";
import { getGuide, guideSlugs, listGuides } from "@/lib/content";
import { currentLocale } from "@/lib/page";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/schema";
import { absolute, buildMetadata, localizedPath, ogImageUrl } from "@/lib/seo";
import { siteConfig } from "@/site.config";

type Props = PageProps<"/[locale]/guides/[slug]">;

export async function generateStaticParams() {
  return (await guideSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await currentLocale();
  const guide = await getGuide(slug, locale);
  if (!guide) return {};
  return buildMetadata({
    locale,
    path: `/guides/${slug}`,
    title: guide.title,
    description: guide.description,
    type: "article",
    publishedTime: guide.date,
    modifiedTime: guide.updated,
    availableLocales: guide.fallback ? ["en"] : undefined,
  });
}

async function Article({ params }: { params: Props["params"] }) {
  const { slug } = await params;
  const locale = await currentLocale();
  const guide = await getGuide(slug, locale);
  if (!guide) notFound();

  const t = await getTranslations("guides");
  const common = await getTranslations("common");
  const format = await getFormatter();
  const fmt = (d: string) => format.dateTime(new Date(d), { dateStyle: "long" });
  const path = localizedPath(locale, `/guides/${slug}`);

  const all = await listGuides(locale);
  const related = (guide.related.length ? guide.related : all.map((g) => g.slug))
    .filter((s) => s !== slug)
    .map((s) => all.find((g) => g.slug === s))
    .filter((g) => g !== undefined)
    .slice(0, 3);
  const toc = guide.headings.filter((h) => h.level === 2);

  return (
    <>
      {guide.fallback ? <TranslationNotice text={common("translationFallback")} /> : null}
      <article lang={guide.locale}>
        <header className="grain relative border-b border-border">
          <div className="container-page max-w-4xl pt-10 pb-12 md:pt-14 md:pb-16">
            <nav aria-label={t("breadcrumb")} className="mb-8 text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-fg">{t("breadcrumbHome")}</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/guides" className="hover:text-fg">{t("breadcrumbGuides")}</Link></li>
              </ol>
            </nav>
            <p className="text-sm font-semibold tracking-wide text-accent-text uppercase">{t(`categories.${guide.category}`)}</p>
            <h1 className="mt-3 text-h1">{guide.title}</h1>
            <p className="mt-5 text-lead text-muted">{guide.description}</p>
            <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
              <span>{guide.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={guide.updated}>{t("updated", { date: fmt(guide.updated) })}</time>
              <span aria-hidden>·</span>
              <span>{t("readingTime", { minutes: guide.readingMinutes })}</span>
            </p>
          </div>
        </header>

        <div className="container-page grid gap-12 py-12 md:py-16 lg:grid-cols-12">
          <aside className="lg:order-2 lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              {toc.length ? (
                <nav aria-label={t("toc")} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="mb-3 text-sm font-semibold">{t("toc")}</p>
                  <ol className="space-y-1 text-sm">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="inline-flex min-h-8 items-center text-muted hover:text-fg">{h.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <ShareButtons
                url={absolute(path)}
                title={guide.title}
                labels={{
                  share: t("share"),
                  x: t("shareX"),
                  facebook: t("shareFacebook"),
                  linkedin: t("shareLinkedIn"),
                  whatsapp: t("shareWhatsApp"),
                  copy: t("copyLink"),
                  copied: t("copied"),
                }}
              />
            </div>
          </aside>

          <div className="lg:order-1 lg:col-span-8">
            <div className="prose-reelless">
              <Mdx source={guide.body} locale={locale} />
            </div>

            <section aria-label={t("authorBy")} className="mt-14 flex gap-4 rounded-2xl border border-border bg-surface p-6">
              <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-bold text-accent-ink">
                TS
              </span>
              <div>
                <p className="text-sm text-muted">{t("authorBy")}</p>
                <p className="font-display text-lg font-semibold">{siteConfig.developer.name}</p>
                <p className="mt-1 text-sm text-muted">{t("authorBio")}</p>
                <a href={siteConfig.developer.url} target="_blank" rel="noopener" className="mt-2 inline-flex min-h-10 items-center gap-1 text-sm font-medium text-accent-text underline underline-offset-2">
                  {t("authorSite")} <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-title" className="bg-bg-elev py-14 md:py-20">
          <div className="container-page">
            <h2 id="related-title" className="mb-8 text-h2">{t("related")}</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <GuideCard guide={g} categoryLabel={t(`categories.${g.category}`)} readingLabel={t("readingTime", { minutes: g.readingMinutes })} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <FinalCta source={`guide-${slug}`} />
      <JsonLd
        data={[
          articleSchema({
            title: guide.title,
            description: guide.description,
            path,
            datePublished: guide.date,
            dateModified: guide.updated,
            locale: guide.locale,
            image: ogImageUrl(guide.title, t(`categories.${guide.category}`)),
          }),
          breadcrumbSchema([
            { name: t("breadcrumbHome"), path: localizedPath(locale, "/") },
            { name: t("breadcrumbGuides"), path: localizedPath(locale, "/guides") },
            { name: guide.title, path },
          ]),
        ]}
      />
    </>
  );
}

export default function GuidePage(props: Props) {
  return (
    <Suspense fallback={<div className="container-page min-h-[60vh] py-20" />}>
      <Article params={props.params} />
    </Suspense>
  );
}
