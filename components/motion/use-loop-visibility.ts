"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/** Returns a ref plus whether decorative loops should run (on-screen and motion allowed). */
export function useLoopVisibility<T extends Element = HTMLDivElement>(margin = "0px") {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: margin as `${number}px` });
  const reduce = useReducedMotion();
  return { ref, active: inView && !reduce, reduce: !!reduce, inView };
}
