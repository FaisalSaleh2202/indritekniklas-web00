// src/lib/strapi/blog/blog.service.ts
import { fetchFromStrapi } from "../client";
import { POPULATE_IMAGE, SORT_DATE_DESC } from "../queries";
import type { Blog } from "../types";

const endpoint = "/blogs";

export const getAllBlogs = async (): Promise<Blog[]> => {
  const res = await fetchFromStrapi<Blog>(
    `${endpoint}?${POPULATE_IMAGE}&${SORT_DATE_DESC}`
  );
  return Array.isArray(res.data) ? res.data : [res.data];
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  const res = await fetchFromStrapi<Blog>(
    `${endpoint}?filters[slug][$eq]=${slug}&${POPULATE_IMAGE}`
  );
  return Array.isArray(res.data) ? (res.data[0] ?? null) : res.data;
};
