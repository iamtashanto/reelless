import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { flattenMessages } from "@/lib/messages";
import { Suspense } from "react";
import { MailIcon } from "@/components/icons";
import { ConfirmForm } from "@/components/forms/confirm-form";
import { Eyebrow } from "@/components/ui/section";
import { pageMetadata } from "@/lib/page";

export const generateMetadata = () =>
  pageMetadata("waitlistConfirm", "/waitlist/confirm", { noIndex: true });

async function TokenForm({
  searchParams,
}: {
  searchParams: PageProps<"/[locale]/waitlist/confirm">["searchParams"];
}) {
  const { token } = await searchParams;
  return (
    <ConfirmForm
      token={typeof token === "string" ? token : ""}
      locale={await getLocale()}
      labels={flattenMessages((await getMessages()).confirm)}
    />
  );
}

export default async function ConfirmPage(props: PageProps<"/[locale]/waitlist/confirm">) {
  const t = await getTranslations("confirm");
  return (
    <section className="grain relative">
      <div className="container-page flex min-h-[60vh] max-w-2xl flex-col justify-center py-20">
        <span className="bg-accent-soft text-accent-text mb-6 grid size-14 place-items-center rounded-2xl">
          <MailIcon className="size-7" />
        </span>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="text-h1">{t("title")}</h1>
        <p className="text-lead text-muted mt-4 mb-8">{t("body")}</p>
        <Suspense fallback={<div className="h-12" />}>
          <TokenForm searchParams={props.searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
