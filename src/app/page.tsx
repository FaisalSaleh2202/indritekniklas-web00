import { AboutUsSection } from "@/components/AboutUsSection";
import Footer from "@/components/Footer";
import { Hero1 } from "@/components/Hero";
import { KeunggulanSection } from "@/components/KeunggulanSection";
import { NavigationMenuDemo } from "@/components/NavigationMenu";
import { ServiceSection } from "@/components/ServiceSection";
import StepToOrder from "@/components/StepToOrder";

export default async function Home() {
  return (
    <>
      <NavigationMenuDemo />
      <main>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl">
          <Hero1
            heading="Welcome"
            description="Explore our features."
            image={{ src: "/hero_img.png", alt: "Hero image" }}
          />
          <AboutUsSection />
          <ServiceSection />
          <KeunggulanSection />
          <StepToOrder />
        </div>

        <Footer />
      </main>
    </>
  );
}
