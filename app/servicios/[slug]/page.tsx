import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "./ServicePage";
import { findSeoService, seoServices } from "@/lib/seo-services";

export function generateStaticParams() { return seoServices.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = findSeoService(slug); if (!service) return {};
  return { title: service.title, description: service.description, alternates: { canonical: `/servicios/${slug}` }, openGraph: { title: service.title, description: service.description, url: `/servicios/${slug}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = findSeoService(slug); if (!service) notFound();
  const faqJson = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map(({q,a}) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson).replace(/</g, "\\u003c") }} /><ServicePage service={service} /></>;
}
