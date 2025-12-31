import { MessageCircle } from "lucide-react";
import Link from "next/link";

import NavigationDropdown from "./NavigationDropdown";
import NavigationMobile from "./NavigationMobile";

export function NavigationMenu() {
  return (
    <div className="bg-white sticky top-0 z-60">
      <nav
        className="font-sans border-b text-[#171717] px-6 md:px-8 py-2 flex items-center justify-between"
        aria-label="Navigasi Utama"
      >
        {/* LOGO / BRAND */}
        <Link
          href="/"
          className="text-xl text-light flex items-center gap-3"
          aria-label="Indri Teknik Las - Beranda"
        >
          <span className="whitespace-nowrap text-base md:text-xl font-semibold">
            Indri Teknik Las
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-8" role="menubar">
            <li role="none">
              <Link href="/" className="hover:underline">
                Beranda
              </Link>
            </li>

            <li role="none">
              <NavigationDropdown />
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
          href="https://wa.me/6281283993386"
          className="hidden md:flex items-center gap-2"
          aria-label="Hubungi via WhatsApp"
        >
          <MessageCircle style={{ color: "#25D366" }} aria-hidden="true" />
          <span className="text-[#25D366] font-semibold">Whatsapp</span>
        </a>

        <NavigationMobile />
      </nav>
    </div>
  );
}
