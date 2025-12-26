"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Service = {
  id: number;
  title: string;
  slug: string;
};

type Props = {
  services: Service[];
  className?: string;
};

export default function NavigationDropdownClient({ services, className }: Props) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const details = detailsRef.current;
      if (!details?.open) return;
      if (event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const details = detailsRef.current;
      if (details?.open) details.open = false;
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    const details = detailsRef.current;
    if (details) details.open = false;
  };

  return (
    <details ref={detailsRef} className={`relative group ${className ?? ""}`}>
      <summary className="flex items-center gap-1 cursor-pointer list-none hover:underline [&::-webkit-details-marker]:hidden">
        Layanan
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </summary>

      <div className="absolute left-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg z-20">
        <ul className="py-2 text-sm text-gray-800">
          {services.length > 0 ? (
            services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/jasa-las/${service.slug}`}
                  className="block px-3 py-2 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  {service.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">Tidak ada layanan</li>
          )}
        </ul>
      </div>
    </details>
  );
}

