import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // 🔥 VERY IMPORTANT FIX
      },
    ],
  },
};

export default nextConfig;