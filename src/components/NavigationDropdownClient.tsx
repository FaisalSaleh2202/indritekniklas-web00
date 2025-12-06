// components/NavigationDropdown.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Service } from "@/lib/strapi/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
  services: Service[];
  className?: string; // opsional
};

export default function NavigationDropdownClient({
  services,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={className}>
          Layanan{" "}
          <ChevronDown
            className={`ml-2 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2" align="start">
        <DropdownMenuGroup>
          {services.map((service) => (
            <DropdownMenuItem key={service.id} asChild>
              <a href={`/jasa-las/${service.slug}`}>{service.title}</a>
            </DropdownMenuItem>
          ))}
          {/* fallback items */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
