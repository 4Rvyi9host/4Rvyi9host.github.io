import type { NextConfig } from "next";

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = configuredBasePath === "__ROOT__" ? "" : configuredBasePath ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/4Rvyi9host.png",
      },
    ],
  },
};

export default nextConfig;
