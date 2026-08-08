import type { MetadataRoute } from "next";
import { caseStudyProjects } from "@/data/projects";
import { insights } from "@/data/insights";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site-config";

/**
 * Canonical, indexable URLs only.
 *
 * Everything here is derived from the content files, so a new service or case
 * study appears automatically and a removed one disappears — a hand-kept list
 * is how sitemaps end up advertising 404s. Nothing noindexed (the 404 page,
 * API routes) is included.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const lastModified = new Date();

  return [
    { url: url("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    { url: url("/work"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...caseStudyProjects.map((project) => ({
      url: url(`/work/${project.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    {
      url: url("/services"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: url("/studio"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    {
      url: url("/insights"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...insights.map((post) => ({
      url: url(`/insights/${post.slug}`),
      lastModified: new Date(post.published),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: url("/contact"), lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
