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
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export function NavigationMenuDemo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-full font-sans bg-[#171717] sticky top-0 ">
      <div className="flex text-white items-center px-6 md:px-8 py-2 justify-between">
        <div className="">Indri Teknik Las</div>
        <div className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>Beranda</li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-0" asChild>
                  <Button>
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
                <X className="text-white" />
              ) : (
                <Menu className="text-white" />
              )}
            </div>
          </button>

          {/* Overlay menu mobile */}
          <div
            className={`md:hidden fixed left-0 right-0 bg-white text-black transition-all duration-500 ease-in-out overflow-hidden z-40 ${
              isMenuOpen
                ? "top-[56px] h-screen opacity-100"
                : "top-[56px] h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center gap-6 mt-8 text-lg font-medium">
              <a href="#">Beranda</a>
              <a href="#">Layanan</a>
              <a href="#">Kontak</a>
              <a href="#">Blog</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
