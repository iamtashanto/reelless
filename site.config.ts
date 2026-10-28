const flag = (value: string | undefined) => value === "true" || value === "1";

export const siteConfig = {
  name: "Reelless",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://reelless.tashanto.com").replace(/\/$/, ""),
  tagline: "Keep the apps. Lose the scroll.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@tashanto.com",
  developer: {
    name: "TA Shanto",
    url: "https://tashanto.com",
  },
  // Placeholders — fill in when the accounts exist. Empty strings are hidden.
  social: {
    x: process.env.NEXT_PUBLIC_SOCIAL_X ?? "",
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB ?? "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? "",
  },
  playStoreUrl:
    process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
    "https://play.google.com/store/apps/details?id=com.tashanto.reelless",
  playTestingUrl:
    process.env.NEXT_PUBLIC_PLAY_TESTING_URL ??
    "https://play.google.com/apps/internaltest/4699428505534656309",
  androidApkUrl:
    process.env.NEXT_PUBLIC_ANDROID_APK_URL ?? "/Reelless-v1.1.1.apk",
  chromeStoreUrl:
    process.env.NEXT_PUBLIC_CHROME_STORE_URL ??
    "https://chromewebstore.google.com/detail/eliabhnmbmgadeccebahllnbghhlpbob?utm_source=item-share-cb",
  firefoxAddonUrl:
    process.env.NEXT_PUBLIC_FIREFOX_ADDON_URL ??
    "https://addons.mozilla.org/en-GB/firefox/addon/reeless-block-shorts-reels/",
  testflightUrl:
    process.env.NEXT_PUBLIC_TESTFLIGHT_URL ?? "https://testflight.apple.com/join/reelless",
  whatsappUrl: "https://wa.me/8801614081441",
  whatsappNumber: "+8801614081441",
  telegramUrl: "https://t.me/iamtashanto",
  telegramUsername: "@iamtashanto",
  flags: {
    PLAY_STORE_LIVE: flag(process.env.NEXT_PUBLIC_PLAY_STORE_LIVE),
    PLAY_TESTING_LIVE: process.env.NEXT_PUBLIC_PLAY_TESTING_LIVE ? flag(process.env.NEXT_PUBLIC_PLAY_TESTING_LIVE) : true,
    CHROME_STORE_LIVE: process.env.NEXT_PUBLIC_CHROME_STORE_LIVE ? flag(process.env.NEXT_PUBLIC_CHROME_STORE_LIVE) : true,
    FIREFOX_ADDON_LIVE: process.env.NEXT_PUBLIC_FIREFOX_ADDON_LIVE ? flag(process.env.NEXT_PUBLIC_FIREFOX_ADDON_LIVE) : true,
    SHOW_WAITLIST_COUNT: flag(process.env.NEXT_PUBLIC_SHOW_WAITLIST_COUNT),
    ANALYTICS_ENABLED: flag(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED),
  },
  analytics: {
    // Umami (self-hostable, cookieless). Plausible works the same way — swap the src.
    scriptSrc: process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? "",
    websiteId: process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID ?? "",
  },
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
  /** Minimum real sign-ups before the waitlist counter is shown. */
  waitlistCountThreshold: 100,
} as const;

export type SiteConfig = typeof siteConfig;
