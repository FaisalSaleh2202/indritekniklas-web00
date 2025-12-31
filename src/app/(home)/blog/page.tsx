// app/blog/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import type { Metadata } from "next";
import { getAllServiceLocations } from "@/lib/strapi/service-location/service-location.service";
import { getAllServices } from "@/lib/strapi/service/service.service";
import type { Service, ServiceLocation, StrapiMedia } from "@/lib/strapi/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog - Indri Teknik Las",
  description:
    "Artikel terbaru seputar layanan las, material besi, dan tips perawatan dari Indri Teknik Las.",
  alternates: {
    canonical: "https://bengkellasindriteknik.com/blog",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bengkellasindriteknik.com/blog",
    siteName: "Indri Teknik Las",
    title: "Blog - Indri Teknik Las",
    description:
      "Artikel terbaru seputar layanan las, material besi, dan tips perawatan dari Indri Teknik Las.",
  },
  twitter: {
    card: "summary",
    title: "Blog - Indri Teknik Las",
    description:
      "Artikel terbaru seputar layanan las, material besi, dan tips perawatan dari Indri Teknik Las.",
  },
};

type TabKey = "all" | "layanan" | "lokasi";
type SearchParams = Record<string, string | string[] | undefined>;

type TrendingItem = {
  key: string;
  type: "layanan" | "lokasi";
  title: string;
  href: string;
  createdAt: string;
  imageUrl: string | null;
};

function resolveStrapiMediaUrl(
  media: StrapiMedia | undefined | null,
  strapiUrl: string
): string | null {
  const url =
    media?.formats?.small?.url ??
    media?.formats?.medium?.url ??
    media?.formats?.large?.url ??
    media?.url ??
    null;
  return url ? `${strapiUrl}${url}` : null;
}

function resolveServiceLocationImageUrl(
  location: ServiceLocation,
  strapiUrl: string
): string | null {
  const first = location.thumbnail?.[0] ?? null;
  return resolveStrapiMediaUrl(first, strapiUrl);
}

function toTrendingFromService(
  service: Service,
  strapiUrl: string
): TrendingItem {
  return {
    key: `service-${service.id}`,
    type: "layanan",
    title: service.title,
    href: service.slug ? `/jasa-las/${service.slug}` : "/jasa-las",
    createdAt: service.createdAt,
    imageUrl: resolveStrapiMediaUrl(service.thumbnail, strapiUrl),
  };
}

function toTrendingFromLocation(
  location: ServiceLocation,
  strapiUrl: string
): TrendingItem {
  return {
    key: `location-${location.id}`,
    type: "lokasi",
    title: location.title,
    href: location.slug ? `/blog/${location.slug}` : "/blog",
    createdAt: location.createdAt,
    imageUrl: resolveServiceLocationImageUrl(location, strapiUrl),
  };
}

function getTab(
  searchParams?: Record<string, string | string[] | undefined>
): TabKey {
  const raw = searchParams?.tab;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === "layanan" || value === "lokasi" || value === "all") return value;
  return "all";
}

function TabLink({
  active,
  href,
  label,
}: {
  active: boolean;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "px-3 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap",
        active
          ? "border-teal-600 text-teal-700"
          : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-200",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const tab = getTab(resolvedSearchParams);

  const [serviceLocations, services] = await Promise.all([
    getAllServiceLocations(),
    getAllServices(),
  ]);

  const strapiUrl =
    process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

  const locationItems = (serviceLocations ?? [])
    .map((item) => toTrendingFromLocation(item, strapiUrl))
    .slice(0, 20);
  const serviceItems = (services ?? [])
    .map((item) => toTrendingFromService(item, strapiUrl))
    .slice(0, 20);

  const items: TrendingItem[] =
    tab === "layanan"
      ? serviceItems
      : tab === "lokasi"
        ? locationItems
        : [...locationItems.slice(0, 10), ...serviceItems.slice(0, 10)];

  if (!items.length) {
    return (
      <main className="page-container page-section">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
          <header className="text-center">
            <h1 className="text-4xl font-semibold text-slate-900">Blogs</h1>
            <div className="mt-6 border-b border-slate-200">
              <nav className="flex items-center justify-center gap-2 overflow-auto">
                <TabLink active href="/blog?tab=all" label="Semua" />
                <TabLink active={false} href="/blog?tab=layanan" label="Layanan" />
                <TabLink active={false} href="/blog?tab=lokasi" label="Lokasi" />
              </nav>
            </div>
          </header>

          <p className="mt-10 text-center text-slate-600">
            Belum ada konten saat ini.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container page-section">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-slate-900">Blogs</h1>

          <div className="mt-6 border-b border-slate-200">
            <nav className="flex items-center justify-center gap-2 overflow-auto">
              <TabLink active={tab === "all"} href="/blog?tab=all" label="Semua" />
              <TabLink
                active={tab === "layanan"}
                href="/blog?tab=layanan"
                label="Layanan"
              />
              <TabLink
                active={tab === "lokasi"}
                href="/blog?tab=lokasi"
                label="Lokasi"
              />
            </nav>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group flex items-start justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
            >
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-semibold leading-snug text-slate-900 line-clamp-2">
                  {item.title}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                  <span className="capitalize">{item.type}</span>
                  <span aria-hidden="true">•</span>
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>

              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={112}
                  height={80}
                  className="h-20 w-28 flex-shrink-0 rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-20 w-28 flex-shrink-0 rounded-xl bg-slate-200" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
