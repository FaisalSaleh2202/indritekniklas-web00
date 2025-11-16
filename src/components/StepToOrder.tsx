"use client";

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { motion } from "framer-motion";
import { Check, LoaderCircleIcon } from "lucide-react";

const steps = [
  {
    title: "Pastikan Kebutuhan Anda",
    description:
      "Tentukan jenis layanan las yang Anda butuhkan seperti kanopi, pagar, atau tralis.",
  },
  {
    title: "Konsultasi Kepada Kami",
    description:
      "Diskusikan spesifikasi, desain, ukuran, serta estimasi biaya secara langsung.",
  },
  {
    title: "Negosiasi Dan Transfer DP",
    description:
      "Setelah kesepakatan, lakukan pembayaran DP untuk memulai pengerjaan.",
  },
  {
    title: "Pengerjaan Dan Pelunasan",
    description: "Proses pengerjaan dimulai hingga selesai sesuai kesepakatan.",
  },
];

export default function StepToOrder() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="px-4 sm:px-6 py-6 bg-gray-50"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="max-w-4xl mx-auto text-center my-auto">
          <h2 className="text-center text-2xl md:text-3xl font-light text-[#171717] mb-3">
            Proses Pemesanan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ikuti langkah-langkah berikut untuk memesan layanan kami dengan
            mudah dan cepat.
          </p>
        </div>

        {/* Timeline Elegant */}
        <div className="flex justify-center">
          <Stepper
            className="flex flex-col items-start gap-14"
            defaultValue={1}
            orientation="vertical"
            indicators={{
              completed: <Check className="size-4" />,
              loading: <LoaderCircleIcon className="size-4 animate-spin" />,
            }}
          >
            <StepperNav className="relative mx-auto">
              {/* Garis Utama Timeline */}
              <div className="absolute top-0 left-3 h-full w-1 bg-gradient-to-b from-[#F7C77F] to-[#D67A00] opacity-40 rounded-full"></div>

              {steps.map((step, index) => (
                <StepperItem key={index} step={index + 1} className="relative">
                  <StepperTrigger className="flex items-start gap-4 pb-12 last:pb-6">
                    {/* Bulatan Indicator Elegan */}
                    <StepperIndicator
                      className="
                      relative z-10 flex items-center justify-center 
                      w-10 h-10 rounded-full border
                      bg-white shadow-lg text-[#D67A00] border-[#F7C77F]
                      data-[state=active]:bg-gradient-to-br
                      data-[state=active]:from-[#F7C77F]
                      data-[state=active]:to-[#D67A00]
                      data-[state=active]:text-white
                      data-[state=completed]:bg-[#D67A00]
                      data-[state=completed]:text-white
                    "
                    >
                      {index + 1}
                    </StepperIndicator>

                    {/* Text */}
                    <div>
                      <StepperTitle className="text-xl text-start font-semibold text-[#171717]">
                        {step.title}
                      </StepperTitle>
                      <p className="text-gray-600 text-start text-sm mt-1 max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              ))}
            </StepperNav>

            <StepperPanel>
              {steps.map((step, index) => (
                <StepperContent key={index} value={index + 1}>
                  {/* Bisa diisi konten detail jika diperlukan */}
                </StepperContent>
              ))}
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </motion.section>
  );
}
