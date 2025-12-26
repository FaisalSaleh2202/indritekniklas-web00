import { fetchFromStrapi } from "../client";
import { toArray } from "../normalize";
import type { Service } from "../types";

const endpoint = "/services";

const buildServiceListQuery = () => {
  const params = new URLSearchParams();
  params.set("populate", "thumbnail");
  params.set("sort", "publishedAt:desc");
  return params.toString();
};

const buildServiceSlugQuery = (slug: string) => {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");
  return params.toString();
};

export const getAllServices = async (): Promise<Service[]> => {
  const res = await fetchFromStrapi<Service>(
    `${endpoint}?${buildServiceListQuery()}`
  );
  return toArray(res.data);
};

export const getServiceBySlug = async (
  slug: string
): Promise<Service | null> => {
  const res = await fetchFromStrapi<Service>(
    `${endpoint}?${buildServiceSlugQuery(slug)}`
  );

  const data = toArray(res.data)[0];

  // Kalau tidak ketemu return null
  if (!data) return null;

  return data;
};
