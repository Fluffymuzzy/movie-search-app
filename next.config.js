/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  env: {
    api_key: "1a49fac0",
  },
  images: {
    domains: ["m.media-amazon.com"],
  },
};
