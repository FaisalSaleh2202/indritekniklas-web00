/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",  <-- hapus atau komentar baris ini
  reactStrictMode: false,
  experimental: {
    turbo: false, // kadang turbopack bug dengan radix id
  },
};

module.exports = nextConfig;
