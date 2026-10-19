"use client";

import Script from "next/script";
import { siteConfig } from "@/site.config";

/** Cloudflare Turnstile widget — rendered only when a site key is configured. */
export function Turnstile() {
  if (!siteConfig.turnstileSiteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      <div className="cf-turnstile mt-4" data-sitekey={siteConfig.turnstileSiteKey} data-theme="auto" />
    </>
  );
}
