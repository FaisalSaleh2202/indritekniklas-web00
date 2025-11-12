("");
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
        <div className="mx-auto px-4 sm:px-6 py-6 max-w-7xl">
          <Hero1
            heading="Welcome"
            description="Explore our features."
            image={{ src: "/hero_img.png", alt: "Hero image" }}
          />
          <ServiceSection />
          <AboutUsSection />
          <KeunggulanSection />
          <StepToOrder />
        </div>

        <Footer />
      </main>
    </>
  );
}
