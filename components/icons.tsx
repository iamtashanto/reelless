import type { SVGProps } from "react";

/**
 * Reelless icon set — 24×24 grid, 1.75px stroke, round caps/joins, currentColor.
 * Platform icons are deliberately abstract and never resemble platform logos.
 */
export type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function Base({ title, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.3 7.5 9.5 4.3-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m8.8 12.2 2.2 2.2 4.2-4.6" />
  </Base>
);
export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10.2 8.8v6.4l5-3.2-5-3.2Z" />
  </Base>
);
export const FilmIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M6 7.5h2.5M6 12h2.5M6 16.5h2.5M15.5 7.5H18M15.5 12H18M15.5 16.5H18" />
  </Base>
);
export const GridIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" />
  </Base>
);
export const LoopIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 7h9.5a3.5 3.5 0 0 1 0 7" />
    <path d="m14 4 3 3-3 3" />
    <path d="M17 17H7.5a3.5 3.5 0 0 1 0-7" />
    <path d="m10 20-3-3 3-3" />
  </Base>
);
export const BeamIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 3h6l-1.5 6h-3L9 3Z" />
    <path d="M10.5 9 6 21M13.5 9 18 21" />
    <path d="M8 16h8" />
  </Base>
);
export const HashIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 4 8 20M16 4l-1.5 16M4.5 9h15M4 15h15" />
  </Base>
);
export const ThreadIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="4" width="12" height="8" rx="2.5" />
    <path d="M8.5 15.5v1.5a2 2 0 0 0 2 2h5l3 2v-2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5" />
  </Base>
);
export const BriefcaseIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 13h17" />
  </Base>
);
export const BookmarkIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v15.5L12 16.5l-6.5 4V5A1.5 1.5 0 0 1 7 3.5Z" />
  </Base>
);
export const BrowserIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
    <path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
  </Base>
);
export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </Base>
);
export const UsersIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18.5 14.5A6.5 6.5 0 0 1 21.5 20" />
  </Base>
);
export const FilterIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5h16l-6.2 7.4V19l-3.6-1.8v-4.8L4 5Z" />
  </Base>
);
export const TimerIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 9.5v4l2.5 1.5M9.5 2.5h5M12 2.5V6" />
  </Base>
);
export const HourglassIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.5 3h11M6.5 21h11M7.5 3v3.5L12 12l4.5-5.5V3M7.5 21v-3.5L12 12l4.5 5.5V21" />
  </Base>
);
export const ChartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20h16" />
    <rect x="5.5" y="11" width="3" height="6.5" rx="1" />
    <rect x="10.5" y="6.5" width="3" height="11" rx="1" />
    <rect x="15.5" y="13.5" width="3" height="4" rx="1" />
  </Base>
);
export const CalendarIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Base>
);
export const PauseIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M10 9v6M14 9v6" />
  </Base>
);
export const BreathIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="6.5" opacity=".55" />
    <circle cx="12" cy="12" r="9.5" opacity=".3" />
  </Base>
);
export const FocusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
    <circle cx="12" cy="12" r="3" />
  </Base>
);
export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
  </Base>
);
export const KeyIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 8.5-8.5M16.5 6.5 19 9M14.5 8.5 16 10" />
  </Base>
);
export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5Z" />
  </Base>
);
export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);
export const XIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);
export const MinusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 12h12" />
  </Base>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p} className={`rtl:-scale-x-100 ${p.className ?? ""}`}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
export const ArrowUpRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);
export const ChevronDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);
export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Base>
);
export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </Base>
);
export const MoonIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </Base>
);
export const MonitorIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="12.5" rx="2" />
    <path d="M8.5 20.5h7M12 16.5v4" />
  </Base>
);
export const LayersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
    <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
  </Base>
);
export const EyeOffIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 3.5l17 17M10.6 5.6A9.6 9.6 0 0 1 12 5.5c5 0 8.5 4.5 9.5 6.5-.5 1-1.5 2.4-2.9 3.7M6.6 6.6C4.6 8 3.2 10 2.5 12c1 2 4.5 6.5 9.5 6.5 1.6 0 3-.4 4.3-1.1M9.9 10a3 3 0 0 0 4.1 4.1" />
  </Base>
);
export const FlameIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21a6.5 6.5 0 0 0 6.5-6.5c0-4.5-4-6.5-4.5-10.5-2.5 1.5-4 4-3.5 7-1-.5-2-1.5-2-3-1.5 1.5-3 3.8-3 6.5A6.5 6.5 0 0 0 12 21Z" />
  </Base>
);
export const BellIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15l1.5-2ZM10 21h4" />
  </Base>
);
export const MessageIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V17A2.5 2.5 0 0 1 4 14.5v-8Z" />
  </Base>
);
export const HeartHandIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 8.5c-1-2-4.5-2.2-5.3.3-.6 2 1.3 4 5.3 6.7 4-2.7 5.9-4.7 5.3-6.7-.8-2.5-4.3-2.3-5.3-.3Z" />
    <path d="M3.5 19.5c2-1.5 4-2 6-2h4.5a1.5 1.5 0 0 0 0-3H11" />
  </Base>
);
export const HomeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15V15H9v5.5H5.5A1.5 1.5 0 0 1 4 19v-8.5Z" />
  </Base>
);
export const SparkIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </Base>
);
export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);
export const LinkIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Base>
);
export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M10.5 18.5h3" />
  </Base>
);
export const BatteryIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="7.5" width="16" height="9" rx="2" />
    <path d="M21 10.5v3M6 10.5v3M9 10.5v3" />
  </Base>
);
export const ShareIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="17.5" cy="6" r="2.5" />
    <circle cx="17.5" cy="18" r="2.5" />
    <path d="m8.3 10.8 7-3.6M8.3 13.2l7 3.6" />
  </Base>
);
export const BackIcon = (p: IconProps) => (
  <Base {...p} className={`rtl:-scale-x-100 ${p.className ?? ""}`}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
  </Base>
);

/** Small wordmark glyph used in header/footer — our own shield + stopped-stream mark. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M16 2.5 5 6.8v8.1C5 22 9.8 27.6 16 29.5c6.2-1.9 11-7.5 11-14.6V6.8L16 2.5Z"
        fill="var(--accent)"
      />
      <rect x="11" y="9.5" width="10" height="3" rx="1.5" fill="var(--accent-ink)" opacity=".35" />
      <rect x="11" y="14.5" width="10" height="3" rx="1.5" fill="var(--accent-ink)" />
      <rect x="11" y="19.5" width="10" height="3" rx="1.5" fill="var(--accent-ink)" opacity=".35" />
    </svg>
  );
}
