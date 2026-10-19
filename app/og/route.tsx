import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

const fonts = Promise.all([
  readFile(path.join(process.cwd(), "assets/og/bricolage-grotesque-latin-700-normal.woff")),
  readFile(path.join(process.cwd(), "assets/og/hind-siliguri-bengali-700-normal.woff")),
]);

/** Dynamic OG image: /og?title=…&eyebrow=… (brand type + shield motif). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Keep the apps. Lose the scroll.").slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? "Reelless").slice(0, 40);
  const [display, bengali] = await fonts;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0e1016",
        color: "#eceae4",
        fontFamily: "Bricolage, Hind",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="56" height="56" viewBox="0 0 32 32">
          <path
            d="M16 2.5 5 6.8v8.1C5 22 9.8 27.6 16 29.5c6.2-1.9 11-7.5 11-14.6V6.8L16 2.5Z"
            fill="#ff6a4d"
          />
          <rect x="11" y="14.5" width="10" height="3" rx="1.5" fill="#0e1016" />
        </svg>
        <span style={{ fontSize: 34, color: "#ff8a70" }}>{eyebrow}</span>
      </div>
      <div
        style={{
          fontSize: title.length > 60 ? 64 : 80,
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#a4a6b0" }}
      >
        <span>Keep the apps. Lose the scroll.</span>
        <span style={{ color: "#7fc8b4" }}>On-device · No ads</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Bricolage", data: display, weight: 700 },
        { name: "Hind", data: bengali, weight: 700 },
      ],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
