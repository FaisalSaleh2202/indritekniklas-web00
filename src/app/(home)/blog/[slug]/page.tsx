// app/blog/[slug]/page.tsx
export const revalidate = 3600;
import ServiceBlocksRenderer from "@/components/ServiceBlocksRenderer";
import SocialShare from "@/components/SocialShare";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getServiceLocationBySlug } from "@/lib/strapi/service-location/service-location.service";
import { getAllServices } from "@/lib/strapi/service/service.service";
import type { RichTextNode, Service, ServiceLocation } from "@/lib/strapi/types";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
// export const revalidate = 3600;

function replaceAreaNameText(text: string, areaName: string) {
  if (!text) return text;
  return text.replace(
    /(Area Layanan Bengkel Las\s+)([^()]+)(\s*\([^)]*\))?/i,
    (_match, prefix, _oldName, suffix) => `${prefix}${areaName}${suffix || ""}`
  );
}

function replaceAreaNameInBlocks(
  nodes: RichTextNode[] | undefined,
  areaName: string
): RichTextNode[] | undefined {
  if (!nodes) return nodes;
  return nodes.map((node) => ({
    ...node,
    text: node.text ? replaceAreaNameText(node.text, areaName) : node.text,
    children: replaceAreaNameInBlocks(node.children, areaName),
  }));
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
  const paragraph = nodes.find((node) => node.type === "paragraph");
  return paragraph ? extractPlainText([paragraph]) : "";
}

function toMetaDescription(text: string, max = 160) {
  if (!text) return "";
  if (text.length <= max) return text;
  const safeMax = Math.max(0, max - 3);
  return `${text.slice(0, safeMax).trim()}...`;
}

type TableOfContentsItem = {
  id: string;
  title: string;
  level: number;
};

function createSlugger() {
  const counts = new Map<string, number>();
  return (text: string) => {
    const base =
      text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-") || "bagian";
    const count = counts.get(base) ?? 0;
    const nextCount = count + 1;
    counts.set(base, nextCount);
    return count === 0 ? base : `${base}-${nextCount}`;
  };
}

