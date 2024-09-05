/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "noun-api.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.seadn.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;