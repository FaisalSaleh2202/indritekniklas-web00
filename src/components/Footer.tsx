import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ButtonFooterGroup from "./ButtonFooterGroup";

export default function Footer() {
  return (
    <>
      <footer className="px-4 sm:px-6 py-6 mt-6 bg-[#171717] text-white">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-8">
          {/* Kolom kiri */}
          <div className="lg:col-span-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <span className="text-lg font-semibold">INDRI TEKNIK LAS</span>
                <div className="my-3">
                  <ButtonFooterGroup />
                </div>
              </div>

              <div className="grid gap-3">
                <h2 className="font-semibold">Layanan</h2>
                <ul className="grid gap-2">
                  <li>Pagar</li>
                  <li>Kanopi</li>
                  <li>Tangga</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Kolom kanan */}
          <div className="lg:col-span-4">
            <h3 className="text-lg">FREQUENTLY ASKED QUESTION (F.A.Q)</h3>
            <Accordion className="bg-[#171717]" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </footer>
    </>
  );
}
