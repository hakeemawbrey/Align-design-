import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // libSQL loads a native driver for local files; keep it out of the server bundle.
  serverExternalPackages: ["@libsql/client", "libsql"],
};

export default nextConfig;
