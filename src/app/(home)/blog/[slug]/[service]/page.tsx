// app/blog/[slug]/[service]/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
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
import {
  getAllServices,
  getServiceBySlug,
} from "@/lib/strapi/service/service.service";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type RichTextNode = {
  type?: string;
  level?: number;
  text?: string;
  children?: RichTextNode[];
};

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

function toMetaDescription(text: string, max = 160) {
  if (!text) return "";
  if (text.length <= max) return text;
  const safeMax = Math.max(0, max - 3);
  return `${text.slice(0, safeMax).trim()}...`;
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
  const service = await getServiceBySlug(serviceSlug);

  if (!service) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  const descriptionText = extractPlainText(service.description);
  const metaDescription = toMetaDescription(
    descriptionText ||
      service.meta_description ||
      service.short_description ||
      `Bengkel Las ${service.title} membantu kebutuhan las dan konstruksi ringan sesuai kebutuhan proyek Anda.`
  );
  const thumbnailUrl = service.thumbnail?.url
    ? process.env.STRAPI_URL + service.thumbnail.url
    : undefined;
  const canonicalUrl = `https://bengkellasindriteknik.com/blog/${slug}/${service.slug}`;

  return {
    title: {
      default: `Bengkel Las ${service.title}`,
      template: "%s - las terdekat",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots:
      "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    description: metaDescription,
    openGraph: {
      title: `Bengkel Las ${service.title}`,
      description: metaDescription,
      type: "article",
      locale: "id",
      url: canonicalUrl,
      siteName: "Bengkel Las Indri Teknik",
      images: thumbnailUrl
        ? [
            {
              url: thumbnailUrl,
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ]
        : undefined,
    },
    metadataBase: new URL("https://bengkellasindriteknik.com"),
  };
}

export default async function BlogServiceDetailPage({
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
  const allServices = await getAllServices();

  const descriptionBlocks: RichTextNode[] = service.description || [];
  const listBlocks = descriptionBlocks.filter((b) => b.type === "list");
  const list = listBlocks.slice(0, 1);
  const heading2 = descriptionBlocks
    .filter((b) => b.type === "heading" && b.level === 2)
    .slice(0, 1);
  const openingParagraph = descriptionBlocks
    .filter((b) => b.type === "paragraph")
    .slice(0, 2);
  const detailBlocks = descriptionBlocks.filter(
    (block) =>
      !openingParagraph.includes(block) &&
      !heading2.includes(block) &&
      !list.includes(block)
  );
  const fallbackIntro = `Layanan ${service.title} dari Indri Teknik Las untuk area ${location?.title ?? slug} dirancang untuk membantu kebutuhan konstruksi ringan dengan hasil rapi, kuat, dan sesuai kebutuhan proyek Anda.`;
  const thumbnailUrl = service.thumbnail?.url
    ? process.env.STRAPI_URL + service.thumbnail.url
    : null;
  const listItems = extractListItems(listBlocks);
  const summaryText = toMetaDescription(
    extractPlainText(descriptionBlocks) ||
      service.short_description ||
      fallbackIntro,
    220
  );
  const headerDescription = service.short_description || summaryText;
  const publishedDate = service.createdAt ? new Date(service.createdAt) : null;
  const updatedDate = service.updatedAt ? new Date(service.updatedAt) : null;
  const relatedServices = (allServices || []).filter(
    (item) => item?.slug && item.slug !== service.slug
  );

  const canonicalUrl = `https://bengkellasindriteknik.com/blog/${slug}/${service.slug}`;
  const jsonLdDescription =
    extractPlainText(descriptionBlocks) ||
    service.meta_description ||
    service.short_description ||
    fallbackIntro;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: jsonLdDescription,
    image: thumbnailUrl || "https://bengkellasindriteknik.com/opengraph-image.png",
    provider: {
      "@type": "LocalBusiness",
      name: "Indri Teknik Las",
      image: "https://bengkellasindriteknik.com/opengraph-image.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pekayon Jaya RT/RW. 003/004 Bekasi Selatan",
        addressLocality: "Bekasi",
        addressRegion: "Jawa Barat",
        postalCode: "17148",
        addressCountry: "Indonesia",
      },
      telephone: "+6281283993386",
      priceRange: "Rp. 550.000",
    },
    url: canonicalUrl,
    offers: {
      "@type": "Offer",
      price: "550.000",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
    },
    datePublished: service.createdAt,
    dateModified: service.updatedAt,
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
                    <Link href={`/blog/${slug}`}>
                      {location?.title || slug}
                    </Link>
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
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mt-2 mx-auto max-w-4xl">
            {service.title}
          </h1>
          {headerDescription ? (
            <p className="text-slate-600 mt-3 mx-auto max-w-3xl">
              {headerDescription}
            </p>
          ) : null}
        </div>
      </header>

      <main className="page-container page-section">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
          <article className="overflow-hidden">
            <div className="py-2 md:py-4 space-y-8">
              <header className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  {publishedDate ? (
                    <time dateTime={publishedDate.toISOString()}>
                      {formatDate(service.createdAt)}
                    </time>
                  ) : null}
                  <span
                    className="h-1 w-1 bg-slate-300"
                    aria-hidden="true"
                  />
                  <span>Indri Teknik Las Team</span>
                  {updatedDate ? (
                    <>
                      <span
                        className="h-1 w-1 bg-slate-300"
                        aria-hidden="true"
                      />
                      <time dateTime={updatedDate.toISOString()}>
                        Diperbarui {formatDate(service.updatedAt)}
                      </time>
                    </>
                  ) : null}
                  <span
                    className="h-1 w-1 bg-slate-300"
                    aria-hidden="true"
                  />
                  <span>Waktu Membaca 3 Menit</span>
                </div>
              </header>

              <figure className="overflow-hidden bg-gray-100">
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={service.title}
                    width={960}
                    height={640}
                    className="h-72 w-full object-cover md:h-96"
                    loading="eager"
                  />
                ) : (
                  <div className="h-72 w-full bg-gray-200 md:h-96" />
                )}
                <figcaption className="sr-only">{service.title}</figcaption>
              </figure>

              <section className="space-y-3" aria-labelledby="ringkasan-layanan">
                <h2
                  id="ringkasan-layanan"
                  className="text-2xl font-semibold text-slate-900"
                >
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

              {detailBlocks.length ? (
                <section className="space-y-3" aria-labelledby="detail-layanan">
                  <h2
                    id="detail-layanan"
                    className="text-2xl font-semibold text-slate-900"
                  >
                    Detail Layanan {service.title}
                  </h2>
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    <ServiceBlocksRenderer content={detailBlocks} />
                  </div>
                </section>
              ) : null}

              <section
                className="space-y-4"
                aria-labelledby="keunggulan-layanan"
              >
                <h2
                  id="keunggulan-layanan"
                  className="text-2xl font-semibold text-slate-900"
                >
                  Keunggulan Layanan {service.title}
                </h2>
                {listItems.length ? (
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {listItems.map((item, index) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex gap-3 text-sm text-slate-700"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 bg-amber-500 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : list.length ? (
                  <div className="text-slate-700 leading-relaxed">
                    <ServiceBlocksRenderer content={list} />
                  </div>
                ) : (
                  <p className="text-slate-700 leading-relaxed">
                    Konsultasikan kebutuhan Anda untuk mendapatkan rekomendasi
                    desain, material, dan estimasi pengerjaan yang sesuai.
                  </p>
                )}
              </section>

              <section className="bg-amber-50/60 p-5">
                <h3 className="text-lg font-semibold text-[#171717]">
                  Butuh Estimasi Biaya?
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Kirim detail ukuran dan desain yang Anda inginkan, tim kami
                  siap memberikan estimasi cepat dan rekomendasi material terbaik.
                </p>
                <a
                  href="https://wa.me/6281283993386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-black hover:bg-green-600 transition"
                >
                  Konsultasi via WhatsApp
                </a>
              </section>
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 self-start">
            <section className="p-0">
              <h3 className="text-lg font-semibold text-slate-900">
                Konsultasi Cepat
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Konsultasi gratis untuk menentukan material, ukuran, dan desain
                yang sesuai kebutuhan Anda.
              </p>
              <a
                href="https://wa.me/6281283993386"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:bg-green-600 transition"
              >
                Hubungi via WhatsApp
              </a>
            </section>

            <section className="p-0">
              <h3 className="text-lg font-semibold text-slate-900">
                Daftar Layanan
              </h3>
              {relatedServices.length ? (
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                  {relatedServices.map((item) => (
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
                <p className="mt-3 text-sm text-slate-600">
                  Daftar layanan akan segera diperbarui.
                </p>
              )}
            </section>
          </aside>
        </div>

        <section className="mt-10 space-y-8" aria-label="Proses dan testimoni">
          <StepToOrder variant="clean" />
          <Testimonial variant="clean" />
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  );
}
