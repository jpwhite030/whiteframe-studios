import { siteConfig } from "@/lib/site-config";

/**
 * JSON-LD builders. Everything here is drawn from siteConfig — no address or
 * telephone is asserted, because neither is published, and inventing either
 * is both wrong and an SEO liability.
 */

export function organizationSchema() {
  const confirmed = siteConfig.socials
    .filter((social) => social.confirmed)
    .map((social) => social.href);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL("/icon.png", siteConfig.url).toString(),
    image: new URL("/opengraph-image.png", siteConfig.url).toString(),
    description: siteConfig.seo.description,
    email: siteConfig.email,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
      jobTitle: "Founder",
    },
    // Locality only. No street address or phone number is published, so none
    // is claimed here.
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.locality,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Product strategy",
      "Product design",
      "UX and UI design",
      "Web development",
      "Mobile application development",
      "AI automation",
    ],
    // Omitted entirely when no account is confirmed — an empty sameAs is
    // noise, and an unverified one is a false signal.
    ...(confirmed.length > 0 ? { sameAs: confirmed } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.seo.description,
    inLanguage: "en-AU",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** Crumbs are ordered root-first; the current page is the last entry. */
export function breadcrumbSchema(
  crumbs: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, siteConfig.url).toString(),
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: new URL(path, siteConfig.url).toString(),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "Place",
      name: `${siteConfig.locality}, ${siteConfig.country}`,
    },
  };
}

/** FAQPage, for service pages that carry real questions. */
export function faqSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
