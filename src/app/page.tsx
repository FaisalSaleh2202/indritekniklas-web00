("");
import { AboutUsSection } from "@/components/AboutUsSection";
import Footer from "@/components/Footer";
import { Hero1 } from "@/components/Hero";
import { NavigationMenuDemo } from "@/components/NavigationMenu";
import { ServiceSection } from "@/components/ServiceSection";
import StepToOrder from "@/components/StepToOrder";
import { Testimonial } from "@/components/Testimonial";

export default async function Home() {
  return (
    <>
      <NavigationMenuDemo />
      <main>
        <div className="">
          <Hero1
            heading="Welcome"
            description="Explore our features."
            image={{ src: "/hero_img.png", alt: "Hero image" }}
          />
          <ServiceSection />
          <AboutUsSection />
          {/* <KeunggulanSection /> */}
          <StepToOrder />
          <Testimonial />
        </div>

        <Footer />
      </main>
    </>
  );
}
