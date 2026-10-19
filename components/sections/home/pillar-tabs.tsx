"use client";

import { CheckIcon, ArrowRightIcon } from "@/components/icons";
import { FeatureAnim, type AnimLabels } from "@/components/sections/feature-anim";
import { Link } from "@/i18n/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Pillar = { tab: string; title: string; body: string; points: string[] };
type CardText = { title: string; body: string; label: string };

function MiniCard({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border bg-surface shadow-card rounded-2xl border p-4">
      {children}
      <h4 className="mt-4 font-sans text-base font-semibold tracking-normal">{title}</h4>
      <p className="text-muted mt-1 text-sm">{body}</p>
    </div>
  );
}

function PillarIntro({
  pillar,
  seeAll,
  anchor,
}: {
  pillar: Pillar;
  seeAll: string;
  anchor: string;
}) {
  return (
    <div>
      <h3 className="text-h3">{pillar.title}</h3>
      <p className="text-muted mt-3">{pillar.body}</p>
      <ul className="mt-6 space-y-3">
        {pillar.points.map((p) => (
          <li key={p} className="flex gap-3">
            <span className="bg-calm-soft text-calm-text mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
              <CheckIcon className="size-3.5" strokeWidth={2.5} />
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/features#${anchor}`}
        className="text-accent-text mt-7 inline-flex min-h-11 items-center gap-2 font-medium hover:underline"
      >
        {seeAll} <ArrowRightIcon className="size-4" />
      </Link>
    </div>
  );
}

export function PillarTabs({
  tabsLabel,
  seeAll,
  pillars,
  cards,
}: {
  tabsLabel: string;
  seeAll: string;
  pillars: Record<"block" | "control" | "measure", Pillar>;
  cards: {
    shelf: CardText & { hidden: string };
    searchOnly: CardText;
    friendsFirst: CardText & { suggested: string; friend: string };
    keywords: CardText & { tag: string };
    limits: CardText & { left: string };
    stats: CardText & { example: string; days: string[] };
  };
}) {
  const labels: AnimLabels = {
    shelf: { label: cards.shelf.label, hidden: cards.shelf.hidden },
    friendsFirst: {
      label: cards.friendsFirst.label,
      suggested: cards.friendsFirst.suggested,
      friend: cards.friendsFirst.friend,
    },
    searchOnly: { label: cards.searchOnly.label },
    keywords: { label: cards.keywords.label, tag: cards.keywords.tag },
    limits: { label: cards.limits.label, left: cards.limits.left },
    stats: { label: cards.stats.label, example: cards.stats.example, days: cards.stats.days },
  };
  return (
    <Tabs defaultValue="block">
      <TabsList aria-label={tabsLabel}>
        {(["block", "control", "measure"] as const).map((k) => (
          <TabsTrigger key={k} value={k}>
            {pillars[k].tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="block">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <PillarIntro pillar={pillars.block} seeAll={seeAll} anchor="block" />
          <div className="grid gap-4 sm:grid-cols-2">
            <MiniCard title={cards.shelf.title} body={cards.shelf.body}>
              <FeatureAnim anim="shelf" labels={labels} />
            </MiniCard>
            <MiniCard title={cards.friendsFirst.title} body={cards.friendsFirst.body}>
              <FeatureAnim anim="friendsFirst" labels={labels} />
            </MiniCard>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="control">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <PillarIntro pillar={pillars.control} seeAll={seeAll} anchor="control" />
          <div className="grid gap-4 sm:grid-cols-2">
            <MiniCard title={cards.searchOnly.title} body={cards.searchOnly.body}>
              <FeatureAnim anim="searchOnly" labels={labels} />
            </MiniCard>
            <MiniCard title={cards.keywords.title} body={cards.keywords.body}>
              <FeatureAnim anim="keywords" labels={labels} />
            </MiniCard>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="measure">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <PillarIntro pillar={pillars.measure} seeAll={seeAll} anchor="measure" />
          <div className="grid gap-4 sm:grid-cols-2">
            <MiniCard title={cards.stats.title} body={cards.stats.body}>
              <FeatureAnim anim="stats" labels={labels} />
            </MiniCard>
            <MiniCard title={cards.limits.title} body={cards.limits.body}>
              <FeatureAnim anim="limits" labels={labels} />
            </MiniCard>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
