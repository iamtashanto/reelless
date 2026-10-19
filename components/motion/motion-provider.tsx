"use client";

import { LazyMotion, MotionConfig, MotionGlobalConfig } from "motion/react";
import { useEffect } from "react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Loads motion's DOM animation features lazily and honors the OS reduced-motion setting.
 * With reduced motion every animation (including height/opacity/count-ups, which
 * `reducedMotion="user"` alone would still play) jumps straight to its end state.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
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
