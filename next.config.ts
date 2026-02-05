import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Kikapcsoljuk a TypeScript szigorú ellenőrzését buildkor
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. Kikapcsoljuk az ESLint szigorú ellenőrzését is
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;