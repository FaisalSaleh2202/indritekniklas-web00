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
      {
        protocol: "http",
        hostname: "31.97.50.253", // IP server Strapi
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
