// app/blog/[slug]/[service]/page.tsx
export const revalidate = 3600;

import ServiceBlocksRenderer from "@/components/ServiceBlocksRenderer";
import StepToOrder from "@/components/StepToOrder";
import { Testimonial } from "@/components/Testimonial";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getServiceLocationBySlug } from "@/lib/strapi/service-location/service-location.service";
import { getAllServices, getServiceBySlug } from "@/lib/strapi/service/service.service";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

const SITE_URL = "https://www.bengkellasindriteknik.com";
const WHATSAPP_URL = "https://wa.me/6281283993386";

type RichTextNode = {
  type?: string;
  level?: number;
  text?: string;
  children?: RichTextNode[];
};

function getAreaNameFromTitle(title: string) {
  const t = (title || "").trim();
  if (!t) return "";
  const beforeDash = t.split(" - ")[0].trim();
  return beforeDash
    .replace(/^Bengkel\s+Las\s+/i, "")
    .trim() || beforeDash || t;
}

function extractPlainText(nodes?: RichTextNode[]): string {
  if (!nodes) return "";
  const parts: string[] = [];
  const walk = (items: RichTextNode[]) => {
    for (const item of items) {
      if (item.text) parts.push(item.text);
      if (item.children?.length) walk(item.children);
    }
  };
  walk(nodes);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function getFirstParagraphText(nodes?: RichTextNode[]): string {
  if (!nodes) return "";
  const p = nodes.find((n) => n.type === "paragraph");
  return p ? extractPlainText([p]) : "";
}

function toMetaDescription(text: string, max = 160) {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const safeMax = Math.max(0, max - 3);
  return `${cleaned.slice(0, safeMax).trim()}...`;
}

function extractListItems(listNodes: RichTextNode[]): string[] {
  const items: string[] = [];
  for (const listNode of listNodes) {
    const listItems = listNode.children || [];
    for (const listItem of listItems) {
      const text = extractPlainText(listItem.children);
      if (text) items.push(text);
    }
  }
  return items;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}): Promise<Metadata> {
  const { slug, service: serviceSlug } = await params;

  const [service, location] = await Promise.all([
    getServiceBySlug(serviceSlug),
    getServiceLocationBySlug(slug),
  ]);

  if (!service) return { title: "Layanan Tidak Ditemukan" };

  const areaName = getAreaNameFromTitle(location?.title || slug);
  const canonicalUrl = `${SITE_URL}/blog/${slug}/${service.slug}`;

  const thumbnailUrl = service.thumbnail?.url
    ? process.env.STRAPI_URL + service.thumbnail.url
    : undefined;

  const descFromContent =
    getFirstParagraphText(service.description) || extractPlainText(service.description);

  const metaDescription = toMetaDescription(
    service.meta_description ||
      service.short_description ||
      descFromContent ||
      `Bengkel Las ${service.title} di ${areaName} . Pengerjaan rapi & kuat. Konsultasi dan estimasi via WhatsApp.`
  );

const metaTitle =
  service.meta_title ||
  `Bengkel Las ${service.title} di ${areaName}  | Indri Teknik Las`;


  return {
    title: metaTitle,
    alternates: { canonical: canonicalUrl },
    description: metaDescription,
    robots: "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "Bengkel Las Indri Teknik",
      locale: "id",
      type: "article",
      images: thumbnailUrl
        ? [{ url: thumbnailUrl, width: 1200, height: 630, alt: metaTitle }]
        : undefined,
    },
    twitter: {
      card: thumbnailUrl ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      images: thumbnailUrl ? [thumbnailUrl] : undefined,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}) {
  const { slug, service: serviceSlug } = await params;

  const [service, location] = await Promise.all([
    getServiceBySlug(serviceSlug),
    getServiceLocationBySlug(slug),
  ]);

  if (!service) notFound();

  const areaName = getAreaNameFromTitle(location?.title || slug);
  const canonicalUrl = `${SITE_URL}/blog/${slug}/${service.slug}`;

  const allServices = await getAllServices();
  const relatedServices = (allServices || []).filter(
    (item: any) => item?.slug && item.slug !== service.slug
  );

  const descriptionBlocks: RichTextNode[] = service.description || [];
  const listBlocks = descriptionBlocks.filter((b) => b.type === "list");
  const listItems = extractListItems(listBlocks);

  const openingParagraph = descriptionBlocks
    .filter((b) => b.type === "paragraph")
    .slice(0, 2);

  const detailBlocks = descriptionBlocks.filter(
    (block) => !openingParagraph.includes(block)
  );

  const thumbnailUrl = service.thumbnail?.url
    ? process.env.STRAPI_URL + service.thumbnail.url
    : null;

  const fallbackIntro = `Layanan ${service.title} untuk area ${areaName}  dengan hasil rapi, kuat, dan sesuai kebutuhan proyek Anda.`;

  const faqItems = [
    {
      q: `Berapa harga jasa ${service.title} di ${areaName}?`,
      a: `Harga tergantung ukuran, material, dan desain. Kirim detail via WhatsApp untuk estimasi cepat.`,
    },
    {
      q: `Apakah bisa survey lokasi di ${areaName}?`,
      a: `Bisa. Tim kami dapat survey area ${areaName} dan sekitarnya untuk ukur lokasi dan estimasi.`,
    },
    {
      q: `Berapa lama pengerjaan ${service.title}?`,
      a: `Durasi tergantung ukuran & tingkat kesulitan. Setelah survey/brief, kami berikan timeline pengerjaan.`,
    },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: areaName, item: `${SITE_URL}/blog/${slug}` },
      { "@type": "ListItem", position: 4, name: service.title, item: canonicalUrl },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
name: `Bengkel Las ${service.title} di ${areaName} `,
    serviceType: service.title,
    url: canonicalUrl,
    description:
      service.meta_description ||
      service.short_description ||
      getFirstParagraphText(descriptionBlocks) ||
      extractPlainText(descriptionBlocks) ||
      fallbackIntro,
    image: thumbnailUrl || `${SITE_URL}/opengraph-image.png`,
    provider: {
      "@type": "LocalBusiness",
      name: "Indri Teknik Las",
      url: SITE_URL,
      telephone: "+6281283993386",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pekayon Jaya RT/RW. 003/004  Selatan",
        addressLocality: "",
        addressRegion: "Jawa Barat",
        postalCode: "17148",
        addressCountry: "ID",
      },
      areaServed: [{ "@type": "AdministrativeArea", name: areaName }],
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

const pageH1 = `Bengkel Las ${service.title} di ${areaName} `;


  return (
    <div className="min-h-screen bg-slate-50">
      <Script
        id="service-breadcrumb-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Script
        id="service-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <Script
        id="faq-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <header className="bg-transparent">
        <div className="page-container pt-6">
          <nav aria-label="Breadcrumb">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/blog/${slug}`}>{areaName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{service.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>
        </div>

        <div className="page-container pb-6 text-center">
         <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mt-2 mx-auto max-w-4xl px-2 leading-tight tracking-tight">
            {pageH1}
        </h1>
          <p className="text-slate-600 mt-3 mx-auto max-w-3xl">
            {service.short_description ||
              toMetaDescription(
                getFirstParagraphText(descriptionBlocks) ||
                  extractPlainText(descriptionBlocks) ||
                  fallbackIntro,
                220
              )}
          </p>

      {/* CTA */}
<div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 px-4 sm:px-0">
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-green-500 px-5 py-3 sm:py-2 text-sm font-semibold text-black hover:bg-green-600 transition"
  >
    Konsultasi WhatsApp
  </a>

  <Link
    href={`/blog/${slug}`}
    className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white px-5 py-3 sm:py-2 text-sm font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
  >
    Lihat Bengkel Las {areaName}
  </Link>

  <a
    href="#detail-layanan"
    className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white px-5 py-3 sm:py-2 text-sm font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
  >
    Detail Layanan
  </a>
</div>
        </div>
      </header>

      <main className="page-container page-section">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
          <article className="overflow-hidden">
            <div className="py-2 md:py-4 space-y-8">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                {service.createdAt ? (
                  <time dateTime={new Date(service.createdAt).toISOString()}>
                    {formatDate(service.createdAt)}
                  </time>
                ) : null}
                <span className="h-1 w-1 bg-slate-300" aria-hidden="true" />
                <span>Indri Teknik Las Team</span>
                {service.updatedAt ? (
                  <>
                    <span className="h-1 w-1 bg-slate-300" aria-hidden="true" />
                    <time dateTime={new Date(service.updatedAt).toISOString()}>
                      Diperbarui {formatDate(service.updatedAt)}
                    </time>
                  </>
                ) : null}
              </div>

              <figure className="overflow-hidden bg-gray-100 rounded-2xl">
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
              alt={`Bengkel Las ${service.title} di ${areaName} `}
                    width={960}
                    height={640}
                    className="h-72 w-full object-cover md:h-96"
                    loading="eager"
                    priority
                  />
                ) : (
                  <div className="h-72 w-full bg-gray-200 md:h-96" />
                )}
                <figcaption className="sr-only">{pageH1}</figcaption>
              </figure>

              <section className="space-y-3" aria-labelledby="ringkasan-layanan">
                <h2 id="ringkasan-layanan" className="text-2xl font-semibold text-slate-900">
                  Ringkasan Layanan
                </h2>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {openingParagraph.length ? (
                    <ServiceBlocksRenderer content={openingParagraph} />
                  ) : (
                    <p>{fallbackIntro}</p>
                  )}
                </div>
              </section>

              <section className="space-y-3" aria-labelledby="detail-layanan">
                <h2 id="detail-layanan" className="text-2xl font-semibold text-slate-900">
                  Detail Layanan {service.title} di {areaName}
                </h2>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {detailBlocks.length ? (
                    <ServiceBlocksRenderer content={detailBlocks} />
                  ) : (
                    <p>{fallbackIntro}</p>
                  )}
                </div>
              </section>

              <section className="space-y-4" aria-labelledby="keunggulan-layanan">
                <h2 id="keunggulan-layanan" className="text-2xl font-semibold text-slate-900">
                  Keunggulan Layanan {service.title}
                </h2>

                {listItems.length ? (
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {listItems.map((item, idx) => (
                      <li key={`${item}-${idx}`} className="flex gap-3 text-sm text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 bg-amber-500 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-700 leading-relaxed">
                    Konsultasikan kebutuhan Anda untuk rekomendasi desain, material, dan estimasi pengerjaan.
                  </p>
                )}
              </section>

              <section className="space-y-3" aria-labelledby="faq">
                <h2 id="faq" className="text-2xl font-semibold text-slate-900">
                  FAQ {service.title} di {areaName}
                </h2>
                <div className="space-y-3">
                  {faqItems.map((f) => (
                    <details key={f.q} className="bg-white border border-slate-200 rounded-2xl p-4">
                      <summary className="cursor-pointer font-semibold text-slate-900">
                        {f.q}
                      </summary>
                      <p className="mt-2 text-slate-700 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 self-start">
            <section className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-slate-900">Konsultasi Cepat</h3>
              <p className="text-sm text-slate-600 mt-2">
                Konsultasi gratis untuk area {areaName}. Kirim ukuran & desain untuk estimasi cepat.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:bg-green-600 transition"
              >
                Hubungi via WhatsApp
              </a>
              <p className="mt-3 text-xs text-slate-500 break-all">
                Canonical: {canonicalUrl}
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="text-lg font-semibold text-slate-900">Layanan Lain</h3>
              {relatedServices?.length ? (
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                  {relatedServices.slice(0, 16).map((item: any) => (
                    <Link
                      key={item.id || item.slug}
                      href={`/blog/${slug}/${item.slug}`}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 hover:bg-slate-200 transition"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-600">Daftar layanan akan segera diperbarui.</p>
              )}
            </section>
          </aside>
        </div>

        <section className="mt-10 space-y-8" aria-label="Proses dan testimoni">
          <StepToOrder variant="clean" />
          <Testimonial variant="clean" />
        </section>
      </main>
    </div>
  );
}
