"use client";

import {
  FriendsFirstAnim,
  KeywordAnim,
  LimitRingAnim,
  SearchOnlyAnim,
  ShelfCoverAnim,
  StatsBarsAnim,
} from "@/components/illustrations/feature-cards";
import type { FeatureAnim as AnimKey } from "@/lib/features";

export type AnimLabels = {
  shelf: { label: string; hidden: string };
  friendsFirst: { label: string; suggested: string; friend: string };
  searchOnly: { label: string };
  keywords: { label: string; tag: string };
  limits: { label: string; left: string };
  stats: { label: string; example: string; days: string[] };
};

export function FeatureAnim({ anim, labels }: { anim: AnimKey; labels: AnimLabels }) {
  switch (anim) {
    case "shelf":
      return <ShelfCoverAnim {...labels.shelf} />;
    case "friendsFirst":
      return <FriendsFirstAnim {...labels.friendsFirst} />;
    case "searchOnly":
      return <SearchOnlyAnim {...labels.searchOnly} />;
    case "keywords":
      return <KeywordAnim {...labels.keywords} />;
    case "limits":
      return <LimitRingAnim {...labels.limits} />;
    case "stats":
      return <StatsBarsAnim {...labels.stats} />;
  }
}
