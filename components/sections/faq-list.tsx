import { getTranslations } from "next-intl/server";
import { Accordion } from "@/components/ui/accordion";
import type { FaqGroup } from "@/lib/faq";
import { faqSchema, JsonLd } from "@/lib/schema";

/** FAQ accordion + FAQPage JSON-LD built from message keys. */
export async function FaqList({
  entries,
  withSchema = true,
}: {
  entries: [FaqGroup, string][];
  withSchema?: boolean;
}) {
  const t = await getTranslations("faq");
  const items = entries.map(([group, id]) => ({
    id: `faq-${group}-${id}`,
    q: t(`${group}.${id}.q`),
    a: t(`${group}.${id}.a`),
  }));
  return (
    <>
      <Accordion items={items.map((i) => ({ ...i, a: <p>{i.a}</p> }))} />
      {withSchema ? <JsonLd data={faqSchema(items)} /> : null}
    </>
  );
}
