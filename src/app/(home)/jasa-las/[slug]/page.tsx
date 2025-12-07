// app/layanan/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
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
import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/lib/strapi/service/service.service";
import { formatDate } from "@/lib/utils";
import { MessageCircle, Phone } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const services = await getAllServices();
//   return services.map((service) => ({
//     slug: service.slug,
//   }));
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  // const img = service.thumbnail?.url
  //   ? process.env.NEXT_PUBLIC_STRAPI_URL + service.thumbnail.url
  //   : undefined;

  return {
    title: {
      default: `Bengkel Las ${service.title}`,
      template: "%s - las terdekat",
    },
    alternates: {
      canonical: `https://bengkellasindriteknik.com/jasa-las/${service.slug}`,
    },
    robots:
      "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    description: `Bengkel Las ${service.title} Bengkel las kami menyediakan layanan pembuatan Jendela yang kuat, aman, dan estetik untuk kebutuhan rumah, ruko, perumahan, maupun industri.`,
    openGraph: {
      title: `Bengkel Las ${service.title}`,
      description: `Bengkel Las ${service.title} Bengkel las kami menyediakan layanan pembuatan Jendela yang kuat, aman, dan estetik untuk kebutuhan rumah, ruko, perumahan, maupun industri..`,
      type: "article",
      locale: "id",
      url: `https://bengkellasindriteknik.com/jasa-las/${service.slug}`,
      siteName: `Bengkel Las ${service.title}`,
    },
    metadataBase: new URL(
      `https://bengkellasindriteknik.com/jasa-las/${service.slug}`
    ),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const list = service.description
    ?.filter((b: any) => b.type === "list")
    .slice(0, 1);

  const heading2 = service.description
    ?.filter((b: any) => b.type === "heading" && b.level === 2)
    .slice(0, 1);

  const openingParagraph = service.description
    ?.filter((b: any) => b.type === "paragraph")
    .slice(0, 2);

  // const thumbnailUrl = service.thumbnail?.url
  //   ? process.env.NEXT_PUBLIC_STRAPI_URL + service.thumbnail.url
  //   : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.meta_description || service.short_description,
    image: "https://bengkellasindriteknik.com/opengraph-image.png",
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
    url: `https://www.bengkellasindriteknik.com/layanan/${service.slug}`,
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
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <header className="py-6 bg-gray-50">
        <div className="mx-auto px-4 mb-6">
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
                  <Link href="#">Layanan</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {service.short_description}
          </h1>
        </div>
      </header>

      {/* META */}
      <section className="px-4 pt-3 text-sm text-gray-700">
        <span>{formatDate(service.createdAt)}</span>,{" "}
        <span>Indri Teknik Las Team</span>
        <br />
        <span className="text-gray-500">Waktu Membaca 3 Menit</span>
      </section>

      {/* CONTENT */}
      <main className="py-6 px-4">
        <article className="grid md:grid-cols-2 gap-12">
          {/* IMAGE */}
          <figure>
            {service.thumbnail ? (
              <Image
                src={process.env.STRAPI_URL + service.thumbnail.url}
                alt={service.title}
                width={600}
                height={400}
                className="rounded-2xl shadow-md object-cover w-full h-96"
                loading="eager"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-2xl h-96" />
            )}
            <figcaption className="sr-only">{service.title}</figcaption>
          </figure>

          {/* OPENING PARAGRAPH */}
          <div>
            <ServiceBlocksRenderer content={openingParagraph} />
            {/* BUTTON */}
            <div className="mt-6 grid">
              <span className="text-center mb-3 font-semibold text-gray-500">
                Hubungi Kami Untuk Konsultasi Kebutuhan Anda Sekarang
              </span>

              <Button
                asChild
                className="rounded-full font-light shadow-xl inline-flex items-center gap-2 bg-green-500 text-black hover:bg-green-600 transition"
              >
                <a aria-label="Hubungi via WhatsApp">
                  Phone / Whatsapp
                  <Phone aria-hidden="true" />
                  <MessageCircle aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </article>
      </main>

      {/* LIST & HEADING */}
      <section className="px-4 space-y-3">
        <ServiceBlocksRenderer content={heading2} />
        <ServiceBlocksRenderer content={list} />
      </section>

      {/* STEP + TESTIMONIAL */}
      <footer className="px-4">
        <StepToOrder />
        <Testimonial />
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  );
}
