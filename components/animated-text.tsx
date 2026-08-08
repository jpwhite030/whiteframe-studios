"use client";

import { motion } from "motion/react";
import type { JSX } from "react";

type AnimatedTextProps = {
  /** Hand-set lines — each gets its own mask. */
  lines: readonly string[];
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "p">;
  className?: string;
  /** Seconds before the first line starts. */
  delay?: number;
  /** Animate on mount (hero) instead of on scroll into view. */
  onMount?: boolean;
};

/**
 * Line-masked text reveal: each line slides up out of its own overflow
 * mask. Reduced motion resolves instantly via the global MotionConfig.
 */
export function AnimatedText({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  onMount = false,
}: AnimatedTextProps) {
  // On-mount reveals (the hero H1) run in CSS so they paint on the first
  // frame instead of waiting for hydration — this element is the mobile LCP.
  // Scroll-triggered reveals stay on motion, where whileInView is the point.
  if (onMount) {
    return (
      <Tag className={className}>
        {lines.map((line, index) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <span
              data-reveal=""
              className="line-rise block"
              style={{ animationDelay: `${delay + index * 0.09}s` }}
            >
              {line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  const viewProps = {
    whileInView: { y: 0 },
    viewport: { once: true, margin: "0px 0px -12% 0px" },
  } as const;

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            data-reveal=""
            className="block"
            initial={{ y: "104%" }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            {...viewProps}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
