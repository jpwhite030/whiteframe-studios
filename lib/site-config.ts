/**
 * Central site configuration.
 * Every piece of standing copy, contact detail and navigation target lives here
 * so that no string is duplicated across components.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Section id used for active-state tracking in the header. */
  sectionId: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Whiteframe Studios",
  /** Locked-up wordmark used in the header and footer. */
  wordmark: "WHITEFRAME STUDIOS",
  founder: "Jack White",
  location: "Sydney, Australia",
  locality: "Sydney",
  region: "NSW",
  country: "AU",
  email: "hello@whiteframestudios.com",
  /** Replace with the production domain once the site is deployed. */
  url: "https://whiteframestudios.com",

  seo: {
    title: "Whiteframe Studios — Software, AI and Digital Products",
    description:
      "Whiteframe Studios is an independent product studio founded by Jack White, building custom software, AI systems, automation and digital products.",
    keywords: [
      "product studio",
      "software development",
      "AI systems",
      "automation",
      "MVP development",
      "internal software",
      "Sydney",
    ],
  },

  hero: {
    eyebrow: "Independent product studio",
    headline: "We turn ideas into working products.",
    /** The same sentence, broken by hand so the hero reads as set type. */
    headlineLines: ["We turn ideas into", "working products."],
    supporting:
      "Whiteframe Studios designs and builds software, AI systems and digital products for founders and businesses.",
    primaryCta: { label: "View selected work", href: "#work" },
    secondaryCta: { label: "Start a project", href: "#contact" },
    signature: "Founded by Jack White — Sydney, Australia",
  },

  footerStatement: "Software, systems and products built with intent.",

  nav: [
    { label: "Work", href: "#work", sectionId: "work" },
    { label: "Services", href: "#services", sectionId: "services" },
    { label: "About", href: "#founder", sectionId: "founder" },
    { label: "Contact", href: "#contact", sectionId: "contact" },
  ] satisfies NavItem[],

  /** Placeholder handles — swap for the live accounts before launch. */
  socials: [
    { label: "Instagram", href: "https://instagram.com/whiteframestudios" },
    { label: "LinkedIn", href: "https://linkedin.com/company/whiteframestudios" },
    { label: "GitHub", href: "https://github.com/whiteframestudios" },
  ] satisfies SocialLink[],
} as const;

export type SiteConfig = typeof siteConfig;
