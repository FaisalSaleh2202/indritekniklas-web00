"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function BubbleWhatsApp() {
  const messages = [
    "Butuh bantuan?",
    "Chat via WhatsApp",
    "Kami siap membantu!",
    "Klik untuk memulai",
  ];

  const [index, setIndex] = useState(0);

  // Rotate text every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-4 z-50 flex items-center gap-2">
      <Tooltip open>
        {" "}
        {/* <-- selalu terbuka */}
        <TooltipTrigger asChild>
          <a
            href="https://wa.me/6281283993386"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center 
              bg-green-500 text-white 
              w-14 h-14 rounded-full shadow-lg 
              hover:bg-green-600 transition
            "
          >
            <MessageCircle size={28} />
          </a>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="
            bg-green-600 text-white shadow-lg 
            px-4 py-2 rounded-md font-medium
            animate-fade
          "
        >
          {messages[index]}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
