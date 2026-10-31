import { getTranslations } from "next-intl/server";
import { CheckIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { waitlistHref } from "@/lib/nav";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

const PLANS = ["free", "pro", "family"] as const;

export async function PlanCards() {
  const t = await getTranslations("pricing");
  const common = await getTranslations("common");

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-3">
      {PLANS.map((plan) => {
        const features = t.raw(`plans.${plan}.features`) as string[];
        const highlight = plan === "pro";
        const later = plan === "family";
        return (
          <li
            key={plan}
            className={cn(
              "bg-surface shadow-card relative flex flex-col rounded-3xl border p-6 sm:p-7",
              highlight ? "border-accent/60 ring-accent/30 ring-1" : "border-border",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-h3">{t(`plans.${plan}.name`)}</h3>
              {highlight ? <Badge tone="accent">{t("mostPopular")}</Badge> : null}
              {later ? <Badge tone="outline">{common("comingLater")}</Badge> : null}
            </div>
            <p className="text-muted mt-2">{t(`plans.${plan}.description`)}</p>
            <p className="font-display mt-6 text-2xl font-bold">
              {plan === "free" ? t("plans.free.price") : t("priceTba")}
            </p>
            {plan === "pro" ? (
              <div className="mt-2.5 inline-flex items-center gap-1.5 self-start rounded-full bg-calm-soft px-3 py-1 text-xs font-semibold text-calm-text">
                <CheckIcon className="size-3.5" />
                <span>{t("proTrialNotice")}</span>
              </div>
            ) : null}
            {plan === "pro" ? (
              <p className="text-muted mt-2 text-sm">{t("billingOptions")}</p>
            ) : null}
            <p className="mt-6 text-sm font-semibold">{t("perks")}</p>
            <ul className="mt-3 mb-8 space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[0.95rem]">
                  <CheckIcon className="text-calm-text mt-1 size-4 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {later ? (
              <span
                className={buttonClasses(
                  "secondary",
                  "md",
                  "pointer-events-none mt-auto opacity-70",
                )}
                aria-disabled="true"
              >
                {t(`plans.${plan}.cta`)}
              </span>
            ) : (
              <Link
                href={waitlistHref}
                className={buttonClasses(highlight ? "primary" : "secondary", "md", "mt-auto")}
              >
                {t(`plans.${plan}.cta`)}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
    {/* Manual Purchase & Instant Key Activation */}
    <div className="mt-8 rounded-3xl border border-border/80 bg-surface/90 p-6 shadow-card backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-text">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t("manualBuyBadge")}
          </span>
          <h4 className="mt-3 font-display text-lg font-bold sm:text-xl">
            {t("manualBuyTitle")}
          </h4>
          <p className="mt-1 text-sm text-muted leading-relaxed">
            {t("manualBuyDesc")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.supportKoriUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "md")}
          >
            {t("supportKoriCta")}
          </a>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("secondary", "md")}
          >
            WhatsApp (+8801614081441)
          </a>
          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("secondary", "md")}
          >
            Telegram (@iamtashanto)
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
