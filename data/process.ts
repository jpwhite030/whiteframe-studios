export type ProcessStage = {
  step: string;
  title: string;
  description: string;
};

export const processStages: readonly ProcessStage[] = [
  {
    step: "01",
    title: "Understand",
    description:
      "Clarify the problem, users, commercial goals and current workflow.",
  },
  {
    step: "02",
    title: "Scope",
    description:
      "Define the smallest valuable product and remove unnecessary complexity.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Design and develop the product through focused, testable releases.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Deploy, measure real usage and improve based on feedback.",
  },
];
