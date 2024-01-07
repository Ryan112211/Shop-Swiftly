/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_IMAGE_URL,
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
