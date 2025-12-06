// app/layout.tsx
import AutoTooltip from "@/components/AutoTooltip";
import Footer from "@/components/Footer";
import { NavigationMenu } from "@/components/NavigationMenu";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script"; // ← Tambahkan ini
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Indri Teknik Las",
  description: "Jasa teknik las profesional di Jakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <html lang="id">
      <head>
        {/* reCAPTCHA v3 – ganti dengan Site Key kamu yang asli */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      </head>

      <body className={roboto.className}>
        <NavigationMenu />
        {children}
        <Footer />
        <AutoTooltip />
      </body>
    </html>
  );
}
