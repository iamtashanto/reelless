export const mainNav = [
  { href: "/features", key: "features" },
  { href: "/how-it-works", key: "howItWorks" },
  { href: "/platforms", key: "platforms" },
  { href: "/pricing", key: "pricing" },
  { href: "/guides", key: "guides" },
  { href: "/faq", key: "faq" },
] as const;

export type NavKey = (typeof mainNav)[number]["key"];

/** Where primary download / early access CTAs point. */
export const waitlistHref = "/download";
