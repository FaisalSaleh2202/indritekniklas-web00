// src/lib/strapi/blog/blog.service.ts
import { fetchFromStrapi } from "../client";
import { toArray } from "../normalize";
import type { Blog } from "../types";

const endpoint = "/blogs";

const buildBlogListQuery = () => {
  const params = new URLSearchParams();
  params.set("populate", "image");
  params.set("sort", "publishedAt:desc");
  return params.toString();
};

const buildBlogSlugQuery = (slug: string) => {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "image");
  return params.toString();
};

export const getAllBlogs = async (): Promise<Blog[]> => {
  const res = await fetchFromStrapi<Blog>(
    `${endpoint}?${buildBlogListQuery()}`
  );
  return toArray(res.data);
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  const res = await fetchFromStrapi<Blog>(
    `${endpoint}?${buildBlogSlugQuery(slug)}`
  );
  return toArray(res.data)[0] ?? null;
};
