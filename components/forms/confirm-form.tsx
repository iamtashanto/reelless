"use client";

import { useLocale, useTranslations } from "next-intl";
import { useActionState } from "react";
import { confirmWaitlist, type ConfirmState } from "@/app/actions/waitlist";
import { Button, ButtonLink } from "@/components/ui/button";

const initial: ConfirmState = { status: "idle" };

/** A button (not an auto-confirm on page load) so link scanners can't confirm for you. */
export function ConfirmForm({ token }: { token: string }) {
  const t = useTranslations("confirm");
  const locale = useLocale();
  const [state, action, pending] = useActionState(confirmWaitlist, initial);

  if (!token || state.status === "invalid") {
    return (
      <div role="status">
        <h2 className="text-h3">{t("invalidTitle")}</h2>
        <p className="mt-2 text-muted">{t("invalidBody")}</p>
        <ButtonLink href="/#waitlist" className="mt-6">
          {t("joinAgain")}
        </ButtonLink>
      </div>
    );
  }

  return (
    <form action={action}>
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="locale" value={locale} />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? t("confirming") : t("button")}
      </Button>
    </form>
  );
}
