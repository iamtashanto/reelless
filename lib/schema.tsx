import { siteConfig } from "@/site.config";
import { absolute, localizedPath } from "./seo";

type Json = Record<string, unknown>;

/** Renders JSON-LD safely (escapes `<` so content can't break out of the script tag). */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const founder = {
  "@type": "Person",
  name: siteConfig.developer.name,
  url: siteConfig.developer.url,
};

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absolute("/icon.svg"),
    email: siteConfig.contactEmail,
    founder,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function websiteSchema(locale: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: locale,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absolute(localizedPath(locale, "/guides"))}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** The two Reelless products: the Android app and the Chrome extension. */
export function softwareApplicationSchema(description: string): Json[] {
  // `offers` intentionally omitted until real prices exist.
  const base = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    applicationCategory: "LifestyleApplication",
    description,
    url: siteConfig.url,
    author: founder,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
  return [
    {
      ...base,
      name: `${siteConfig.name} for Android`,
      operatingSystem: "Android 8.0+",
      downloadUrl: siteConfig.playTestingUrl || siteConfig.playStoreUrl,
    },
    {
      ...base,
      name: `${siteConfig.name} for Chrome`,
      applicationSubCategory: "Browser extension",
      operatingSystem: "Windows, macOS, Linux, ChromeOS",
      browserRequirements: "Requires Google Chrome, Brave, or Edge",
      downloadUrl: siteConfig.chromeStoreUrl,
    },
    {
      ...base,
      name: `${siteConfig.name} for Firefox`,
      applicationSubCategory: "Browser extension",
      operatingSystem: "Windows, macOS, Linux",
      browserRequirements: "Requires Mozilla Firefox",
      downloadUrl: siteConfig.firefoxAddonUrl,
    },
  ];
}

export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  locale: string;
  image: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absolute(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: input.locale,
    image: absolute(input.image),
    author: founder,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absolute("/icon.svg") },
    },
  };
}
