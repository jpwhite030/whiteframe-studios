import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Preview deployments must never be indexed — duplicate content on a
 * *.vercel.app hostname competes with the canonical site. Vercel sets
 * VERCEL_ENV, so anything that isn't production disallows everything.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : true;

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // No crawl budget spent on the enquiry endpoint.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
