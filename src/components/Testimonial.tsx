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
import Image from "next/image";

const testimonial = [
  {
    describe:
      "Masya Allah terima kasih ya Pak sudah amanah dan kerjain canopy, railing tangga, besi tanaman, pintu tralis atap rumah saya 🙏",
    area: "Galaxy, Bekasi",
    customer: "/testimonial/bekasi_ashri_fajri.jpg",
    name: "Ashri Fajri",
    project: "Kanopi, Tangga",
  },
  {
    describe:
      "Masya Allah terima kasih ya Pak sudah amanah dan kerjain canopy, railing tangga, besi tanaman, pintu tralis atap rumah saya 🙏",
    area: "Galaxy, Bekasi",
    customer: "/testimonial/bekasi_ashri_fajri.jpg",
    name: "Ashri Fajri",
    project: "Kanopi, Tangga",
  },
];

export function Testimonial() {
  return (
    <section className="px-2 sm:px-6 py-8">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center text-2xl md:text-2xl font-light text-[#171717] mb-2"
      >
        Apa Kata Pelanggan Kami
      </motion.h2>

      <div className="">
        <Carousel className="w-full">
          <CarouselContent className="ml-0">
            {testimonial.map((item, index) => (
              <CarouselItem key={index} className="basis-full p-2">
                <Card
                  className="w-full shadow-md overflow-hidden"
                  style={{ borderRadius: 0 }}
                >
                  <CardContent className="grid grid-cols-12 gap-6 p-6">
                    {/* FOTO */}
                    <div className="col-span-12 md:col-span-4 flex items-center justify-center">
                      <Image
                        src={item.customer}
                        alt={item.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-56 md:h-full"
                      />
                    </div>

                    {/* TEKS */}
                    <div className="col-span-12 md:col-span-8 flex flex-col gap-3">
                      <p className="text-lg leading-relaxed text-[#171717]">
                        {item.describe}
                      </p>

                      <div className="text-sm text-gray-700">
                        <p className="font-semibold text-[#171717]">
                          {item.name}
                        </p>
                        <p className="text-gray-600">{item.project}</p>
                        <p className="text-gray-600">{item.area}</p>
                      </div>

                      <Separator className="my-2" />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* NAVIGATION */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
            <CarouselPrevious className="relative static bg-[#E99C3D] text-white hover:bg-[#E99C3D] rounded-full p-3 shadow-md" />
            <CarouselNext className="relative static bg-[#E99C3D] text-white hover:bg-[#E99C3D] rounded-full p-3 shadow-md" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
