import { getTranslations } from "next-intl/server";
import type { AnimLabels } from "@/components/sections/feature-anim";

export async function getAnimLabels(): Promise<AnimLabels> {
  const t = await getTranslations("home.pillars.cards");
  const s = await getTranslations("home.stats");
  const common = await getTranslations("common");
  return {
    shelf: { label: t("shelf.label"), hidden: t("shelf.hidden") },
    friendsFirst: {
      label: t("friendsFirst.label"),
      suggested: t("friendsFirst.suggested"),
      friend: t("friendsFirst.friend"),
    },
    searchOnly: { label: t("searchOnly.label") },
    keywords: { label: t("keywords.label"), tag: t("keywords.tag") },
    limits: { label: t("limits.label"), left: t("limits.left") },
    stats: { label: t("stats.label"), example: common("example"), days: s.raw("days") as string[] },
  };
}
