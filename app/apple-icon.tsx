import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0e1016",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 32 32">
        <path
          d="M16 2.5 5 6.8v8.1C5 22 9.8 27.6 16 29.5c6.2-1.9 11-7.5 11-14.6V6.8L16 2.5Z"
          fill="#ff6a4d"
        />
        <rect x="11" y="9.5" width="10" height="3" rx="1.5" fill="#16171c" opacity="0.35" />
        <rect x="11" y="14.5" width="10" height="3" rx="1.5" fill="#16171c" />
        <rect x="11" y="19.5" width="10" height="3" rx="1.5" fill="#16171c" opacity="0.35" />
      </svg>
    </div>,
    size,
  );
}
