import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const originOf = (url: string | undefined) => {
  if (!url) return "";
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
};

const analyticsOrigin =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true"
    ? originOf(process.env.NEXT_PUBLIC_ANALYTICS_SRC)
    : "";
const turnstile = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? "https://challenges.cloudflare.com" : "";
const isDev = process.env.NODE_ENV !== "production";

// Pages are statically prerendered, so we can't use per-request nonces without making every
// page dynamic. 'unsafe-inline' is limited to inline scripts/styles from our own documents;
// external script hosts are allow-listed explicitly.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${analyticsOrigin} ${turnstile}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${analyticsOrigin} ${turnstile}${isDev ? " ws:" : ""}`,
  `frame-src ${turnstile || "'none'"}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
]
  .map((d) => d.replace(/\s+/g, " ").trim())
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  // Every route is fully prerendered per locale, so full-page prefetching already gives
  // instant navigations; partial (shell-only) prefetching would add a params round-trip.
  partialPrefetching: false,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx"],
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
