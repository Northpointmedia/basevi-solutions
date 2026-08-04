import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/app/servicios/[slug]/ServicePage";
import { findSeoService, seoServicesEn } from "@/lib/seo-services";

export function generateStaticParams() {
  return seoServicesEn.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = findSeoService(slug, "en");
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `/en/services/${service.slug}`,
      languages: {
        "es-US": `/servicios/${service.alternateSlug}`,
        "en-US": `/en/services/${service.slug}`,
      },
    },
    openGraph: { title: service.title, description: service.description, url: `/en/services/${service.slug}`, locale: "en_US", alternateLocale: "es_US" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = findSeoService(slug, "en");
  if (!service) notFound();
  const faqJson = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson).replace(/</g, "\\u003c") }} /><ServicePage service={service} language="en" alternateHref={`/servicios/${service.alternateSlug}`} /></>;
}
