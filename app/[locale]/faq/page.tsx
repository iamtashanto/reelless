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
  const all = groups.flatMap(([g, ids]) => ids.map((id) => ({ q: faq(`${g}.${id}.q`), a: faq(`${g}.${id}.a`) })));

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <nav aria-label={t("title")} className="mt-8 flex flex-wrap gap-2">
          {groups.map(([g]) => (
            <a key={g} href={`#${g}`} className="inline-flex min-h-11 items-center rounded-full border border-border-strong bg-surface px-4 text-sm font-medium hover:border-fg/40">
              {t(`groups.${g}`)}
            </a>
          ))}
        </nav>
      </PageHero>
      <div className="container-page max-w-4xl space-y-14 py-14 md:py-20">
        {groups.map(([g, ids]) => (
          <section key={g} id={g} aria-labelledby={`${g}-title`} className="scroll-mt-24">
            <h2 id={`${g}-title`} className="mb-6 text-h3">{t(`groups.${g}`)}</h2>
            <Accordion
              items={ids.map((id) => ({ id: `${g}-${id}`, q: faq(`${g}.${id}.q`), a: <p>{faq(`${g}.${id}.a`)}</p> }))}
            />
          </section>
        ))}
        <div className="rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="text-muted">{t("intro")}</p>
          <ButtonLink href="/contact" variant="secondary" className="mt-4">{t("contactCta")}</ButtonLink>
        </div>
      </div>
      <JsonLd data={faqSchema(all)} />
    </>
  );
}
