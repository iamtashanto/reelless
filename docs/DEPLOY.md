# Deploying reelless.app

The site is a Next.js 16 app built with `output: "standalone"`. It runs on the Hetzner VPS
under PM2, behind Nginx. It also deploys to Vercel with no code changes.

## 1. One-time server setup (Ubuntu/Debian)

```bash
# Node 24 + pnpm
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs nginx postgresql
sudo npm i -g pm2 pnpm

# Optional Brotli for Nginx
sudo apt-get install -y libnginx-mod-http-brotli-filter libnginx-mod-http-brotli-static

# Database
sudo -u postgres createuser reelless --pwprompt
sudo -u postgres createdb reelless -O reelless
```

## 2. Environment

Copy `.env.example` to `.env` in the app directory and fill it in. In production you must set:

| Variable                       | Why                                                                                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Canonical URLs, sitemap, OG images and email links. **Build-time** — rebuild after changing it.                                                                |
| `DATABASE_URL`                 | The waitlist. Without it, sign-ups fail in production.                                                                                                         |
| `RESEND_API_KEY`, `EMAIL_FROM` | Double opt-in and contact emails. Without them, sign-ups are stored but nobody gets a confirmation email. `EMAIL_FROM` must be on a domain verified in Resend. |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | Shown on the site; contact-form recipient unless `CONTACT_TO_EMAIL` is set.                                                                                    |

Optional: Turnstile keys, analytics (Umami/Plausible), store flags (`NEXT_PUBLIC_PLAY_STORE_LIVE`,
`NEXT_PUBLIC_CHROME_STORE_LIVE` + URLs), `NEXT_PUBLIC_SHOW_WAITLIST_COUNT`. All `NEXT_PUBLIC_*`
values are baked in at build time.

## 3. Build and start

```bash
git clone https://github.com/iamtashanto/reelless.git reelless-website && cd reelless-website
pnpm install --frozen-lockfile
pnpm build                 # runs prisma generate + next build
pnpm db:migrate            # prisma migrate deploy
pnpm standalone:prepare    # copies public/, .next/static and OG fonts into the standalone folder
pm2 start ecosystem.config.js
pm2 save && pm2 startup    # restart on reboot
```

The app listens on `127.0.0.1:3000`.

## 4. Nginx

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/reelless.app
sudo ln -s /etc/nginx/sites-available/reelless.app /etc/nginx/sites-enabled/
sudo certbot --nginx -d reelless.app -d www.reelless.app
sudo nginx -t && sudo systemctl reload nginx
```

The example config handles gzip/Brotli, caches `/_next/static` for a year (immutable), and
forwards `X-Real-IP` for the rate limiter. Security headers (CSP, frame-ancestors, etc.) come
from `next.config.ts`, so Nginx doesn't need to add them.

## 5. Updating

```bash
git pull
pnpm install --frozen-lockfile
pnpm build && pnpm db:migrate && pnpm standalone:prepare
pm2 reload reelless-website
```

## 6. Operations

- **Logs:** `pm2 logs reelless-website` (also `logs/out.log`, `logs/error.log`).
- **Waitlist export:** `pnpm waitlist:export --confirmed --out waitlist.csv`.
- **Rate limiting** is in memory, so keep `instances: 1`. To run several instances, implement
  `RateLimitStore` on Redis/Upstash (see `lib/rate-limit.ts`).
- **Backups:** `pg_dump reelless > backup.sql` via a daily cron job.

## Vercel

Import the repository, set the same environment variables, and deploy. The build command
(`pnpm build`) and output are detected automatically. Use a hosted Postgres database (Neon,
Supabase, …) for `DATABASE_URL`, and run `pnpm db:migrate` once against it.

## Quality checks before a release

```bash
pnpm lint && pnpm typecheck && pnpm format:check
pnpm build && pnpm test      # Playwright smoke tests (needs a local reelless_test database)
pnpm lhci                    # Lighthouse CI against the production build
```
