import { LegalPage, legalMetadata } from "@/components/templates/legal-page";

export const generateMetadata = () => legalMetadata("terms", "terms");

export default function Page() {
  return <LegalPage slug="terms" />;
}
