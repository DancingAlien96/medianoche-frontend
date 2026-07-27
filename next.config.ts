import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow optimizing images served from the local backend (dev only).
    dangerouslyAllowLocalIP: true,
    // `images.domains` is deprecated in Next 16 — use remotePatterns.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        // Uploaded product images served by the NestJS backend (local dev).
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        // Uploaded product images served by the NestJS backend (production).
        protocol: "https",
        hostname: "api.medianoche.com.gt",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
