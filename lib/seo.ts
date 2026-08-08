import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * One place that builds page metadata, so every route gets a unique title,
 * a unique description, a self-referencing canonical and matching Open Graph
 * and Twitter cards without each page remembering to do it.
 *
 * `path` is always a site-relative route beginning with "/". Next resolves it
 * against `metadataBase`, which keeps canonicals on the one hostname even if
 * a page is reachable from a preview domain.
 */
export function buildMetadata({
  title,
  description,
  path,
  /** Override the shared social image for a page that has its own. */
  image,
  /** Set for pages that should stay out of the index. */
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: siteConfig.name,
      title,
      description,
      url,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true, "max-image-preview": "large" },
          },
        }),
  };
}

/**
 * Titles rendered by the layout template gain " — Whiteframe Studios". Pages
 * whose title already names the studio opt out with `absolute`, so nothing
 * ends up saying it twice.
 */
export function absoluteTitle(title: string): Metadata["title"] {
  return { absolute: title };
}
