// app/blog/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { getBlogBySlug } from "@/lib/strapi/blog/blog.service";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const revalidate = 3600;

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogs = await getBlogBySlug(slug);
  const blog = Array.isArray(blogs) ? blogs[0] : blogs;
  if (!blog) notFound();

  return (
    <article className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8">{blog.title}</h1>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
