"use client";

import { useRef } from "react";

/**
 * Subtle magnetic pull toward the pointer (mouse only). Plain transforms + a CSS transition —
 * no animation library, so it can live in the header on every page for free.
 */
export function Magnetic({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className="ease-out-soft inline-flex transition-transform duration-300 motion-reduce:transform-none"
      onPointerMove={(e) => {
        const el = ref.current;
        if (e.pointerType !== "mouse" || !el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </span>
  );
}
