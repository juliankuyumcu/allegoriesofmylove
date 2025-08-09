import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("http://localhost:1337/**")]
  },
  //allowedDevOrigins: ["localhost", "192.168.2.15"]
};

export default nextConfig;
