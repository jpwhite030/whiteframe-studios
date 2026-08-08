/**
 * All project content in one place, so cards, the hero window and the
 * selected-work sections can be re-pointed at real case-study pages by
 * editing this file alone.
 */

/**
 * Which treatment the tile renders. `placeholder` is the honest state for a
 * product with no capture yet — better a deliberate typographic card than an
 * invented mockup standing in for a screen that doesn't exist.
 */
export type ProjectVisualKind =
  | "pubcam"
  | "tally"
  | "still"
  | "kingswood"
  | "placeholder";

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
  /**
   * True when the capture is a full-device shot that already contains the
   * status bar and island. The device frame then stops drawing its own —
   * otherwise the two stack and the phone grows a second notch.
   */
  hasStatusBar?: boolean;
};

/**
 * A screen recording of the product running. Shown in place of the still
 * wherever a project has one; the still stays on as the poster frame, so a
 * demo is always additive and never a prerequisite.
 *
 * Export notes for new recordings:
 * - H.264 MP4 is the safe baseline; add a WebM/VP9 source for smaller files.
 * - ~1080px wide is plenty for phone UI, and keeps the file honest.
 * - Record silent. These autoplay, so they are always muted and loop.
 */
export type ProjectDemo = {
  /** Sources in preference order — the browser takes the first it can play. */
  sources: readonly { src: string; type: string }[];
  /** Still shown before playback, and instead of it under reduced motion. */
  poster: string;
  /** Describes what the recording shows, for anyone who can't watch it. */
  alt: string;
  /** CSS aspect-ratio of the recording, e.g. "886 / 1920". */
  aspect: string;
  /** Width as a fraction of the tile, matching ProjectShot. */
  width?: string;
  /**
   * True for a full-device recording that already shows the status bar —
   * simulator captures do. Stops the device frame drawing a second one.
   */
  hasStatusBar?: boolean;
};

/**
 * One step of a product walkthrough: a screen, and a line saying what the
 * person is looking at. Captions carry the argument — without them a
 * walkthrough is just a slideshow of screens nobody can interpret.
 */
export type WalkthroughScreen = ProjectShot & {
  caption: string;
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
  /**
   * Tone of the status bar drawn above the capture in a device frame. Match
   * it to the app's own top edge — light apps take "light".
   */
  deviceTone?: "light" | "dark";
  /** Real product capture, when one exists in the product's own repo. */
  shot?: ProjectShot;
  /**
   * Alternative capture for small tile contexts (reel cards, hero window),
   * where the featured shot's composition doesn't crop well.
   */
  tileShot?: ProjectShot;
  /**
   * Screen recording of the product. Takes precedence over `shot` in the
   * large feature contexts; cards stay on stills so a reel of five projects
   * never becomes five simultaneous videos.
   */
  demo?: ProjectDemo;
  /**
   * Ordered screens for the click-through walkthrough. Optional: with none
   * set, the walkthrough falls back to the single `shot`, which still earns
   * its place — the hero renders phones far too small to actually read.
   */
  walkthrough?: readonly WalkthroughScreen[];
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
    deviceTone: "dark",
    shot: {
      src: "/work/pubcam-venue.png",
      alt: "PubCam venue screen for The Grand Hotel with a live crowd-level pill and recent clips",
      aspect: "574 / 1006",
    },
    // Recorded from the Release build on an iPhone 17 simulator, so there are
    // no dev overlays and the transitions run at full speed.
    demo: {
      sources: [
        { src: "/work/pubcam-onboarding.webm", type: "video/webm" },
        { src: "/work/pubcam-onboarding.mp4", type: "video/mp4" },
      ],
      poster: "/work/pubcam-onboarding-poster.jpg",
      alt: "PubCam's onboarding, stepping through live venue clips, crowd levels, the venue map, what's on, and posting a clip",
      aspect: "640 / 1392",
      hasStatusBar: true,
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
    deviceTone: "light",
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
    slug: "still",
    index: "03",
    name: "Still",
    // Adjust freely — written from what the Today screen shows, not from
    // any positioning you've settled on.
    tagline: "Focus sessions that protect time for deep work",
    tags: ["Product", "Mobile", "macOS"],
    status: "In TestFlight",
    href: null,
    visual: "still",
    shot: {
      src: "/work/still-today.png",
      alt: "Still's Today screen showing protected focus time, a stillness score and seven-day activity",
      aspect: "1206 / 2622",
      // Full-device capture — it carries its own status bar and island, so
      // the device frame must not draw a second one.
      hasStatusBar: true,
    },
    alt: "Still mobile app screen on a dark tile",
  },
  {
    slug: "kingswood",
    index: "04",
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
    index: "05",
    name: "Scaffold Visualiser",
    tagline: "Faster planning and visualisation for scaffold projects",
    tags: ["Product", "3D", "Web"],
    status: "In development",
    href: null,
    visual: "placeholder",
    alt: "Scaffold Visualiser — capture coming",
  },
  {
    slug: "seat-view",
    index: "06",
    name: "Seat View",
    tagline: "Interactive 3D cinema seat-selection software",
    tags: ["Product", "3D", "SaaS"],
    status: "In development",
    href: null,
    visual: "placeholder",
    alt: "Seat View — capture coming",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.featured,
);
