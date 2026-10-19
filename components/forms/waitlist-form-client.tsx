"use client";

import { useActionState, useId } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { CheckIcon, MailIcon, MonitorIcon, PhoneIcon } from "@/components/icons";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { FieldError, Honeypot, Input } from "@/components/ui/field";
import { platforms } from "@/lib/platforms";
import { cn } from "@/lib/utils";
import { Turnstile } from "./turnstile";

const initial: WaitlistState = { status: "idle" };

const chip =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border-strong bg-surface px-3.5 text-sm text-muted transition-colors select-none hover:text-fg has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-fg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";

export type WaitlistLabels = {
  emailLabel: string;
  emailPlaceholder: string;
  submit: string;
  submitting: string;
  honeypot: string;
  productsLabel: string;
  products: Record<"android" | "chrome", string>;
  platformsLabel: string;
  platformNames: Record<string, string>;
  errors: Record<"email" | "rateLimited" | "captcha" | "server", string>;
  successTitle: string;
  /** Contains an `{email}` placeholder. */
  successBody: string;
  already: string;
};

/**
 * Client half of the waitlist form. Copy arrives pre-translated from the server
 * (components/forms/waitlist-form.tsx), so no message formatter ships to the browser.
 */
export function WaitlistFormClient({
  labels: t,
  privacyNote,
  locale,
  source = "website",
  showPlatforms = true,
  className,
}: {
  labels: WaitlistLabels;
  privacyNote: React.ReactNode;
  locale: string;
  source?: string;
  showPlatforms?: boolean;
  className?: string;
}) {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const id = useId();
  const emailId = `${id}-email`;
  const errorId = `${id}-error`;

  if (state.status === "success" || state.status === "already") {
    return (
      <div
        role="status"
        className={cn("fade-up border-calm/40 bg-calm-soft rounded-2xl border p-6", className)}
      >
        <div className="flex items-start gap-4">
          <span className="bg-calm text-bg grid size-11 shrink-0 place-items-center rounded-full">
            {state.status === "success" ? (
              <MailIcon className="size-5" />
            ) : (
              <CheckIcon className="size-5" />
            )}
          </span>
          <div>
            {state.status === "success" ? (
              <>
                <p className="font-display text-lg font-semibold">{t.successTitle}</p>
                <p className="text-muted mt-1">{t.successBody.replace("{email}", state.email)}</p>
              </>
            ) : (
              <p className="text-fg">{t.already}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const error = state.status === "error" ? t.errors[state.error] : undefined;

  return (
    <form action={action} className={cn("relative", className)} noValidate={false}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value={source} />
      <Honeypot label={t.honeypot} />

      <label htmlFor={emailId} className="mb-2 block text-sm font-medium">
        {t.emailLabel}
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
          placeholder={t.emailPlaceholder}
          aria-invalid={state.status === "error" && state.error === "email" ? true : undefined}
          aria-describedby={errorId}
          className="sm:flex-1"
        />
        <Magnetic strength={0.15}>
          <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
            {pending ? t.submitting : t.submit}
          </Button>
        </Magnetic>
      </div>
      <FieldError id={errorId} message={error} />

      <fieldset className="mt-1">
        <legend className="mb-3 text-sm font-medium">{t.productsLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {(["android", "chrome"] as const).map((product) => (
            <label key={product} className={chip}>
              <input
                type="checkbox"
                name="products"
                value={product}
                defaultChecked
                className="sr-only"
              />
              {product === "android" ? (
                <PhoneIcon className="size-4" />
              ) : (
                <MonitorIcon className="size-4" />
              )}
              {t.products[product]}
            </label>
          ))}
        </div>
      </fieldset>

      {showPlatforms ? (
        <fieldset className="mt-5">
          <legend className="mb-3 text-sm font-medium">{t.platformsLabel}</legend>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <label key={p.id} className={chip}>
                <input type="checkbox" name="platforms" value={p.id} className="sr-only" />
                <p.Icon className="size-4" />
                {t.platformNames[p.id]}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <Turnstile />

      <p className="text-muted mt-5 text-xs leading-relaxed">{privacyNote}</p>
    </form>
  );
}
