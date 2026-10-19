"use server";

import { randomBytes } from "node:crypto";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { routing } from "@/i18n/routing";
import { getDb, hasDatabase } from "@/lib/db";
import { renderEmail, sendEmail } from "@/lib/email";
import { platformIds } from "@/lib/platforms";
import { waitlistLimiter } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { localizedPath } from "@/lib/seo";
import { verifyTurnstile } from "@/lib/turnstile";
import { siteConfig } from "@/site.config";

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "already" }
  | { status: "error"; error: "email" | "rateLimited" | "captcha" | "server" };

const schema = z.object({
  email: z
    .email()
    .max(254)
    .transform((v) => v.trim().toLowerCase()),
  products: z.array(z.enum(["android", "chrome"])).max(2),
  platforms: z.array(z.enum(platformIds as [string, ...string[]])).max(platformIds.length),
  locale: z.enum(routing.locales as unknown as [string, ...string[]]).catch(routing.defaultLocale),
  source: z
    .string()
    .trim()
    .max(60)
    .regex(/^[\w/-]*$/)
    .catch("website"),
});

const newToken = () => randomBytes(32).toString("base64url");

async function sendConfirmation(email: string, locale: string, token: string) {
  const t = await getTranslations({ locale, namespace: "email" });
  const url = `${siteConfig.url}${localizedPath(locale, "/waitlist/confirm")}?token=${token}`;
  const { html, text } = renderEmail({
    heading: t("confirmHeading"),
    paragraphs: [t("confirmBody")],
    button: { label: t("confirmButton"), url },
    footer: t("confirmIgnore"),
    lang: locale,
  });
  return sendEmail({ to: email, subject: t("confirmSubject"), html, text });
}

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Honeypot: bots fill every field. Pretend it worked and store nothing.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", email: String(formData.get("email") ?? "") };
  }

  const ip = await getClientIp();
  const limit = await waitlistLimiter(ip);
  if (!limit.ok) return { status: "error", error: "rateLimited" };

  const parsed = schema.safeParse({
    email: formData.get("email"),
    products: formData.getAll("products"),
    platforms: formData.getAll("platforms"),
    locale: formData.get("locale"),
    source: formData.get("source") ?? "website",
  });
  if (!parsed.success) return { status: "error", error: "email" };

  const captchaOk = await verifyTurnstile(
    (formData.get("cf-turnstile-response") as string | null) ?? null,
    ip,
  );
  if (!captchaOk) return { status: "error", error: "captcha" };

  const { email, products, platforms, locale, source } = parsed.data;

  if (!hasDatabase) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[waitlist:dev] No DATABASE_URL — would store:", {
        email,
        products,
        platforms,
        locale,
        source,
      });
      await sendConfirmation(email, locale, "dev-token");
      return { status: "success", email };
    }
    console.error("[waitlist] DATABASE_URL is not set");
    return { status: "error", error: "server" };
  }

  try {
    const db = getDb();
    const existing = await db.waitlistEntry.findUnique({ where: { email } });
    if (existing) {
      if (!existing.confirmedAt) {
        const token = newToken();
        await db.waitlistEntry.update({
          where: { email },
          data: { confirmToken: token, locale, products },
        });
        await sendConfirmation(email, locale, token);
      }
      return { status: "already" };
    }
    const token = newToken();
    await db.waitlistEntry.create({
      data: { email, products, platforms, locale, source, confirmToken: token },
    });
    await sendConfirmation(email, locale, token);
    return { status: "success", email };
  } catch (err) {
    console.error("[waitlist] failed:", err);
    return { status: "error", error: "server" };
  }
}

export type ConfirmState = { status: "idle" } | { status: "invalid" };

export async function confirmWaitlist(
  _prev: ConfirmState,
  formData: FormData,
): Promise<ConfirmState> {
  const token = String(formData.get("token") ?? "");
  const locale = z
    .enum(routing.locales as unknown as [string, ...string[]])
    .catch(routing.defaultLocale)
    .parse(formData.get("locale"));

  if (!/^[\w-]{20,100}$/.test(token) && token !== "dev-token") return { status: "invalid" };

  if (!hasDatabase) {
    if (process.env.NODE_ENV === "production") return { status: "invalid" };
    redirect(localizedPath(locale, "/waitlist/thanks"));
  }

  let ok = false;
  try {
    const db = getDb();
    const result = await db.waitlistEntry.updateMany({
      where: { confirmToken: token, confirmedAt: null },
      data: { confirmedAt: new Date(), confirmToken: null },
    });
    ok = result.count > 0;
  } catch (err) {
    console.error("[waitlist] confirm failed:", err);
  }
  if (!ok) return { status: "invalid" };
  redirect(localizedPath(locale, "/waitlist/thanks"));
}
