export type Capability = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: readonly string[];
};

export const capabilities: readonly Capability[] = [
  {
    id: "strategy",
    index: "01",
    title: "Product strategy",
    summary:
      "Turning early ideas into focused products, roadmaps and launch plans.",
    detail: ["Product scoping", "Roadmaps", "Positioning", "Launch planning"],
  },
  {
    id: "design",
    index: "02",
    title: "Brand and interface design",
    summary:
      "Creating identities and interfaces that feel distinctive and intuitive.",
    detail: ["Identity systems", "UX and UI design", "Design systems", "Prototyping"],
  },
  {
    id: "development",
    index: "03",
    title: "Web and mobile development",
    summary: "Building responsive, production-ready digital products.",
    detail: ["Next.js and React", "iOS and Android", "APIs and integrations", "Performance"],
  },
  {
    id: "ai",
    index: "04",
    title: "AI and automation",
    summary: "Creating intelligent workflows, tools and product experiences.",
    detail: ["AI-assisted workflows", "Computer vision", "Document processing", "Internal tools"],
  },
];
