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
      <footer className="bg-[#171717] text-white h-40 p-5">
        <div className="grid lg:grid-cols-8 gap-4">
          <div className="col-span-4">
            <div className="grid grid-cols-2">
              <div>
                <span>Indri Teknik Las</span>
                <div className="my-3">
                  <ButtonFooterGroup />
                </div>
              </div>
              <div className="grid gap-3">
                <h2>Layanan</h2>
                <ul className="grid gap-3">
                  <li>Pagar</li>
                  <li>Kanopi</li>
                  <li>Tangga</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <h3>FREQUENTLY ASKED QUESTION (F.A.Q)</h3>
            <Accordion type="single" collapsible>
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
