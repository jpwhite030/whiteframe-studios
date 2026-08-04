import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so the parent directory's lockfile is ignored.
  turbopack: { root: path.resolve(process.cwd()) },
};

export default nextConfig;
