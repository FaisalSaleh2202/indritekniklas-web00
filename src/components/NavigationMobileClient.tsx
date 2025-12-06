// components/NavigationMobileClient.tsx
"use client";

import { Separator } from "@/components/ui/separator";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Service = {
  id: number;
  title: string;
  slug: string;
};

type Props = {
  initialServices: Service[];
};

export default function NavigationMobileClient({ initialServices }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsLayananOpen(false);
  };

  return (
    <>
      {/* Tombol Toggle Menu – VERSI SUPER SMOOTH */}
      <div className="md:hidden fixed top-0 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Buka/tutup menu navigasi"
          className="relative p-3 
               transition-all duration-300 ease-in-out
               hover:scale-110 hover:shadow-xl active:scale-95"
        >
          <div className="relative w-7 h-7">
            {/* Icon Menu */}
            <Menu
              className={`absolute inset-0 h-7 w-7 text-[#171717] transition-all duration-500 ease-in-out
          ${
            isMenuOpen
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
            />

            {/* Icon X */}
            <X
              className={`absolute inset-0 h-7 w-7 text-[#171717] transition-all duration-500 ease-in-out
          ${
            isMenuOpen
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
            />
          </div>
        </button>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Panel Menu Mobile */}
      <aside
        className={`fixed top-[43px] right-0 h-[calc(100vh-46px)] w-80 bg-white z-40 transform transition-transform duration-500 ease-in-out overflow-y-auto
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav className="flex flex-col text-lg mt-6 mx-6 gap-1">
          {/* Beranda */}
          <Link
            href="/"
            onClick={closeAll}
            className="py-3 hover:text-blue-600 transition"
          >
            Beranda
          </Link>
          <Separator className="my-1" />

          {/* Layanan */}
          <button
            onClick={() => setIsLayananOpen(!isLayananOpen)}
            className="flex justify-between items-center py-3 hover:text-blue-600 transition"
          >
            <span>Layanan</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${
                isLayananOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              isLayananOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="pl-6 py-2 space-y-2">
              {initialServices.length > 0 ? (
                initialServices.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/jasa-las/${service.slug}`}
                      onClick={closeAll}
                      className="block py-2 text-gray-700 hover:text-black transition"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm py-2">
                  Tidak ada layanan
                </li>
              )}
            </ul>
          </div>

          <Separator className="my-1" />

          {/* Kontak & Blog */}
          <Link
            href="/kontak-kami"
            onClick={closeAll}
            className="py-3 hover:text-blue-600 transition"
          >
            Kontak Kami
          </Link>
          <Separator className="my-1" />

          <Link
            href="/blog"
            onClick={closeAll}
            className="py-3 hover:text-blue-600 transition"
          >
            Blog
          </Link>
          <Separator className="my-1" />
        </nav>
      </aside>
    </>
  );
}
