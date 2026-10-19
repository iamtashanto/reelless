import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { Analytics } from "@/components/layout/analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { MotionProvider } from "@/components/motion/motion-provider";
import { isRtl, localeTags, routing, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.developer.name, url: siteConfig.developer.url }],
    creator: siteConfig.developer.name,
    ...buildMetadata({
      locale,
      path: "/",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    }),
    // Guard: the RTL preview locale must never be indexed.
    ...(locale === "ar" ? { robots: { index: false, follow: false } } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1016" },
  ],
  colorScheme: "light dark",
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations("nav");
  // Only ship the namespaces client components actually use — not the whole site's copy.
  const all = await getMessages();
  const clientMessages = {
    waitlist: all.waitlist,
    contact: all.contact,
    confirm: all.confirm,
    error: all.error,
    platformData: all.platformData,
  };

  return (
    <html
      lang={localeTags[locale as Locale]}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-accent px-5 py-3 font-medium text-accent-ink focus:not-sr-only focus:fixed focus:start-4 focus:top-3"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider messages={clientMessages}>
          <ThemeProvider>
            <MotionProvider>
              <Header />
              <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
                {children}
              </main>
              <Footer />
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <JsonLd data={[organizationSchema(), websiteSchema(locale)]} />
        <Analytics />
      </body>
    </html>
  );
}
