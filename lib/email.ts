import "server-only";
import { Resend } from "resend";

type Email = { to: string; subject: string; html: string; text: string; replyTo?: string };

const from = process.env.EMAIL_FROM ?? "Reelless <hello@reelless.app>";

/**
 * Sends email through Resend. Without RESEND_API_KEY the email is logged to the console
 * (development) so the whole flow can be tested locally.
 */
export async function sendEmail(email: Email): Promise<{ ok: boolean }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`\n[email:dev] To: ${email.to}\nSubject: ${email.subject}\n\n${email.text}\n`);
      return { ok: true };
    }
    console.error("[email] RESEND_API_KEY is not set — email not sent:", email.subject);
    return { ok: false };
  }
  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      replyTo: email.replyTo,
    });
    if (error) {
      console.error("[email] Resend error:", error.message);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { ok: false };
  }
}

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/** Minimal, inline-styled transactional template (renders in every mail client). */
export function renderEmail({
  heading,
  paragraphs,
  button,
  footer,
  lang = "en",
}: {
  heading: string;
  paragraphs: string[];
  button?: { label: string; url: string };
  footer?: string;
  lang?: string;
}) {
  const html = `<!doctype html><html lang="${lang}"><body style="margin:0;background:#f6f3ec;font-family:-apple-system,Segoe UI,Roboto,'Hind Siliguri',sans-serif;color:#16171c">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">
<table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:20px;border:1px solid #e6e1d6" cellpadding="0" cellspacing="0"><tr><td style="padding:36px 32px">
<p style="margin:0 0 24px;font-weight:700;font-size:18px"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#ff6a4d;margin-right:8px"></span>Reelless</p>
<h1 style="margin:0 0 16px;font-size:24px;line-height:1.25">${escape(heading)}</h1>
${paragraphs.map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#3b3d44">${escape(p)}</p>`).join("")}
${button ? `<p style="margin:28px 0"><a href="${escape(button.url)}" style="display:inline-block;background:#ff6a4d;color:#16171c;text-decoration:none;font-weight:600;padding:14px 26px;border-radius:999px">${escape(button.label)}</a></p><p style="margin:0 0 16px;font-size:13px;color:#55585f;word-break:break-all">${escape(button.url)}</p>` : ""}
${footer ? `<p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#55585f">${escape(footer)}</p>` : ""}
</td></tr></table></td></tr></table></body></html>`;
  const text = [
    heading,
    "",
    ...paragraphs,
    ...(button ? ["", `${button.label}: ${button.url}`] : []),
    ...(footer ? ["", footer] : []),
  ].join("\n");
  return { html, text };
}

export { escape as escapeHtml };
