import { getFormatter, getTranslations } from "next-intl/server";
import { Mdx } from "@/components/mdx";
import { PageHero } from "@/components/sections/page-hero";
import { listChangelog } from "@/lib/content";
import { currentLocale, pageMetadata } from "@/lib/page";

export const generateMetadata = () => pageMetadata("changelog", "/changelog", { availableLocales: ["en", "bn"] });

export default async function ChangelogPage() {
  const t = await getTranslations("changelog");
  const format = await getFormatter();
  const locale = await currentLocale();
  const entries = await listChangelog();
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="container-page max-w-4xl py-14 md:py-20">
        <ol className="relative space-y-12 border-s border-border ps-6 md:ps-10">
          {entries.map((e) => (
            <li key={e.slug} id={e.slug} className="relative scroll-mt-24">
              <span aria-hidden className="absolute -start-[1.95rem] top-2 size-3 rounded-full bg-accent ring-4 ring-bg md:-start-[2.95rem]" />
              <time dateTime={e.date} className="text-sm font-medium text-muted">
                {format.dateTime(new Date(e.date), { dateStyle: "long" })}
              </time>
              <h2 className="mt-1 text-h3">{e.title}</h2>
              <div className="prose-reelless mt-4" lang="en">
                <Mdx source={e.body} locale={locale} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
