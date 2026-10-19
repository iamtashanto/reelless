"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInViewport } from "@/components/motion/hooks";

export type AnimKey = "shelf" | "friendsFirst" | "searchOnly" | "keywords" | "limits" | "stats";

export type AnimLabels = {
  shelf: { label: string; hidden: string };
  friendsFirst: { label: string; suggested: string; friend: string };
  searchOnly: { label: string };
  keywords: { label: string; tag: string };
  limits: { label: string; left: string };
  stats: { label: string; example: string; days: string[] };
};

const Inner = dynamic(() => import("@/components/illustrations/feature-anim-inner"), {
  ssr: false,
});

/**
 * Feature micro-animation, lazy-loaded: a same-size placeholder renders first, and the
 * animation (plus the motion library) is fetched only when the card nears the viewport.
 */
export function FeatureAnim({ anim, labels }: { anim: AnimKey; labels: AnimLabels }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInViewport(ref, { once: true, rootMargin: "300px" });
  return (
    <div ref={ref} className="relative h-44">
      {near ? (
        <Inner anim={anim} labels={labels} />
      ) : (
        <div
          role="img"
          aria-label={labels[anim].label}
          className="border-border bg-bg h-44 rounded-xl border"
        />
      )}
    </div>
  );
}
