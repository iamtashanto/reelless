import "server-only";
import { cacheLife } from "next/cache";
import { getDb, hasDatabase } from "@/lib/db";
import { siteConfig } from "@/site.config";

/** Confirmed sign-ups, or null when hidden (flag off, no DB, or below the threshold). */
export async function getWaitlistCount(): Promise<number | null> {
  "use cache";
  cacheLife("minutes");
  if (!siteConfig.flags.SHOW_WAITLIST_COUNT || !hasDatabase) return null;
  try {
    const count = await getDb().waitlistEntry.count({ where: { confirmedAt: { not: null } } });
    return count >= siteConfig.waitlistCountThreshold ? count : null;
  } catch {
    return null;
  }
}
