"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const tags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
  p: motion.p,
} as const;

type RevealTag = keyof typeof tags;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds of delay, used to stagger sibling reveals. */
  delay?: number;
  as?: RevealTag;
};

/**
 * Section-level entrance: fast, once-only, and never a gate on content.
 * Reduced-motion users get the fade without the shift (see MotionProvider),
 * and the no-JS stylesheet in the layout forces everything visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = tags[as];

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
