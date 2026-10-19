"use client";

import { useEffect, useState } from "react";

/** Counts from 0 to `to` with an ease-out curve once `play` is true. Instant when `reduce`. */
export function useCountUp(to: number, play: boolean, reduce: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!play || reduce) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, play, reduce, duration]);
  return reduce ? to : value;
}
