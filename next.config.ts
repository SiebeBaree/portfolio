import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    // PostHog's public project key is needed by the browser SDK.
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY ?? "",
  },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/sky-events/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/sky-events/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/sky-events/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
