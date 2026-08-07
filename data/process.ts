export type ProcessStage = {
  step: string;
  title: string;
  description: string;
};

export const processStages: readonly ProcessStage[] = [
  {
    step: "01",
    title: "Define",
    description:
      "Understand the problem, the users and the commercial goal — then agree the smallest product worth building.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Brand, interface and interaction design, prototyped until it feels obvious.",
  },
  {
    step: "03",
    title: "Build",
    description: "Production engineering in short, visible releases.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Ship, measure real usage and keep improving.",
  },
];
