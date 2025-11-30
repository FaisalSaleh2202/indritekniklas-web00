// app/layanan/[slug]/page.tsx
import ServiceBlocksRenderer from "@/components/ServiceBlocksRenderer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getAllServices,
  getServiceBySlug,
} from "@/lib/strapi/service/service.service";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  console.log(service);

  if (!service) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  const img = service.thumbnail?.url
    ? process.env.NEXT_PUBLIC_STRAPI_URL + service.thumbnail.url
    : undefined;

  return {
    title: `${service.title} - Indri Teknik Las`,
    description: service.meta_description || `Detail layanan ${service.title}`,
    openGraph: {
      images: img ? [{ url: img }] : [],
    },
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

  const thumbnailUrl = service.thumbnail?.url
    ? process.env.NEXT_PUBLIC_STRAPI_URL + service.thumbnail.url
    : null;

  return (
    <div className="min-h-screen">
      {/* HERO TITLE */}

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl md:mx-auto mx-6 mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {service.short_description}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl md:mx-auto mx-6 py-3">
        <span> {formatDate(service.createdAt)}</span>,{" "}
        <span>Indri Teknik Las Team</span>
      </section>

      {/* CONTENT */}
      <section className="py-6 max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {service.thumbnail ? (
            <Image
              src={process.env.STRAPI_URL + service.thumbnail.url}
              alt={service.title}
              width={600}
              height={400}
              className="rounded-2xl shadow-xl object-cover"
              loading="eager"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-2xl h-96" />
          )}

          <ServiceBlocksRenderer content={service.description} />
        </div>
      </section>
    </div>
  );
}
