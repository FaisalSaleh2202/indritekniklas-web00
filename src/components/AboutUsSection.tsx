"use client";

import { motion } from "framer-motion";
import { CalendarCheck2, ShieldCheck, Wrench } from "lucide-react";

export function AboutUsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      className="px-4 sm:px-6 py-12 bg-[#212121] grid gap-3"
    >
      <h2 className="text-3xl font-light text-white text-start">
        Tentang Kami
      </h2>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Kiri: Deskripsi */}
        <div className="space-y-4 text-white text-lg leading-relaxed text-justify">
          <p>
            <strong>Indri Teknik Las</strong> adalah bengkel las profesional
            yang berfokus pada pengerjaan konstruksi baja, kanopi, pagar,
            tralis, dan berbagai proyek las lainnya. Kami telah melayani
            pelanggan di berbagai wilayah dengan hasil yang rapi, kuat, dan
            tahan lama.
          </p>
          <p className="text-justify">
            Dengan pengalaman lebih dari satu dekade, kami berkomitmen
            memberikan pelayanan terbaik menggunakan material berkualitas dan
            tenaga ahli berpengalaman. Kepuasan pelanggan adalah prioritas utama
            kami.
          </p>
        </div>

        {/* Kanan: Statistik / Keunggulan */}
        <div className="grid mx-auto gap-10">
          <div className="flex items-center gap-4">
            <CalendarCheck2 className="w-12 h-12 bg-[#F4991A] text-white p-3 rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-white">10+ Tahun</h3>
              <p className="text-white">Pengalaman dalam pekerjaan las</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="w-12 h-12 bg-[#F4991A] text-white p-3 rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-white">
                Material Berkualitas
              </h3>
              <p className="text-white">Mengutamakan kekuatan dan daya tahan</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Wrench className="w-12 h-12 bg-[#F4991A] text-white p-3 rounded-lg" />
            <div>
              <h3 className="text-2xl font-bold text-white">Tim Ahli</h3>
              <p className="text-white">Dikerjakan oleh tenaga profesional</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
