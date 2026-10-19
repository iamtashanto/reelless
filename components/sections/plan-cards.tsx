import { getTranslations } from "next-intl/server";
import { CheckIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { waitlistHref } from "@/lib/nav";
import { cn } from "@/lib/utils";

const PLANS = ["free", "pro", "family"] as const;

export async function PlanCards() {
  const t = await getTranslations("pricing");
  const common = await getTranslations("common");

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {PLANS.map((plan) => {
        const features = t.raw(`plans.${plan}.features`) as string[];
        const highlight = plan === "pro";
        const later = plan === "family";
        return (
          <li
            key={plan}
            className={cn(
              "relative flex flex-col rounded-3xl border bg-surface p-6 shadow-card sm:p-7",
              highlight ? "border-accent/60 ring-1 ring-accent/30" : "border-border",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-h3">{t(`plans.${plan}.name`)}</h3>
              {highlight ? <Badge tone="accent">{t("mostPopular")}</Badge> : null}
              {later ? <Badge tone="outline">{common("comingLater")}</Badge> : null}
            </div>
            <p className="mt-2 text-muted">{t(`plans.${plan}.description`)}</p>
            <p className="mt-6 font-display text-2xl font-bold">
              {plan === "free" ? t("plans.free.price") : t("priceTba")}
            </p>
            {plan === "pro" ? <p className="mt-1 text-sm text-muted">{t("billingOptions")}</p> : null}
            <p className="mt-6 text-sm font-semibold">{t("perks")}</p>
            <ul className="mt-3 mb-8 space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[0.95rem]">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-calm-text" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {later ? (
              <span className={buttonClasses("secondary", "md", "mt-auto pointer-events-none opacity-70")} aria-disabled="true">
                {t(`plans.${plan}.cta`)}
              </span>
            ) : (
              <Link href={waitlistHref} className={buttonClasses(highlight ? "primary" : "secondary", "md", "mt-auto")}>
                {t(`plans.${plan}.cta`)}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
