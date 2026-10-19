import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { platforms } from "@/lib/platforms";
import { WaitlistFormClient } from "./waitlist-form-client";

/** Server wrapper: translates the copy and hands plain strings to the client form. */
export async function WaitlistForm(props: {
  source?: string;
  showPlatforms?: boolean;
  className?: string;
}) {
  const t = await getTranslations("waitlist");
  const tp = await getTranslations("platformData");
  const locale = await getLocale();
  return (
    <WaitlistFormClient
      {...props}
      locale={locale}
      labels={{
        emailLabel: t("emailLabel"),
        emailPlaceholder: t("emailPlaceholder"),
        submit: t("submit"),
        submitting: t("submitting"),
        honeypot: t("honeypot"),
        productsLabel: t("productsLabel"),
        products: { android: t("products.android"), chrome: t("products.chrome") },
        platformsLabel: t("platformsLabel"),
        platformNames: Object.fromEntries(platforms.map((p) => [p.id, tp(`${p.id}.name`)])),
        errors: {
          email: t("errors.email"),
          rateLimited: t("errors.rateLimited"),
          captcha: t("errors.captcha"),
          server: t("errors.server"),
        },
        successTitle: t("success.title"),
        successBody: t.raw("success.body") as string,
        already: t("already"),
      }}
      privacyNote={t.rich("privacyNote", {
        link: (chunks) => (
          <Link href="/privacy" className="hover:text-fg underline underline-offset-2">
            {chunks}
          </Link>
        ),
      })}
    />
  );
}
