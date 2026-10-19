"use client";

import { m } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useId } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { CheckIcon, MailIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { FieldError, Honeypot, Input } from "@/components/ui/field";
import { Link } from "@/i18n/navigation";
import { platforms } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import { Turnstile } from "./turnstile";

const initial: WaitlistState = { status: "idle" };

export function WaitlistForm({
  source = "website",
  showPlatforms = true,
  className,
}: {
  source?: string;
  showPlatforms?: boolean;
  className?: string;
}) {
  const t = useTranslations("waitlist");
  const tp = useTranslations("platformData");
  const locale = useLocale();
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-error`;

  if (state.status === "success" || state.status === "already") {
    return (
      <m.div
        role="status"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("rounded-2xl border border-calm/40 bg-calm-soft p-6", className)}
      >
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-calm text-bg">
            {state.status === "success" ? <MailIcon className="size-5" /> : <CheckIcon className="size-5" />}
          </span>
          <div>
            {state.status === "success" ? (
              <>
                <p className="font-display text-lg font-semibold">{t("success.title")}</p>
                <p className="mt-1 text-muted">{t("success.body", { email: state.email })}</p>
              </>
            ) : (
              <p className="text-fg">{t("already")}</p>
            )}
          </div>
        </div>
      </m.div>
    );
  }

  const error = state.status === "error" ? t(`errors.${state.error}`) : undefined;

  return (
    <form action={action} className={cn("relative", className)} noValidate={false}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value={source} />
      <Honeypot label={t("honeypot")} />

      <label htmlFor={emailId} className="mb-2 block text-sm font-medium">
        {t("emailLabel")}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={t("emailPlaceholder")}
          aria-invalid={state.status === "error" && state.error === "email" ? true : undefined}
          aria-describedby={errorId}
          className="sm:flex-1"
        />
        <Magnetic strength={0.15}>
          <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
            {pending ? t("submitting") : t("submit")}
          </Button>
        </Magnetic>
      </div>
      <FieldError id={errorId} message={error} />

      {showPlatforms ? (
        <fieldset className="mt-3">
          <legend className="mb-3 text-sm font-medium">{t("platformsLabel")}</legend>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <label
                key={p.id}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border-strong bg-surface px-3.5 text-sm text-muted transition-colors select-none hover:text-fg has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-fg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
              >
                <input type="checkbox" name="platforms" value={p.id} className="sr-only" />
                <p.Icon className="size-4" />
                {tp(`${p.id}.name`)}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <Turnstile />

      <p className="mt-5 text-xs leading-relaxed text-muted">
        {t.rich("privacyNote", {
          link: (chunks) => (
            <Link href="/privacy" className="underline underline-offset-2 hover:text-fg">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}
