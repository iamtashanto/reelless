"use client";

import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Copy comes from the JSON the layout embeds (#error-copy) — no i18n runtime on the client.
  const [copy] = useState<Record<string, string>>(() => {
    try {
      if (typeof document === "undefined") return {};
      return JSON.parse(document.getElementById("error-copy")?.textContent ?? "{}");
    } catch {
      return {};
    }
  });
  const t = (key: string) => copy[key] ?? "";
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="container-page flex min-h-[60vh] max-w-2xl flex-col justify-center py-20">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h1 className="text-h1">{t("title")}</h1>
      <p className="text-lead text-muted mt-4">{t("body")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => reset()}>{t("retry")}</Button>
        <ButtonLink href="/" variant="secondary">
          Reelless
        </ButtonLink>
      </div>
    </section>
  );
}
