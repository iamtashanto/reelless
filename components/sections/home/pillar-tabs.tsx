"use client";

import { CheckIcon, ArrowRightIcon } from "@/components/icons";
import {
  FriendsFirstAnim,
  KeywordAnim,
  LimitRingAnim,
  SearchOnlyAnim,
  ShelfCoverAnim,
  StatsBarsAnim,
} from "@/components/illustrations/feature-cards";
import { Link } from "@/i18n/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Pillar = { tab: string; title: string; body: string; points: string[] };
type CardText = { title: string; body: string; label: string };

function MiniCard({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-card">
      {children}
      <h4 className="mt-4 font-sans text-base font-semibold tracking-normal">{title}</h4>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}

function PillarIntro({ pillar, seeAll, anchor }: { pillar: Pillar; seeAll: string; anchor: string }) {
  return (
    <div>
      <h3 className="text-h3">{pillar.title}</h3>
      <p className="mt-3 text-muted">{pillar.body}</p>
      <ul className="mt-6 space-y-3">
        {pillar.points.map((p) => (
          <li key={p} className="flex gap-3">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-calm-soft text-calm-text">
              <CheckIcon className="size-3.5" strokeWidth={2.5} />
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <Link href={`/features#${anchor}`} className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium text-accent-text hover:underline">
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
              <ShelfCoverAnim label={cards.shelf.label} hidden={cards.shelf.hidden} />
            </MiniCard>
            <MiniCard title={cards.friendsFirst.title} body={cards.friendsFirst.body}>
              <FriendsFirstAnim label={cards.friendsFirst.label} suggested={cards.friendsFirst.suggested} friend={cards.friendsFirst.friend} />
            </MiniCard>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="control">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <PillarIntro pillar={pillars.control} seeAll={seeAll} anchor="control" />
          <div className="grid gap-4 sm:grid-cols-2">
            <MiniCard title={cards.searchOnly.title} body={cards.searchOnly.body}>
              <SearchOnlyAnim label={cards.searchOnly.label} />
            </MiniCard>
            <MiniCard title={cards.keywords.title} body={cards.keywords.body}>
              <KeywordAnim label={cards.keywords.label} tag={cards.keywords.tag} />
            </MiniCard>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="measure">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <PillarIntro pillar={pillars.measure} seeAll={seeAll} anchor="measure" />
          <div className="grid gap-4 sm:grid-cols-2">
            <MiniCard title={cards.stats.title} body={cards.stats.body}>
              <StatsBarsAnim label={cards.stats.label} example={cards.stats.example} days={cards.stats.days} />
            </MiniCard>
            <MiniCard title={cards.limits.title} body={cards.limits.body}>
              <LimitRingAnim label={cards.limits.label} left={cards.limits.left} />
            </MiniCard>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
