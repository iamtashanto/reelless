"use server";

import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { routing } from "@/i18n/routing";
import { renderEmail, sendEmail } from "@/lib/email";
import { contactLimiter } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { verifyTurnstile } from "@/lib/turnstile";
import { siteConfig } from "@/site.config";

export type ContactField = "name" | "email" | "message";
export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; fields?: Partial<Record<ContactField, true>>; error?: "rateLimited" | "captcha" | "server" };

const TOPICS = ["general", "feedback", "press", "partnership", "other"] as const;

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  topic: z.enum(TOPICS).catch("general"),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(routing.locales as unknown as [string, ...string[]]).catch("en"),
});

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (String(formData.get("website") ?? "").length > 0) return { status: "success" };

  const ip = await getClientIp();
  if (!(await contactLimiter(ip)).ok) return { status: "error", error: "rateLimited" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fields: Partial<Record<ContactField, true>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "message") fields[key] = true;
    }
    return { status: "error", fields };
  }

  if (!(await verifyTurnstile((formData.get("cf-turnstile-response") as string | null) ?? null, ip))) {
    return { status: "error", error: "captcha" };
  }

  const { name, email, topic, message, locale } = parsed.data;
  const t = await getTranslations({ locale, namespace: "email" });
  const tc = await getTranslations({ locale: "en", namespace: "contact.topics" });
  const { html, text } = renderEmail({
    heading: `${tc(topic)} — ${name}`,
    paragraphs: [`From: ${name} <${email}>`, `Locale: ${locale}`, ...message.split(/\n{2,}/)],
  });
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;
  const result = await sendEmail({
    to,
    subject: t("contactSubject", { topic: tc(topic) }),
    html,
    text,
    replyTo: email,
  });
  return result.ok ? { status: "success" } : { status: "error", error: "server" };
}
