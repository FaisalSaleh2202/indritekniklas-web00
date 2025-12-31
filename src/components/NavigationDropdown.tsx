import Link from "next/link";
import { getAllServices } from "@/lib/strapi/service/service.service";
import NavigationDropdownClient from "./NavigationDropdownClient";

type NavigationDropdownProps = {
  variant?: "dropdown" | "list";
  className?: string;
};

export default async function NavigationDropdown({
  variant = "dropdown",
  className,
}: NavigationDropdownProps) {
  const services = await getAllServices();

  if (variant === "list") {
    return (
      <div className={className}>
        <p className="text-sm font-semibold text-white">Jasa Kami</p>
        <ul className="mt-3 space-y-2 text-sm text-gray-300">
          {services.length > 0 ? (
            services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/jasa-las/${service.slug}`}
                  className="hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400">Tidak ada layanan</li>
          )}
        </ul>
      </div>
    );
  }

  return <NavigationDropdownClient services={services} className={className} />;
}
