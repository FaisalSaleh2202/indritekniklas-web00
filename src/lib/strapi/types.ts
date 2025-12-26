export type StrapiMeta = Record<string, unknown>;

export type StrapiResponse<T> = {
  data: T | T[];
  meta?: StrapiMeta;
};

export type StrapiMediaFormat = {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  mime?: string;
};

export type StrapiMedia = {
  id: number;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, StrapiMediaFormat>;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
};

export type RichTextNode = {
  type?: string;
  level?: number;
  text?: string;
  children?: RichTextNode[];
  [key: string]: unknown;
};

export type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  image?: StrapiMedia | null;
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
  description?: RichTextNode[];
  meta_title?: string;
  meta_description?: string;
  thumbnail?: StrapiMedia | null;
  createdAt: string;
  updatedAt: string;
};

export type ServiceLocation = {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  description?: RichTextNode[];
  meta_title?: string;
  meta_description?: string;
  thumbnail?: StrapiMedia[] | null;
  createdAt: string;
  updatedAt: string;
};
