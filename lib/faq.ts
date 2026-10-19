export const faqGroups = {
  general: ["what", "available", "whyNotDelete", "adblock", "control"],
  privacy: ["dataCollected", "accessibility", "messages", "account"],
  platforms: ["which", "beta", "updates", "languages"],
  pricing: ["free", "lifetime", "cancel"],
  technical: ["battery", "android", "stops", "vpn", "turnOff"],
  iphone: ["ios", "screenTime"],
} as const;

export type FaqGroup = keyof typeof faqGroups;

/** The eight questions shown on the home page. */
export const homeFaq: [FaqGroup, string][] = [
  ["general", "what"],
  ["general", "whyNotDelete"],
  ["privacy", "dataCollected"],
  ["privacy", "accessibility"],
  ["platforms", "which"],
  ["general", "adblock"],
  ["iphone", "ios"],
  ["pricing", "free"],
];
