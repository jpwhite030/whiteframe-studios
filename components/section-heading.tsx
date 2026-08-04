import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type Variant = "stacked" | "margin" | "display";

type SectionHeadingProps = {
  /** Two-digit section number, e.g. "01". */
  number: string;
  /** Short uppercase label, e.g. "STUDIO". */
  label: string;
  headline: string;
  /** Optional aside, set against the headline. Used sparingly. */
  aside?: ReactNode;
  /**
   * `stacked` rules off the top of the section, `margin` drops the number into
   * the left column beside the headline, `display` is the oversized treatment.
   * Sections alternate between them so no two headers read the same.
   */
  variant?: Variant;
  className?: string;
};

const headline = {
  stacked: "text-[clamp(2.125rem,5.4vw,4.5rem)]",
  margin: "text-[clamp(2rem,4.6vw,3.75rem)]",
  display: "text-[clamp(2.5rem,7.6vw,6.5rem)] leading-[0.92]",
} as const;

export function SectionHeading({
  number,
  label,
  headline: text,
  aside,
  variant = "stacked",
  className = "",
}: SectionHeadingProps) {
  const marker = (
    <span className="label flex shrink-0 items-baseline gap-3 text-faint">
      <span className="text-accent">{number}</span>
      <span aria-hidden className="h-px w-5 self-center bg-line-strong" />
      {label}
    </span>
  );

  if (variant === "margin") {
    return (
      <header className={className}>
        <Reveal className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-2 lg:pt-3">{marker}</div>
          <h2 className={`${headline.margin} lg:col-span-8 lg:col-start-4`}>
            {text}
          </h2>
        </Reveal>
        {aside ? (
          <Reveal delay={0.06} className="mt-8 lg:ml-[25%]">
            {aside}
          </Reveal>
        ) : null}
      </header>
    );
  }

  return (
    <header className={className}>
      <Reveal className="border-t border-line pt-5">{marker}</Reveal>
      <div className="mt-10 md:mt-14">
        <Reveal delay={0.05}>
          <h2 className={variant === "display" ? headline.display : headline.stacked}>
            {text}
          </h2>
        </Reveal>
        {aside ? (
          <Reveal delay={0.1} className="mt-8 max-w-xl">
            {aside}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
