import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { faqGroups, type FaqGroup } from "@/lib/faq";
import { pageMetadata } from "@/lib/page";
import { faqSchema, JsonLd } from "@/lib/schema";

export const generateMetadata = () => pageMetadata("faq", "/faq");

export default async function FaqPage() {
  const t = await getTranslations("faqPage");
  const faq = await getTranslations("faq");
  const groups = Object.entries(faqGroups) as [FaqGroup, readonly string[]][];
  const all = groups.flatMap(([g, ids]) =>
    ids.map((id) => ({ q: faq(`${g}.${id}.q`), a: faq(`${g}.${id}.a`) })),
  );

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <nav aria-label={t("title")} className="mt-8 flex flex-wrap gap-2">
          {groups.map(([g]) => (
            <a
              key={g}
              href={`#${g}`}
              className="border-border-strong bg-surface hover:border-fg/40 inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium"
            >
              {t(`groups.${g}`)}
            </a>
          ))}
        </nav>
      </PageHero>
      <div className="container-page max-w-4xl space-y-14 py-14 md:py-20">
        {groups.map(([g, ids]) => (
          <section key={g} id={g} aria-labelledby={`${g}-title`} className="scroll-mt-24">
            <h2 id={`${g}-title`} className="text-h3 mb-6">
              {t(`groups.${g}`)}
            </h2>
            <Accordion
              items={ids.map((id) => ({
                id: `${g}-${id}`,
                q: faq(`${g}.${id}.q`),
                a: <p>{faq(`${g}.${id}.a`)}</p>,
              }))}
            />
          </section>
        ))}
        <div className="border-border bg-surface rounded-2xl border p-6 text-center">
          <p className="text-muted">{t("intro")}</p>
          <ButtonLink href="/contact" variant="secondary" className="mt-4">
            {t("contactCta")}
          </ButtonLink>
        </div>
      </div>
      <JsonLd data={faqSchema(all)} />
    </>
  );
}
