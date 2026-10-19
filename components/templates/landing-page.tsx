import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { Mdx } from "@/components/mdx";
import { FinalCta } from "@/components/sections/home/more";
import { PageHero, TranslationNotice } from "@/components/sections/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { Link } from "@/i18n/navigation";
import { getGuide, getPageDoc } from "@/lib/content";
import { currentLocale } from "@/lib/page";
import { platforms } from "@/lib/platforms";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/schema";
import { buildMetadata, localizedPath } from "@/lib/seo";

export async function landingMetadata(slug: string) {
  const locale = await currentLocale();
  const doc = await getPageDoc(slug, locale);
  if (!doc) return {};
  return buildMetadata({
    locale,
    path: `/${slug}`,
    title: doc.title,
    description: doc.description,
    availableLocales: doc.fallback ? ["en"] : undefined,
  });
}

/** SEO landing page: MDX body + platform card + FAQ (with schema) + internal links + CTA. */
export async function LandingPage({ slug }: { slug: string }) {
  const locale = await currentLocale();
  const doc = await getPageDoc(slug, locale);
  if (!doc) notFound();
  const t = await getTranslations("landing");
  const common = await getTranslations("common");
  const pd = await getTranslations("platformData");
  const platform = platforms.find((p) => p.id === doc.platform);
  const related = (await Promise.all((doc.related ?? []).map((s) => getGuide(s, locale)))).filter(
    (g) => g !== null,
  );

  return (
    <>
      {doc.fallback ? <TranslationNotice text={common("translationFallback")} /> : null}
      <PageHero
        eyebrow={platform ? pd(`${platform.id}.name`) : undefined}
        title={doc.h1 ?? doc.title}
        intro={doc.intro}
      />

      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-12">
        <article className="prose-reelless lg:col-span-8" lang={doc.locale}>
          <Mdx source={doc.body} locale={locale} />
        </article>

        <aside className="space-y-4 lg:col-span-4">
          {platform ? (
            <div className="border-border bg-surface shadow-card rounded-2xl border p-6 lg:sticky lg:top-24">
              <div className="flex items-center gap-3">
                <span className="bg-accent-soft text-accent-text grid size-11 place-items-center rounded-xl">
                  <platform.Icon className="size-5" />
                </span>
                <p className="font-display text-lg font-semibold">{t("whatWeBlock")}</p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {(pd.raw(`${platform.id}.blocks`) as string[]).map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.95rem]">
                    <CheckIcon className="text-calm-text mt-1 size-4 shrink-0" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/#waitlist"
                className="bg-accent text-accent-ink mt-6 flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-medium"
              >
                {common("joinEarlyAccess")}
              </Link>
            </div>
          ) : null}
        </aside>
      </div>

      {doc.faq?.length ? (
        <section aria-labelledby="landing-faq" className="bg-bg-elev py-16 md:py-20">
          <div className="container-page max-w-4xl">
            <h2 id="landing-faq" className="text-h2 mb-8">
              {t("faqTitle")}
            </h2>
            <Accordion
              items={doc.faq.map((f, i) => ({ id: `q-${i + 1}`, q: f.q, a: <p>{f.a}</p> }))}
            />
            <JsonLd data={faqSchema(doc.faq)} />
          </div>
        </section>
      ) : null}

      <section aria-labelledby="landing-more" className="py-16 md:py-20">
        <div className="container-page">
          <h2 id="landing-more" className="text-h3 mb-8">
            {t("learnMoreTitle")}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { href: "/features", label: t("features") },
              { href: "/how-it-works", label: t("howItWorks") },
              ...related.map((g) => ({ href: `/guides/${g.slug}`, label: g.title })),
              { href: "/download", label: t("download") },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group border-border bg-surface hover:border-border-strong flex h-full min-h-14 items-center justify-between gap-3 rounded-2xl border p-4 text-[0.95rem] font-medium"
                >
                  {l.label}
                  <ArrowRightIcon className="text-muted size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta source={`landing-${slug}`} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Reelless", path: localizedPath(locale, "/") },
          { name: doc.h1 ?? doc.title, path: localizedPath(locale, `/${slug}`) },
        ])}
      />
    </>
  );
}
