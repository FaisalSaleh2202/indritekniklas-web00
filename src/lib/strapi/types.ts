export type StrapiResponse<T> = {
  data: T | T[];
  meta?: any;
};

export type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  publishedTime?: string | null;
  createdAt: string;
  updatedAt: string;
};

// lib/strapi/types.ts
export type Service = {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  desc?: string;
  description?: any[];
  meta_title?: string;
  meta_description: string;
  thumbnail?: {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};
