export const UNINSTALL_REASONS = [
  "broken",
  "restrictive",
  "not_working",
  "temporary",
  "alternative",
  "other",
] as const;

export type UninstallReason = (typeof UNINSTALL_REASONS)[number];
