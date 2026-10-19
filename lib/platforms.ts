import {
  BeamIcon,
  BookmarkIcon,
  BriefcaseIcon,
  FilmIcon,
  GridIcon,
  HashIcon,
  LoopIcon,
  PlayIcon,
  ThreadIcon,
  type IconProps,
} from "@/components/icons";

export type PlatformId =
  | "youtube"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "snapchat"
  | "x"
  | "reddit"
  | "linkedin"
  | "pinterest";

export type Platform = {
  id: PlatformId;
  beta: boolean;
  Icon: (p: IconProps) => React.ReactElement;
  /** SEO landing page for this platform, if one exists. */
  landing?: string;
};

// Neutral, abstract icons only — never platform logos, colors or UI.
export const platforms: Platform[] = [
  { id: "youtube", beta: false, Icon: PlayIcon, landing: "/block-youtube-shorts" },
  { id: "facebook", beta: false, Icon: FilmIcon, landing: "/block-facebook-reels" },
  { id: "instagram", beta: false, Icon: GridIcon, landing: "/block-instagram-reels" },
  { id: "tiktok", beta: false, Icon: LoopIcon, landing: "/block-tiktok" },
  { id: "snapchat", beta: false, Icon: BeamIcon, landing: "/block-snapchat-spotlight" },
  { id: "x", beta: true, Icon: HashIcon },
  { id: "reddit", beta: true, Icon: ThreadIcon },
  { id: "linkedin", beta: true, Icon: BriefcaseIcon },
  { id: "pinterest", beta: true, Icon: BookmarkIcon },
];

export const platformIds = platforms.map((p) => p.id);
