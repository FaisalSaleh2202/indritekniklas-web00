import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper format tanggal
export function formatDate(value: string | null | undefined): string {
  if (!value) return "Tidak ada tanggal";

  const date = new Date(value);

  return isNaN(date.getTime())
    ? "Tanggal tidak valid"
    : date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}
