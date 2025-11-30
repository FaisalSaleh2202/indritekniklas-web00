"use client";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NavigationMobileList() {
  const { data: services, isLoading } = useSWR("/api/services", fetcher);

  if (isLoading) return <div className="text-sm pl-4">Memuat...</div>;
  if (!services || services.length === 0) return null;
  return (
    <ul className="flex flex-col gap-3 pl-4">
      {services.map((service: any) => (
        <li key={service.id}>
          <Link
            href={`/layanan/${service.slug}`}
            className="text-gray-700 hover:text-black"
          >
            {service.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
