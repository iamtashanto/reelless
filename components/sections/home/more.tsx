import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRightIcon, CheckIcon, MinusIcon, XIcon } from "@/components/icons";
import { LanguageOrb } from "@/components/illustrations/language-orb";
import { PrivacyPhone } from "@/components/illustrations/privacy-phone";
import { StatsDashboard } from "@/components/illustrations/stats-dashboard";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { FaqList } from "@/components/sections/faq-list";
import { PlanCards } from "@/components/sections/plan-cards";
import { PlatformsGrid } from "@/components/sections/platforms-grid";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { homeFaq } from "@/lib/faq";
import { getWaitlistCount } from "@/lib/waitlist";

export async function PlatformsSection() {
  const t = await getTranslations("home.platforms");
  const common = await getTranslations("common");
  return (
    <Section id="platforms" labelledBy="platforms-title">
      <div className="container-page">
        <SectionHeading
          id="platforms-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <PlatformsGrid />
        <Link
          href="/platforms"
          className="text-accent-text mt-8 inline-flex min-h-11 items-center gap-2 font-medium hover:underline"
        >
          {common("seeAllPlatforms")} <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </Section>
  );
}

export async function LanguageSection() {
  const t = await getTranslations("home.language");
  return (
    <Section band labelledBy="language-title">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <LanguageOrb label={t("orbLabel")} />
        </div>
        <div className="order-1 lg:order-2">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="language-title" className="text-h2">
            {t("title")}
          </h2>
          <p className="text-lead text-muted mt-6">{t("body")}</p>
          <p className="bg-calm-soft text-calm-text mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <CheckIcon className="size-4" /> {t("rtl")}
          </p>
        </div>
      </div>
    </Section>
  );
}

export async function StatsSection() {
  const t = await getTranslations("home.stats");
  const common = await getTranslations("common");
  return (
    <Section labelledBy="stats-title">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="stats-title" className="text-h2">
            {t("title")}
          </h2>
          <p className="text-lead text-muted mt-6">{t("subtitle")}</p>
        </div>
        <div className="lg:col-span-8">
          <StatsDashboard
            labels={{
              example: common("exampleData"),
              timeSaved: t("timeSaved"),
              reelsAvoided: t("reelsAvoided"),
              streak: t("streak"),
              shortForm: t("shortForm"),
              byPlatform: t("byPlatform"),
              heatmap: t("heatmap"),
              days: t.raw("days") as string[],
              hours: t("hours"),
              minutes: t("minutes"),
            }}
          />
        </div>
      </div>
    </Section>
  );
}

