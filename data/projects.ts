/** Visual treatments available to the project showcase. */
export type ProjectVisual =
  | "pubcam"
  | "meridian"
  | "tally"
  | "skelscaff"
  | "kingswood";

/**
 * How the block sits on the page. Blocks deliberately do not share one
 * arrangement — a repeated frame is what makes work look like a template.
 */
export type ProjectLayout = "standard" | "bleed" | "full";

/** Frame proportion, so no two panels are the same shape. */
export type ProjectAspect = "wide" | "classic" | "tall" | "panorama" | "cinema";

export type Project = {
  /** Stable slug — also used as the DOM id of the project block. */
  id: string;
  index: string;
  name: string;
  layout: ProjectLayout;
  aspect: ProjectAspect;
  category: string;
  description: string;
  capabilities: readonly string[];
  status: string;
  /** Live status marks the block with an active indicator. */
  isLive?: boolean;
  /**
   * Public destination for the project. Left null until a live URL or case
   * study page exists — the showcase falls back to a direct enquiry link.
   */
  href: string | null;
  /**
   * Optional screenshot. Drop a file in /public and set the path here to
   * replace the coded placeholder visual with a real product image.
   */
  image: string | null;
  /** Alt text used for the image, and as the accessible label for the placeholder. */
  imageAlt: string;
  visual: ProjectVisual;
};

export const projects: readonly Project[] = [
  {
    id: "pubcam",
    index: "01",
    name: "PubCam",
    layout: "standard",
    aspect: "wide",
    category: "Consumer application / Nightlife technology",
    description:
      "A live nightlife discovery platform helping users see venue activity, events and crowd conditions before they arrive.",
    capabilities: [
      "Mobile application",
      "Venue discovery",
      "Live nightlife information",
      "Events",
      "Rewards",
      "Venue partnerships",
    ],
    status: "Live on the App Store",
    isLive: true,
    href: null,
    image: null,
    imageAlt:
      "PubCam mobile application showing live venue activity, crowd levels and nearby events",
    visual: "pubcam",
  },
  {
    id: "meridian-ai",
    index: "02",
    name: "Meridian AI",
    layout: "bleed",
    aspect: "classic",
    category: "Computer vision / Venue intelligence",
    description:
      "An AI analytics platform designed to measure occupancy, dwell time, queue activity, peak periods and venue performance.",
    capabilities: [
      "Computer vision",
      "Headcount",
      "Dwell-time analytics",
      "Queue intelligence",
      "Forecasting",
      "Operational dashboards",
    ],
    status: "In development",
    href: null,
    image: null,
    imageAlt:
      "Meridian AI dashboard showing computer vision detection zones and occupancy analytics for a venue",
    visual: "meridian",
  },
  {
    id: "tally-tax",
    index: "03",
    name: "Tally Tax",
    layout: "standard",
    aspect: "tall",
    category: "Consumer fintech / Tax software",
    description:
      "A tax application designed to help younger Australians track expenses, understand deductions and prepare for tax time.",
    capabilities: [
      "Receipt scanning",
      "Expense classification",
      "Guided tax workflows",
      "Consumer education",
      "Mobile product design",
    ],
    status: "App Store submission",
    href: null,
    image: null,
    imageAlt:
      "Tally Tax application showing a scanned receipt being classified into deduction categories",
    visual: "tally",
  },
  {
    id: "skel-scaff-systems",
    index: "04",
    name: "Skel Scaff Systems",
    layout: "bleed",
    aspect: "panorama",
    category: "Operations / Business automation",
    description:
      "Internal systems and workflow automation designed to reduce repetitive administration across quoting, projects, task creation and operations.",
    capabilities: [
      "Workflow automation",
      "Internal tools",
      "Operations systems",
      "Project setup",
      "Process design",
    ],
    status: "Client systems",
    href: null,
    image: null,
    imageAlt:
      "Skel Scaff Systems workflow automation diagram connecting quoting, project setup and task creation",
    visual: "skelscaff",
  },
  {
    id: "kingswood",
    index: "05",
    name: "Kingswood",
    layout: "full",
    aspect: "cinema",
    category: "Music / Digital experience",
    description:
      "A high-impact website experience for the Australian rock band Kingswood, designed around music, touring, identity and visual storytelling.",
    capabilities: [
      "Website design",
      "Frontend development",
      "Music integration",
      "Tour information",
      "Content system",
    ],
    status: "In development",
    href: null,
    image: null,
    imageAlt:
      "Kingswood website experience showing typographic tour listing and music player interface",
    visual: "kingswood",
  },
];
