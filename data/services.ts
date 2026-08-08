/**
 * The studio's four services, each with enough structure to render a full
 * page: who it's for, what it solves, what's delivered, how it runs, and the
 * questions people actually ask before enquiring.
 *
 * Content only — no claims about outcomes, clients or metrics live here.
 * Anything of that kind belongs on a case study, sourced from the client.
 */

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  index: string;
  /** Nav and card label. */
  name: string;
  /** The page's single H1. */
  headline: string;
  /** <title>. Kept explicit so each page reads naturally rather than templated. */
  metaTitle: string;
  metaDescription: string;
  /** One-line summary used on cards and in listings. */
  summary: string;
  /** Opening value proposition, one or two paragraphs. */
  intro: readonly string[];
  /** Who the service is for. */
  audience: readonly string[];
  /** Problems this work solves. */
  problems: readonly string[];
  /** What a client actually receives. */
  deliverables: readonly string[];
  /** How the work runs, in order. */
  process: readonly { title: string; detail: string }[];
  faqs: readonly ServiceFaq[];
  /** Project slugs whose case studies are relevant to this service. */
  relatedProjects: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "product-strategy",
    index: "01",
    name: "Product strategy",
    headline: "Product strategy that decides what to build, and what to leave out.",
    metaTitle: "Product Strategy Consulting Sydney | Whiteframe",
    metaDescription:
      "Product strategy for founders and teams in Sydney and beyond — scoping, roadmaps, positioning and launch planning that turn an early idea into something buildable.",
    summary:
      "Turning early ideas into focused products, roadmaps and launch plans.",
    intro: [
      "Most products fail on scope before they fail on execution. Strategy work is where the idea in your head becomes a thing that can actually be built — small enough to ship, clear enough to explain, and pointed at a problem someone genuinely has.",
      "We work in short, decisive engagements. You end up with a shape for the product, an order to build it in, and a written case for why the first release contains what it contains.",
    ],
    audience: [
      "Founders with an idea and no clear first release",
      "Teams whose roadmap has grown faster than their capacity",
      "Businesses digitising a process that currently runs on spreadsheets",
      "Anyone who has been quoted for a build and isn't sure it's the right one",
    ],
    problems: [
      "A scope that has quietly doubled since the first conversation",
      "No agreed definition of what the first version must do",
      "Features chosen by opinion rather than by the problem they solve",
      "A product that can't be described in one sentence",
      "Building for an audience nobody has spoken to",
    ],
    deliverables: [
      "Product definition and scope for a first release",
      "Prioritised roadmap with an explicit build order",
      "Positioning and messaging foundations",
      "Technical approach and platform recommendation",
      "Launch plan and success measures",
    ],
    process: [
      {
        title: "Understand",
        detail:
          "Sessions with you and, where possible, the people you're building for. We map the problem before touching a solution.",
      },
      {
        title: "Define",
        detail:
          "We cut the idea down to a first release that can ship, and write down what was deferred and why.",
      },
      {
        title: "Sequence",
        detail:
          "A build order that puts the riskiest assumptions first, so what's uncertain gets tested early rather than at launch.",
      },
      {
        title: "Hand over",
        detail:
          "A document you can hand to any team — including ours — and a conversation about what happens next.",
      },
    ],
    faqs: [
      {
        question: "How long does a strategy engagement take?",
        answer:
          "Most run two to four weeks depending on how much research is needed. Longer than that usually means the problem needs splitting.",
      },
      {
        question: "Do we have to build with you afterwards?",
        answer:
          "No. The output is deliberately written so another team can pick it up. Plenty of clients do continue with us, but the work stands alone.",
      },
      {
        question: "We already have a spec. Is this still useful?",
        answer:
          "Often more so. A second read on an existing spec tends to surface scope that has crept in, and assumptions nobody has tested yet.",
      },
      {
        question: "Can you work with our existing team?",
        answer:
          "Yes. Strategy work frequently runs alongside an in-house team who will do the building.",
      },
    ],
    relatedProjects: ["pubcam", "still", "tally-tax"],
  },
  {
    slug: "product-design",
    index: "02",
    name: "Product and interface design",
    headline: "Brand and interface design that makes a product feel considered.",
    metaTitle: "Product & UX/UI Design Sydney | Whiteframe",
    metaDescription:
      "Product design, UX/UI and brand identity from a Sydney studio — interfaces and identities built as one system, designed against real content.",
    summary:
      "Creating identities and interfaces that feel distinctive and intuitive.",
    intro: [
      "Design here means both halves: how a product looks and how it behaves. An identity that only works on a landing page, or an interface that ignores the brand it belongs to, leaves the product feeling assembled rather than made.",
      "We design against real content and real states — empty, loading, failed, full — because those are the screens people actually meet.",
    ],
    audience: [
      "Founders who need an identity and a product designed as one thing",
      "Teams whose interface has drifted as features were added",
      "Products that work but feel harder to use than they should",
      "Businesses whose brand hasn't caught up with what they now do",
    ],
    problems: [
      "An interface assembled from components rather than designed",
      "A brand that exists as a logo and nothing else",
      "Screens designed with placeholder content that break with real data",
      "Empty and error states nobody has drawn",
      "Design handoffs engineers can't build from",
    ],
    deliverables: [
      "Identity system: wordmark, type, colour and usage",
      "End-to-end UX flows for the core journeys",
      "High-fidelity interface design across breakpoints",
      "A component library the build actually uses",
      "Prototypes for the interactions that need feeling out",
    ],
    process: [
      {
        title: "Frame",
        detail:
          "Agree the journeys that matter and the states each screen has to handle.",
      },
      {
        title: "Explore",
        detail:
          "Directions explored broadly, then narrowed fast. We show work early rather than presenting a finished answer.",
      },
      {
        title: "Resolve",
        detail:
          "The chosen direction taken to full fidelity, with real content and every state drawn.",
      },
      {
        title: "Systemise",
        detail:
          "Design decisions turned into components and tokens so the build stays consistent as it grows.",
      },
    ],
    faqs: [
      {
        question: "Can you design without doing the build?",
        answer:
          "Yes, and we deliver in a form your engineers can work from. We'd usually ask to stay available during the build so decisions don't get lost in translation.",
      },
      {
        question: "Do you work with our existing brand?",
        answer:
          "Often. If a brand already works, extending it into a product is cheaper and better than starting again.",
      },
      {
        question: "What tools do you hand over?",
        answer:
          "Editable design files plus a written rationale for the system's rules. Where we also build, the component library is the handover.",
      },
      {
        question: "How do you handle mobile?",
        answer:
          "Every screen is designed across breakpoints as part of the same pass, not adapted afterwards.",
      },
    ],
    relatedProjects: ["still", "pubcam", "kingswood"],
  },
  {
    slug: "software-development",
    index: "03",
    name: "Web and mobile development",
    headline: "Software development that ships to production and stays maintainable.",
    metaTitle: "Software Development Company Sydney | Whiteframe",
    metaDescription:
      "Web and mobile development from a Sydney product studio — Next.js, React and native iOS, built and shipped to production with the people who designed it.",
    summary: "Building responsive, production-ready web and mobile products.",
    intro: [
      "We build the products we design, which removes the most expensive handover in the process. The people who made the decisions are the people writing the code, so intent survives contact with the build.",
      "Production-ready means what it says: deployed, monitored, accessible, and written so the next person to open the file can follow it.",
    ],
    audience: [
      "Founders taking a first product from design to launch",
      "Teams who need senior capacity without hiring for it",
      "Businesses replacing a manual process with real software",
      "Products that need rebuilding rather than patching",
    ],
    problems: [
      "A prototype that can't carry real users",
      "Work that stalls between design and engineering",
      "Codebases nobody wants to open",
      "Products that pass a demo but fall over on slow connections",
      "Launches that slip because nobody owns deployment",
    ],
    deliverables: [
      "Production web applications in Next.js and React",
      "Native mobile applications for iOS and Android",
      "APIs, data models and third-party integrations",
      "Deployment, environments and release process",
      "Documentation and a handover the next team can use",
    ],
    process: [
      {
        title: "Set up",
        detail:
          "Repository, environments and deployment pipeline first, so shipping is never the risky part.",
      },
      {
        title: "Build in slices",
        detail:
          "Vertical slices of working product rather than horizontal layers, so there's something real to react to early.",
      },
      {
        title: "Harden",
        detail:
          "Accessibility, performance, error states and edge cases treated as build work, not as a phase that gets cut.",
      },
      {
        title: "Launch and hand over",
        detail:
          "Release, monitoring and a documented codebase. You own the code and the accounts.",
      },
    ],
    faqs: [
      {
        question: "What stack do you build on?",
        answer:
          "Next.js and React for web, Expo and native Swift for mobile, with Postgres and Supabase where they fit. We pick from a stack we know deeply rather than the newest option.",
      },
      {
        question: "Do we own the code?",
        answer:
          "Yes. Repositories, infrastructure and accounts are yours, in your name, from the start.",
      },
      {
        question: "Can you take over an existing codebase?",
        answer:
          "Sometimes. We'd start with a short review to say honestly whether extending it or replacing it is the better spend.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We can stay on for ongoing work, or hand over completely. Either way the documentation is written as though we're leaving.",
      },
    ],
    relatedProjects: ["pubcam", "tally-tax", "still"],
  },
  {
    slug: "ai-automation",
    index: "04",
    name: "AI and automation",
    headline: "AI and automation applied where it removes real work.",
    metaTitle: "AI Automation & Product Development Sydney | Whiteframe",
    metaDescription:
      "AI automation and product development from a Sydney studio — workflows, document processing and internal tools built where they remove real manual work.",
    summary: "Creating intelligent workflows, tools and product experiences.",
    intro: [
      "The useful applications of AI are usually unglamorous: a process that takes a person three hours becomes a step that takes a minute. We start from the work being done, not from the technology.",
      "That also means saying when AI isn't the answer. A well-built form often beats a model, and we'd rather tell you that than bill for the interesting version.",
    ],
    audience: [
      "Teams losing hours to repetitive manual processing",
      "Products where an intelligent step would remove real friction",
      "Businesses with unstructured documents to turn into data",
      "Founders unsure which parts of an idea AI genuinely helps",
    ],
    problems: [
      "Manual data entry between systems that should talk",
      "Documents read and re-keyed by hand",
      "Internal processes that only one person knows how to run",
      "AI features added for their own sake rather than to remove work",
      "No way to tell whether an automated step is getting it right",
    ],
    deliverables: [
      "Automated workflows integrated with the tools you already use",
      "Document and image processing pipelines",
      "AI-assisted features built into your product",
      "Internal tools and dashboards for the people doing the work",
      "Evaluation and monitoring, so quality is measured rather than assumed",
    ],
    process: [
      {
        title: "Find the work",
        detail:
          "We look at the process as it actually runs, including the parts nobody has written down.",
      },
      {
        title: "Prove it small",
        detail:
          "A narrow version against real data first. If it doesn't hold up, that's a cheap thing to learn.",
      },
      {
        title: "Integrate",
        detail:
          "Built into the systems and habits already in use, so it doesn't depend on anyone changing how they work.",
      },
      {
        title: "Measure",
        detail:
          "Quality checks and monitoring, so you can see when output drifts rather than hearing about it from a customer.",
      },
    ],
    faqs: [
      {
        question: "Is our data used to train models?",
        answer:
          "Not without your explicit agreement. We'll set out exactly which services process your data and under what terms before anything is built.",
      },
      {
        question: "What if AI isn't the right answer?",
        answer:
          "We'll say so. Often the honest answer is a better-designed process or a plain integration, and that's a cheaper thing to build and run.",
      },
      {
        question: "How do you know it's accurate?",
        answer:
          "We build evaluation in from the start — a test set, a measured pass rate, and monitoring once it's live. Unmeasured automation is a liability.",
      },
      {
        question: "Can this work with our existing systems?",
        answer:
          "Usually. Most of this work is integration, and we'd rather fit around your tools than ask you to move.",
      },
    ],
    relatedProjects: ["tally-tax", "still", "pubcam"],
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
