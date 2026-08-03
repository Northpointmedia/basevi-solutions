import { MetadataRoute } from "next";
import { seoServices } from "@/lib/seo-services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://basevisolutions.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...seoServices.map((service) => ({
      url: `${baseUrl}/servicios/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