function buildContentWithAnchors(
  nodes?: RichTextNode[]
): { contentWithAnchors: RichTextNode[]; toc: TableOfContentsItem[] } {
  const slugify = createSlugger();
  const toc: TableOfContentsItem[] = [];

  const cloneNodes = (items?: RichTextNode[]): RichTextNode[] => {
    if (!items) return [];

    return items.map((item) => {
      const cloned: RichTextNode = { ...item };

      if (item.children?.length) {
        cloned.children = cloneNodes(item.children);
      }

      if (item.type === "heading") {
        const title = extractPlainText(item.children);
        const id = slugify(title);
        cloned.anchorId = id;

        if (item.level && item.level >= 2 && item.level <= 4 && title) {
          toc.push({ id, title, level: item.level });
        }
      }

      return cloned;
    });
  };

  return { contentWithAnchors: cloneNodes(nodes), toc };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const serviceLocation = (await getServiceLocationBySlug(
    slug
  )) as ServiceLocation | null;

  if (!serviceLocation) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  const thumbnailUrl = serviceLocation.thumbnail?.[0]?.url
    ? process.env.STRAPI_URL + serviceLocation.thumbnail[0].url
    : undefined;
  const plainText =
    serviceLocation.meta_description ||
    serviceLocation.short_description ||
    getFirstParagraphText(serviceLocation.description) ||
    extractPlainText(serviceLocation.description);
  const metaDescription = toMetaDescription(
    plainText ||
      `Bengkel Las ${serviceLocation.title} melayani berbagai kebutuhan las dan konstruksi.`
  );
  const canonicalUrl = `https://bengkellasindriteknik.com/blog/${serviceLocation.slug}`;

  const metaTitle =
    serviceLocation.meta_title ||
    `Bengkel Las ${serviceLocation.title} - Indri Teknik Las`;

  return {
    title: metaTitle,
    alternates: {
      canonical: canonicalUrl,
    },
    robots:
      "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    description: metaDescription,
    openGraph: {
      title: metaTitle,
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
              alt: serviceLocation.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: thumbnailUrl ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      images: thumbnailUrl ? [thumbnailUrl] : undefined,
    },
    metadataBase: new URL("https://bengkellasindriteknik.com"),
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogLocation = (await getServiceLocationBySlug(
    slug
  )) as ServiceLocation | null;
  if (!blogLocation) notFound();

  const openingParagraph = blogLocation.description
    ?.filter((b) => b.type === "paragraph")
    .slice(0, 2);

  const thumbnailUrl = blogLocation.thumbnail?.[0]?.url
    ? process.env.STRAPI_URL + blogLocation.thumbnail[0].url
    : null;
  const canonicalUrl = `https://bengkellasindriteknik.com/blog/${blogLocation.slug}`;
  const contentBlocks = replaceAreaNameInBlocks(
    blogLocation.description || openingParagraph,
    blogLocation.title
  );
  const { contentWithAnchors, toc } = buildContentWithAnchors(contentBlocks);
  const primaryContentHeading = toc[0];
  const primaryTitle = `Kenapa Banyak Pelanggan Memilih Bengkel Las Kami di ${blogLocation.title}?`;
  const primaryDisplayTitle = primaryContentHeading?.title || primaryTitle;
  const primaryAnchorId =
    primaryContentHeading?.id || createSlugger()(primaryTitle);
  const plainText = extractPlainText(contentWithAnchors);
  const metaDescription = toMetaDescription(
    plainText ||
      `Bengkel Las ${blogLocation.title} melayani berbagai kebutuhan las dan konstruksi.`
  );

  const serviceList: Service[] = await getAllServices();
  const customToc = [
    {
      id: "whatsapp",
      title: "Hubungi via WhatsApp",
      href: "https://wa.me/6281283993386",
      external: true,
    },
    { id: primaryAnchorId, title: primaryDisplayTitle },
    { id: "area-layanan", title: "Area layanan" },
    {
      id: "layanan-terkait",
      title: "Jasa Kami / Layanan Terkait",
    },
    {
      id: "jenis-besi",
      title: "Jenis-jenis Besi Berkualitas dari Indri Teknik Las",
    },
  ];

  return (
    <div className="min-h-screen">
      <Script
        id="blog-breadcrumb-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://bengkellasindriteknik.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://bengkellasindriteknik.com/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: blogLocation.title,
                item: canonicalUrl,
              },
            ],
          }),
        }}
      />
      <Script
        id="blog-article-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blogLocation.title,
            description: metaDescription,
            image: thumbnailUrl || undefined,
            datePublished: blogLocation.createdAt,
            dateModified: blogLocation.updatedAt || blogLocation.createdAt,
            author: {
              "@type": "Organization",
              name: "Indri Teknik Las Team",
            },
            publisher: {
              "@type": "Organization",
              name: "Indri Teknik Las",
            },
            mainEntityOfPage: canonicalUrl,
          }),
        }}
      />
      <header className="bg-gray-50">
        <div className="page-container page-header">
          <nav aria-label="Breadcrumb" className="mb-6">
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
                  <BreadcrumbPage>{blogLocation.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mx-auto max-w-4xl">
            {blogLocation.title}
          </h1>
        </div>
      </header>

      <main className="page-container page-section page-stack">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-8 items-start">
          <article className="mx-auto max-w-4xl page-stack">
            <header className="text-sm text-gray-700">
              <div className="flex flex-wrap items-center gap-2">
                <time dateTime={new Date(blogLocation.createdAt).toISOString()}>
                  {formatDate(blogLocation.createdAt)}
                </time>
                <span className="h-1 w-1 bg-gray-300" aria-hidden="true" />
                <span>Indri Teknik Las Team</span>
                <span className="h-1 w-1 bg-gray-300" aria-hidden="true" />
                <span className="text-gray-500">Waktu Membaca 3 Menit</span>
              </div>
            </header>

            <figure>
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={blogLocation.title}
                  width={960}
                  height={640}
                  loading="eager"
                  className="object-contain w-full"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-2xl h-96" />
              )}

              <figcaption className="sr-only">{blogLocation.title}</figcaption>
          </figure>

          {customToc.length ? (
            <nav
              className="mt-4 lg:hidden bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
              aria-label="Daftar isi artikel"
            >
              <h2 className="text-base font-semibold text-gray-900">Daftar Isi</h2>
              <ol className="mt-3 space-y-2 text-sm text-gray-700">
                {customToc.map((item) => {
                  const href = item.href || `#${item.id}`;
                  const isExternal = Boolean(item.external);

                  return (
                    <li key={item.id}>
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="block text-blue-600 underline underline-offset-4 hover:text-blue-700"
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          ) : null}

          {!primaryContentHeading ? (
            <div id={primaryAnchorId} className="h-0" aria-hidden="true" />
          ) : null}

          <section
            id="area-layanan"
            className="bg-gray-50 border border-gray-200 rounded-2xl p-4 md:p-5 space-y-2"
          >
            <h2 className="text-lg font-semibold text-gray-900">Area Layanan</h2>
            <p className="text-gray-700 leading-relaxed">
              Indri Teknik Las siap melayani kawasan {blogLocation.title} dan
              sekitarnya dengan tim yang berpengalaman, mulai dari survei lokasi
              hingga pemasangan rapi sesuai permintaan Anda.
            </p>
          </section>

          <div>
            <ServiceBlocksRenderer content={contentWithAnchors} />
          </div>
        </article>

        {customToc.length ? (
          <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
            <div className="bg-white border border-gray-200 p-5 rounded-2xl space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Daftar Isi</h2>
              <nav aria-label="Daftar isi artikel">
                <ol className="space-y-2 text-sm text-gray-700">
                  {customToc.map((item) => {
                    const href = item.href || `#${item.id}`;
                    const isExternal = Boolean(item.external);

                    return (
                    <li key={item.id}>
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="block text-blue-600 underline underline-offset-4 hover:text-blue-700"
                      >
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
              </nav>
            </div>
          </aside>
        ) : null}
        </div>

        <section aria-labelledby="layanan-terkait">
          <header className="mb-4">
            <h2 id="layanan-terkait" className="text-xl font-semibold text-gray-900">
              Layanan Terkait
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceList.map((service) => {
              const href = service.slug
                ? `/blog/${blogLocation.slug}/${service.slug}`
                : "/jasa-las";
              const imgUrl = service.thumbnail?.url
                ? process.env.STRAPI_URL + service.thumbnail.url
                : null;

              return (
                <Link
                  key={service.id}
                  href={href}
                  className="group relative overflow-hidden bg-gray-100"
                >
                  {imgUrl ? (
                    <div className="relative w-full h-64 md:h-72">
                      <Image
                        src={imgUrl}
                        alt={service.title}
                        width={500}
                        height={400}
                        className="object-cover w-full h-full"
                        loading="eager"
                      />
                      <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm text-white p-3">
                        <h3 className="text-lg md:text-xl font-semibold">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-64 md:h-72 bg-gray-200" />
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="jasa-kami">
          <header className="mb-4">
            <h2 id="jasa-kami" className="text-2xl font-bold mb-2 text-gray-800">
              Jasa Kami
            </h2>
            <p className="text-gray-600">
              Jelajahi layanan las yang mendukung kebutuhan pagar, kanopi,
              railing, dan konstruksi ringan di area Anda.
            </p>
          </header>

          <div className="divide-y divide-gray-200">
            {serviceList.map((service) => {
              const listNodes = (service.description ?? [])
                .filter((b) => b.type === "list")
                .slice(1, 2);
              const listItems = listNodes
                .flatMap((node) =>
                  (node.children ?? []).map((child) =>
                    extractPlainText(child.children)
                  )
                )
                .filter(Boolean);
              const summary = toMetaDescription(
                getFirstParagraphText(service.description),
                150
              );
              const serviceHref = service.slug
                ? `/blog/${blogLocation.slug}/${service.slug}`
                : "/jasa-las";

              return (
                <article key={service.id} className="py-6 first:pt-0">
                  <header>
                    <h3 className="text-xl font-semibold text-gray-900">
                      <Link
                        href={serviceHref}
                        className="hover:underline underline-offset-4"
                      >
                        {service.title}
                      </Link>
                    </h3>
                  </header>
                  {summary ? (
                    <p className="text-gray-700 mt-2 leading-relaxed">
                      {summary}
                    </p>
                  ) : null}
                  {listItems.length ? (
                    <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                      {listItems.map((item, index) => (
                        <li key={`${service.id}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-3">
                    <Link
                      href={serviceHref}
                      className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-700"
                    >
                      Detail layanan
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="jenis-besi">
          <header className="text-center mb-8">
            <h2
              id="jenis-besi"
              className="text-3xl font-bold mb-3 text-gray-800"
            >
              Jenis-jenis Besi Berkualitas dari Indri Teknik Las
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Setiap proyek membutuhkan material yang berbeda. Kami membantu
              memilih jenis besi yang tepat agar pagar, kanopi, railing, dan
              konstruksi ringan tetap kuat, rapi, dan awet di iklim tropis.
            </p>
          </header>

          <div className="space-y-8">
            {/* Besi Hollow */}
            <article className="pb-6 border-b border-gray-200 last:border-b-0">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Besi Hollow Galvalume
              </h3>
              <p className="text-gray-700">
                Hollow galvalume adalah besi hollow galvanis dengan lapisan
                aluminium-zinc yang <strong>tahan karat</strong>,{" "}
                <strong>tahan cuaca</strong>, dan{" "}
                <strong>mudah perawatan</strong>. Material ini ringan namun
                tetap kuat, cocok untuk desain modern dengan garis rapi.
              </p>
              <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                <li>Rangka kanopi dan atap ringan</li>
                <li>Pagar minimalis dan railing balkon</li>
                <li>Partisi atau rangka plafon</li>
              </ul>
            </article>

            {/* Besi Vial */}
            <article className="pb-6 border-b border-gray-200 last:border-b-0">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Besi Vial
              </h3>
              <p className="text-gray-700">
                Besi vial menggunakan batang besi solid dengan susunan vertikal
                yang rapi. Karakternya <strong>kokoh</strong>,{" "}
                <strong>tidak mudah bengkok</strong>, dan memberi{" "}
                <strong>keamanan tinggi</strong> tanpa mengurangi tampilan
                elegan.
              </p>
              <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                <li>Pagar rumah dan gerbang utama</li>
                <li>Teralis jendela atau area servis</li>
                <li>Railing tangga dan balkon</li>
              </ul>
            </article>

            {/* Besi Galvanis */}
            <article className="pb-6 border-b border-gray-200 last:border-b-0">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Besi Galvanis
              </h3>
              <p className="text-gray-700">
                Besi galvanis menggunakan plat dengan lapisan pelindung sehingga{" "}
                <strong>tahan korosi</strong> dan stabil di cuaca ekstrem.
                Material ini cocok untuk tampilan pagar tertutup yang rapi dan
                privasi yang lebih baik.
              </p>
              <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                <li>Pagar tertutup dan panel pelindung</li>
                <li>Pintu geser atau pintu lipat</li>
                <li>Area industri, ruko, dan gudang</li>
              </ul>
            </article>

            {/* BRC */}
            <article className="pb-6 border-b border-gray-200 last:border-b-0">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">BRC</h3>
              <p className="text-gray-700">
                BRC adalah wiremesh dengan las otomatis sehingga ukuran grid
                rapi dan konsisten. Ujung roll top menambah{" "}
                <strong>keamanan</strong> dan <strong>kekuatan</strong>, sekaligus
                mempercepat pemasangan di lapangan.
              </p>
              <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                <li>Perumahan, sekolah, dan fasilitas publik</li>
                <li>Pabrik, gudang, dan area parkir</li>
                <li>Pagar taman atau pembatas lahan</li>
              </ul>
            </article>

            {/* Lain-lain */}
            <article className="pb-6 border-b border-gray-200 last:border-b-0">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Lain-lain
              </h3>
              <p className="text-gray-700">
                Untuk proyek khusus, kami juga menangani material lain sesuai
                kebutuhan desain, ukuran, dan tingkat keamanan yang Anda
                butuhkan.
              </p>
              <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                <li>Besi siku, UNP, CNP, dan plat sesuai spesifikasi</li>
                <li>Material custom setelah survei dan konsultasi</li>
              </ul>
            </article>
          </div>
        </section>

        <section aria-label="Konsultasi" className="pb-2">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Butuh Rekomendasi Material Pagar yang Tepat?
              </h2>
              <p className="text-gray-700 mt-2">
                Konsultasi langsung dengan tim Indri Teknik Las untuk menentukan
                material, ukuran, dan desain yang sesuai kebutuhan proyek Anda.
              </p>
            </div>
            <a
              href="https://wa.me/6281283993386"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Konsultasi via WhatsApp"
              className="inline-flex items-center justify-center rounded-full bg-green-500 text-black px-6 py-3 font-semibold shadow-lg hover:bg-green-600 transition"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        </section>

        <footer aria-label="Bagikan artikel">
          <SocialShare
            url={typeof window !== "undefined" ? window.location.href : ""}
          />
        </footer>
      </main>
    </div>
  );
}
