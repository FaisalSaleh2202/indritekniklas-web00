"use client";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import NavigationMobileList from "./NavigationMobileList_backup";

export default function NavigationMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  return (
    <>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <button
          className="text-gray-700 transition-all duration-300"
          aria-label="Menu navigasi mobile"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`transition-transform duration-300 ${
              isMenuOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
            }`}
          >
            {isMenuOpen ? (
              <X className="text-[#171717]" aria-hidden="true" />
            ) : (
              <Menu className="text-[#171717]" aria-hidden="true" />
            )}
          </div>
        </button>

        {/* BACKDROP */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* MOBILE PANEL */}
        <aside
          className={`fixed top-[46px] right-0 h-[calc(100vh-45px)] bg-white text-[#171717] transition-all duration-500 z-40
              ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
          style={{ width: "80%" }}
          aria-label="Menu navigasi mobile"
        >
          <nav className="flex flex-col items-start m-4 gap-2 text-lg h-full">
            <Link href="/">Beranda</Link>
            <Separator />

            {/* Dropdown Mobile */}
            <button
              onClick={() => setIsLayananOpen(!isLayananOpen)}
              className="flex items-center justify-between w-full py-2"
              aria-expanded={isLayananOpen}
            >
              <span>Layanan</span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  isLayananOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isLayananOpen ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <NavigationMobileList />
            </div>

            <Separator />
            <Link href="/kontak-kami">Kontak Kami</Link>
            <Separator />
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Separator />
          </nav>
        </aside>
      </div>
    </>
  );
}
