import type { Metadata } from "next";
import Link from "next/link";

import StepToOrder from "@/components/StepToOrder";
import { ABOUT_STATS, ABOUT_SUMMARY, BUSINESS, FAQ_ITEMS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Tentang Kami - Indri Teknik Las",
  description:
    "Kenali Indri Teknik Las: bengkel las berpengalaman untuk pagar, kanopi, tralis, railing, dan berbagai konstruksi besi dengan hasil rapi, kuat, dan tepat waktu.",
  keywords: [
    "Indri Teknik Las",
    "tentang kami",
    "bengkel las",
    "jasa las",
    "pagar besi",
    "kanopi",
    "tralis",
    "railing tangga",
    "folding gate",
    "Bekasi",
  ],
  alternates: {
    canonical: "https://bengkellasindriteknik.com/tentang-kami",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bengkellasindriteknik.com/tentang-kami",
    siteName: "Indri Teknik Las",
    title: "Tentang Kami - Indri Teknik Las",
    description:
      "Kenali Indri Teknik Las: bengkel las berpengalaman untuk pagar, kanopi, tralis, railing, dan berbagai konstruksi besi dengan hasil rapi, kuat, dan tepat waktu.",
    images: [
      {
        url: "https://bengkellasindriteknik.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Indri Teknik Las",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Kami - Indri Teknik Las",
    description:
      "Kenali Indri Teknik Las: bengkel las berpengalaman untuk pagar, kanopi, tralis, railing, dan berbagai konstruksi besi dengan hasil rapi, kuat, dan tepat waktu.",
    images: ["https://bengkellasindriteknik.com/opengraph-image.png"],
  },
};

export default function TentangKamiPage() {
  const faqEntities = FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: "https://bengkellasindriteknik.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tentang Kami",
          item: "https://bengkellasindriteknik.com/tentang-kami",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Tentang Kami - Indri Teknik Las",
      url: "https://bengkellasindriteknik.com/tentang-kami",
      inLanguage: "id-ID",
      about: {
        "@type": "LocalBusiness",
        name: BUSINESS.name,
        telephone: BUSINESS.phoneE164,
        url: BUSINESS.canonicalBaseUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Pekayon Jaya RT/RW. 003/004 Bekasi Selatan",
          addressLocality: "Bekasi",
          addressRegion: "Jawa Barat",
          postalCode: "17148",
          addressCountry: "Indonesia",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="page-container page-section">
        <header className="page-header text-center">
          <h1 className="text-3xl font-semibold text-slate-900">
            Tentang Kami
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            <span className="font-semibold">{BUSINESS.name}</span>{" "}
            {ABOUT_SUMMARY.replace(`${BUSINESS.name} `, "")}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-6 max-w-xl mx-auto">
            {ABOUT_STATS.map((item) => (
              <div key={item.label} className="rounded-xl bg-white p-4 shadow-sm">
                <dt className="text-sm text-slate-600">{item.label}</dt>
                <dd className="mt-1 text-2xl font-semibold text-slate-900">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 space-y-8" aria-label="Profil Indri Teknik Las">
            <section aria-labelledby="siapa-kami" className="bg-white p-8 shadow-sm">
              <h2 id="siapa-kami" className="text-2xl font-semibold text-slate-900">
                Siapa Indri Teknik Las?
              </h2>
              <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
                <p>
                  Kami adalah bengkel las yang fokus pada pengerjaan konstruksi
                  besi untuk kebutuhan rumah, ruko, dan area usaha. Prioritas
                  kami sederhana: <strong>hasil kuat</strong>,{" "}
                  <strong>presisi</strong>, dan{" "}
                  <strong>tampilan rapi</strong>.
                </p>
                <p>
                  Setiap proyek kami mulai dari pemahaman kebutuhan, ukur
                  lapangan (bila diperlukan), rekomendasi material, hingga
                  finishing yang sesuai untuk penggunaan indoor maupun outdoor.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="visi-misi"
              className="bg-white p-8 shadow-sm"
            >
              <h2 id="visi-misi" className="text-2xl font-semibold text-slate-900">
                Visi & Misi
              </h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">Visi</h3>
                  <p className="mt-2 text-slate-700 leading-relaxed">
                    Menjadi bengkel las pilihan yang dipercaya karena kualitas
                    pengerjaan dan layanan yang jelas dari awal sampai selesai.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">Misi</h3>
                  <ul className="mt-2 list-disc list-inside text-slate-700 space-y-2">
                    <li>Memberikan hasil kuat dan presisi.</li>
                    <li>Rekomendasi material sesuai kebutuhan.</li>
                    <li>Komunikasi progres pengerjaan yang transparan.</li>
                    <li>Finishing rapi dan tahan cuaca.</li>
                  </ul>
                </div>
              </div>
            </section>

            <StepToOrder variant="clean" />

            <section aria-labelledby="lokasi-kontak" className="bg-white p-8 shadow-sm">
              <h2 id="lokasi-kontak" className="text-2xl font-semibold text-slate-900">
                Lokasi & Kontak
              </h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">Alamat</h3>
                  <address className="mt-2 not-italic text-slate-700 leading-relaxed">
                    {BUSINESS.addressShort}
                  </address>
                  <p className="mt-4 text-slate-700">
                    <span className="font-semibold">Jam Operasional:</span>{" "}
                    {BUSINESS.openingHoursDisplay}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">Hubungi</h3>
                  <ul className="mt-2 space-y-2 text-slate-700">
                    <li>
                      <span className="font-semibold">Telepon/WhatsApp:</span>{" "}
                      <a
                        href={`tel:${BUSINESS.phoneE164}`}
                        className="underline underline-offset-4 text-slate-900"
                      >
                        {BUSINESS.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <span className="font-semibold">Konsultasi cepat:</span>{" "}
                      <a
                        href={BUSINESS.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 text-slate-900"
                      >
                        Chat WhatsApp
                      </a>
                    </li>
                    <li>
                      <span className="font-semibold">Form kontak:</span>{" "}
                      <Link
                        href="/kontak-kami"
                        className="underline underline-offset-4 text-slate-900"
                      >
                        Kontak Kami
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="faq" className="bg-white p-8 shadow-sm">
              <h2 id="faq" className="text-2xl font-semibold text-slate-900">
                Pertanyaan yang Sering Ditanyakan
              </h2>
              <div className="mt-4 space-y-3">
                {FAQ_ITEMS.map((item) => (
                  <details
                    key={item.question}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
                  >
                    <summary className="cursor-pointer font-semibold text-slate-900">
                      {item.question}
                    </summary>
                    <p className="mt-2 text-slate-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <footer className="bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Siap Konsultasi?
              </h2>
              <p className="mt-2 text-slate-700 leading-relaxed">
                Ceritakan kebutuhan Anda, kami bantu rekomendasi material, desain,
                dan estimasi biaya agar hasil sesuai fungsi dan tampilan yang Anda
                inginkan.
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/6281283993386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 py-3 font-semibold text-black hover:bg-green-600 transition"
                >
                  Konsultasi via WhatsApp
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 transition"
                >
                  Lihat Artikel Blog
                </Link>
              </div>
            </footer>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 self-start">
            <section className="bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Layanan Utama
              </h2>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li>Pagar besi (minimalis, klasik, custom)</li>
                <li>Kanopi (baja ringan / rangka besi)</li>
                <li>Teralis jendela & pintu</li>
                <li>Railing tangga & balkon</li>
                <li>Folding gate & konstruksi besi lainnya</li>
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://wa.me/6281283993386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-3 font-semibold text-black hover:bg-green-600 transition"
                >
                  Konsultasi via WhatsApp
                </a>
                <Link
                  href="/kontak-kami"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 transition"
                >
                  Kontak Kami
                </Link>
              </div>
            </section>

            <section className="bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Komitmen Kami
              </h2>
              <ul className="mt-4 space-y-2 text-slate-700">
                <li>
                  <strong>Kualitas bahan:</strong> rekomendasi material sesuai
                  kebutuhan.
                </li>
                <li>
                  <strong>Pengerjaan rapi:</strong> detail finishing diperhatikan.
                </li>
                <li>
                  <strong>Komunikasi jelas:</strong> update progres pengerjaan.
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
