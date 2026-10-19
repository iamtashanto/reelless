import { getTranslations } from "next-intl/server";
import { ArrowRightIcon, GlobeIcon, LockIcon, ShieldIcon } from "@/components/icons";
import { HeroPhone } from "@/components/illustrations/hero-phone";
import { Magnetic } from "@/components/motion/magnetic";
import { Spotlight } from "@/components/motion/spotlight";
import { ButtonLink } from "@/components/ui/button";

export async function Hero() {
  const t = await getTranslations("home.hero");
  return (
    <section aria-labelledby="hero-title" className="grain relative overflow-hidden">
      <Spotlight />
      <div aria-hidden className="bg-grid absolute inset-0 -z-20 opacity-60" />
      <div className="container-page grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-sm font-medium text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {t("eyebrow")}
          </p>
          <h1 id="hero-title" className="text-display max-w-[14ch] font-[720]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-[56ch] text-lead text-muted">{t("subtitle")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink href="#waitlist" size="lg" className="w-full sm:w-auto">
                {t("primary")}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#how-it-works" variant="secondary" size="lg">
              {t("secondary")}
            </ButtonLink>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {[
              { Icon: LockIcon, label: t("trust.onDevice") },
              { Icon: ShieldIcon, label: t("trust.noAds") },
              { Icon: GlobeIcon, label: t("trust.languages") },
            ].map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="size-4 text-calm-text" />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <HeroPhone
            labels={{
              label: t("phoneLabel"),
              search: t("calmSearch"),
              message: t("calmMessage"),
              friend: t("calmFriend"),
              status: t("calmStatus"),
            }}
          />
        </div>
      </div>
    </section>
  );
}
