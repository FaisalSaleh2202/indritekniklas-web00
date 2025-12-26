// app/blog/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { getAllServiceLocations } from "@/lib/strapi/service-location/service-location.service";
import type { ServiceLocation } from "@/lib/strapi/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// export const revalidate = 3600;

export default async function BlogPage() {
  const serviceLocations = await getAllServiceLocations();

  if (!serviceLocations || serviceLocations.length === 0) {
    return (
      <main className="page-container page-section">
        <header className="page-header text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Blog</h1>
          <p className="mt-3 text-gray-600">Belum ada artikel saat ini.</p>
        </header>
      </main>
    );
  }

  const latest = serviceLocations[0];
  const topReads = serviceLocations.slice(1, 4);

  const getImageUrl = (blog: ServiceLocation) => {
    const thumbnail = blog.thumbnail?.[0];
    return thumbnail ? `${process.env.STRAPI_URL}${thumbnail.url}` : null;
  };

  return (
    <main className="page-container page-section">
      <header className="page-header">
        <h1 className="text-3xl font-semibold text-gray-900">Blog</h1>
        <p className="mt-3 text-gray-600">
          Artikel terbaru seputar layanan las, material besi, dan tips perawatan.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* THE LATEST */}
          <div className="md:col-span-2">
            <h2 id="the-latest" className="text-2xl font-semibold mb-6 text-gray-900">
              Artikel Terbaru
            </h2>
            <Link
              href={`/blog/${latest.slug}`}
              className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {getImageUrl(latest) ? (
                <Image
                  src={getImageUrl(latest)!}
                  alt={latest.title}
                  width={800}
                  height={450}
                  className="w-full object-contain"
                  priority
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {latest.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {latest.title.replace(/<[^>]*>/g, "").slice(0, 250)}...
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(latest.createdAt || latest.createdAt)}
                </p>
              </div>
            </Link>
          </div>

          {/* TOP READS */}
          <div>
            <h2 id="top-reads" className="text-2xl font-semibold mb-6 text-gray-900">
              Top Reads
            </h2>
            <div className="space-y-4">
              {topReads.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="flex gap-4 items-start bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow"
                >
                  {getImageUrl(blog) ? (
                    <Image
                      src={getImageUrl(blog)!}
                      alt={blog.title}
                      width={120}
                      height={80}
                      className="rounded-lg object-cover w-28 h-20 flex-shrink-0"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-lg w-28 h-20 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm leading-tight line-clamp-2 text-gray-800">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(blog.createdAt || blog.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
      </div>
    </main>
  );
}
