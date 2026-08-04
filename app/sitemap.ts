import { MetadataRoute } from "next";
import { seoServicesEn, seoServicesEs } from "@/lib/seo-services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.basevisolutions.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...seoServicesEs.map((service) => ({
      url: `${baseUrl}/servicios/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...seoServicesEn.map((service) => ({
      url: `${baseUrl}/en/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
