import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const root = fileURLToPath(new URL(".", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: { root },
  outputFileTracingRoot: root,
  poweredByHeader: false,
  // Inline the (small) CSS so first paint never waits on a stylesheet request.
  experimental: { inlineCss: true },
  images: { formats: ["image/avif", "image/webp"] },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
