import { getTranslations } from "next-intl/server";
import { ScrollSplit } from "@/components/illustrations/scroll-split";
import { Eyebrow, Section } from "@/components/ui/section";

export async function Problem() {
  const t = await getTranslations("home.problem");
  return (
    <Section id="problem" band labelledBy="problem-title">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="problem-title" className="text-h2">
            {t("title")}
          </h2>
          <p className="mt-6 text-lead text-muted">{t("body1")}</p>
          <p className="mt-4 text-muted">{t("body2")}</p>
        </div>
        <div className="lg:col-span-7">
          <ScrollSplit
            labels={{
              label: t("splitLabel"),
              endless: t("endless"),
              intentional: t("intentional"),
              endlessCaption: t("endlessCaption"),
              intentionalCaption: t("intentionalCaption"),
            }}
          />
        </div>
      </div>
    </Section>
  );
}
