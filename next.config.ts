import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Curated imagery is served locally from /public/images.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
