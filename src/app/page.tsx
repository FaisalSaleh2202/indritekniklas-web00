import { AboutUsSection } from "@/components/AboutUsSection";
import { Hero } from "@/components/Hero";
import { ServiceSection } from "@/components/ServiceSection";
import StepToOrder from "@/components/StepToOrder";
import { Testimonial } from "@/components/Testimonial";
import { getAllServices } from "@/lib/strapi/service/service.service";

export default async function Home() {
  const services = await getAllServices();
  const servicesWithFullImage = services.map((s: any) => ({
    ...s,
    imageUrl: s.thumbnail?.url
      ? process.env.STRAPI_URL + s.thumbnail.url
      : null,
  }));
  return (
    <>
      <main>
        <div className="">
          <Hero heading="Welcome" description="Explore our features." />
          <ServiceSection services={servicesWithFullImage} />
          <AboutUsSection />
          <StepToOrder />
          <Testimonial />
        </div>
      </main>
    </>
  );
}
