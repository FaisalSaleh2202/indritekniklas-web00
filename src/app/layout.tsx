// app/layout.tsx
import AutoTooltip from "@/components/AutoTooltip";
import Footer from "@/components/Footer";
import { NavigationMenu } from "@/components/NavigationMenu";
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Indri Teknik Las – Bengkel Las Terdekat dan Berpengalaman",
  alternates: {
    canonical: `https://bengkellasindriteknik.com`,
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  description:
    "Indri Teknik Las menyediakan layanan las profesional: pagar besi, kanopi, tralis, railing tangga, dan berbagai konstruksi besi. Harga terjangkau, kualitas terbaik.",
  keywords: [
    "bengkel las",
    "jasa las terdekat",
    "las listrik",
    "las pagar besi",
    "kanopi baja ringan",
    "pagar rumah",
    "Indri Teknik Las",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bengkellasindriteknik.com",
    siteName: "Indri Teknik Las",
    title: "Indri Teknik Las – Bengkel Las Terdekat dan Berpengalaman",
    description:
      "Jasa bengkel las berpengalaman: pagar besi, kanopi, tralis, railing tangga, dan konstruksi besi lainnya.",
    images: [
      {
        url: "https://bengkellasindriteknik.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Indri Teknik Las",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indri Teknik Las – Jasa Las Berpengalaman",
    description:
      "Layanan las pagar besi, kanopi, tralis, railing tangga, dan konstruksi besi lain.",
    images: ["https://bengkellasindriteknik.com/opengraph-image.png"],
  },
  metadataBase: new URL(`https://bengkellasindriteknik.com`),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Indri Teknik Las",
    image: "https://bengkellasindriteknik.com/opengraph-image.png",
    "@id": "https://bengkellasindriteknik.com",
    url: "https://bengkellasindriteknik.com",
    telephone: "+6281283993386",
    priceRange: "Rp500.000 - Rp50.000.000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pekayon Jaya RT/RW. 003/004 Bekasi Selatan",
      addressLocality: "Bekasi",
      addressRegion: "Jawa Barat",
      postalCode: "17148",
      addressCountry: "Indonesia",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.google.com/maps/place/Indri+teknik+las/@-6.2619439,106.9720107,16.04z/data=!4m6!3m5!1s0x2e698de549e7328d:0x967837da2387e2d!8m2!3d-6.2620064!4d106.977866!16s%2Fg%2F11fk3fjg0r?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D", // Google Maps URL Anda
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Indri Teknik Las",
    url: "https://bengkellasindriteknik.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://bengkellasindriteknik.com/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        {/* JSON-LD LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* JSON-LD Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>

      <body className={nunitoSans.className} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D0L6VRR43T"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D0L6VRR43T');
          `}
        </Script>
        <NavigationMenu />
        {children}
        <Footer />
        <AutoTooltip />
        <ScrollToTop />
      </body>
    </html>
  );
}
