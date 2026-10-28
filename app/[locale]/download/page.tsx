import { getTranslations } from "next-intl/server";
import { CheckIcon, FocusIcon, MonitorIcon, PhoneIcon, ShieldIcon } from "@/components/icons";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { pageMetadata } from "@/lib/page";
import { siteConfig } from "@/site.config";

export const generateMetadata = () => pageMetadata("download", "/download");

function Requirements({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((r) => (
        <li key={r} className="flex gap-2.5 text-sm">
          <CheckIcon className="text-calm-text mt-1 size-4 shrink-0" strokeWidth={2.5} />
          <span>{r}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function DownloadPage() {
  const t = await getTranslations("download");
  const pricing = await getTranslations("pricing");
  const { PLAY_STORE_LIVE, PLAY_TESTING_LIVE, CHROME_STORE_LIVE, FIREFOX_ADDON_LIVE } = siteConfig.flags;
  const bothLive = PLAY_STORE_LIVE && CHROME_STORE_LIVE;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Android */}
          <section
            aria-labelledby="android-title"
            className="border-border bg-surface shadow-card flex flex-col rounded-3xl border p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="bg-accent-soft text-accent-text grid size-12 place-items-center rounded-2xl">
                <PhoneIcon className="size-6" />
              </span>
              <Badge tone={PLAY_STORE_LIVE ? "calm" : "accent"}>
                {PLAY_STORE_LIVE ? t("liveTitle") : t("androidTestingStatus")}
              </Badge>
            </div>
            <h2 id="android-title" className="text-h3 mt-5">
              {t("androidTitle")}
            </h2>
            <p className="text-muted mt-2 text-sm">{PLAY_STORE_LIVE ? t("liveBody") : t("notOnPlay")}</p>
            <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-wider text-muted">
              {t("requirementsTitle")}
            </h3>
            <Requirements items={t.raw("requirements") as string[]} />
            {PLAY_STORE_LIVE ? (
              <a
                href={siteConfig.playStoreUrl}
                className="mt-auto inline-block pt-6"
                rel="noopener"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/google-play-badge.png" alt={t("playBadgeAlt")} width={180} height={53} />
              </a>
            ) : (
              <div className="mt-auto flex flex-col gap-2.5 pt-6">
                {siteConfig.androidApkUrl ? (
                  <a
                    href={siteConfig.androidApkUrl}
                    download="Reelless-v1.1.1.apk"
                    className={buttonClasses("primary", "md", "w-full text-center")}
                  >
                    {t("androidApkCta")}
                  </a>
                ) : null}
                {PLAY_TESTING_LIVE && siteConfig.playTestingUrl ? (
                  <a
                    href={siteConfig.playTestingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses("secondary", "md", "w-full text-center")}
                  >
                    {t("androidTestingCta")}
                  </a>
                ) : null}
              </div>
            )}
          </section>

          {/* iPhone / iOS */}
          <section
            aria-labelledby="ios-title"
            className="border-border bg-surface shadow-card flex flex-col rounded-3xl border p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="bg-accent-soft text-accent-text grid size-12 place-items-center rounded-2xl">
                <FocusIcon className="size-6" />
              </span>
              <Badge tone="accent">{t("iosStatus")}</Badge>
            </div>
            <h2 id="ios-title" className="text-h3 mt-5">
              {t("iosTitle")}
            </h2>
            <p className="text-muted mt-2 text-sm">{t("iosBody")}</p>
            <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-wider text-muted">
              {t("requirementsTitle")}
            </h3>
            <Requirements items={t.raw("iosRequirements") as string[]} />
            <div className="mt-auto pt-6">
              <a
                href={siteConfig.testflightUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("primary", "md", "w-full text-center")}
              >
                {t("iosCta")}
              </a>
            </div>
          </section>

          {/* Chrome & Firefox / Desktop Extension */}
          <section
            aria-labelledby="chrome-title"
            className="border-border bg-surface shadow-card flex flex-col rounded-3xl border p-6 sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="bg-calm-soft text-calm-text grid size-12 place-items-center rounded-2xl">
                <MonitorIcon className="size-6" />
              </span>
              <Badge tone={CHROME_STORE_LIVE || FIREFOX_ADDON_LIVE ? "calm" : "accent"}>
                {CHROME_STORE_LIVE || FIREFOX_ADDON_LIVE ? t("chromeStatus") : t("liveTitle")}
              </Badge>
            </div>
            <h2 id="chrome-title" className="text-h3 mt-5">
              {t("chromeTitle")}
            </h2>
            <p className="text-muted mt-2 text-sm">
              {CHROME_STORE_LIVE || FIREFOX_ADDON_LIVE ? t("chromeLiveBody") : t("notOnPlay")}
            </p>
            <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-wider text-muted">
              {t("requirementsTitle")}
            </h3>
            <Requirements items={t.raw("chromeRequirements") as string[]} />
            <div className="mt-auto flex flex-col gap-2.5 pt-6">
              {CHROME_STORE_LIVE && siteConfig.chromeStoreUrl ? (
                <a
                  href={siteConfig.chromeStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("primary", "md", "w-full text-center")}
                >
                  {t("chromeStoreCta")}
                </a>
              ) : null}
              {FIREFOX_ADDON_LIVE && siteConfig.firefoxAddonUrl ? (
                <a
                  href={siteConfig.firefoxAddonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("secondary", "md", "w-full text-center")}
                >
                  {t("firefoxAddonCta")}
                </a>
              ) : null}
            </div>
          </section>
        </div>

        {/* Manual License Activation Banner */}
        <div className="mt-8 rounded-3xl border border-border/80 bg-surface/90 p-6 shadow-card backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-text">
                <ShieldIcon className="size-3.5" />
                {pricing("manualBuyBadge")}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold">
                {pricing("manualBuyTitle")}
              </h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                {pricing("manualBuyDesc")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("primary", "md")}
              >
                WhatsApp (+8801614081441)
              </a>
              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("secondary", "md")}
              >
                Telegram (@tashanto)
              </a>
            </div>
          </div>
        </div>

        {!bothLive ? (
          <section
            id="waitlist"
            aria-labelledby="status-title"
            className="border-border bg-surface shadow-card mt-8 scroll-mt-24 rounded-3xl border p-6 sm:p-8"
          >
            <Badge tone="accent">{t("statusTitle")}</Badge>
            <h2 id="status-title" className="text-h3 mt-4">
              {t("waitlistTitle")}
            </h2>
            <p className="text-muted mt-3 max-w-2xl">{t("statusBody")}</p>
            <WaitlistForm source="download" className="mt-8 max-w-2xl" />
          </section>
        ) : null}
      </div>
    </>
  );
}
