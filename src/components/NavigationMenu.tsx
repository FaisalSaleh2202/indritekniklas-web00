"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export function NavigationMenuDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  return (
    <nav className="bg-full font-sans bg-white sticky top-0 z-60 ">
      <div className="flex text-[#171717] border-b items-center px-6 md:px-8 py-2 justify-between">
        <div className="border-2 border-[#171717] py-1 px-2 rounded-sm">
          <span className="">Indri Teknik Las</span>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>Beranda</li>
            <li>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-0" asChild>
                    <Button
                      style={{ backgroundColor: "white", color: "#171717" }}
                    >
                      Layanan <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-4 mt-1" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
            <li>Kontak</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className="md:hidden">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
              }`}
            >
              {isMenuOpen ? (
                <X className="text-[#171717]" />
              ) : (
                <Menu className="text-[#171717]" />
              )}
            </div>
          </button>

          {/* BACKDROP (klik di luar untuk menutup) */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-30" // overlay transparan
              onClick={() => setIsMenuOpen(false)} // klik di luar menutup
            ></div>
          )}

          {/* Overlay menu mobile */}
          <div
            className={`md:hidden fixed top-[53px] right-0 h-[calc(100vh-45px)] bg-white text-[#171717] transition-all duration-500 ease-in-out z-40
    ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
  `}
            style={{ width: "80%" }} // lebar 80%
          >
            <div className="flex flex-col items-start m-4 gap-2 text-lg font-medium h-full">
              <a href="#">Beranda</a>
              <Separator className="" />
              <div>
                {/* MENU LAYANAN (dropdown seperti FAQ) */}
                <div>
                  <button
                    onClick={() => setIsLayananOpen(!isLayananOpen)}
                    className="flex items-center justify-between w-full"
                  >
                    <span>Layanan</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        isLayananOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Isi dropdown */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isLayananOpen ? "max-h-40 mt-2" : "max-h-0"
                    }`}
                  >
                    <div className="flex flex-col gap-2 pl-4 text-base text-gray-700">
                      <a href="#">Las Besi</a>
                      <a href="#">Las Aluminium</a>
                      <a href="#">Las Pagar</a>
                      <a href="#">Las Kanopi</a>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="" />
              <a href="#">Kontak</a>
              <Separator className="" />
              <a href="#">Blog</a>
              <Separator className="" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
