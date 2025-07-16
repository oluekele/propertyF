import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "property-b.vercel.app", 
      },
      {
        protocol: "http",
        hostname: "localhost", 
        port: "5000",
      },
    ],
    domains: ['localhost'],
  },
};

export default nextConfig;
