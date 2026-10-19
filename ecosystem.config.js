// PM2 process file for the standalone Next.js build.
// Usage (on the server, from the release directory):
//   pnpm install --frozen-lockfile && pnpm build && pnpm db:migrate
//   pnpm standalone:prepare
//   pm2 start ecosystem.config.js && pm2 save
module.exports = {
  apps: [
    {
      name: "reelless-website",
      cwd: __dirname,
      script: ".next/standalone/server.js",
      // One instance keeps the in-memory rate limiter accurate. If you scale out, switch the
      // limiter to a shared store (see lib/rate-limit.ts).
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
      // Secrets (DATABASE_URL, RESEND_API_KEY, …) are read from .env in this directory by
      // `node --env-file`. Keep .env out of git.
      node_args: "--env-file=.env",
      max_memory_restart: "512M",
      out_file: "logs/out.log",
      error_file: "logs/error.log",
      time: true,
    },
  ],
};
