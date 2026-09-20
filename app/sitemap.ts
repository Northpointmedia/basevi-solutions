import { MetadataRoute } from "next";
import { seoServicesEn, seoServicesEs } from "@/lib/seo-services";
import { myRootsArticles } from "@/lib/my-roots";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.basevisolutions.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/my-roots`,
      lastModified: new Date("2026-09-19"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...myRootsArticles.map((article) => ({
      url: `${baseUrl}/my-roots/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
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
