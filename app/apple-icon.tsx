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
        background: "#090d16",
      }}
    >
      <svg width="136" height="136" viewBox="0 0 128 128">
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="slashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
        <path
          d="M64 12 C92 12 112 24 112 48 C112 86 64 116 64 116 C64 116 16 86 16 48 C16 24 36 12 64 12 Z"
          fill="url(#shieldGrad)"
        />
        <path
          d="M64 18 C88 18 106 28 106 50 C106 82 64 108 64 108 C64 108 22 82 22 50 C22 28 40 18 64 18 Z"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <path d="M52 42 L84 64 L52 86 Z" fill="#ffffff" opacity="0.9" />
        <line
          x1="38"
          y1="90"
          x2="90"
          y2="38"
          stroke="url(#slashGrad)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </div>,
    size,
  );
}
