"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function NavigationMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);

  return (
    <div className="bg-white sticky top-0 z-60">
      <nav
        className="font-sans border-b text-[#171717] px-6 md:px-8 py-2 flex items-center justify-between"
        aria-label="Navigasi Utama"
      >
        {/* LOGO / BRAND */}
        <a
          href="/"
          className="text-xl text-light flex gap-3 items-center"
          aria-label="Indri Teknik Las - Beranda"
        >
          <span>Indri Teknik Las</span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-8" role="menubar">
            <li role="none">
              <Link href="/" className="hover:underline">
                Beranda
              </Link>
            </li>

            <li role="none">
              <DropdownMenu>
                <DropdownMenuTrigger className="pt-3" asChild>
                  <Button
                    aria-label="Layanan las besi"
                    style={{ backgroundColor: "white", color: "#171717" }}
                  >
                    Layanan <ChevronDown aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40 mt-2" align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Pagar Besi</DropdownMenuItem>
                    <DropdownMenuItem>Kanopi Baja Ringan</DropdownMenuItem>
                    <DropdownMenuItem>Railing Tangga</DropdownMenuItem>
                    <DropdownMenuItem>Tangga Besi Custom</DropdownMenuItem>
                    <DropdownMenuItem>Balkon / Teras</DropdownMenuItem>
                    <DropdownMenuItem>Terali Jendela</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>

            <li role="none">
              <Link href="/kontak-kami" className="hover:underline">
                Kontak
              </Link>
              {/* <a role="menuitem" href="#kontak" className="hover:underline">
                Kontak
              </a> */}
            </li>

            <li role="none">
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* WHATSAPP DESKTOP */}
        <a
          href="https://wa.me/628xxxx"
          className="hidden md:flex items-center gap-2"
          aria-label="Hubungi via WhatsApp"
        >
          <MessageCircle style={{ color: "#25D366" }} aria-hidden="true" />
          <span className="text-[#25D366] font-semibold">Whatsapp</span>
        </a>

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
                <ul className="flex flex-col gap-2 pl-4 text-base text-gray-700">
                  <li>
                    <a href="#">Pagar Besi</a>
                  </li>
                  <li>
                    <a href="#">Kanopi</a>
                  </li>
                  <li>
                    <a href="#">Railing Tangga</a>
                  </li>
                  <li>
                    <a href="#">Tangga Besi</a>
                  </li>
                  <li>
                    <a href="#">Balkon</a>
                  </li>
                  <li>
                    <a href="#">Terali Jendela</a>
                  </li>
                </ul>
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
      </nav>
    </div>
  );
}
