import { AboutUsSection } from "@/components/AboutUsSection";
import { Hero1 } from "@/components/Hero";
import { ServiceSection } from "@/components/ServiceSection";
import StepToOrder from "@/components/StepToOrder";
import { Testimonial } from "@/components/Testimonial";

export default async function Home() {
  return (
    <>
      <main>
        <div className="">
          <Hero1 heading="Welcome" description="Explore our features." />
          <ServiceSection />
          <AboutUsSection />
          <StepToOrder />
          <Testimonial />
        </div>
      </main>
    </>
  );
}
