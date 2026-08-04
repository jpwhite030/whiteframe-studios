export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: readonly string[];
};

export const services: readonly Service[] = [
  {
    id: "product",
    index: "01",
    title: "Product Design and Development",
    summary:
      "Consumer apps, SaaS platforms, web applications and digital products designed around clear user and commercial outcomes.",
    detail: [
      "Consumer mobile applications",
      "SaaS and web platforms",
      "Interface and interaction design",
      "Design systems",
      "Full-stack engineering",
    ],
  },
  {
    id: "ai",
    index: "02",
    title: "AI and Automation",
    summary:
      "AI agents, document processing, workflow automation, computer vision, reporting and intelligent business systems.",
    detail: [
      "AI agents and assistants",
      "Document and image processing",
      "Computer vision",
      "Workflow automation",
      "Automated reporting",
    ],
  },
  {
    id: "internal",
    index: "03",
    title: "Internal Software",
    summary:
      "Custom dashboards, client portals, operational systems, reporting tools and software that replaces spreadsheets and manual processes.",
    detail: [
      "Operational dashboards",
      "Client and staff portals",
      "Quoting and job systems",
      "Reporting and data pipelines",
      "Spreadsheet replacement",
    ],
  },
  {
    id: "mvp",
    index: "04",
    title: "MVP and Product Strategy",
    summary:
      "Product scoping, user journeys, feature prioritisation, rapid prototyping and launch planning for early-stage products.",
    detail: [
      "Product scoping",
      "User journeys",
      "Feature prioritisation",
      "Rapid prototyping",
      "Launch planning",
    ],
  },
];
