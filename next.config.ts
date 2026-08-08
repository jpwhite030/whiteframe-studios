import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so the parent directory's lockfile is ignored.
  turbopack: { root: path.resolve(process.cwd()) },

  async rewrites() {
    return [
      // The embedded product demo is a static Expo export exported with a
      // base URL of /tally-demo. Its router resolves routes relative to that
      // path, so it has to be served *at* /tally-demo — loading
      // /tally-demo/index.html directly leaves the router looking for a
      // route called "index.html" and rendering "this screen doesn't exist".
      // Next serves files from public/ but won't serve a directory index, so
      // the mapping is made explicit here.
      { source: "/tally-demo", destination: "/tally-demo/index.html" },
      // Client-side navigation inside the demo pushes deeper paths; a reload
      // on one of those should land back in the app rather than on a 404.
      { source: "/tally-demo/:path*", destination: "/tally-demo/index.html" },
    ];
  },
};

export default nextConfig;
