import {
  BackIcon,
  BreathIcon,
  BrowserIcon,
  CalendarIcon,
  ChartIcon,
  EyeOffIcon,
  FilterIcon,
  FlameIcon,
  FocusIcon,
  GlobeIcon,
  HeartHandIcon,
  HourglassIcon,
  KeyIcon,
  LayersIcon,
  PlayIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
  TimerIcon,
  UsersIcon,
  XIcon,
  type IconProps,
} from "@/components/icons";

export type FeatureGroup = "block" | "control" | "measure" | "later";
export type Plan = "free" | "pro" | "later";
export type FeatureAnim = "shelf" | "friendsFirst" | "searchOnly" | "keywords" | "limits" | "stats";

export type Feature = {
  id: string;
  group: FeatureGroup;
  plan: Plan;
  Icon: (p: IconProps) => React.ReactElement;
  anim?: FeatureAnim;
};

// Plan placement is planned, not final — the Features page says so.
export const features: Feature[] = [
  { id: "autoExit", group: "block", plan: "free", Icon: BackIcon },
  { id: "shelves", group: "block", plan: "free", Icon: EyeOffIcon, anim: "shelf" },
  { id: "tabs", group: "block", plan: "free", Icon: XIcon },
  { id: "oneAndDone", group: "block", plan: "pro", Icon: PlayIcon },
  { id: "anyLanguage", group: "block", plan: "free", Icon: GlobeIcon },
  { id: "browsers", group: "block", plan: "free", Icon: BrowserIcon },
  { id: "searchOnly", group: "control", plan: "pro", Icon: SearchIcon, anim: "searchOnly" },
  { id: "friendsFirst", group: "control", plan: "pro", Icon: UsersIcon, anim: "friendsFirst" },
  { id: "keywords", group: "control", plan: "pro", Icon: FilterIcon, anim: "keywords" },
  { id: "dailyLimits", group: "control", plan: "pro", Icon: TimerIcon },
  { id: "allowance", group: "control", plan: "pro", Icon: HourglassIcon, anim: "limits" },
  { id: "openLimits", group: "control", plan: "pro", Icon: LayersIcon },
  { id: "schedules", group: "control", plan: "pro", Icon: CalendarIcon },
  { id: "pause", group: "control", plan: "free", Icon: BreathIcon },
  { id: "deepFocus", group: "control", plan: "pro", Icon: FocusIcon },
  { id: "strict", group: "control", plan: "pro", Icon: KeyIcon },
  { id: "timePerApp", group: "measure", plan: "free", Icon: ChartIcon, anim: "stats" },
  { id: "shortFormTime", group: "measure", plan: "free", Icon: TimerIcon },
  { id: "reelsCount", group: "measure", plan: "free", Icon: PlayIcon },
  { id: "blocks", group: "measure", plan: "free", Icon: ShieldIcon },
  { id: "heatmap", group: "measure", plan: "pro", Icon: CalendarIcon },
  { id: "weekly", group: "measure", plan: "pro", Icon: FlameIcon },
  { id: "partner", group: "later", plan: "later", Icon: HeartHandIcon },
  { id: "family", group: "later", plan: "later", Icon: UsersIcon },
  { id: "extension", group: "later", plan: "later", Icon: BrowserIcon },
  { id: "smartFilter", group: "later", plan: "later", Icon: SparkIcon },
];

export const featureGroups: FeatureGroup[] = ["block", "control", "measure", "later"];

