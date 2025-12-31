import { AboutUsSection } from "@/components/AboutUsSection";
import { BlogSection } from "@/components/Blog";
import { Hero } from "@/components/Hero";
import { ServiceSection } from "@/components/ServiceSection";
import StepToOrder from "@/components/StepToOrder";
import { Testimonial } from "@/components/Testimonial";
import { getAllServices } from "@/lib/strapi/service/service.service";
import type { Service } from "@/lib/strapi/types";

export const revalidate = 60;

type ServiceWithImageUrl = Service & {
  imageUrl: string | null;
};

export default async function Home() {
  const services = await getAllServices();
  const strapiUrl = process.env.STRAPI_URL ?? "";
  const servicesWithFullImage: ServiceWithImageUrl[] = services.map((service) => {
    const thumbnailUrl =
      service.thumbnail?.formats?.small?.url ??
      service.thumbnail?.formats?.medium?.url ??
      service.thumbnail?.url ??
      null;

    return {
      ...service,
      imageUrl: thumbnailUrl ? `${strapiUrl}${thumbnailUrl}` : null,
    };
  });

  return (
    <main>
      <Hero heading="Welcome" description="Explore our features." />
      <ServiceSection services={servicesWithFullImage} />
      <AboutUsSection />
      <StepToOrder variant="clean" />
      <Testimonial variant="clean"  />
      <BlogSection />
    </main>
  );
}
