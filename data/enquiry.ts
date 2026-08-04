/** Option sets for the project enquiry form. */

export const projectStages = [
  "Idea",
  "Existing manual process",
  "Prototype",
  "Existing product",
  "Rebuild or redesign",
] as const;

export const budgetRanges = [
  "Under A$5,000",
  "A$5,000–A$15,000",
  "A$15,000–A$30,000",
  "A$30,000+",
  "Not sure yet",
] as const;

export const timeframes = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Still deciding",
] as const;

export type ProjectStage = (typeof projectStages)[number];
export type BudgetRange = (typeof budgetRanges)[number];
export type Timeframe = (typeof timeframes)[number];

export type EnquiryPayload = {
  name: string;
  email: string;
  company: string;
  brief: string;
  stage: ProjectStage | "";
  budget: BudgetRange | "";
  timeframe: Timeframe | "";
};
