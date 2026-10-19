"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("error");
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="container-page flex min-h-[60vh] max-w-2xl flex-col justify-center py-20">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h1 className="text-h1">{t("title")}</h1>
      <p className="mt-4 text-lead text-muted">{t("body")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => reset()}>{t("retry")}</Button>
        <ButtonLink href="/" variant="secondary">Reelless</ButtonLink>
      </div>
    </section>
  );
}
