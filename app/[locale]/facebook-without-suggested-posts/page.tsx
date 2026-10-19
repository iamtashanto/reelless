import { LandingPage, landingMetadata } from "@/components/templates/landing-page";

const SLUG = "facebook-without-suggested-posts";

export const generateMetadata = () => landingMetadata(SLUG);

export default function Page() {
  return <LandingPage slug={SLUG} />;
}
