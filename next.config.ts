import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const BASE_PATH = '/budybudee';

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
              destination: '/budybudee',
              basePath: false,
              permanent: false,
            },
          ];
        },
      }),
};

export default nextConfig;
