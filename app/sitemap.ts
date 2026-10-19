import type { MetadataRoute } from "next";
import { guideSlugs, getGuide } from "@/lib/content";
import { absolute, languageAlternates, localizedPath } from "@/lib/seo";

const STATIC = [
  "/", "/features", "/how-it-works", "/platforms", "/pricing", "/download", "/faq", "/about", "/contact",
  "/changelog", "/guides", "/privacy", "/terms", "/accessibility-disclosure", "/cookies",
  "/block-youtube-shorts", "/block-instagram-reels", "/block-facebook-reels", "/block-tiktok",
  "/block-snapchat-spotlight", "/youtube-without-recommendations", "/facebook-without-suggested-posts",
];
const LOCALES = ["en", "bn"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of STATIC) {
    for (const locale of LOCALES) {
      entries.push({
        url: absolute(localizedPath(locale, path)),
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : path.startsWith("/block") ? 0.8 : 0.6,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }
  for (const slug of await guideSlugs()) {
    const guide = await getGuide(slug, "en");
    // Guides exist in English only for now; bn falls back, so only en is listed.
    entries.push({ url: absolute(localizedPath("en", `/guides/${slug}`)), lastModified: guide?.updated, changeFrequency: "monthly", priority: 0.7 });
  }
  return entries;
}
