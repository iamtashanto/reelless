import { notFound } from "next/navigation";

// Unknown paths inside a locale (e.g. /en/nope) render the localized not-found page.
export default function CatchAll() {
  notFound();
}
