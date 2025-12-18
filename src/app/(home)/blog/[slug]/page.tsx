// app/blog/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
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
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
// export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const serviceLocations = await getServiceLocationBySlug(slug);

  if (!serviceLocations) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  // const img = service.thumbnail?.url
  //   ? process.env.NEXT_PUBLIC_STRAPI_URL + service.thumbnail.url
  //   : undefined;

  return {
    title: {
      default: `${serviceLocations.title}`,
      template: "%s - las terdekat",
    },
    alternates: {
      canonical: `https://bengkellasindriteknik.com/blog/${serviceLocations.slug}`,
    },
    robots:
      "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    description: `Bengkel Las ${serviceLocations.title} Bengkel las kami menyediakan layanan pembuatan Jendela yang kuat, aman, dan estetik untuk kebutuhan rumah, ruko, perumahan, maupun industri.`,
    openGraph: {
      title: `Bengkel Las ${serviceLocations.title}`,
      description: `Bengkel Las ${serviceLocations.title} Bengkel las kami menyediakan layanan pembuatan Jendela yang kuat, aman, dan estetik untuk kebutuhan rumah, ruko, perumahan, maupun industri..`,
      type: "article",
      locale: "id",
      url: `https://bengkellasindriteknik.com/blog/${serviceLocations.slug}`,
      siteName: `Bengkel Las ${serviceLocations.title}`,
    },
    metadataBase: new URL(
      `https://bengkellasindriteknik.com/blog/${serviceLocations.slug}`
    ),
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogsLocations = await getServiceLocationBySlug(slug);
  const blogLocation = Array.isArray(blogsLocations)
    ? blogsLocations[0]
    : blogsLocations;
  if (!blogLocation) notFound();

  const list = blogLocation.description
    ?.filter((b: any) => b.type === "list")
    .slice(0, 4);

  const heading2 = blogLocation.description
    ?.filter((b: any) => b.type === "heading" && b.level === 2)
    .slice(0, 1);

  const openingParagraph = blogLocation.description
    ?.filter((b: any) => b.type === "paragraph")
    .slice(0, 2);

  const thumbnailUrl = blogLocation.thumbnail?.[0]?.url
    ? process.env.STRAPI_URL + blogLocation.thumbnail[0].url
    : null;

  const serviceList = await getAllServices();

  return (
    <div className="min-h-screen">
      <header className="py-6 bg-gray-50">
        <div className="mx-auto px-6 mb-6">
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
                  <Link href="#">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blogLocation.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {blogLocation.title}
          </h1>
        </div>
      </header>
      <div className="md:w-3/4 mx-auto">
        {/* META */}
        <section className="px-4 pt-3 text-sm text-gray-700">
          <span>{formatDate(blogLocation.createdAt)}</span>,{" "}
          <span>Indri Teknik Las Team</span>
          <br />
          <span className="text-gray-500">Waktu Membaca 3 Menit</span>
        </section>

        {/* CONTENT */}
        <main className="py-6 px-4">
          <article className="grid gap-12">
            {/* IMAGE */}
            <figure>
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={blogLocation.title}
                  width={600}
                  height={400}
                  loading="eager"
                  className="shadow-md object-contain w-full"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-2xl h-96" />
              )}

              <figcaption className="sr-only">{blogLocation.title}</figcaption>
            </figure>

            {/* OPENING PARAGRAPH */}
            <div>
              <ServiceBlocksRenderer content={openingParagraph} />
            </div>
          </article>
        </main>

        <section className="px-3 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceList.map((service: any) => (
              <article
                key={service.id}
                className="relative overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Thumbnail */}
                {service.thumbnail?.url && (
                  <div className="relative w-full h-64 md:h-72">
                    <Image
                      src={process.env.STRAPI_URL + service.thumbnail.url}
                      alt={service.title}
                      width={500}
                      height={400}
                      className="object-cover w-full h-full"
                      loading="eager"
                    />

                    {/* Title overlay */}
                    <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm text-white p-3">
                      <h3 className="text-lg md:text-xl font-semibold">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="px-3">
          <header>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Jasa Kami</h2>
          </header>

          <div className="space-y-6">
            {serviceList.map((service: any) => {
              const list =
                service.description
                  ?.filter((b: any) => b.type === "list")
                  .slice(1, 2) || [];

              return (
                <article
                  key={service.id}
                  className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
                >
                  <header>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                  </header>

                  <ul className="space-y-2 text-gray-700 list-disc list-inside">
                    {list.map((l: any, i: number) =>
                      l.children.map((li: any, idx: number) => (
                        <li key={`${i}-${idx}`}>
                          {li.children.map((t: any) => t.text).join("")}
                        </li>
                      ))
                    )}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="px-3 py-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Jenis-jenis Besi Berkualitas dari Indri Teknik Las
          </h2>

          <div className="space-y-6">
            {/* Besi Hollow */}
            <article className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Besi Hollow – Hollow Galvalume
              </h3>
              <p className="text-gray-700 mb-2">
                Besi Hollow Galvalume menggunakan material hollow galvanis
                berlapis aluminium-zinc yang <strong>tahan karat</strong>,{" "}
                <strong>tahan cuaca</strong>, dan{" "}
                <strong>minim perawatan</strong>. Dengan karakter ringan namun
                kuat, material ini menjadi pilihan ideal untuk{" "}
                <strong>rumah minimalis</strong>, <strong>perumahan</strong>,
                maupun <strong>bangunan komersial</strong> dengan tampilan
                modern dan bersih.
              </p>
            </article>

            {/* Besi Vial */}
            <article className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Besi Vial
              </h3>
              <p className="text-gray-700 mb-2">
                Besi Vial terbuat dari material besi solid berbentuk batang
                vertikal yang tersusun rapi. Material ini dikenal sangat{" "}
                <strong>kokoh</strong>, <strong>tidak mudah bengkok</strong>,
                dan memberikan <strong>tingkat keamanan tinggi</strong>.
                Desainnya tegas dan simetris membuat Besi Vial tampil{" "}
                <strong>elegan</strong> dan cocok untuk{" "}
                <strong>rumah modern</strong>, <strong>ruko</strong>, atau{" "}
                <strong>area perkantoran</strong>.
              </p>
            </article>

            {/* Besi Galvanis */}
            <article className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Besi Galvanis
              </h3>
              <p className="text-gray-700 mb-2">
                Besi Galvanis menggunakan lembaran plat yang diberi lapisan
                galvanis sehingga{" "}
                <strong>tahan terhadap korosi dan karat</strong>. Material ini
                kuat menghadapi cuaca ekstrem dan ideal untuk privasi atau
                tampilan tertutup yang rapi. Besi Galvanis sering dipilih untuk{" "}
                <strong>area industri</strong>, <strong>gudang</strong>,{" "}
                <strong>ruko</strong>, hingga{" "}
                <strong>rumah minimalis modern</strong>.
              </p>
            </article>

            {/* BRC */}
            <article className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">BRC</h3>
              <p className="text-gray-700 mb-2">
                BRC dibuat dari besi U-50 dengan proses las otomatis,
                menghasilkan struktur yang <strong>kuat dan simetris</strong>.
                Bagian ujung yang dibengkokkan (roll top) menambah{" "}
                <strong>kekuatan dan keamanan</strong>. Material ini banyak
                digunakan untuk <strong>proyek perumahan</strong>,{" "}
                <strong>pabrik</strong>, <strong>sekolah</strong>,{" "}
                <strong>fasilitas publik</strong>, dan area komersial yang
                membutuhkan keamanan stabil dengan biaya ekonomis.
              </p>
            </article>

            {/* Lain-lain */}
            <article className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Lain-lain
              </h3>
              <p className="text-gray-700 mb-2">
                Kami juga menyediakan jenis besi lainnya sesuai permintaan,
                disesuaikan dengan kebutuhan desain, ukuran, dan tingkat
                keamanan Anda.
              </p>
            </article>
          </div>
        </section>

        {/* Social Share */}
        <SocialShare
          url={typeof window !== "undefined" ? window.location.href : ""}
        />
      </div>
    </div>
  );
}
