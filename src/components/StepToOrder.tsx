"use client";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { motion } from "framer-motion";
import { Check, LoaderCircleIcon } from "lucide-react";

const steps = [
  { title: "Pastikan Kebutuhan Anda", description: "Desc for Step 3" },
  { title: "Konsultasi Kepada Kami", description: "Desc for Step 3" },
  { title: "Negosiasi Dan Transfer DP", description: "Desc for Step 3" },
  { title: "Pengerjaan Dan Pelunasan", description: "Desc for Step 3" },
];

export default function StepToOrder() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        className="px-4 bg-white sm:px-6 py-6 z-40"
      >
        <div className="grid gap-6">
          <h2 className="text-3xl font-light text-[#171717] text-center">
            Proses Pemesanan
          </h2>
          <div className="flex items-center justify-center">
            <Stepper
              className="flex flex-col items-center justify-center gap-10"
              defaultValue={2}
              orientation="vertical"
              indicators={{
                completed: <Check className="size-4" />,
                loading: <LoaderCircleIcon className="size-4 animate-spin" />,
              }}
            >
              <StepperNav>
                {steps.map((step, index) => (
                  <StepperItem
                    key={index}
                    step={index + 1}
                    loading={index === 2}
                    className="relative items-start not-last:flex-1"
                  >
                    <StepperTrigger className="items-start pb-12 last:pb-0 gap-2.5">
                      <StepperIndicator className="data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-500">
                        {index + 1}
                      </StepperIndicator>
                      <div className="mt-0.5 text-left">
                        <StepperTitle className="text-lg">
                          {step.title}
                        </StepperTitle>
                      </div>
                    </StepperTrigger>
                    {index < steps.length - 1 && (
                      <StepperSeparator className="absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)] group-data-[state=completed]/step:bg-green-500" />
                    )}
                  </StepperItem>
                ))}
              </StepperNav>
              {/* <StepperPanel className="text-sm w-56 text-center">
                {steps.map((step, index) => (
                  <StepperContent key={index} value={index + 1}>
                    Step {step.title} content
                  </StepperContent>
                ))}
              </StepperPanel> */}
            </Stepper>
          </div>
        </div>
      </motion.section>
    </>
  );
}
