import { useTranslations } from "next-intl";
import { LostIllustration, PopularLinks } from "@/components/sections/lost";
import { Eyebrow } from "@/components/ui/section";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="grain relative">
      <div className="container-page grid max-w-5xl items-center gap-12 py-20 md:grid-cols-[1fr_auto] md:py-28">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="text-h1">{t("title")}</h1>
          <p className="text-lead text-muted mt-4 max-w-xl">{t("body")}</p>
          <h2 className="text-muted mt-10 font-sans text-sm font-semibold tracking-normal">
            {t("links")}
          </h2>
          <PopularLinks />
        </div>
        <LostIllustration />
      </div>
    </section>
  );
}
