import Script from "next/script";
import { siteConfig } from "@/site.config";

/** Cookieless, self-hostable analytics (Umami by default). Off unless enabled via env. */
export function Analytics() {
  const { ANALYTICS_ENABLED } = siteConfig.flags;
  const { scriptSrc, websiteId } = siteConfig.analytics;
  if (!ANALYTICS_ENABLED || !scriptSrc || !websiteId) return null;
  return (
    <Script
      src={scriptSrc}
      data-website-id={websiteId}
      data-do-not-track="true"
      strategy="afterInteractive"
    />
  );
}
