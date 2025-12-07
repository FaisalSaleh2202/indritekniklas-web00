// src/lib/strapi/client.ts
import type { StrapiResponse } from "./types"; // ini yang paling sering lupa!
const STRAPI_URL = process.env.STRAPI_URL || "http://31.97.50.253:1337";
export async function fetchFromStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`;

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
