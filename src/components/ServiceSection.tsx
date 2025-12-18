"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ServiceSection({ services }: { services: any[] }) {
  return (
    <section className="px-4 sm:px-6 py-8 bg-gray-50 ">
      <div className="grid gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-2xl font-light text-[#171717]"
        >
          Jasa Kami
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mx-auto">
          {services.map((service: any) => (
            <article
              key={service.id}
              className="relative overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Thumbnail */}
              {service.thumbnail?.url && (
                <div className="relative w-full h-64 md:h-72">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    width={500}
                    height={400}
                    className="object-cover w-full h-full"
                    loading="eager"
                  />

                  {/* Title overlay */}
                  <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm text-white p-3">
                    <h3 className="text-lg md:text-xl font-semibold">
                      {service.title}
                    </h3>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
