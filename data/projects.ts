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

/** One item in a case-study gallery: either a still or a recording. */
export type CaseStudyMedia =
  | WalkthroughScreen
  | (ProjectDemo & { caption: string });

/** True when a gallery item is a recording rather than a still. */
export function isClip(
  item: CaseStudyMedia,
): item is ProjectDemo & { caption: string } {
  return "sources" in item;
}

/**
 * A quote from a client. Left unset until a real one exists — the case-study
 * page simply omits the section rather than rendering an invented one.
 */
export type Testimonial = {
  quote: string;
  attribution: string;
  /** Role and company, where the client is happy to be named. */
  role?: string;
};

/**
 * Everything a case-study page renders beyond the basics already on Project.
 *
 * `results` and `testimonial` are deliberately optional: no outcome is
 * claimed here that hasn't come from the client. Where they're absent the
 * page omits the section entirely rather than filling it with something
 * plausible. See CONTENT.md for what's still awaiting real information.
 */
export type CaseStudy = {
  /** Long-form page title, e.g. "PubCam: Designing and Building a…". */
  title: string;
  metaTitle: string;
  metaDescription: string;
  industry: string;
  /** One-paragraph overview. */
  summary: string;
  /** The situation before the work started. */
  problem: readonly string[];
  /** What the work was trying to achieve, commercially or for users. */
  objective: readonly string[];
  /** What Whiteframe was responsible for. */
  responsibilities: readonly string[];
  /** Decisions worth explaining, each with the reasoning. */
  decisions: readonly { title: string; detail: string }[];
  /** Brand and interface work. */
  design: readonly string[];
  /** Engineering approach. */
  engineering: readonly string[];
  deliverables: readonly string[];
  /** Measured outcomes. Only ever populated from client-confirmed numbers. */
  results?: readonly { label: string; value: string }[];
  testimonial?: Testimonial;
  /**
   * Screens and recordings from the product, rendered in the order given —
   * so a clip can sit between two stills where the narrative wants it, rather
   * than all video being forced to the front. Items are told apart by shape:
   * a recording has `sources`, a still has `src`.
   */
  gallery?: readonly CaseStudyMedia[];
  /**
   * A static web export of the product itself, embedded so it can be used
   * rather than watched. Optional: the section omits where absent.
   */
  liveDemo?: {
    /** Entry URL under /public. */
    src: string;
    poster: string;
    posterAlt: string;
    aspect: string;
  };
  /** Service slugs this project drew on. */
  relatedServices: readonly string[];
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
  /** Full case study. Projects without one don't get a /work/… route. */
  caseStudy?: CaseStudy;
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
    href: "/work/pubcam",
    visual: "pubcam",
    deviceTone: "dark",
    shot: {
      src: "/work/pubcam-venue.png",
      alt: "PubCam venue screen for The Grand Hotel with a live crowd-level pill and recent clips",
      aspect: "574 / 1006",
    },
    // Cards use the onboarding opener rather than the venue detail: the
    // wordmark and the one-line promise read at card size, where a venue
    // screen's crowd pill and clip row do not.
    tileShot: {
      src: "/work/pubcam-intro-v1.png",
      alt: "PubCam's opening screen: the wordmark over a darkened venue clip, headed \u201cKnow the vibe before you go\u201d",
      aspect: "900 / 1956",
      hasStatusBar: true,
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
    caseStudy: {
      title: "PubCam: Designing and Building a Nightlife Discovery App",
      metaTitle: "PubCam Case Study — Nightlife Discovery App | Whiteframe",
      metaDescription:
        "How Whiteframe designed and built PubCam — a nightlife discovery app showing live venue clips and crowd levels — from brand and strategy to a shipped iOS app.",
      industry: "Hospitality and nightlife",
      summary:
        "PubCam answers a question people ask every weekend and can't currently answer: what is that venue actually like right now? The product pairs short clips posted from inside venues with live crowd levels, so the decision about where to go is based on the room as it is tonight rather than photographs taken years ago.",
      problem: [
        "Deciding where to go out relies on stale information — venue photos from a website refresh years ago, or a review written on a different night entirely.",
        "Venues have no way to show a quiet Tuesday differently from a full Saturday, so they compete on static listings that flatten what makes each room distinctive.",
        "Existing platforms optimise for bookings and reviews, neither of which tells you whether a place is busy right now.",
      ],
      objective: [
        "Give people a reason to check the app in the hour before they go out, not the week before.",
        "Give venues a channel that reflects a live room rather than a marketing photo.",
        "Ship a product that works on a phone, in a dark venue, on a poor connection.",
      ],
      responsibilities: [
        "Product strategy and scope",
        "Brand identity",
        "End-to-end product design",
        "iOS application development",
        "Backend, data model and APIs",
        "Venue-facing tooling and marketing site",
      ],
      decisions: [
        {
          title: "Clips over live streams",
          detail:
            "Continuous streaming raises cost, privacy and moderation problems disproportionate to the benefit. Short recent clips answer the same question — what's it like right now — while staying cheap to serve and far easier to moderate.",
        },
        {
          title: "A recording window, not an open camera",
          detail:
            "Clips are capped and can only be posted at participating venues. The constraint keeps content relevant to the room and makes the contribution feel like a small deliberate act rather than surveillance.",
        },
        {
          title: "Designed dark, for the room it's used in",
          detail:
            "The interface is used at night, in low light, one-handed. That drove the dark palette, the type sizes and the reachability of the primary actions — not an aesthetic preference.",
        },
        {
          title: "Age gating as a first-class flow",
          detail:
            "An 18+ product needs verification designed in, not appended. It sits in the launch path ahead of any content, for guests and account holders alike.",
        },
      ],
      design: [
        "Identity built around a handwritten wordmark that holds up small, on dark, and over video.",
        "A five-slide onboarding that explains the product through motion rather than copy, using real venue footage.",
        "Venue screens that lead with live activity — crowd level and recent clips — ahead of static detail.",
        "Full dark interface, with every state drawn: empty venues, failed uploads, no location permission.",
      ],
      engineering: [
        "React Native and Expo, shipping a single codebase to iOS with native modules where the camera and location work demanded it.",
        "Supabase for authentication, data and storage, with row-level security enforcing what each role can read and write.",
        "Video processed on upload so playback stays light on a phone connection.",
        "Separate venue portal and admin surfaces, sharing the data model but with distinct permissions.",
      ],
      deliverables: [
        "Brand identity and design system",
        "iOS application",
        "Backend, data model and APIs",
        "Venue portal for managing events and specials",
        "Admin dashboard",
        "Marketing site at pubcam.com.au",
      ],
      // Real captures from the Release build on an iPhone 17 simulator.
      // Each one is here because it shows a decision described above, not to
      // fill a grid — see CONTENT.md for the screens still to capture.
      // Ordered deliberately: the two screens someone meets first, then the
      // map that answers "what's near me", then the feed actually running,
      // then the surfaces you reach from there.
      gallery: [
        {
          src: "/work/pubcam-signin-v2.png",
          alt: "PubCam sign-in screen offering Apple, Google and email sign-in over a darkened venue clip, with a guest option",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "Sign-in sits over live footage rather than a marketing image — the product's argument is made before the account is.",
        },
        {
          src: "/work/pubcam-age-gate.png",
          alt: "PubCam age verification screen asking for a date of birth, headed \u201cBefore we show you the night\u201d",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "Age verification is a designed step in the launch path, not a modal bolted on. It applies to guests and account holders alike.",
        },
        {
          src: "/work/pubcam-map-v1.png",
          alt: "PubCam map of Wollongong showing venue pins with their logos and filter chips for nightclub, restaurant and bar, pub and bar",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "The map answers the other half of the question — what's near me — with venues shown as themselves rather than as identical pins.",
        },
        {
          // Recorded on a second pass, after a first scroll had loaded the
          // clips: on a cold cache each swipe stalled for two or three
          // seconds while the next video buffered.
          sources: [
            { src: "/work/pubcam-feed-v2.mp4", type: "video/mp4" },
            { src: "/work/pubcam-feed-v2.webm", type: "video/webm" },
          ],
          poster: "/work/pubcam-feed-poster-v2.jpg",
          alt: "Scrolling the PubCam feed, moving between recent clips posted at The Grand Hotel in Wollongong",
          aspect: "576 / 1252",
          hasStatusBar: true,
          caption:
            "The feed is the product working: one clip per screen, swiped through like any other short-form feed, each tagged with the venue and when it was posted.",
        },
        {
          src: "/work/pubcam-venue.png",
          alt: "PubCam venue screen for The Grand Hotel showing a live crowd-level pill and recent clips",
          aspect: "574 / 1006",
          caption:
            "A venue screen leads with live activity — crowd level and recent clips — before any static detail about the room.",
        },
        {
          src: "/work/pubcam-events-v1.png",
          alt: "PubCam events screen listing happy hours, food deals and drink specials posted by Wollongong venues",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "Events, food deals and drink specials, posted by the venues themselves. This is the surface that earns a midweek open, not just a Saturday one.",
        },
      ],
      // No results published: adoption figures are the client's to release.
      // See CONTENT.md.
      relatedServices: [
        "product-strategy",
        "product-design",
        "software-development",
      ],
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
    href: "/work/tally-tax",
    visual: "tally",
    deviceTone: "light",
    shot: {
      src: "/work/tally-home-v1.png",
      alt: "Tally's home screen with a scan-a-receipt action, a daily tax tip and a tax-readiness score of 79 per cent",
      aspect: "900 / 1956",
      hasStatusBar: true,
    },
    featured: {
      headline: "Making tax feel simple, understandable and less intimidating.",
    },
    caseStudy: {
      title: "Tally Tax: A Simpler Tax Experience for Young Australians",
      metaTitle: "Tally Tax Case Study — Consumer Tax App | Whiteframe",
      metaDescription:
        "How Whiteframe designed and built Tally Tax, turning an intimidating annual process into a guided profile with AI-assisted deduction suggestions.",
      industry: "Financial services and tax",
      summary:
        "Most Australians meet the tax system once a year, through an interface built for people who already understand it. Tally reframes the same task as a profile you complete gradually — occupation, employment, income — and uses what it knows to suggest the deductions a person in that situation can usually claim.",
      problem: [
        "First-time lodgers face an interface written in the language of the tax system rather than the language of their working life.",
        "People miss deductions they're entitled to simply because nobody tells them the category exists.",
        "The annual, all-at-once shape of the task makes it easy to defer and stressful to start.",
      ],
      objective: [
        "Replace one intimidating form with a profile that can be filled in over time.",
        "Surface relevant deductions based on what someone actually does for work.",
        "Be accurate and careful with the language: helpful without straying into advice it isn't licensed to give.",
      ],
      responsibilities: [
        "Product definition and scope",
        "Product and interface design",
        "Mobile application development",
        "AI-assisted deduction suggestions",
      ],
      decisions: [
        {
          title: "A profile, not a form",
          detail:
            "Progress is stored and shown as completion rather than demanded in one sitting. It makes an annual obligation feel resumable, which is the single biggest barrier to starting.",
        },
        {
          title: "Occupation drives everything downstream",
          detail:
            "Deduction relevance falls out of what someone does for work. Asking that first means later questions can be narrowed to what actually applies to them.",
        },
        {
          title: "Suggestions, never advice",
          detail:
            "The product suggests categories to consider and is explicit that it isn't a registered tax agent. That boundary shaped the copy throughout, not just the disclaimers.",
        },
      ],
      design: [
        "A light, high-contrast interface deliberately unlike the institutional tone of tax software.",
        "Completion made visible at every level, so progress is legible without opening anything.",
        "Plain-language labels throughout — 'work and income details' rather than schedule references.",
      ],
      engineering: [
        "React Native mobile application.",
        "Structured tax profile model that drives deduction relevance rather than hard-coding categories per screen.",
        "AI-assisted suggestion layer sitting behind the profile, with output constrained to a reviewed category set.",
      ],
      deliverables: [
        "Product definition",
        "Brand and interface design",
        "Mobile application",
        "Deduction suggestion system",
        "Marketing site",
      ],
      // Captured from the Release build on an iPhone 17 simulator, running
      // the app's own preview mode.
      gallery: [
        {
          // WebM leads here at roughly half the MP4 size: a flat interface
          // with little motion is what VP9 handles well, the opposite of
          // PubCam's venue footage.
          sources: [
            { src: "/work/tally-profile-demo-v1.webm", type: "video/webm" },
            { src: "/work/tally-profile-demo-v1.mp4", type: "video/mp4" },
          ],
          poster: "/work/tally-profile-demo-poster-v1.jpg",
          alt: "Building a Tally tax profile: choosing an occupation and an employment type, with the completion bar rising as each answer is given",
          aspect: "576 / 1252",
          hasStatusBar: true,
          caption:
            "A profile being built: each answer moves the completion bar, which is the whole argument for treating an annual obligation as something resumable.",
        },
        {
          src: "/work/tally-home-v1.png",
          alt: "Tally's home screen with a scan-a-receipt action, a streak counter, a daily tax tip and a 79 per cent tax-readiness score",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "Readiness is shown as a score with the next three actions under it, so the annual task always has an obvious next step rather than a deadline.",
        },
        {
          src: "/work/tally-ask-v1.png",
          alt: "Tally's Ask screen offering questions such as what receipts am I missing and what deductions do I have so far",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "The assistant answers from your own records and the published ATO rules, and labels every figure as confirmed or an estimate — the line between help and advice, drawn in the interface.",
        },
        {
          src: "/work/tally-occupation-v1.png",
          alt: "Tally's tax profile asking what you do for work, with occupation options from retail and trades to teaching and delivery, one selected",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "Occupation is asked first because deduction relevance falls out of it — everything downstream can then be narrowed to what actually applies.",
        },
        {
          src: "/work/tally-profile-questions-v1.png",
          alt: "Tally asking employment type and expected earnings in plain language, with options such as casual, gig or freelance, and income bands",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "The profile is written as questions a person can answer — \u201croughly what will you earn this year?\u201d — rather than as the schedule references the tax system uses.",
        },
        {
          src: "/work/tally-tax-summary-v1.png",
          alt: "Tally's tax summary listing readiness by category — vehicle, working from home, travel, clothing and tools — each with its own completion percentage",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "Readiness is tracked per deduction category rather than as one number, so what's missing is always attributable to a specific part of the return.",
        },
        {
          src: "/work/tally-plus-v1.png",
          alt: "Tally Plus subscription screen showing annual and monthly pricing in Australian dollars",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "The paid tier is framed around what it removes — unlimited scanning, automatic trip tracking, export — rather than around feature counts.",
        },
      ],
      // A real static export of the app, running against no backend.
      liveDemo: {
        src: "/tally-demo",
        poster: "/work/tally-home-v1.png",
        posterAlt:
          "Tally's home screen, shown before the interactive demo is loaded",
        // Matches the logical phone viewport the iframe is given, so the
        // scaled app fills the screen with no letterboxing.
        aspect: "390 / 844",
      },
      relatedServices: [
        "product-strategy",
        "product-design",
        "software-development",
        "ai-automation",
      ],
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
    href: "/work/still",
    visual: "still",
    shot: {
      src: "/work/still-today.png",
      alt: "Still's Today screen showing protected focus time, a stillness score and seven-day activity",
      aspect: "1206 / 2622",
      // Full-device capture — it carries its own status bar and island, so
      // the device frame must not draw a second one.
      hasStatusBar: true,
    },
    caseStudy: {
      title: "Still: Designing a Focus App That Protects Time",
      metaTitle: "Still Case Study — Focus and Deep Work App | Whiteframe",
      metaDescription:
        "How Whiteframe designed and built Still, an iOS and macOS focus app that measures protected time rather than counting streaks, currently in TestFlight.",
      industry: "Productivity software",
      summary:
        "Still measures one thing: how much of the day was actually protected. Rather than gamifying streaks or blocking apps, it records focus sessions, scores how uninterrupted each one was, and shows the week as a shape you can read in a second.",
      problem: [
        "Focus tools tend to reward consistency over quality — a streak counter says nothing about whether the time was any good.",
        "Blockers treat the person as the problem, which makes them easy to resent and easy to disable.",
        "Time spent in deep work is invisible after the fact, so there's nothing to reflect on.",
      ],
      objective: [
        "Make protected time measurable without turning it into a game.",
        "Keep the interface quiet enough to belong to a product about focus.",
        "Work across the phone and the desk, since focus happens at both.",
      ],
      responsibilities: [
        "Product definition",
        "Brand and interface design",
        "iOS and macOS application development",
        "Widgets and Live Activity",
      ],
      decisions: [
        {
          title: "Stillness as a score, not a streak",
          detail:
            "Sessions are scored on how uninterrupted they were. It measures the quality of the time rather than the fact of having shown up, which is the thing worth improving.",
        },
        {
          title: "Named sessions",
          detail:
            "Attaching a session to what it was for turns history into a record of work done, not a log of minutes elapsed.",
        },
        {
          title: "An interface that practises what it measures",
          detail:
            "Near-black, minimal type, no badges or celebration. A product about protecting attention shouldn't spend any of it.",
        },
      ],
      design: [
        "A dark, typographic interface with one number as the focal point of the day.",
        "Seven-day activity shown as bare bars, readable at a glance without labels or gridlines.",
        "A single primary action — Begin — with everything else subordinate to it.",
      ],
      engineering: [
        "Native SwiftUI across iOS and macOS, sharing a model layer between targets.",
        "Widgets and Live Activity so a running session is visible without opening the app.",
        "Local-first data, so sessions are recorded whether or not there's a network.",
      ],
      deliverables: [
        "Product definition",
        "Brand identity and app icon",
        "iOS application",
        "macOS companion application",
        "Widgets and Live Activity",
      ],
      // Captured from a Release build on an iPhone 17 simulator.
      gallery: [
        {
          src: "/work/still-session-v1.png",
          alt: "A completed Still session scored 100, listing total duration, protected focus, longest unbroken block, pauses and interruptions",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "A session opened up: the score is not a badge but a summary of what was measured — unbroken time, pauses, interruptions, whether the intention was met.",
        },
        {
          src: "/work/still-history-v1.png",
          alt: "Still's history screen showing hours protected this week, average stillness, a seven-day chart and a list of named sessions",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "History is a record of work done rather than minutes elapsed, because each session carries the name of what it was for.",
        },
        {
          src: "/work/still-settings-v1.png",
          alt: "Still's settings screen with haptics, completion sounds, default duration, notification permission and appearance options",
          aspect: "900 / 1956",
          hasStatusBar: true,
          caption:
            "Settings stays short. A product about protecting attention has no business spending it on configuration.",
        },
      ],
      relatedServices: ["product-strategy", "product-design", "software-development"],
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
    href: "/work/kingswood",
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
    caseStudy: {
      title: "Kingswood: A Digital Home for an Australian Rock Band",
      metaTitle: "Kingswood Case Study — Band Website and Brand | Whiteframe",
      metaDescription:
        "How Whiteframe is designing and building a digital home for Australian rock band Kingswood, carrying the energy of their live show into the web. In development.",
      industry: "Music and entertainment",
      summary:
        "A band's website usually reduces to a tour list and a streaming link — a directory entry for something people experience as a room full of noise. This project starts from the live show and works backwards, asking what the web can carry of it.",
      problem: [
        "Band sites are typically templates: dates, links, a photo, little of the act itself.",
        "The most compelling material — live footage, photography, the sound — is scattered across platforms nobody controls.",
        "Nothing on the current web presence conveys what the live show feels like.",
      ],
      objective: [
        "Build a home the band owns, rather than renting attention on other platforms.",
        "Carry the physicality of the live show into a medium that flattens it by default.",
        "Keep tour dates and releases easy to maintain, so the site stays current.",
      ],
      responsibilities: [
        "Brand direction for the web presence",
        "Art direction and photography treatment",
        "Experience design",
        "Web development",
      ],
      decisions: [
        {
          title: "Photography leads, chrome recedes",
          detail:
            "The imagery is the product. Navigation and structure are pulled back so full-bleed photography and footage carry the page rather than competing with an interface.",
        },
        {
          title: "Motion tied to scroll, not to autoplay",
          detail:
            "The energy comes through pace and reveal as someone moves down the page, which respects both attention and bandwidth.",
        },
      ],
      design: [
        "Black-and-white photographic direction, held consistently across the site.",
        "Editorial typography sized for impact rather than density.",
        "Full-bleed imagery as the primary structural device.",
      ],
      engineering: [
        "Next.js, statically generated for speed on mobile connections.",
        "Image pipeline sized and formatted per breakpoint so full-bleed photography stays fast.",
      ],
      deliverables: [
        "Web presence design",
        "Front-end build",
        "Content structure for tour dates and releases",
      ],
      relatedServices: ["product-design", "software-development"],
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

/** Projects with a case study, and therefore a /work/<slug> route. */
export const caseStudyProjects = projects.filter(
  (project): project is Project & { caseStudy: CaseStudy } =>
    project.caseStudy !== undefined,
);

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
