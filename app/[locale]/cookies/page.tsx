import { LegalPage, legalMetadata } from "@/components/templates/legal-page";

export const generateMetadata = () => legalMetadata("cookies", "cookies");

export default function Page() {
  return <LegalPage slug="cookies" />;
}
