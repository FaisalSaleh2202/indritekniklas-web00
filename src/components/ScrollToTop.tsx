"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const nextVisible = window.scrollY > 600;
      setIsVisible(nextVisible);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Kembali ke atas"
      className={[
        "fixed bottom-6 right-4 md:right-6 z-50",
        "h-11 w-11",
        "rounded-full",
        "bg-slate-900/85 text-white",
        "backdrop-blur",
        "transition-all duration-200",
        "hover:bg-slate-900",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
        "ring-offset-background",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="h-5 w-5 mx-auto" aria-hidden="true" />
    </button>
  );
}

