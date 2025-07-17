import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "property-b.vercel.app", // ✅ Production backend
      },
      {
        protocol: "http",
        hostname: "localhost", // ✅ Local backend
        port: "5000", // MUST specify port if not 80/443
      },
    ],
  },
};

export default nextConfig;
