import { getAllServices } from "@/lib/strapi/service/service.service";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://localhost:3000";

  // === STATIC ROUTES ===
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kontak-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // === SERVICE ROUTES ===
  const services = await getAllServices();

  const serviceRoutes: MetadataRoute.Sitemap =
    services?.map((service: any) => ({
      url: `${baseUrl}/jasa-las/${service.slug}`,
      lastModified: service.updatedAt
        ? new Date(service.updatedAt)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) ?? [];

  return [...staticRoutes, ...serviceRoutes];
}
