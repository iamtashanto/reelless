# reelless.app — marketing website

The marketing site for **Reelless**, an Android app and Chrome extension that block Reels,
Shorts and endless feeds while the rest of each app keeps working.

Built with Next.js 16 (App Router, Cache Components, TypeScript), Tailwind CSS 4,
`motion` for animation, next-intl (English + Bengali), MDX content, and Prisma + PostgreSQL
for the waitlist.

## Run locally

```bash
pnpm install
cp .env.example .env            # set DATABASE_URL at least
createdb reelless_dev           # or any Postgres database
pnpm db:migrate:dev
pnpm dev                        # http://localhost:3000 → redirects to /en
```

Without `RESEND_API_KEY`, confirmation emails are printed to the terminal, so you can open the
confirm link yourself.

## Scripts

| Script                                         | What it does                                                                                        |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `pnpm dev`                                     | Dev server                                                                                          |
| `pnpm build`                                   | Prisma client + production build                                                                    |
| `pnpm lint` / `pnpm typecheck` / `pnpm format` | Code quality                                                                                        |
| `pnpm test`                                    | Playwright smoke tests against the production build (`createdb reelless_test` and migrate it first) |
| `pnpm lhci`                                    | Lighthouse CI with the budgets in `lighthouserc.json`                                               |
| `pnpm waitlist:export`                         | Waitlist → CSV (`--confirmed`, `--out file.csv`)                                                    |
| `pnpm standalone:prepare`                      | Prepares `.next/standalone` for PM2                                                                 |

## Where things live

```
app/[locale]/          Pages (en, bn). SEO landing pages are top-level folders.
app/og/                Dynamic Open Graph images (/og?title=…)
components/            ui/, sections/, illustrations/ (animated SVG), motion/, forms/, layout/
content/               MDX: guides/en, pages/en (landing + legal), changelog
messages/              All UI copy — en.json, bn.json (machine-assisted, needs review)
lib/                   seo, schema (JSON-LD), content loader, email, rate limit, db
prisma/                Waitlist schema + migrations
docs/                  DESIGN.md, DEPLOY.md, PROGRESS.md
```

- **Copy** lives in `messages/*.json`; long-form pages in `content/`. Internal links in MDX are
  written without a locale (`/features`) and prefixed automatically.
- **Adding a language:** add the code to `i18n/routing.ts`, create `messages/<code>.json`
  (missing keys fall back to English) and a label in `localeLabels`. To check RTL layout, run
  with `NEXT_PUBLIC_ENABLE_RTL_PREVIEW=true` and open `/ar`.
- **Store links:** set `NEXT_PUBLIC_PLAY_STORE_LIVE` / `NEXT_PUBLIC_CHROME_STORE_LIVE` when the
  listings are live. Add the official `public/google-play-badge.png` before enabling Play.

## Before launch, review

- `content/pages/en/privacy.mdx`, `terms.mdx`, `accessibility-disclosure.mdx`, `cookies.mdx`
  (lawyer review; add address and jurisdiction)
- `messages/bn.json` (machine-assisted Bengali)
- The About page story (`about.storyP1/2` in messages)
- `NEXT_PUBLIC_CONTACT_EMAIL` (default `hello@reelless.app` is a placeholder)

Deployment: see [docs/DEPLOY.md](docs/DEPLOY.md). Design system: [docs/DESIGN.md](docs/DESIGN.md).

Designed & developed by [TA Shanto](https://tashanto.com).
