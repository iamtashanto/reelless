import { getTranslations } from "next-intl/server";
import { CheckIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";
import { pageMetadata } from "@/lib/page";

export const generateMetadata = () =>
  pageMetadata("waitlistThanks", "/waitlist/thanks", { noIndex: true });

export default async function ThanksPage() {
  const t = await getTranslations("thanks");
  return (
    <section className="grain relative">
      <div className="container-page flex min-h-[60vh] max-w-2xl flex-col justify-center py-20">
        <span className="bg-calm text-bg mb-6 grid size-14 place-items-center rounded-full">
          <CheckIcon className="size-7" strokeWidth={2.5} />
        </span>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="text-h1">{t("title")}</h1>
        <p className="text-lead text-muted mt-4">{t("body")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/guides">{t("readGuides")}</ButtonLink>
          <ButtonLink href="/changelog" variant="secondary">
            {t("seeChangelog")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
