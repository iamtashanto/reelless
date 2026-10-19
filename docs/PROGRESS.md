# Build progress

Status as of 2026-10-19 — `pnpm build` passes (97 static pages).

## Done

- [x] 1. Scaffold: Next 16 (Cache Components), Tailwind 4 tokens, next-intl (locale via next/root-params), next-themes, self-hosted fonts, site.config, header/footer + dev credit, docs/DESIGN.md
- [x] 2. Design system (Button, Badge, Card, Section, Accordion, Tabs, Sheet, Input, Toast) + custom icon set
- [x] 3. Home sections 1–12 with all 7 signature animations (reduced-motion: MotionGlobalConfig.skipAnimations + static frames)
- [x] 4. Waitlist: Prisma 7 schema + migration, Server Action, Zod, honeypot, rate limit, Turnstile (optional), Resend double opt-in, confirm/thanks pages
- [x] 5. Features, How it works, Platforms, 7 SEO landing pages, Pricing, Download, FAQ (23 Q&As), About (TODO story), Contact
- [x] 6. Legal drafts: privacy, terms, accessibility-disclosure, cookies (marked for lawyer review)
- [x] 7. Guides MDX pipeline + 6 articles, changelog
- [~] 8. SEO: metadata/canonical/hreflang, /og image route, sitemap, robots, manifest, icon, JSON-LD — done. Missing: apple-icon PNG.

## Product scope (2026-10-19)

- Reelless = **Android app + Chrome extension** only (both in development). No iPhone/Safari version.
- Site copy, Download page (two cards + flags PLAY_STORE_LIVE / CHROME_STORE_LIVE), Platforms, How it works (Chrome section), FAQ, Features (Chrome extension item), privacy/terms, JSON-LD (two SoftwareApplication entries) and changelog updated.
- Waitlist stores `products` (android/chrome) — migration `waitlist_products`.

## Since then (2026-10-19)

- [x] global-not-found, apple-icon, `.env.example`, `scripts/export-waitlist.ts`
- [x] 9. Bengali (`messages/bn.json`, machine-assisted — review); RTL checked via `ar` preview (`NEXT_PUBLIC_ENABLE_RTL_PREVIEW=true`)
- [x] 10. Lint/types/Prettier clean; Playwright: 55 passing (desktop + mobile); Lighthouse config
- [x] 11. `ecosystem.config.js`, `deploy/nginx.conf.example`, `scripts/prepare-standalone.sh`, `docs/DEPLOY.md`, README
- [x] Performance pass: Radix removed (native `<dialog>`, own tabs), no client i18n formatter, CSS-first animations, static display-font cuts. First-load JS ~250 KB → ~190 KB.

## Lighthouse (mobile, local production build, single runs)

| Page                                    | Perf  | A11y | Best practices | SEO |
| --------------------------------------- | ----- | ---- | -------------- | --- |
| /en                                     | 91    | 100  | 100            | 100 |
| /en/features                            | 93–95 | 100  | 100            | 100 |
| /en/block-youtube-shorts                | 93–94 | 100  | 100            | 100 |
| /en/guides/stop-watching-youtube-shorts | 93–98 | 100  | 100            | 100 |

CLS 0 everywhere, TBT ≤ 40 ms. Simulated LCP 2.4–3.5 s (observed LCP ≈ 75 ms locally); the
remaining gap to the ≥ 95 / LCP < 2 s budget is mostly React + Next runtime (~115 KB) under
Lighthouse's throttling model. Re-measure on the real server (HTTP/2 + Brotli).

## Remaining

- [ ] Review: legal drafts, `bn.json`, About story, contact email
- [ ] Re-run `pnpm lhci` against the deployed site
