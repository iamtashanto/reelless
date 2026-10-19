import localFont from "next/font/local";

// Self-hosted (see app/fonts/README.md). next/font generates size-adjusted fallbacks,
// so swapping in the web font causes no layout shift.
// Static 600/700 cuts (~22 KB each) instead of the 129 KB variable font — headings only use
// these weights, and the smaller files keep mobile LCP low.
export const display = localFont({
  src: [
    { path: "../app/fonts/bricolage-grotesque-latin-600-normal.woff2", weight: "600" },
    { path: "../app/fonts/bricolage-grotesque-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const text = localFont({
  src: "../app/fonts/instrument-sans-latin-wght.woff2",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Bengali glyphs only; not preloaded so English pages never download it — the browser
// fetches it only when Bengali characters are on the page (unicode-range).
export const bengali = localFont({
  src: [
    { path: "../app/fonts/hind-siliguri-bengali-400-normal.woff2", weight: "400" },
    { path: "../app/fonts/hind-siliguri-bengali-500-normal.woff2", weight: "500" },
    { path: "../app/fonts/hind-siliguri-bengali-600-normal.woff2", weight: "600" },
    { path: "../app/fonts/hind-siliguri-bengali-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-hind",
  display: "swap",
  preload: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0-1CF9, U+200C-200D, U+20B9, U+25CC, U+A8F1",
    },
  ],
});

export const fontVariables = `${display.variable} ${text.variable} ${bengali.variable}`;
