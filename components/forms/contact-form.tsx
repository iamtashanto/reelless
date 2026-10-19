"use client";

import { useLocale, useTranslations } from "next-intl";
import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { FieldError, Honeypot, Input, Label, Select, Textarea } from "@/components/ui/field";
import { Toast } from "@/components/ui/toast";
import { ChevronDownIcon } from "@/components/icons";
import { Turnstile } from "./turnstile";

const TOPICS = ["general", "feedback", "press", "partnership", "other"] as const;
const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, action, pending] = useActionState(sendContact, initial);
  const fields = state.status === "error" ? (state.fields ?? {}) : {};
  const formError = state.status === "error" && state.error ? t(`errors.${state.error}`) : null;

  if (state.status === "success") return <Toast message={t("success")} />;

  return (
    <form action={action} className="relative grid gap-1">
      <input type="hidden" name="locale" value={locale} />
      <Honeypot label={t("honeypot")} />
      <div className="grid gap-x-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">{t("name")}</Label>
          <Input id="c-name" name="name" autoComplete="name" required maxLength={100} aria-invalid={fields.name} aria-describedby="c-name-err" />
          <FieldError id="c-name-err" message={fields.name ? t("errors.name") : undefined} />
        </div>
        <div>
          <Label htmlFor="c-email">{t("email")}</Label>
          <Input id="c-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={fields.email} aria-describedby="c-email-err" />
          <FieldError id="c-email-err" message={fields.email ? t("errors.email") : undefined} />
        </div>
      </div>
      <div>
        <Label htmlFor="c-topic">{t("topic")}</Label>
        <div className="relative">
          <Select id="c-topic" name="topic" defaultValue="general">
            {TOPICS.map((k) => (
              <option key={k} value={k}>{t(`topics.${k}`)}</option>
            ))}
          </Select>
          <ChevronDownIcon className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="c-message">{t("message")}</Label>
        <Textarea id="c-message" name="message" required minLength={10} maxLength={5000} aria-invalid={fields.message} aria-describedby="c-message-err" />
        <FieldError id="c-message-err" message={fields.message ? t("errors.message") : undefined} />
      </div>
      <Turnstile />
      <div className="mt-2">
        <Button type="submit" size="lg" disabled={pending}>{pending ? t("submitting") : t("submit")}</Button>
      </div>
      <Toast message={formError} tone="error" />
    </form>
  );
}
