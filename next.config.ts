import type { NextConfig } from "next";

/**
 * Repo detected from git remote: Akruel1/Akruel1
 * Project Pages URL: https://akruel1.github.io/Akruel1/
 * Override with NEXT_PUBLIC_BASE_PATH="" for a custom root domain later.
 */
const repoName = "Akruel1";
const isGhPages = process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "production";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : isGhPages
      ? `/${repoName}`
      : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
