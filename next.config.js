/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http", // bisa http atau https sesuai Strapi Anda
        hostname: "localhost", // dev lokal
        port: "1337", // port Strapi
        pathname: "/uploads/**", // semua path uploads
      },
       // PROD (Strapi via HTTPS domain)
      {
        protocol: "https",
        hostname: "strapi.srv1104184.hstgr.cloud",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
