import { fetchFromStrapi } from "../client";
import { toArray } from "../normalize";
import type { ServiceLocation } from "../types";

const endpoint = "/service-locations";

const buildServiceLocationListQuery = () => {
  const params = new URLSearchParams();
  params.set("populate", "thumbnail");
  params.set("sort", "publishedAt:desc");
  return params.toString();
};

const buildServiceLocationSlugQuery = (slug: string) => {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "*");
  return params.toString();
};

export const getAllServiceLocations = async (): Promise<ServiceLocation[]> => {
  const res = await fetchFromStrapi<ServiceLocation>(
    `${endpoint}?${buildServiceLocationListQuery()}`
  );
  return toArray(res.data);
};

export const getServiceLocationBySlug = async (
  slug: string
): Promise<ServiceLocation | null> => {
  const res = await fetchFromStrapi<ServiceLocation>(
    `${endpoint}?${buildServiceLocationSlugQuery(slug)}`
  );
  const data = toArray(res.data)[0];
  // Kalau tidak ketemu return null
  if (!data) return null;

  return data;
};
