"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export function Testimonial() {
  return (
    <section className="px-2 sm:px-6 py-6 bg-gray-50">
      <div className="w-full">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl font-light text-[#171717] py-2 text-center"
        >
          Apa Kata Pelanggan Kami
        </motion.h2>

        <div className="relative">
          {/* Carousel utama */}
          <Carousel className="w-full">
            <CarouselContent className="mb-4 ml-0">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index} className="basis-full p-2">
                  <Card className="h-full w-full shadow-md border border-gray-200">
                    <CardContent className="md:grid grid-cols-12 gap-4 md:h-70 h-90">
                      <div className="col-span-4">FOTO</div>
                      <div className="col-span-8 grid">
                        <p>
                          Masya Allah terima kasih ya Pak sudah amanah dan
                          kerjain canopy, railing tangga, besi tanaman, pintu
                          tralis atap rumah saya 🙏
                        </p>
                        <span>ashri fajri</span>
                        <span>Kanopi, Tangga</span>
                        <span>Galaxy Bekasi</span>
                        <Separator />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Tombol panah di bawah carousel */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4 mt-3">
              <CarouselPrevious className="relative static bg-[#075E54] text-white hover:bg-[#064d44] rounded-full p-3 shadow-md" />
              <CarouselNext className="relative static bg-[#075E54] text-white hover:bg-[#064d44] rounded-full p-3 shadow-md" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
