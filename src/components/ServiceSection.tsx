import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/strapi/types";

type ServiceWithImageUrl = Service & {
  imageUrl: string | null;
};

export function ServiceSection({
  services,
}: {
  services: ServiceWithImageUrl[];
}) {
  return (
    <section className="bg-gray-50 py-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl md:text-2xl font-light text-[#171717]">
          Jasa Kami
        </h2>

        <div className="mt-6 grid w-full grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {services.map((service) => {
            const href = service.slug ? `/jasa-las/${service.slug}` : "/jasa-las";

            return (
              <Link
                key={service.id}
                href={href}
                className="group relative block w-full overflow-hidden bg-gray-100 shadow-sm transition hover:shadow-md"
              >
                {service.imageUrl ? (
                  <div className="relative h-64 w-full md:h-72">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      width={960}
                      height={640}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />

                    <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm text-white p-3">
                      <h3 className="text-lg font-semibold md:text-xl">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 w-full bg-gray-200 md:h-72" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
