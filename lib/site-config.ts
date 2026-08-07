/**
 * Central site configuration.
 * Every piece of standing copy, contact detail and navigation target lives
 * here so that no string is duplicated across components.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Whiteframe Studios",
  wordmark: "Whiteframe Studios",
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
      "brand and interface design",
      "Sydney",
    ],
  },

  hero: {
    headline: "We design and build software people actually want to use.",
    /** The same sentence, broken by hand so the hero reads as set type. */
    headlineLines: ["We design and build", "software people", "actually want to use."],
    supporting:
      "Whiteframe is an independent product studio turning ambitious ideas into brands, apps and digital products.",
    primaryCta: { label: "View our work", href: "#work" },
    secondaryCta: { label: "Start a project", href: "#contact" },
  },

  statement: {
    lines: ["From an idea in your head", "to software in your customers’ hands."],
    supporting:
      "We work across strategy, design and engineering to take digital products from first sketch to launch—and beyond.",
  },

  founderBand: {
    headline: "Small team. Senior execution. No layers of account management.",
    supporting:
      "You work directly with the people designing and building your product. That means faster decisions, clearer communication and better work.",
    principles: [
      "Move with urgency",
      "Sweat the important details",
      "Build for real-world use",
    ],
  },

  cta: {
    headline: "Have something ambitious in mind?",
    button: "Let’s build it.",
  },

  footerLine: "Independent by design.",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Studio", href: "#studio" },
  ] satisfies NavItem[],

  navCta: { label: "Start a project", href: "#contact" } satisfies NavItem,

  /** Placeholder handles — swap for the live accounts before launch. */
  socials: [
    { label: "Instagram", href: "https://instagram.com/whiteframestudios" },
    { label: "LinkedIn", href: "https://linkedin.com/company/whiteframestudios" },
    { label: "GitHub", href: "https://github.com/whiteframestudios" },
  ] satisfies SocialLink[],

  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ] satisfies NavItem[],
} as const;

export type SiteConfig = typeof siteConfig;
