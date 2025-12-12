export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import { fetchFromStrapi } from "../client";
import { SORT_DATE_DESC } from "../queries";
import { Service } from "../types";

const endpoint = "/service-locations";

export const getAllServiceLocations = async (): Promise<Service[]> => {
  const res = await fetchFromStrapi<Service>(
    `${endpoint}?populate=thumbnail&${SORT_DATE_DESC}`
  );
  return Array.isArray(res.data) ? res.data : [res.data];
};

export const getServiceLocationBySlug = async (
  slug: string
): Promise<Service | null> => {
  const res = await fetchFromStrapi<Service>(
    `${endpoint}?filters[slug][$eq]=${slug}&populate=*`
  );
  const data = Array.isArray(res.data) ? res.data[0] : res.data;
  // Kalau tidak ketemu → return null
  if (!data) return null;

  return data;
};
