import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "./ServicePage";
import { findSeoService, seoServicesEs } from "@/lib/seo-services";

export function generateStaticParams() { return seoServicesEs.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = findSeoService(slug); if (!service) return {};
  return { title: service.title, description: service.description, alternates: { canonical: `/servicios/${service.slug}`, languages: { "es-US": `/servicios/${service.slug}`, "en-US": `/en/services/${service.alternateSlug}` } }, openGraph: { title: service.title, description: service.description, url: `/servicios/${service.slug}`, locale: "es_US", alternateLocale: "en_US" } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = findSeoService(slug); if (!service) notFound();
  const faqJson = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map(({q,a}) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson).replace(/</g, "\\u003c") }} /><ServicePage service={service} language="es" alternateHref={`/en/services/${service.alternateSlug}`} /></>;
}
