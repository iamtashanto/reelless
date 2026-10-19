export const mainNav = [
  { href: "/features", key: "features" },
  { href: "/how-it-works", key: "howItWorks" },
  { href: "/platforms", key: "platforms" },
  { href: "/pricing", key: "pricing" },
  { href: "/guides", key: "guides" },
  { href: "/faq", key: "faq" },
] as const;

export type NavKey = (typeof mainNav)[number]["key"];

/** Where every "Join early access" CTA points. The home page hosts the main form. */
export const waitlistHref = "/#waitlist";
