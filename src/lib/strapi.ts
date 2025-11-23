// src/lib/strapi.ts

// Karena data Anda flat (bukan data.attributes), kita pakai tipe langsung
export type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  publishedTime?: string | null;
  createdAt: string;
  updatedAt: string;
};

// Return-nya bisa Blog atau Blog[] → pakai union
export type StrapiResponse<T> = {
  data: T | T[];
  meta?: any;
};

export async function fetchFromStrapi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  if (!process.env.STRAPI_URL || !process.env.STRAPI_API_TOKEN) {
    throw new Error("STRAPI_URL atau STRAPI_API_TOKEN tidak ada di .env");
  }

  const url = `${process.env.STRAPI_URL}/api${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: { revalidate: 3600 },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return response.json();
}

// Helper diperbaiki → return Blog | Blog[]
// export const getAllBlogs = () => fetchFromStrapi<Blog>("/blogs");
export const getAllBlogs = () => fetchFromStrapi<Blog>("/blogs?populate=image");

export const getBlogBySlug = (slug: string) =>
  fetchFromStrapi<Blog>(`/blogs?filters[slug][$eq]=${slug}`);
