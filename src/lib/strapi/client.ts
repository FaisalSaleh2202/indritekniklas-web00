// src/lib/strapi/client.ts
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import type { StrapiResponse } from "./types"; // ini yang paling sering lupa!
const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
export async function fetchFromStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${NEXT_PUBLIC_STRAPI_URL}/api${endpoint}`;

  const response = await fetch(url, {
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
    throw new Error(`Strapi error ${response.status}: ${text}`);
  }

  return response.json();
}
