import { getTranslations } from "next-intl/server";
import { BatteryIcon, CheckIcon, XIcon } from "@/components/icons";
import { SettingsToggle } from "@/components/illustrations/settings-toggle";
import { FinalCta } from "@/components/sections/home/more";
import { PageHero } from "@/components/sections/page-hero";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/page";

export const generateMetadata = () => pageMetadata("howItWorks", "/how-it-works");

const SECTIONS = ["what", "reads", "actions", "setup", "battery", "iphone"] as const;

export default async function HowItWorksPage() {
  const t = await getTranslations("howItWorks");
  const common = await getTranslations("common");
  const footer = await getTranslations("footer");
  const does = t.raw("reads.does") as string[];
  const doesnt = t.raw("reads.doesnt") as string[];
  const steps = t.raw("setup.steps") as { title: string; body: string }[];
  const tips = t.raw("battery.tips") as { brand: string; tip: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav aria-label={common("onThisPage")} className="lg:sticky lg:top-24">
            <p className="mb-3 text-sm font-semibold">{common("onThisPage")}</p>
            <ol className="space-y-1 text-sm">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <a href={`#${s}`} className="inline-flex min-h-9 items-center text-muted hover:text-fg">
                    {t(`toc.${s}`)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="space-y-20 lg:col-span-9">
          <section id="what" className="scroll-mt-24" aria-labelledby="what-title">
            <h2 id="what-title" className="text-h2">{t("what.title")}</h2>
            <p className="mt-5 max-w-3xl text-lead text-muted">{t("what.p1")}</p>
            <p className="mt-4 max-w-3xl text-muted">{t("what.p2")}</p>
          </section>

          <section id="reads" className="scroll-mt-24" aria-labelledby="reads-title">
            <h2 id="reads-title" className="text-h2">{t("reads.title")}</h2>
            <p className="mt-5 max-w-3xl text-muted">{t("reads.intro")}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-calm/40 bg-calm-soft p-6">
                <h3 className="font-sans text-lg font-semibold tracking-normal">{t("reads.doesTitle")}</h3>
                <ul className="mt-4 space-y-3">
                  {does.map((d) => (
                    <li key={d} className="flex gap-3">
                      <CheckIcon className="mt-1 size-4 shrink-0 text-calm-text" strokeWidth={2.5} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-sans text-lg font-semibold tracking-normal">{t("reads.doesntTitle")}</h3>
                <ul className="mt-4 space-y-3">
                  {doesnt.map((d) => (
                    <li key={d} className="flex gap-3">
                      <XIcon className="mt-1 size-4 shrink-0 text-accent-text" strokeWidth={2.5} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm">
              <Link href="/accessibility-disclosure" className="font-medium text-accent-text underline underline-offset-2">
                {footer("accessibility")}
              </Link>
            </p>
          </section>

          <section id="actions" className="scroll-mt-24" aria-labelledby="actions-title">
            <h2 id="actions-title" className="text-h2">{t("actions.title")}</h2>
            <p className="mt-5 max-w-3xl text-muted">{t("actions.p1")}</p>
            <p className="mt-4 max-w-3xl text-muted">{t("actions.p2")}</p>
          </section>

          <section id="setup" className="scroll-mt-24" aria-labelledby="setup-title">
            <h2 id="setup-title" className="text-h2">{t("setup.title")}</h2>
            <p className="mt-5 max-w-3xl text-muted">{t("setup.intro")}</p>
            <div className="mt-8 grid items-start gap-10 md:grid-cols-5">
              <ol className="space-y-6 md:col-span-3">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent font-display font-bold text-accent-ink">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-semibold tracking-normal">{s.title}</h3>
                      <p className="mt-1 text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="md:col-span-2">
                <SettingsToggle label={t("setup.illustrationLabel")} />
              </div>
            </div>
          </section>

          <section id="battery" className="scroll-mt-24" aria-labelledby="battery-title">
            <h2 id="battery-title" className="text-h2">{t("battery.title")}</h2>
            <p className="mt-5 max-w-3xl text-muted">{t("battery.intro")}</p>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {tips.map((tip) => (
                <li key={tip.brand} className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="flex items-center gap-2 font-sans text-base font-semibold tracking-normal">
                    <BatteryIcon className="size-5 text-calm-text" />
                    {tip.brand}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{tip.tip}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="iphone" className="scroll-mt-24" aria-labelledby="iphone-title">
            <h2 id="iphone-title" className="text-h2">{t("iphone.title")}</h2>
            <p className="mt-5 max-w-3xl text-muted">{t("iphone.p1")}</p>
            <p className="mt-4 max-w-3xl text-muted">{t("iphone.p2")}</p>
          </section>
        </div>
      </div>
      <FinalCta source="how-it-works" />
    </>
  );
}
