import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/home/hero";
import { HowItWorks } from "@/components/sections/home/how";
import { BrainrotScoreSection } from "@/components/sections/home/brain-score";
import {
  BuiltInPublic,
  CompareSection,
  FinalCta,
  HomeFaq,
  LanguageSection,
  PlatformsSection,
  PricingPreview,
  PrivacySection,
  StatsSection,
} from "@/components/sections/home/more";
import { Pillars } from "@/components/sections/home/pillars";
import { Problem } from "@/components/sections/home/problem";
import { JsonLd, softwareApplicationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return buildMetadata({ locale, path: "/", title: t("title"), description: t("description") });
}

export default async function Home() {
  const t = await getTranslations("meta");

  return (
    <>
      <Hero />
      <Problem />
      <BrainrotScoreSection />
      <HowItWorks />
      <Pillars />
      <PlatformsSection />
      <LanguageSection />
      <StatsSection />
      <PrivacySection />
      <CompareSection />
      <PricingPreview />
      <HomeFaq />
      <BuiltInPublic />
      <FinalCta />
      <JsonLd data={softwareApplicationSchema(t("defaultDescription"))} />
    </>
  );
}
