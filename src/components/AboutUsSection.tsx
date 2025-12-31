import Link from "next/link";

import { ABOUT_STATS, ABOUT_SUMMARY, BUSINESS } from "@/lib/site-content";

export function AboutUsSection() {
  return (
    <section className="px-4 sm:px-6 py-8 max-w-5xl mx-auto">
      <div className="grid gap-6">
        <header className="space-y-3">
          <h2 className="text-center text-2xl md:text-2xl font-light text-[#171717]">
            Tentang Kami
          </h2>

          <p className="text-justify text-lg text-[#171717] leading-relaxed">
            <span className="font-semibold">{BUSINESS.name}</span>{" "}
            {ABOUT_SUMMARY.replace(`${BUSINESS.name} `, "")}
          </p>
        </header>

        <dl className="grid grid-cols-2 gap-8 text-center">
          {ABOUT_STATS.map((item) => (
            <div key={item.label}>
              <dt className="text-sm text-gray-600">{item.label}</dt>
              <dd className="text-3xl font-semibold text-[#171717]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="text-center">
          <Link
            href="/tentang-kami"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
