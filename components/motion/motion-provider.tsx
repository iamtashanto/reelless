"use client";

import { LazyMotion, MotionConfig, MotionGlobalConfig } from "motion/react";
import { useEffect } from "react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Wraps a motion-powered illustration. Only lazily-loaded illustrations import this, so the
 * animation library never ships in a page's initial JavaScript.
 * With reduced motion, every animation (height, opacity, count-ups …) jumps to its end state.
 */
export function MotionScope({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      MotionGlobalConfig.skipAnimations = mq.matches;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
