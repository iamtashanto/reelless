"use server";

import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { routing } from "@/i18n/routing";
import { renderEmail, sendEmail } from "@/lib/email";
import { contactLimiter } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { verifyTurnstile } from "@/lib/turnstile";
import { siteConfig } from "@/site.config";

export const UNINSTALL_REASONS = [
  "broken",
  "restrictive",
  "not_working",
  "temporary",
  "alternative",
  "other",
] as const;

export type UninstallReason = (typeof UNINSTALL_REASONS)[number];

export type UninstallState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fields?: Partial<Record<"reason" | "details" | "email", true>>;
      error?: "rateLimited" | "captcha" | "server";
    };

const schema = z.object({
  reason: z.enum(UNINSTALL_REASONS).catch("other"),
  details: z.string().trim().max(5000).optional(),
  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .optional()
    .or(z.literal("")),
  locale: z.enum(routing.locales as unknown as [string, ...string[]]).catch("en"),
});

export async function sendUninstallFeedback(
  _prev: UninstallState,
  formData: FormData,
): Promise<UninstallState> {
  if (String(formData.get("website") ?? "").length > 0) return { status: "success" };

  const ip = await getClientIp();
  if (!(await contactLimiter(ip)).ok) return { status: "error", error: "rateLimited" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", fields: { reason: true } };
  }

  if (
    !(await verifyTurnstile((formData.get("cf-turnstile-response") as string | null) ?? null, ip))
  ) {
    return { status: "error", error: "captcha" };
  }

  const { reason, details, email, locale } = parsed.data;
  const reasonText = reason;

  const paragraphs = [
    `Reason: ${reasonText}`,
    `Email: ${email || "Anonymous"}`,
    `Locale: ${locale}`,
    `IP: ${ip}`,
  ];
  if (details) {
    paragraphs.push("--- Details ---");
    paragraphs.push(...details.split(/\n{2,}/));
  }

  const { html, text } = renderEmail({
    heading: `Uninstall Feedback: ${reasonText}`,
    paragraphs,
  });

  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;
  const result = await sendEmail({
    to,
    subject: `[Reelless Uninstall] Feedback: ${reasonText}`,
    html,
    text,
    replyTo: email || undefined,
  });

  return result.ok ? { status: "success" } : { status: "error", error: "server" };
}

