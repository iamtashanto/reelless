import { getTranslations } from "next-intl/server";
import { FinalCta } from "@/components/sections/home/more";
import { FeatureAnim } from "@/components/sections/feature-anim";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { getAnimLabels } from "@/lib/anim-labels";
import { featureGroups, features } from "@/lib/features";
import { pageMetadata } from "@/lib/page";
import { cn } from "@/lib/utils";

export const generateMetadata = () => pageMetadata("features", "/features");

export default async function FeaturesPage() {
  const t = await getTranslations("features");
  const common = await getTranslations("common");
  const labels = await getAnimLabels();

  const planBadge = (plan: string) =>
    plan === "free" ? (
      <Badge tone="calm">{common("free")}</Badge>
    ) : plan === "pro" ? (
      <Badge tone="accent">{common("pro")}</Badge>
    ) : plan === "chrome" ? (
      <Badge tone="neutral">{common("chrome")}</Badge>
    ) : (
      <Badge tone="outline">{common("comingLater")}</Badge>
    );

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <nav aria-label={t("jumpTo")} className="mt-8 flex flex-wrap gap-2">
          {featureGroups.map((g) => (
            <a
              key={g}
              href={`#${g}`}
              className="border-border-strong bg-surface hover:border-fg/40 inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium"
            >
              {t(`groups.${g}.title`)}
            </a>
          ))}
        </nav>
      </PageHero>

      {featureGroups.map((group, gi) => {
        const items = features.filter((f) => f.group === group);
        return (
          <section
            key={group}
            id={group}
            aria-labelledby={`${group}-title`}
            className={cn("scroll-mt-16 py-16 md:py-24", gi % 2 === 1 && "bg-bg-elev")}
          >
            <div className="container-page">
              <div className="mb-10 max-w-2xl">
                <h2 id={`${group}-title`} className="text-h2">
                  {t(`groups.${group}.title`)}
                </h2>
                <p className="text-lead text-muted mt-4">{t(`groups.${group}.intro`)}</p>
              </div>
              <ul className="grid gap-4 md:grid-cols-2">
                {items.map((f) => (
                  <li
                    key={f.id}
                    id={f.id}
                    className="border-border bg-surface shadow-card flex scroll-mt-24 flex-col rounded-2xl border p-6"
                  >
                    {f.anim ? (
                      <div className="mb-5">
                        <FeatureAnim anim={f.anim} labels={labels} />
                      </div>
                    ) : null}
                    <div className="flex items-start gap-4">
                      <span className="bg-accent-soft text-accent-text grid size-11 shrink-0 place-items-center rounded-xl">
                        <f.Icon className="size-5" />
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-sans text-lg font-semibold tracking-normal">
                            {t(`items.${f.id}.title`)}
                          </h3>
                          {planBadge(f.plan)}
                        </div>
                        <p className="text-muted mt-2">{t(`items.${f.id}.body`)}</p>
                        {f.group !== "later" ? (
                          <p className="border-calm mt-4 border-s-2 ps-3 text-sm">
                            <span className="text-calm-text font-semibold">
                              {t("howItHelps")}:{" "}
                            </span>
                            {t(`items.${f.id}.helps`)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
      <FinalCta source="features" />
    </>
  );
}
