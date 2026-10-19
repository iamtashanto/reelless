import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reelless",
    short_name: "Reelless",
    description: "Keep the apps. Lose the scroll.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1016",
    theme_color: "#ff6a4d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
