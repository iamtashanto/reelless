/**
 * Export the waitlist to CSV.
 *   pnpm waitlist:export                 → all entries to stdout
 *   pnpm waitlist:export --confirmed     → confirmed only
 *   pnpm waitlist:export --out list.csv  → write to a file
 */
import "dotenv/config";
import { writeFileSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const args = process.argv.slice(2);
const confirmedOnly = args.includes("--confirmed");
const outIndex = args.indexOf("--out");
const outFile = outIndex >= 0 ? args[outIndex + 1] : undefined;

const csv = (v: unknown) => {
  const s = v instanceof Date ? v.toISOString() : Array.isArray(v) ? v.join("|") : String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
  try {
    const rows = await prisma.waitlistEntry.findMany({
      where: confirmedOnly ? { confirmedAt: { not: null } } : undefined,
      orderBy: { createdAt: "asc" },
    });
    const header = [
      "email",
      "products",
      "platforms",
      "locale",
      "source",
      "createdAt",
      "confirmedAt",
    ];
    const lines = [
      header.join(","),
      ...rows.map((r) =>
        [r.email, r.products, r.platforms, r.locale, r.source, r.createdAt, r.confirmedAt]
          .map(csv)
          .join(","),
      ),
    ];
    const output = `${lines.join("\n")}\n`;
    if (outFile) {
      writeFileSync(outFile, output);
      console.error(`Wrote ${rows.length} rows to ${outFile}`);
    } else {
      process.stdout.write(output);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
