/**
 * Written pieces. Empty by design until there is something real to publish —
 * the index renders an honest empty state rather than filler.
 *
 * Adding an entry here also adds it to the sitemap. Individual post routes
 * are not built yet; add app/insights/[slug]/page.tsx alongside the first
 * post. See CONTENT.md.
 */

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date, used for both display and the <time> element. */
  published: string;
};

export const insights: readonly Insight[] = [];
