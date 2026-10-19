import { LandingPage, landingMetadata } from "@/components/templates/landing-page";

const SLUG = "youtube-without-recommendations";

export const generateMetadata = () => landingMetadata(SLUG);

export default function Page() {
  return <LandingPage slug={SLUG} />;
}
