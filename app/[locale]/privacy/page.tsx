import { LegalPage, legalMetadata } from "@/components/templates/legal-page";

export const generateMetadata = () => legalMetadata("privacy", "privacy");

export default function Page() {
  return <LegalPage slug="privacy" />;
}
