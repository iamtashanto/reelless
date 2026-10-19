/** Flattens a message namespace ({ errors: { name: "…" } } → { "errors.name": "…" }) so a
 * client component can look up pre-translated strings without the next-intl formatter. */
export function flattenMessages(obj: unknown, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "string") out[path] = value;
      else Object.assign(out, flattenMessages(value, path));
    }
  }
  return out;
}
