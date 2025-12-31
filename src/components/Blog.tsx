import Image from "next/image";
import Link from "next/link";

import { getAllServices } from "@/lib/strapi/service/service.service";
import { getAllServiceLocations } from "@/lib/strapi/service-location/service-location.service";
import type {
  Service,
  ServiceLocation,
  StrapiMedia,
} from "@/lib/strapi/types";

type BlogCardItem = {
  key: string;
  title: string;
  description?: string;
  href: string;
  imageUrl: string | null;
  label: string;
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

function toCardFromService(service: Service, strapiUrl: string): BlogCardItem {
  return {
    key: `service-${service.id}`,
    title: service.title,
    description: service.short_description,
    href: service.slug ? `/jasa-las/${service.slug}` : "/jasa-las",
    imageUrl: resolveStrapiMediaUrl(service.thumbnail, strapiUrl),
    label: "Jasa",
  };
}

function toCardFromLocation(
  location: ServiceLocation,
  strapiUrl: string
): BlogCardItem {
  return {
    key: `location-${location.id}`,
    title: location.title,
    description: location.short_description,
    href: location.slug ? `/blog/${location.slug}` : "/blog",
    imageUrl: resolveServiceLocationImageUrl(location, strapiUrl),
    label: "Lokasi",
  };
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export async function BlogSection() {
  const [serviceLocations, services] = await Promise.all([
    getAllServiceLocations(),
    getAllServices(),
  ]);

  const strapiUrl = process.env.STRAPI_URL ?? "";

  const cards: BlogCardItem[] = [
    ...serviceLocations.slice(0, 2).map((item) => toCardFromLocation(item, strapiUrl)),
    ...services.slice(0, 2).map((item) => toCardFromService(item, strapiUrl)),
  ];

  if (!cards.length) return null;

  return (
    <section className="bg-gray-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* <span className="h-6 w-1 rounded bg-orange-900" aria-hidden="true" /> */}
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              Terbaru
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Lihat lainnya
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </header>

        <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {card.imageUrl ? (
                <div className="relative h-44 w-full">
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    width={960}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ) : (
                <div className="h-44 w-full bg-slate-200" />
              )}

              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-slate-500">
                    {card.label}
                  </p>
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-snug text-slate-900 line-clamp-3">
                  {card.title}
                </h3>
                {card.description ? (
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {card.description}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
