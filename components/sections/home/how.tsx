import { getTranslations } from "next-intl/server";
import { Stepper } from "@/components/illustrations/stepper";
import { Section, SectionHeading } from "@/components/ui/section";

export async function HowItWorks() {
  const t = await getTranslations("home.how");
  const steps = (["choose", "protect", "use"] as const).map((k, i) => ({
    title: t(`steps.${k}.title`),
    body: t(`steps.${k}.body`),
    label: t("stepLabel", { n: i + 1 }),
  }));
  return (
    <Section id="how-it-works" labelledBy="how-title">
      <div className="container-page">
        <SectionHeading id="how-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} align="center" />
        <Stepper steps={steps} />
      </div>
    </Section>
  );
}
