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
  /**
   * Only confirmed accounts are rendered or published as `sameAs`. An
   * unconfirmed handle is worse than none: a 404 in the footer, and a false
   * entity signal to search engines that is actively counterproductive.
   */
  confirmed: boolean;
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
    title: "Software Product Studio Sydney | Whiteframe Studios",
    description:
      "Whiteframe Studios is a Sydney software product studio specialising in product strategy, UX/UI design, web and mobile development, and AI automation.",
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
      "Whiteframe is a senior Sydney product studio helping ambitious founders and teams turn ideas into brands, apps and production-ready software.",
    primaryCta: { label: "View our work", href: "/work" },
    secondaryCta: { label: "Tell us about your product", href: "/contact" },
    /** Compact credibility line sitting directly beneath the hero. */
    proof: [
      "Senior product team",
      "Sydney, Australia",
      "Strategy through production engineering",
    ],
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
    /** Sets expectations at the point of enquiry. */
    supporting:
      "Tell us what you’re building, where you’re currently stuck and what success looks like. You’ll hear directly from Jack within two business days.",
  },

  footerLine: "Independent by design.",

  /** Real routes, so navigation is crawlable rather than anchor-only. */
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Studio", href: "/studio" },
    { label: "Insights", href: "/insights" },
  ] satisfies NavItem[],

  navCta: { label: "Start a project", href: "/contact" } satisfies NavItem,

  /**
   * Checked 2026-08-08: the Instagram handle resolves; the LinkedIn company
   * page and GitHub organisation both 404. Flip `confirmed` as each account
   * is created — see CONTENT.md.
   */
  socials: [
    {
      label: "Instagram",
      href: "https://instagram.com/whiteframestudios",
      confirmed: true,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/whiteframestudios",
      confirmed: false,
    },
    {
      label: "GitHub",
      href: "https://github.com/whiteframestudios",
      confirmed: false,
    },
  ] satisfies SocialLink[],

  /** Convenience: the accounts that actually exist. */
  get confirmedSocials(): SocialLink[] {
    return this.socials.filter((social) => social.confirmed);
  },

  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ] satisfies NavItem[],
} as const;

export type SiteConfig = typeof siteConfig;
