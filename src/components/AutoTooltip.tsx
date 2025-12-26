import { MessageCircle } from "lucide-react";

export default function BubbleWhatsApp() {
  return (
    <div className="fixed bottom-6 left-4 z-50 flex items-center gap-2">
      <a
        href="https://wa.me/6281283993386"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-green-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-green-600 transition"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      <span className="bg-green-600 text-white shadow-lg px-4 py-2 rounded-md font-medium">
        Chat via WhatsApp
      </span>
    </div>
  );
}
