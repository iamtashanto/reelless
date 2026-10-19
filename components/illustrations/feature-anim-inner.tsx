"use client";

import { MotionScope } from "@/components/motion/motion-provider";
import type { AnimKey, AnimLabels } from "@/components/sections/feature-anim";
import {
  FriendsFirstAnim,
  KeywordAnim,
  LimitRingAnim,
  SearchOnlyAnim,
  ShelfCoverAnim,
  StatsBarsAnim,
} from "./feature-cards";

/** Loaded on demand by <FeatureAnim>; the only place the motion library is used. */
export default function FeatureAnimInner({ anim, labels }: { anim: AnimKey; labels: AnimLabels }) {
  return (
    <MotionScope>
      {anim === "shelf" ? <ShelfCoverAnim {...labels.shelf} /> : null}
      {anim === "friendsFirst" ? <FriendsFirstAnim {...labels.friendsFirst} /> : null}
      {anim === "searchOnly" ? <SearchOnlyAnim {...labels.searchOnly} /> : null}
      {anim === "keywords" ? <KeywordAnim {...labels.keywords} /> : null}
      {anim === "limits" ? <LimitRingAnim {...labels.limits} /> : null}
      {anim === "stats" ? <StatsBarsAnim {...labels.stats} /> : null}
    </MotionScope>
  );
}
