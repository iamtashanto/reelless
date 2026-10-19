import "server-only";
import { headers } from "next/headers";

/** Client IP as seen through Nginx (X-Real-IP / X-Forwarded-For) or Vercel. */
export async function getClientIp() {
  const h = await headers();
  return (
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("cf-connecting-ip") ??
    "unknown"
  );
}
