import { getTranslations } from "next-intl/server";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { pageMetadata } from "@/lib/page";
import { siteConfig } from "@/site.config";

export const generateMetadata = () => pageMetadata("download", "/download");

export default async function DownloadPage() {
  const t = await getTranslations("download");
  const live = siteConfig.flags.PLAY_STORE_LIVE;
  const reqs = t.raw("requirements") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />
      <div className="container-page grid gap-6 py-14 md:py-20 lg:grid-cols-12">
        <section id="waitlist" aria-labelledby="status-title" className="scroll-mt-24 rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8 lg:col-span-7">
          {live ? (
            <>
              <h2 id="status-title" className="text-h3">{t("liveTitle")}</h2>
              <p className="mt-3 text-muted">{t("liveBody")}</p>
              {/* Official badge — only rendered when the listing is live (PLAY_STORE_LIVE). */}
              <a href={siteConfig.playStoreUrl} className="mt-6 inline-block" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/google-play-badge.png" alt={t("playBadgeAlt")} width={200} height={59} />
              </a>
            </>
          ) : (
            <>
              <Badge tone="accent">{t("statusTitle")}</Badge>
              <h2 id="status-title" className="mt-4 text-h3">{t("notOnPlay")}</h2>
              <p className="mt-3 text-muted">{t("statusBody")}</p>
              <WaitlistForm source="download" className="mt-8" />
            </>
          )}
        </section>
        <div className="space-y-6 lg:col-span-5">
          <section aria-labelledby="req-title" className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <h2 id="req-title" className="flex items-center gap-2 font-sans text-lg font-semibold tracking-normal">
              <PhoneIcon className="size-5 text-calm-text" /> {t("requirementsTitle")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {reqs.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-calm-text" strokeWidth={2.5} />
                  {r}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="iphone-title" className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <h2 id="iphone-title" className="font-sans text-lg font-semibold tracking-normal">{t("iphoneTitle")}</h2>
            <p className="mt-2 text-muted">{t("iphoneBody")}</p>
          </section>
          <section aria-labelledby="ext-title" className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <h2 id="ext-title" className="font-sans text-lg font-semibold tracking-normal">{t("extensionTitle")}</h2>
            <p className="mt-2 text-muted">{t("extensionBody")}</p>
          </section>
        </div>
      </div>
    </>
  );
}
