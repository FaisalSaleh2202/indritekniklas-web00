import { MessageCircle } from "lucide-react";

export default function BubbleChat() {
  return (
    <div
      className="
        fixed 
        bottom-6 
        left-6 
        z-50
      "
    >
      <a
        href="https://wa.me/6281283993386"
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex
          items-center
          gap-2
          bg-green-500
          text-white
          px-4
          py-2
          rounded-full
          shadow-lg
          hover:bg-green-600
          transition
          duration-300
          animate-bounce-slow
        "
      >
        <MessageCircle size={20} />
        <span className="font-medium">Konsultasi Sekarang</span>
      </a>
    </div>
  );
}
