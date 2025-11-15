"use client";

import { motion } from "framer-motion";

export function AboutUsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="px-4 sm:px-6 py-16 max-w-5xl mx-auto"
    >
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-light text-[#171717] mb-6">
        Tentang Kami
      </h2>

      {/* Description */}
      <p className="text-center text-lg text-[#171717] leading-relaxed max-w-3xl mx-auto mb-12">
        Di <span className="font-semibold">Indri Teknik Las</span>, kami
        berkomitmen memberikan layanan konstruksi las yang kuat, rapi, dan
        berkualitas tinggi. Dengan pengalaman lebih dari satu dekade, kami telah
        membantu ratusan pelanggan mewujudkan berbagai kebutuhan konstruksi
        besi—mulai dari kanopi, pagar, tralis, hingga proyek custom sesuai
        permintaan.
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h3 className="text-3xl font-semibold text-[#171717]">150+</h3>
          <p className="text-sm text-gray-600">Proyek Selesai</p>
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-[#171717]">10+</h3>
          <p className="text-sm text-gray-600">Tahun Pengalaman</p>
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-[#171717]">200+</h3>
          <p className="text-sm text-gray-600">Ulasan Pelanggan</p>
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-[#171717]">30</h3>
          <p className="text-sm text-gray-600">Proyek Custom</p>
        </div>
      </div>
    </motion.section>
  );
}
