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
    <section className="px-4 sm:px-6 py-8 bg-gray-50 ">
      <div className="grid gap-6">
        <h2 className="text-center text-2xl md:text-2xl font-light text-[#171717]">
          Jasa Kami
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mx-auto">
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
