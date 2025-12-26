import Image from "next/image";
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

        <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {services.map((service) => (
            <article
              key={service.id}
              className="relative overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Thumbnail */}
              {service.imageUrl && (
                <div className="relative w-full h-64 md:h-72">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    width={500}
                    height={400}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Title overlay */}
                  <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm text-white p-3">
                    <h3 className="text-lg md:text-xl font-semibold">
                      {service.title}
                    </h3>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
