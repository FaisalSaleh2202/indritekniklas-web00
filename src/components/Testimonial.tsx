"use client";

import { useState } from "react";
import Image from "next/image";

const testimonial = [
  {
    describe:
      "Masya Allah terima kasih ya Pak sudah amanah dan kerjain canopy, railing tangga, besi tanaman, pintu tralis atap rumah saya",
    area: "Galaxy, Bekasi",
    customer: "/testimonial/bekasi_ashri_fajri.jpg",
    name: "Ashri Fajri",
    project: "Kanopi, Tangga",
  },
 
];

type TestimonialProps = {
  variant?: "default" | "clean";
};

export function Testimonial({ variant = "default" }: TestimonialProps) {
  const isClean = variant === "clean";
  const buttonClassName = isClean
    ? "h-10 w-10 bg-slate-100 text-slate-700 hover:bg-slate-200 transition disabled:opacity-50"
    : "h-10 w-10 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition disabled:opacity-50";
  const total = testimonial.length;
  const [current, setCurrent] = useState(0);

  if (!total) return null;

  const item = testimonial[current];
  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + total) % total);
  const goNext = () =>
    setCurrent((prev) => (prev + 1) % total);

  return (
    <section className="px-4 sm:px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#D67A00]">
              Testimoni
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#171717] mt-2">
              Apa Kata Pelanggan Kami
            </h2>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Testimoni sebelumnya"
              disabled={total < 2}
              className={buttonClassName}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Testimoni berikutnya"
              disabled={total < 2}
              className={buttonClassName}
            >
              ›
            </button>
          </div>
        </header>

        <article
          className={
            isClean
              ? "bg-slate-100/60 overflow-hidden"
              : "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          }
        >
          <div className="grid md:grid-cols-[220px_1fr] gap-0">
            <div className="relative">
              <Image
                src={item.customer}
                alt={item.name}
                width={360}
                height={360}
                sizes="(max-width: 768px) 100vw, 220px"
                className="object-cover w-full h-64 md:h-full"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-4">
              <blockquote className="text-slate-700 leading-relaxed text-lg">
                <p>{item.describe}</p>
              </blockquote>

              <div className="text-sm text-slate-600">
                <p className="font-semibold text-[#171717]">{item.name}</p>
                <p>{item.project}</p>
                <p>{item.area}</p>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-4 text-center text-sm text-slate-500">
          {current + 1} / {total}
        </div>
      </div>
    </section>
  );
}