export async function PrivacySection() {
  const t = await getTranslations("home.privacy");
  const common = await getTranslations("common");
  const promises = t.raw("promises") as { title: string; body: string }[];
  return (
    <Section id="privacy" band labelledBy="privacy-title">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <PrivacyPhone label={t("animLabel")} />
        </div>
        <div className="lg:col-span-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="privacy-title" className="text-h2">
            {t("title")}
          </h2>
          <p className="text-lead text-muted mt-6">{t("body")}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {promises.map((p) => (
              <li key={p.title} className="border-border bg-surface rounded-2xl border p-5">
                <h3 className="flex items-center gap-2 font-sans text-base font-semibold tracking-normal">
                  <CheckIcon className="text-calm-text size-4" strokeWidth={2.5} />
                  {p.title}
                </h3>
                <p className="text-muted mt-2 text-sm">{p.body}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/privacy"
            className="text-accent-text mt-8 inline-flex min-h-11 items-center gap-2 font-medium hover:underline"
          >
            {common("readPrivacy")} <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

type Cell = "yes" | "no" | "partly" | { text: string };

export async function CompareSection() {
  const t = await getTranslations("home.compare");
  const common = await getTranslations("common");
  const cols = ["reelless", "delete", "screenTime", "extensions"] as const;
  const rows: { key: string; cells: Cell[] }[] = [
    {
      key: "keepMessaging",
      cells: ["yes", "no", { text: t("cells.lockedOut") }, { text: t("cells.wholeSite") }],
    },
    { key: "blocksShortForm", cells: ["yes", "no", "no", "no"] },
    { key: "nativeApps", cells: ["yes", "no", "yes", "partly"] },
    { key: "noWillpower", cells: ["yes", "yes", "partly", "yes"] },
    { key: "flexible", cells: ["yes", "no", { text: t("cells.timeOnly") }, "partly"] },
    {
      key: "cost",
      cells: [
        { text: t("cells.freePro") },
        { text: t("cells.free") },
        { text: t("cells.free") },
        { text: t("cells.varies") },
      ],
    },
  ];
  const render = (cell: Cell) => {
    if (typeof cell === "object") return <span className="text-sm">{cell.text}</span>;
    const map = {
      yes: { Icon: CheckIcon, cls: "bg-calm-soft text-calm-text", label: common("yes") },
      no: { Icon: XIcon, cls: "bg-surface-2 text-muted", label: common("no") },
      partly: { Icon: MinusIcon, cls: "bg-surface-2 text-muted", label: common("partly") },
    }[cell];
    return (
      <span className="inline-flex items-center gap-2">
        <span className={`grid size-6 place-items-center rounded-full ${map.cls}`}>
          <map.Icon className="size-3.5" strokeWidth={2.5} />
        </span>
        <span className="text-muted text-sm">{map.label}</span>
      </span>
    );
  };
  return (
    <Section labelledBy="compare-title">
      <div className="container-page">
        <SectionHeading
          id="compare-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="relative -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="border-border bg-surface w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl border text-start">
            <caption className="sr-only">{t("caption")}</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-border text-muted border-b p-4 text-start text-sm font-semibold"
                >
                  {t("columns.feature")}
                </th>
                {cols.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className={`border-border border-b p-4 text-start text-sm font-semibold ${c === "reelless" ? "bg-accent-soft text-fg" : "text-muted"}`}
                  >
                    {t(`columns.${c}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={row.key}>
                  <th
                    scope="row"
                    className={`p-4 text-start text-[0.95rem] font-medium ${ri < rows.length - 1 ? "border-border border-b" : ""}`}
                  >
                    {t(`rows.${row.key}`)}
                  </th>
                  {row.cells.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`p-4 ${ri < rows.length - 1 ? "border-border border-b" : ""} ${ci === 0 ? "bg-accent-soft" : ""}`}
                    >
                      {render(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

export async function PricingPreview() {
  const t = await getTranslations("home.pricing");
  const common = await getTranslations("common");
  return (
    <Section id="pricing" band labelledBy="pricing-title">
      <div className="container-page">
        <SectionHeading
          id="pricing-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <PlanCards />
        <Link
          href="/pricing"
          className="text-accent-text mt-8 inline-flex min-h-11 items-center gap-2 font-medium hover:underline"
        >
          {common("seePricing")} <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </Section>
  );
}

export async function HomeFaq() {
  const t = await getTranslations("home.faq");
  const common = await getTranslations("common");
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="faq-title" className="text-h2">
            {t("title")}
          </h2>
          <ButtonLink href="/faq" variant="secondary" className="mt-8">
            {common("seeAllFaq")}
          </ButtonLink>
        </div>
        <div className="lg:col-span-8">
          <FaqList entries={homeFaq} />
        </div>
      </div>
    </Section>
  );
}

export async function BuiltInPublic() {
  const t = await getTranslations("builtInPublic");
  return (
    <Section band labelledBy="bip-title" className="py-16 md:py-20">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="bip-title" className="text-h3 md:text-[1.9rem]">
            {t("title")}
          </h2>
          <p className="text-muted mt-3">{t("body")}</p>
        </div>
        <ButtonLink href="/changelog" variant="secondary">
          {t("cta")} <ArrowRightIcon className="size-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}

async function WaitlistCount() {
  const count = await getWaitlistCount();
  if (count === null) return null;
  const t = await getTranslations("waitlist");
  return <p className="text-muted mt-4 text-sm">{t("count", { count })}</p>;
}

export async function FinalCta({ source = "home" }: { source?: string }) {
  const t = await getTranslations("home.final");
  const w = await getTranslations("waitlist");
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="grain relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--accent-soft),transparent_60%)]"
      />
      <div className="container-page">
        <div className="border-border bg-surface shadow-card mx-auto max-w-2xl rounded-3xl border p-6 sm:p-10">
          <h2 id="waitlist-title" className="text-h2">
            {t("title")}
          </h2>
          <p className="text-lead text-muted mt-4">{t("body")}</p>
          <p className="text-muted mt-2 text-sm">{w("subtitle")}</p>
          <WaitlistForm source={source} className="mt-8" />
          <Suspense fallback={null}>
            <WaitlistCount />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
