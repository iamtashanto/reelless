import { LegalPage, legalMetadata } from "@/components/templates/legal-page";

export const generateMetadata = () => legalMetadata("accessibility-disclosure", "accessibility");

export default function Page() {
  return <LegalPage slug="accessibility-disclosure" />;
}
