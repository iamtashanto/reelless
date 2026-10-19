import { getTranslations } from "next-intl/server";
import { CheckIcon, MinusIcon } from "@/components/icons";
import { FinalCta } from "@/components/sections/home/more";
import { PageHero } from "@/components/sections/page-hero";
import { PlanCards } from "@/components/sections/plan-cards";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { features } from "@/lib/features";
import { pageMetadata } from "@/lib/page";
import { faqSchema, JsonLd } from "@/lib/schema";

export const generateMetadata = () => pageMetadata("pricing", "/pricing");

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  const f = await getTranslations("features");
  const common = await getTranslations("common");
  const faq = t.raw("faq") as { q: string; a: string }[];
  const rows = features.filter((x) => x.group !== "later");

  const cell = (included: boolean) =>
    included ? (
      <span className="inline-flex items-center gap-1.5 text-calm-text">
        <CheckIcon className="size-4" strokeWidth={2.5} />
        <span className="sr-only">{common("included")}</span>
      </span>
    ) : (
      <span className="inline-flex items-center text-muted">
        <MinusIcon className="size-4" />
        <span className="sr-only">{common("notIncluded")}</span>
      </span>
    );

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <p className="mt-6">
          <Badge tone="accent">{t("planned")}</Badge>
        </p>
      </PageHero>
      <section aria-label={t("eyebrow")} className="container-page py-14 md:py-20">
        <PlanCards />
        <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-sans text-lg font-semibold tracking-normal">{t("lifetimeTitle")}</h2>
          <p className="mt-1 text-muted">{t("lifetimeBody")}</p>
        </div>
      </section>

      <section aria-labelledby="compare-plans" className="bg-bg-elev py-14 md:py-20">
        <div className="container-page">
          <h2 id="compare-plans" className="mb-8 text-h2">{t("compareTitle")}</h2>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 rounded-2xl border border-border bg-surface">
              <caption className="sr-only">{t("compareCaption")}</caption>
              <thead>
                <tr>
                  <th scope="col" className="border-b border-border p-4 text-start text-sm font-semibold text-muted">
                    <span className="sr-only">{f("eyebrow")}</span>
                  </th>
                  {(["free", "pro", "family"] as const).map((p) => (
                    <th key={p} scope="col" className="border-b border-border p-4 text-start text-sm font-semibold">
                      {t(`plans.${p}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className={i % 2 ? "bg-bg/40" : undefined}>
                    <th scope="row" className="p-4 text-start text-[0.95rem] font-normal">{f(`items.${r.id}.title`)}</th>
                    <td className="p-4">{cell(r.plan === "free")}</td>
                    <td className="p-4">{cell(true)}</td>
                    <td className="p-4">{cell(true)}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="p-4 text-start text-[0.95rem] font-normal">{f("items.family.title")}</th>
                  <td className="p-4">{cell(false)}</td>
                  <td className="p-4">{cell(false)}</td>
                  <td className="p-4"><Badge tone="outline">{common("comingLater")}</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="billing-faq" className="py-14 md:py-20">
        <div className="container-page max-w-4xl">
          <h2 id="billing-faq" className="mb-8 text-h2">{t("faqTitle")}</h2>
          <Accordion items={faq.map((x, i) => ({ id: `billing-${i + 1}`, q: x.q, a: <p>{x.a}</p> }))} />
          <JsonLd data={faqSchema(faq)} />
        </div>
      </section>
      <FinalCta source="pricing" />
    </>
  );
}
