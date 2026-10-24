import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { flattenMessages } from "@/lib/messages";
import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/page";
import { UninstallFeedbackForm } from "@/components/forms/uninstall-feedback-form";

export const generateMetadata = () =>
  pageMetadata("uninstallFeedback", "/uninstall-feedback");

export default async function UninstallFeedbackPage() {
  const t = await getTranslations("uninstallFeedback");
  const messages = await getMessages();

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />
      <div className="container-page max-w-3xl py-12 md:py-16">
        <div className="border-border bg-surface shadow-card rounded-3xl border p-6 sm:p-8">
          <UninstallFeedbackForm
            labels={flattenMessages(messages.uninstallFeedback)}
            locale={await getLocale()}
          />
        </div>
      </div>
    </>
  );
}

