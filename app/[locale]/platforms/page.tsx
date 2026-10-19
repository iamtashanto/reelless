import { getTranslations } from "next-intl/server";
import { ArrowRightIcon, BrowserIcon, CheckIcon, MinusIcon } from "@/components/icons";
import { FinalCta } from "@/components/sections/home/more";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/page";
import { platforms } from "@/lib/platforms";

export const generateMetadata = () => pageMetadata("platforms", "/platforms");

export default async function PlatformsPage() {
  const t = await getTranslations("platformsPage");
  const pd = await getTranslations("platformData");
  const common = await getTranslations("common");
  const browsers = (await getTranslations()).raw("browsers") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <nav aria-label={common("onThisPage")} className="mt-8 flex flex-wrap gap-2">
          {platforms.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="inline-flex min-h-11 items-center rounded-full border border-border-strong bg-surface px-4 text-sm font-medium hover:border-fg/40">
              {pd(`${p.id}.name`)}
            </a>
          ))}
          <a href="#browsers" className="inline-flex min-h-11 items-center rounded-full border border-border-strong bg-surface px-4 text-sm font-medium hover:border-fg/40">
            {t("browsersTitle")}
          </a>
        </nav>
      </PageHero>
      <div className="container-page space-y-6 py-14 md:py-20">
        <p className="text-sm text-muted">{t("betaNote")}</p>
        {platforms.map(({ id, beta, Icon, landing }) => (
          <section key={id} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent-text">
                <Icon className="size-6" />
              </span>
              <h2 id={`${id}-title`} className="text-h3">{pd(`${id}.name`)}</h2>
              {beta ? <Badge tone="outline">{common("beta")}</Badge> : null}
              {id === "facebook" ? <span className="text-sm text-muted">{pd("facebook.note")}</span> : null}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-sans text-sm font-semibold tracking-normal text-accent-text">{t("blocks")}</h3>
                <ul className="mt-3 space-y-2">
                  {(pd.raw(`${id}.blocks`) as string[]).map((b) => (
                    <li key={b} className="flex gap-2.5"><MinusIcon className="mt-1 size-4 shrink-0 text-accent-text" strokeWidth={2.5} />{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold tracking-normal text-calm-text">{t("keeps")}</h3>
                <ul className="mt-3 space-y-2">
                  {(pd.raw(`${id}.keeps`) as string[]).map((b) => (
                    <li key={b} className="flex gap-2.5"><CheckIcon className="mt-1 size-4 shrink-0 text-calm-text" strokeWidth={2.5} />{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            {landing ? (
              <Link href={landing} className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-accent-text hover:underline">
                {t("guide")} <ArrowRightIcon className="size-4" />
              </Link>
            ) : null}
          </section>
        ))}
        <section id="browsers" aria-labelledby="browsers-title" className="scroll-mt-24 rounded-3xl border border-border bg-surface p-6 shadow-card md:p-8">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-calm-soft text-calm-text"><BrowserIcon className="size-6" /></span>
            <h2 id="browsers-title" className="text-h3">{t("browsersTitle")}</h2>
          </div>
          <p className="mt-4 text-muted">{t("browsersIntro")}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {browsers.map((b) => (
              <li key={b} className="rounded-full bg-surface-2 px-3 py-1.5 text-sm">{b}</li>
            ))}
          </ul>
        </section>
        <p className="pt-4 text-xs text-muted">{(await getTranslations("footer"))("disclaimer")}</p>
      </div>
      <FinalCta source="platforms" />
    </>
  );
}
