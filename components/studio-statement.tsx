"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { siteConfig } from "@/lib/site-config";

/**
 * Typography-led statement, revealed word by word as the section scrolls
 * through the viewport. Scrubbed, not timed — scrolling back rewinds it.
 */

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export function StudioStatement() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  const { lines, supporting } = siteConfig.statement;

  // Word ranges across both hand-set lines, derived without mutation.
  const lineWords = lines.map((line) => line.split(" "));
  const wordCount = lineWords.reduce((count, words) => count + words.length, 0);
  const lineOffsets = lineWords.map((_, index) =>
    lineWords.slice(0, index).reduce((sum, words) => sum + words.length, 0),
  );

  return (
    <section id="studio" className="shell scroll-mt-20 py-28 md:py-44">
      <p className="label text-ink-faint">The studio</p>

      <h2
        ref={ref}
        className="mt-10 max-w-5xl text-[clamp(2.1rem,5.2vw,4.75rem)] md:mt-14"
      >
        {lineWords.map((words, lineIndex) => (
          <span key={lines[lineIndex]} className="block">
            {words.map((word, wordIndex) => {
              const absolute = lineOffsets[lineIndex] + wordIndex;
              const key = `${word}-${absolute}`;
              return reduceMotion ? (
                <span key={key} className="inline">
                  {word}{" "}
                </span>
              ) : (
                <Word
                  key={key}
                  progress={scrollYProgress}
                  range={[absolute / wordCount, (absolute + 1) / wordCount]}
                >
                  {word}
                </Word>
              );
            })}
          </span>
        ))}
      </h2>

      <div className="mt-12 md:mt-16 lg:grid lg:grid-cols-12">
        <p className="max-w-xl text-lg leading-relaxed font-medium text-ink-soft lg:col-span-6 lg:col-start-6">
          {supporting}
        </p>
      </div>
    </section>
  );
}
