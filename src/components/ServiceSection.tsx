"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

export function ServiceSection() {
  return (
    <section className="bg-gray-50 px-4 sm:px-6 py-6">
      <div className="">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl font-light text-[#171717] text-center mb-8 tracking-wide"
        >
          Layanan Kami
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-3 gap-4 py-4"
        >
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
