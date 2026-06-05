import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/svgtest',
  images: { unoptimized: true },
};

export default nextConfig;
