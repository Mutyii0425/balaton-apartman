import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. TypeScript hibák figyelmen kívül hagyása buildnél
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. ESLint hibák figyelmen kívül hagyása
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;