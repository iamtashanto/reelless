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

## Remaining
- [ ] global-not-found (experimental.globalNotFound) for paths outside /[locale]
- [ ] scripts/export-waitlist.ts (CSV)
- [ ] 9. messages/bn.json translations (currently `{}` → falls back to English); RTL pseudo-locale check (NEXT_PUBLIC_ENABLE_RTL_PREVIEW=true)
- [ ] 10. Lint pass, Playwright smoke tests, Lighthouse CI config + measurements, 360px/1440px + light-mode visual QA
- [ ] 11. ecosystem.config.js, Nginx example, docs/DEPLOY.md, README, .env.example
