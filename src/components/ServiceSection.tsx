"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    title: "Pagar",
    price: "$45.99",
    img: "/service/pagar.jpg",
    rating: 5,
  },
  {
    title: "Railing Dor",
    price: "$49.99",
    img: "/service/railingdor.jpg",
    rating: 5,
  },
  {
    title: "Pintu",
    price: "$55.99",
    img: "/service/pintu.jpg",
    rating: 4.5,
  },
  {
    title: "Tangga",
    price: "$55.99",
    img: "/service/tangga3.jpg",
    rating: 4.5,
  },
  {
    title: "Kanopi",
    price: "$55.99",
    img: "/service/kanopi.jpg",
    rating: 4.5,
  },
];

export function ServiceSection() {
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
          Layanan Kami
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-sm p-3 relative"
            >
              {/* Card Image */}
              <div className="bg-gradient-to-b from-white to-gray-200 p-4 mb-4">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="w-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 text-[#171717]">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
