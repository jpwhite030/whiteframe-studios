"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealImageProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Masked media reveal: the container unclips upward while the content
 * settles from a slight over-scale. Wrap any visual (Image, tile, video).
 */
export function RevealImage({
  children,
  className = "",
  delay = 0,
}: RevealImageProps) {
  return (
    <motion.div
      data-reveal=""
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(8% 4% 8% 4% round 1rem)", opacity: 0.6 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1rem)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -14% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -14% 0px" }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
