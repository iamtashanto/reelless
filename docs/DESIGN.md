# Reelless — Design System

Concept: **"Calm after the scroll."** Every visual moves from chaotic, noisy, endless
vertical motion to calm, spacious, intentional. Noise lives in illustrations only; the
interface itself is always calm.

## Palette

All colors are CSS variables in `app/globals.css` (`:root` = light, `.dark` = dark) and are
mapped to Tailwind via `@theme inline`. Never hard-code hex values in components.

| Token           | Light       | Dark        | Use                                      |
| --------------- | ----------- | ----------- | ---------------------------------------- |
| `--bg`          | `#F6F3EC`   | `#0E1016`   | Page background (warm paper / ink)       |
| `--bg-elev`     | `#EFEBE2`   | `#13161E`   | Alternate section bands                  |
| `--surface`     | `#FFFFFF`   | `#181B25`   | Cards                                    |
| `--surface-2`   | `#F1EDE5`   | `#20242F`   | Nested surfaces, inputs                  |
| `--border`      | `#16171C1A` | `#FFFFFF14` | 1px hairlines                            |
| `--fg`          | `#16171C`   | `#ECEAE4`   | Body text                                |
| `--muted`       | `#55585F`   | `#A4A6B0`   | Secondary text (≥ 4.5:1 on bg + surface) |
| `--accent`      | `#FF6A4D`   | `#FF6A4D`   | Signal coral — fills, shield, focus      |
| `--accent-ink`  | `#16171C`   | `#0E1016`   | Text on coral fills (≈ 6.5:1)            |
| `--accent-text` | `#B8381C`   | `#FF8A70`   | Coral used _as text_ (≥ 4.5:1)           |
| `--calm`        | `#3E8C78`   | `#7FC8B4`   | Sage/teal secondary — "calm" states      |
| `--calm-text`   | `#2C6B5B`   | `#8FD3C0`   | Sage used as text                        |

### Why signal coral?

- It reads as a **stop signal** without the panic of pure red — friendly, not alarming,
  which matches the non-judgmental copy.
- It is clearly distinct from the brand colors of the platforms we mention (YouTube red,
  Facebook blue, TikTok cyan/magenta, Snapchat yellow), which keeps us safely away from any
  implied affiliation.
- Ink-on-coral reaches ~6.5:1 contrast in both themes, so the primary button is identical in
  light and dark mode — one recognizable CTA everywhere.
- The sage secondary is its emotional opposite: coral = interruption, sage = calm. The
  illustrations use exactly that pairing (shield sweeps in coral, the calm screen settles
  in sage).

Coral is never used for body text on light backgrounds — `--accent-text` exists for that.

## Typography

- **Display:** Bricolage Grotesque (static 600 + 700 cuts, ~22 KB each). Tight tracking
  (`-0.035em` at hero size), weight 700 for headings, 600 for small display text. It has personality without being a novelty.
- **Text:** Instrument Sans — compact, highly legible at small sizes on low-DPI Android
  screens.
- **Bengali:** Hind Siliguri, appended to both stacks. Loaded with `preload: false` and the
  `bengali` subset only, so English pages never download it (unicode-range).
- Fluid scale (`clamp()`), defined as Tailwind theme sizes:
  `display` 2.6→4.75rem, `h1` 2.25→3.5rem, `h2` 1.85→2.75rem, `h3` 1.25→1.5rem,
  body 1rem / 1.65, `lead` 1.125→1.3rem.
- Numbers in stats use `tabular-nums`.

## Layout

- 12-column grid, `max-width: 1200px` container with `px-4 sm:px-6` gutters.
- Sections: `py-20 md:py-28`. Cards: `rounded-2xl`, 1px `--border`, `--surface`.
- Hero has a very light SVG noise texture (`.grain`, 4% opacity) and a coral/sage glow.
- Mobile first. Everything verified at 360px; tap targets ≥ 44px (`min-h-11`).
- Use logical properties only (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `text-start`) so
  RTL locales work without overrides.

## Motion

- **CSS first.** The hero loop, privacy particles, settings toggle and stats dashboard are CSS
  keyframes/transitions; the stepper line and the "endless vs intentional" split use CSS
  scroll-driven animations (`animation-timeline: view()`), falling back to their finished state
  where unsupported. None of this needs an animation library, which keeps first-load JS small.
- **`motion/react` only where it earns its place:** the feature micro-animations
  (`components/illustrations/feature-cards.tsx`). They are lazy-loaded with `next/dynamic` +
  IntersectionObserver when a card nears the viewport, behind same-size placeholders (no CLS),
  and wrapped in `MotionScope` (LazyMotion + `domAnimation`).
- Durations 200–600 ms; default ease `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-out-soft`).
- Scroll reveals run **once**.
- Decorative loops pause when off-screen (`data-paused`, set from IntersectionObserver) and never
  run when the user prefers reduced motion — every animation has a meaningful static frame.
- Nothing animates the LCP element (the hero H1 and intro render immediately, no fade).
- Magnetic buttons and the hero spotlight are mouse-only.

## Iconography

One custom set in `components/icons.tsx`: 24×24 grid, 1.75px stroke, round caps and joins,
`currentColor`. Platform cards use our own abstract shapes — never platform logos,
brand colors or UI.

## Voice

Friendly, direct, non-judgmental. Short sentences. No hype words. Every section answers
"what's in it for me".
