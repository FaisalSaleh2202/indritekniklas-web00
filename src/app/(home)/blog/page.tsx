import { NavigationMenu } from "@/components/NavigationMenu";
import { getAllBlogs } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

// Helper aman untuk format tanggal
const formatDate = (value: any) => {
  if (!value) return "No date";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "No date";
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default async function BlogPage() {
  const { data } = await getAllBlogs();
  const blogs = Array.isArray(data) ? data : [];

  if (blogs.length === 0) {
    return <p className="text-center py-20">Belum ada artikel.</p>;
  }

  const latest = blogs[0];
  const topReads = blogs.slice(1, 4);

  const getImage = (blog: any) => {
    const img = blog.image?.[0];
    return img ? `${process.env.STRAPI_URL}${img.url}` : null;
  };

  return (
    <>
      <NavigationMenu />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT — THE LATEST */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-5">The Latest</h2>
            <Link
              href={`/blog/${latest.slug}`}
              className="block bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {getImage(latest) && (
                <Image
                  src={getImage(latest)!}
                  alt={latest.title}
                  width={800}
                  height={450}
                  className="w-full h-[300px] object-cover"
                />
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{latest.title}</h3>

                <p className="text-gray-600 line-clamp-3 mb-4">
                  {latest.content.replace(/<[^>]*>/g, "").slice(0, 200)}...
                </p>

                <p className="text-sm text-gray-500">
                  {formatDate(latest.publishedTime)}
                </p>
              </div>
            </Link>
          </div>

          {/* RIGHT — TOP READS */}
          <div>
            <h2 className="text-2xl font-semibold mb-5">Top Reads</h2>

            <div className="space-y-5">
              {topReads.map((blog: any) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="flex gap-4 items-center bg-white rounded-xl p-3 shadow hover:shadow-md transition"
                >
                  {getImage(blog) && (
                    <Image
                      src={getImage(blog)!}
                      alt={blog.title}
                      width={120}
                      height={80}
                      className="rounded-md object-cover w-[120px] h-[80px]"
                    />
                  )}

                  <div>
                    <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                      {blog.title}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(blog.publishedTime)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
