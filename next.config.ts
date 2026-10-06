import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      {
        source: "/product/:slug*",
        destination: "/projects/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
