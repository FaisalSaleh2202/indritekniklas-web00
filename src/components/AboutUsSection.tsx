"use client";

import { motion } from "framer-motion";

export function AboutUsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="px-4 sm:px-6 py-8 max-w-5xl mx-auto"
    >
      <div className="grid gap-6">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-light text-[#171717]">
          Tentang Kami
        </h2>

        {/* Description */}
        <p className="text-justify text-lg text-[#171717] leading-relaxed">
          <span className="font-semibold">Indri Teknik Las</span>, kami
          berkomitmen memberikan layanan konstruksi las yang kuat, rapi. Dengan
          pengalaman lebih dari 10 tahun dan tenaga ahli berpengalaman, kami
          telah membantu ratusan pelanggan mewujudkan berbagai kebutuhan
          konstruksi besi—mulai dari kanopi, pagar, tralis, hingga proyek custom
          sesuai permintaan.
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-center mt-2">
          <div>
            <h3 className="text-3xl font-semibold text-[#171717]">150+</h3>
            <p className="text-sm text-gray-600">Proyek Selesai</p>
          </div>

          <div>
            <h3 className="text-3xl font-semibold text-[#171717]">10+</h3>
            <p className="text-sm text-gray-600">Tahun Pengalaman</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
