import type { NextConfig } from "next";
import { env } from "./app/lib/env.mjs";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: env.IMAGE_DOMAINS.map(d => ({
      protocol: "http",
      hostname: d,
    }))
  }
};

console.debug(JSON.stringify(nextConfig))

export default nextConfig;
