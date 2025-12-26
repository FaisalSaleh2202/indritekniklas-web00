// src/lib/strapi/client.ts
import type { StrapiResponse } from "./types";

const STRAPI_BASE_URL =
  process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL;
const DEFAULT_REVALIDATE_SECONDS = 60 * 60;

const buildStrapiUrl = (endpoint: string) => {
  if (!STRAPI_BASE_URL) {
    throw new Error("Missing STRAPI_URL or NEXT_PUBLIC_STRAPI_URL.");
  }

  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return new URL(`/api${normalizedEndpoint}`, STRAPI_BASE_URL).toString();
};

export async function fetchFromStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = buildStrapiUrl(endpoint);
  const headers = new Headers(options.headers);
  const token = process.env.STRAPI_API_TOKEN;

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Strapi error ${response.status} (${response.statusText}): ${text}`
    );
  }

  return response.json();
}
