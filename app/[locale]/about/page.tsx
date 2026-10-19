import { getTranslations } from "next-intl/server";
import { ArrowUpRightIcon, MailIcon } from "@/components/icons";
import { PageHero } from "@/components/sections/page-hero";
import { pageMetadata } from "@/lib/page";
import { siteConfig } from "@/site.config";

export const generateMetadata = () => pageMetadata("about", "/about");

export default async function AboutPage() {
  const t = await getTranslations("about");
  const principles = t.raw("principles") as { title: string; body: string }[];
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("lead")} />
      <div className="container-page grid gap-14 py-14 md:py-20 lg:grid-cols-12">
        <section aria-labelledby="story" className="lg:col-span-7">
          <h2 id="story" className="text-h2">
            {t("storyTitle")}
          </h2>
          {/* TODO(TA Shanto): replace the placeholder story below before launch. */}
          <p className="border-accent/60 bg-accent-soft text-accent-text mt-6 rounded-xl border border-dashed px-4 py-3 text-sm font-medium">
            {t("todo")}
          </p>
          <div className="prose-reelless mt-6">
            <p>{t("storyP1")}</p>
            <p>{t("storyP2")}</p>
          </div>
        </section>
        <aside className="lg:col-span-5">
          <div className="border-border bg-surface shadow-card rounded-3xl border p-6 sm:p-8">
            <p className="text-muted text-sm font-semibold">{t("builtBy")}</p>
            <p className="font-display mt-2 text-2xl font-bold">
              <a
                href={siteConfig.developer.url}
                target="_blank"
                rel="noopener"
                className="hover:text-accent-text inline-flex items-center gap-1"
              >
                {siteConfig.developer.name}
                <ArrowUpRightIcon className="size-5" />
              </a>
            </p>
            <p className="text-muted mt-3">{t("builtByBody")}</p>
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener"
              className="text-accent-text mt-4 inline-flex min-h-11 items-center font-medium underline underline-offset-2"
            >
              tashanto.com
            </a>
            <hr className="border-border my-6" />
            <h2 className="font-sans text-base font-semibold tracking-normal">
              {t("contactTitle")}
            </h2>
            <p className="text-muted mt-2 flex items-center gap-2">
              <MailIcon className="size-4" />
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="hover:text-fg underline underline-offset-2"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>
        </aside>
      </div>
      <section aria-labelledby="principles" className="bg-bg-elev py-14 md:py-20">
        <div className="container-page">
          <h2 id="principles" className="text-h2 mb-10">
            {t("principlesTitle")}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title} className="border-border bg-surface rounded-2xl border p-6">
                <h3 className="font-sans text-lg font-semibold tracking-normal">{p.title}</h3>
                <p className="text-muted mt-2">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
