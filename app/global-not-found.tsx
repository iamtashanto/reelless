import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found — Reelless",
  description: "This page doesn’t exist.",
  robots: { index: false },
};

// Rendered for URLs that match no route at all (outside the /[locale] tree).
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="grid min-h-dvh place-items-center px-4">
        <main className="max-w-lg text-center">
          <p className="font-display text-accent-text text-6xl font-bold">404</p>
          <h1 className="text-h2 mt-4">This page scrolled away</h1>
          <p className="text-muted mt-3">We couldn’t find what you were looking for.</p>
          <Link
            href="/en"
            className="bg-accent text-accent-ink mt-8 inline-flex min-h-11 items-center rounded-full px-6 font-medium"
          >
            Back to Reelless
          </Link>
        </main>
      </body>
    </html>
  );
}
