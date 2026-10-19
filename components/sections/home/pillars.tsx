import { getTranslations } from "next-intl/server";
import { PillarTabs } from "./pillar-tabs";
import { Section, SectionHeading } from "@/components/ui/section";

export async function Pillars() {
  const t = await getTranslations("home.pillars");
  const s = await getTranslations("home.stats");
  const common = await getTranslations("common");
  const pillar = (k: "block" | "control" | "measure") => ({
    tab: t(`${k}.tab`),
    title: t(`${k}.title`),
    body: t(`${k}.body`),
    points: t.raw(`${k}.points`) as string[],
  });
  return (
    <Section id="features" band labelledBy="pillars-title">
      <div className="container-page">
        <SectionHeading id="pillars-title" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <PillarTabs
          tabsLabel={t("tabsLabel")}
          seeAll={common("seeAllFeatures")}
          pillars={{ block: pillar("block"), control: pillar("control"), measure: pillar("measure") }}
          cards={{
            shelf: { title: t("cards.shelf.title"), body: t("cards.shelf.body"), label: t("cards.shelf.label"), hidden: t("cards.shelf.hidden") },
            searchOnly: { title: t("cards.searchOnly.title"), body: t("cards.searchOnly.body"), label: t("cards.searchOnly.label") },
            friendsFirst: {
              title: t("cards.friendsFirst.title"),
              body: t("cards.friendsFirst.body"),
              label: t("cards.friendsFirst.label"),
              suggested: t("cards.friendsFirst.suggested"),
              friend: t("cards.friendsFirst.friend"),
            },
            keywords: { title: t("cards.keywords.title"), body: t("cards.keywords.body"), label: t("cards.keywords.label"), tag: t("cards.keywords.tag") },
            limits: { title: t("cards.limits.title"), body: t("cards.limits.body"), label: t("cards.limits.label"), left: t("cards.limits.left") },
            stats: { title: t("cards.stats.title"), body: t("cards.stats.body"), label: t("cards.stats.label"), example: common("example"), days: s.raw("days") as string[] },
          }}
        />
      </div>
    </Section>
  );
}
