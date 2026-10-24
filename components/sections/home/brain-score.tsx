import { getTranslations } from "next-intl/server";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { BrainrotScoreInteractive, type BrainScoreLabels } from "./brain-score-interactive";

const TIER_KEYS = ["peak", "calm", "dopamine", "rotting", "zombie"] as const;

export async function BrainrotScoreSection() {
  const t = await getTranslations("brainScore");

  const tiers = TIER_KEYS.reduce((acc, key) => {
    acc[key] = {
      name: t(`tiers.${key}.name`),
      badge: t(`tiers.${key}.badge`),
      title: t(`tiers.${key}.title`),
      desc: t(`tiers.${key}.desc`),
      intervention: t(`tiers.${key}.intervention`),
      goal: t(`tiers.${key}.goal`),
    };
    return acc;
  }, {} as BrainScoreLabels["tiers"]);

  const labels: BrainScoreLabels = {
    clarityIndex: t("clarityIndex"),
    liveScoreHint: t("liveScoreHint"),
    interventionTitle: t("interventionTitle"),
    habitGoalTitle: t("habitGoalTitle"),
    breathingBadge: t("breathingBadge"),
    breathingTitle: t("breathingTitle"),
    breathingSubtitle: t("breathingSubtitle"),
    inhale: t("inhale"),
    exhale: t("exhale"),
    toggleBreathing: t("toggleBreathing"),
    breathingFootnote: t("breathingFootnote"),
    focusBadge: t("focusBadge"),
    focusTitle: t("focusTitle"),
    focusSubtitle: t("focusSubtitle"),
    sprintDuration: t("sprintDuration"),
    sprintShieldInfo: t("sprintShieldInfo"),
    focusFootnote: t("focusFootnote"),
    tiers,
  };

  return (
    <Section id="brain-score" band labelledBy="brain-score-title">
      <div className="container-page">
        <SectionHeading
          id="brain-score-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <BrainrotScoreInteractive labels={labels} />
      </div>
    </Section>
  );
}
