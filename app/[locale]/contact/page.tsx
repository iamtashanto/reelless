import { getTranslations } from "next-intl/server";
import { MailIcon } from "@/components/icons";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/page";
import { siteConfig } from "@/site.config";

export const generateMetadata = () => pageMetadata("contact", "/contact");

export default async function ContactPage() {
  const t = await getTranslations("contact");
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <p className="mt-6 inline-flex items-center gap-2 text-muted">
          <MailIcon className="size-4" />
          {t.rich("emailDirect", {
            email: siteConfig.contactEmail,
            link: (chunks) => (
              <a href={`mailto:${siteConfig.contactEmail}`} className="font-medium text-fg underline underline-offset-2">
                {chunks}
              </a>
            ),
          })}
        </p>
      </PageHero>
      <div className="container-page max-w-3xl py-14 md:py-20">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
