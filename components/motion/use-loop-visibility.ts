"use client";

import { useRef } from "react";
import { useInViewport, usePrefersReducedMotion } from "./hooks";

/** Returns a ref plus whether decorative loops should run (on-screen and motion allowed). */
export function useLoopVisibility<T extends Element = HTMLDivElement>(rootMargin = "0px") {
  const ref = useRef<T>(null);
  const inView = useInViewport(ref, { rootMargin });
  const reduce = usePrefersReducedMotion();
  return { ref, active: inView && !reduce, reduce, inView };
}
