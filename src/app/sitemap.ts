import { getAllServiceLocations } from "@/lib/strapi/service-location/service-location.service";
import { getAllServices } from "@/lib/strapi/service/service.service";
import type { Service, ServiceLocation } from "@/lib/strapi/types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bengkellasindriteknik.com";

  // === STATIC ROUTES ===
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
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
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
     {
      url: `${baseUrl}/favicon.ico`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // === SERVICE ROUTES ===
  const services = await getAllServices();

  const serviceRoutes: MetadataRoute.Sitemap =
    services?.map((service: Service) => ({
      url: `${baseUrl}/jasa-las/${service.slug}`,
      lastModified: service.updatedAt
        ? new Date(service.updatedAt)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) ?? [];


  const serviceLocation = await getAllServiceLocations(); 

  const servicesLocationRoutes: MetadataRoute.Sitemap =
    serviceLocation?.map((service: ServiceLocation) => ({
      url: `${baseUrl}/blog/${service.slug}`,
      lastModified: service.updatedAt
        ? new Date(service.updatedAt)
        : new Date(),
    })) ?? [];

  const serviceLocationServiceRoutes: MetadataRoute.Sitemap =
    (serviceLocation ?? []).flatMap((location: ServiceLocation) =>
      (services ?? []).map((service: Service) => {
        const latestUpdate = Math.max(
          new Date(location.updatedAt ?? location.createdAt).getTime(),
          new Date(service.updatedAt ?? service.createdAt).getTime()
        );

        return {
          url: `${baseUrl}/blog/${location.slug}/${service.slug}`,
          lastModified: new Date(latestUpdate),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      })
    );

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...servicesLocationRoutes,
    ...serviceLocationServiceRoutes,
  ];
}
