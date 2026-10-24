import { getTranslations } from "next-intl/server";
import {
  ArrowUpRightIcon,
  DiscordIcon,
  GithubIcon,
  HeartHandIcon,
  LockIcon,
  RedditIcon,
  ShieldIcon,
  SparkIcon,
  TwitterXIcon,
} from "@/components/icons";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { pageMetadata } from "@/lib/page";

export const generateMetadata = () => pageMetadata("community", "/community");

export default async function CommunityPage() {
  const t = await getTranslations("community");

  const channels = [
    {
      key: "discord",
      icon: DiscordIcon,
      badge: "Active Chat",
      badgeTone: "accent" as const,
      color: "hover:border-[#5865F2]/50 hover:shadow-[#5865F2]/10",
      accentBg: "bg-[#5865F2]/10 text-[#5865F2]",
    },
    {
      key: "github",
      icon: GithubIcon,
      badge: "Open Source",
      badgeTone: "neutral" as const,
      color: "hover:border-fg/40 hover:shadow-fg/5",
      accentBg: "bg-fg/10 text-fg",
    },
    {
      key: "reddit",
      icon: RedditIcon,
      badge: "Discussions",
      badgeTone: "neutral" as const,
      color: "hover:border-[#FF4500]/50 hover:shadow-[#FF4500]/10",
      accentBg: "bg-[#FF4500]/10 text-[#FF4500]",
    },
    {
      key: "x",
      icon: TwitterXIcon,
      badge: "Updates",
      badgeTone: "neutral" as const,
      color: "hover:border-fg/40 hover:shadow-fg/5",
      accentBg: "bg-fg/10 text-fg",
    },
  ];

  const valuesIcons = [ShieldIcon, HeartHandIcon, SparkIcon];

  const values = t.raw("values") as { title: string; body: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("lead")}>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge tone="accent">Mindful Technology</Badge>
          <Badge tone="neutral">Ad-Free & Private</Badge>
        </div>
      </PageHero>

      {/* Main Channels */}
      <section aria-labelledby="community-channels" className="container-page py-14 md:py-20">
        <h2 id="community-channels" className="text-h2 mb-10 text-center">
          {t("channelsTitle")}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {channels.map((ch) => {
            const Icon = ch.icon;
            const title = t(`${ch.key}.title` as any);
            const description = t(`${ch.key}.description` as any);
            const cta = t(`${ch.key}.cta` as any);
            const href = t(`${ch.key}.href` as any);

            return (
              <a
                key={ch.key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group border-border bg-surface shadow-card relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-8 ${ch.color}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex size-12 items-center justify-center rounded-2xl ${ch.accentBg}`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <Badge tone={ch.badgeTone}>{ch.badge}</Badge>
                  </div>

                  <h3 className="font-sans mt-5 text-xl font-semibold tracking-normal text-fg">
                    {title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed sm:text-base">
                    {description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:underline">
                  <span>{cta}</span>
                  <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Community Principles / Values */}
      <section aria-labelledby="community-values" className="bg-bg-elev border-border border-y py-14 md:py-20">
        <div className="container-page max-w-5xl">
          <div className="text-center">
            <h2 id="community-values" className="text-h2">
              {t("valuesTitle")}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => {
              const Icon = valuesIcons[i] || LockIcon;
              return (
                <div
                  key={v.title}
                  className="border-border bg-surface shadow-card flex flex-col rounded-2xl border p-6"
                >
                  <div className="bg-accent/10 text-accent flex size-10 items-center justify-center rounded-xl">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-sans mt-4 text-lg font-semibold tracking-normal text-fg">
                    {v.title}
                  </h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
