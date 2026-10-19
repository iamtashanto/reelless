import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { cacheLife } from "next/cache";

// Content files are bundled via `outputFileTracingIncludes` in next.config.ts.
const ROOT = path.join(process.cwd(), "content");

export type Heading = { id: string; text: string; level: 2 | 3 };
export type FaqItem = { q: string; a: string };

export type GuideMeta = {
  slug: string;
  locale: string;
  /** True when the requested locale had no translation and English is shown instead. */
  fallback: boolean;
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  category: "how-to" | "habits" | "research";
  tags: string[];
  cover?: string;
  readingMinutes: number;
};
export type Guide = GuideMeta & { body: string; headings: Heading[]; related: string[] };

export type PageDoc = {
  slug: string;
  locale: string;
  fallback: boolean;
  title: string;
  description: string;
  h1?: string;
  intro?: string;
  updated?: string;
  platform?: string;
  faq?: FaqItem[];
  related?: string[];
  body: string;
  headings: Heading[];
};

export type ChangelogEntry = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string;
};

async function exists(file: string) {
  try {
    await readFile(/*turbopackIgnore: true*/ file);
    return true;
  } catch {
    return false;
  }
}

/** Resolves `<dir>/<locale>/<slug>.mdx`, falling back to English. */
async function resolveFile(dir: string, slug: string, locale: string) {
  const localized = path.join(ROOT, dir, locale, `${slug}.mdx`);
  if (await exists(localized)) return { file: localized, fallback: false, locale };
  const en = path.join(ROOT, dir, "en", `${slug}.mdx`);
  if (await exists(en)) return { file: en, fallback: locale !== "en", locale: "en" };
  return null;
}

function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inCode = false;
  for (const line of body.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const match = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (match) {
      const text = match[2].replace(/[*_`]/g, "").replace(/\[(.+?)\]\(.+?\)/g, "$1");
      headings.push({ id: slugger.slug(text), text, level: match[1] === "##" ? 2 : 3 });
    }
  }
  return headings;
}

const readingMinutes = (body: string) =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));

const toDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ""));

async function slugsIn(dir: string) {
  try {
    const files = await readdir(/*turbopackIgnore: true*/ path.join(ROOT, dir, "en"));
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getGuide(slug: string, locale: string): Promise<Guide | null> {
  "use cache";
  cacheLife("max");
  const resolved = await resolveFile("guides", slug, locale);
  if (!resolved) return null;
  const { data, content } = matter(await readFile(/*turbopackIgnore: true*/ resolved.file, "utf8"));
  return {
    slug,
    locale: resolved.locale,
    fallback: resolved.fallback,
    title: data.title,
    description: data.description,
    date: toDate(data.date),
    updated: toDate(data.updated ?? data.date),
    author: data.author ?? "TA Shanto",
    category: data.category ?? "how-to",
    tags: data.tags ?? [],
    cover: data.cover,
    readingMinutes: readingMinutes(content),
    related: data.related ?? [],
    body: content,
    headings: extractHeadings(content),
  };
}

export async function listGuides(locale: string): Promise<GuideMeta[]> {
  "use cache";
  cacheLife("max");
  const slugs = await slugsIn("guides");
  const guides = await Promise.all(slugs.map((s) => getGuide(s, locale)));
  return guides
    .filter((g): g is Guide => g !== null)
    .map(({ body: _b, headings: _h, related: _r, ...meta }) => {
      void _b;
      void _h;
      void _r;
      return meta;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function guideSlugs() {
  "use cache";
  cacheLife("max");
  return slugsIn("guides");
}

export async function getPageDoc(slug: string, locale: string): Promise<PageDoc | null> {
  "use cache";
  cacheLife("max");
  const resolved = await resolveFile("pages", slug, locale);
  if (!resolved) return null;
  const { data, content } = matter(await readFile(/*turbopackIgnore: true*/ resolved.file, "utf8"));
  return {
    slug,
    locale: resolved.locale,
    fallback: resolved.fallback,
    title: data.title,
    description: data.description,
    h1: data.h1,
    intro: data.intro,
    updated: data.updated ? toDate(data.updated) : undefined,
    platform: data.platform,
    faq: data.faq,
    related: data.related,
    body: content,
    headings: extractHeadings(content),
  };
}

export async function listChangelog(): Promise<ChangelogEntry[]> {
  "use cache";
  cacheLife("max");
  const dir = path.join(ROOT, "changelog");
  const files = (await readdir(/*turbopackIgnore: true*/ dir)).filter((f) => f.endsWith(".mdx"));
  const entries = await Promise.all(
    files.map(async (f) => {
      const { data, content } = matter(
        await readFile(/*turbopackIgnore: true*/ path.join(dir, f), "utf8"),
      );
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title as string,
        date: toDate(data.date),
        summary: (data.summary as string) ?? "",
        body: content,
      };
    }),
  );
  return entries.sort((a, b) => b.date.localeCompare(a.date));
}
