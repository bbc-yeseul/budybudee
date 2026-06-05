import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const BASE_PATH = '/svgtest';

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  ...(isGithubPages
    ? { output: 'export' }
    : {
        async redirects() {
          return [
            {
              source: '/',
              destination: '/svgtest',
              basePath: false,
              permanent: false,
            },
          ];
        },
      }),
};

export default nextConfig;
