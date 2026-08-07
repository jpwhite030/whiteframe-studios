/**
 * All project content in one place, so cards, the hero window and the
 * selected-work sections can be re-pointed at real case-study pages by
 * editing this file alone.
 */

/** Which coded/photographic treatment the tile renders. */
export type ProjectVisualKind =
  | "pubcam"
  | "tally"
  | "kingswood"
  | "scaffold"
  | "seatview";

export type ProjectShot = {
  src: string;
  alt: string;
  /**
   * CSS aspect-ratio of the frame. Setting it shorter than the source's true
   * ratio crops the capture — used with `position` to trim damaged edges.
   */
  aspect: string;
  /** object-position inside the frame, e.g. "50% 100%" to crop off the top. */
  position?: string;
  /** Phone width as a fraction of the tile, e.g. "56%". */
  width?: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  /** One-line description shown on reel cards. */
  tagline: string;
  /** Service tags, rendered as a quiet row. */
  tags: readonly string[];
  /** Honest status line — no invented metrics. */
  status: string;
  /**
   * Case-study destination. Null until those pages exist; the UI then falls
   * back to an enquiry link rather than a dead route.
   */
  href: string | null;
  visual: ProjectVisualKind;
  /** Real product capture, when one exists in the product's own repo. */
  shot?: ProjectShot;
  /**
   * Alternative capture for small tile contexts (reel cards, hero window),
   * where the featured shot's composition doesn't crop well.
   */
  tileShot?: ProjectShot;
  /** Featured in the editorial selected-work section. */
  featured?: {
    headline: string;
  };
  /** Accessible description of the tile as a whole. */
  alt: string;
};

export const projects: readonly Project[] = [
  {
    slug: "pubcam",
    index: "01",
    name: "PubCam",
    tagline: "Nightlife discovery platform",
    tags: ["Strategy", "Brand", "Mobile", "Web"],
    status: "Live on the App Store",
    href: null,
    visual: "pubcam",
    shot: {
      src: "/work/pubcam-venue.png",
      alt: "PubCam venue screen for The Grand Hotel with a live crowd-level pill and recent clips",
      aspect: "574 / 1006",
    },
    featured: {
      headline: "Reimagining how people discover nightlife.",
    },
    alt: "PubCam mobile app screen on a dark tile",
  },
  {
    slug: "tally-tax",
    index: "02",
    name: "Tally Tax",
    tagline: "A simpler tax experience for young Australians",
    tags: ["Product", "Mobile", "AI"],
    status: "App Store submission",
    href: null,
    visual: "tally",
    shot: {
      src: "/work/tally-profile.png",
      alt: "Tally profile screen showing tax profile completion and account details",
      // The source capture starts mid-title, so the frame is set shorter and
      // bottom-anchored to crop the damaged strip off the top.
      aspect: "776 / 1524",
      position: "50% 100%",
      width: "56%",
    },
    featured: {
      headline: "Making tax feel simple, understandable and less intimidating.",
    },
    alt: "Tally Tax mobile app screen on a light tile",
  },
  {
    slug: "kingswood",
    index: "03",
    name: "Kingswood",
    tagline: "Digital home for an Australian rock band",
    tags: ["Brand", "Web", "Experience"],
    status: "In development",
    href: null,
    visual: "kingswood",
    shot: {
      src: "/work/kingswood-hero.jpg",
      alt: "Black-and-white photograph of a dirt road cutting through hills, from the Kingswood site",
      aspect: "2400 / 1350",
    },
    // The motion-blur road reads as noise at card size; the band portrait
    // crops far better in a 4:5 tile.
    tileShot: {
      src: "/work/kingswood-portrait.jpg",
      alt: "Kingswood band portrait in black and white",
      aspect: "1600 / 1200",
      // Keep faces in frame when the landscape portrait crops into 4:5.
      position: "50% 18%",
    },
    featured: {
      headline: "Building a digital experience worthy of the band’s live presence.",
    },
    alt: "Kingswood band photography",
  },
  {
    slug: "scaffold-visualiser",
    index: "04",
    name: "Scaffold Visualiser",
    tagline: "Faster planning and visualisation for scaffold projects",
    tags: ["Product", "3D", "Web"],
    status: "In development",
    href: null,
    visual: "scaffold",
    alt: "Abstract scaffold elevation drawing with a cobalt dimension line",
  },
  {
    slug: "seat-view",
    index: "05",
    name: "Seat View",
    tagline: "Interactive 3D cinema seat-selection software",
    tags: ["Product", "3D", "SaaS"],
    status: "In development",
    href: null,
    visual: "seatview",
    alt: "Abstract cinema seat map with three selected seats highlighted in cobalt",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.featured,
);
