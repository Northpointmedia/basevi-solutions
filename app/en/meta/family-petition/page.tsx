import type { Metadata } from "next";
import ServicePage from "@/app/servicios/[slug]/ServicePage";
import { findSeoService } from "@/lib/seo-services";

export const metadata: Metadata = {
  title: "Family petition document preparation",
  description: "Learn about our family-petition document-preparation service and contact us directly on WhatsApp.",
  alternates: { canonical: "/en/meta/family-petition", languages: { "es-US": "/meta/peticion-familiar", "en-US": "/en/meta/family-petition" } },
  robots: { index: false, follow: true },
};

export default function MetaFamilyPetitionPage() {
  const service = findSeoService("family-petition-i-130", "en")!;
  return <ServicePage service={service} language="en" campaign="meta_family_petition_en" alternateHref="/meta/peticion-familiar" />;
}
