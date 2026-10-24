"use client";

import { useActionState, useState } from "react";
import {
  sendUninstallFeedback,
  type UninstallState,
} from "@/app/actions/uninstall-feedback";
import { UNINSTALL_REASONS, type UninstallReason } from "@/lib/uninstall-reasons";
import { Button } from "@/components/ui/button";
import { FieldError, Honeypot, Input, Label, Textarea } from "@/components/ui/field";
import { Toast } from "@/components/ui/toast";
import { Turnstile } from "./turnstile";
import Link from "next/link";

const initial: UninstallState = { status: "idle" };

export function UninstallFeedbackForm({
  labels,
  locale,
}: {
  labels: Record<string, string>;
  locale: string;
}) {
  const t = (key: string) => labels[key] ?? key;
  const [selectedReason, setSelectedReason] = useState<UninstallReason>("broken");
  const [state, action, pending] = useActionState(sendUninstallFeedback, initial);
  const fields = state.status === "error" ? (state.fields ?? {}) : {};
  const formError = state.status === "error" && state.error ? t(`errors.${state.error}`) : null;

  if (state.status === "success") {
    return (
      <div className="space-y-6 text-center py-6">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-text text-2xl font-bold">
          ✓
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{t("successTitle")}</h3>
          <p className="text-muted max-w-md mx-auto text-sm leading-relaxed">
            {t("successMessage")}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-xl bg-surface px-5 py-2.5 text-sm font-semibold border border-border-strong hover:bg-surface-elevated transition-colors"
          >
            {t("backHome")}
          </Link>
          <Link
            href={`/${locale}/download`}
            className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg hover:opacity-95 transition-opacity"
          >
            {t("reinstallCta")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="relative grid gap-5">
      <input type="hidden" name="locale" value={locale} />
      <Honeypot label={t("honeypot")} />

      <div>
        <label className="mb-3 block text-sm font-semibold text-fg">{t("reasonTitle")}</label>
        <div className="grid gap-2 sm:grid-cols-2">
          {UNINSTALL_REASONS.map((key) => {
            const isChecked = selectedReason === key;
            return (
              <label
                key={key}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors ${
                  isChecked
                    ? "border-accent bg-accent/5 font-medium text-fg shadow-xs"
                    : "border-border-strong bg-surface hover:bg-surface-elevated text-muted"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={key}
                  checked={isChecked}
                  onChange={() => setSelectedReason(key)}
                  className="mt-0.5 size-4 accent-accent"
                />
                <span className="text-sm leading-snug">{t(`reasons.${key}`)}</span>
              </label>
            );
          })}
        </div>
        <FieldError id="c-reason-err" message={fields.reason ? t("errors.reason") : undefined} />
      </div>

      <div>
        <Label htmlFor="u-details">{t("detailsLabel")}</Label>
        <Textarea
          id="u-details"
          name="details"
          placeholder={t("detailsPlaceholder")}
          maxLength={5000}
        />
      </div>

      <div>
        <Label htmlFor="u-email">{t("emailLabel")}</Label>
        <Input
          id="u-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          maxLength={254}
        />
        <p className="text-muted mt-1.5 text-xs">{t("emailHint")}</p>
      </div>

      <Turnstile />

      <div className="pt-2">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? t("submitting") : t("submit")}
        </Button>
      </div>

      <Toast message={formError} tone="error" />
    </form>
  );
}

