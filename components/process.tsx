"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/reveal";
import { processStages } from "@/data/process";

/**
 * Four-stage process as an editorial timeline. A cobalt rule scrubs across
 * with scroll; stages reveal in sequence. Vertical on small screens.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  return (
    <section className="shell scroll-mt-20 py-28 md:py-40">
      <p className="label text-ink-faint">Process</p>
      <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,3.6vw,3.25rem)]">
        A direct path from idea to launch.
      </h2>

      <div ref={ref} className="relative mt-14 md:mt-20">
        {/* The rule: static track plus scroll-scrubbed cobalt fill. */}
        <span
          aria-hidden
          className="absolute top-0 left-0 hidden h-px w-full bg-ink/15 lg:block"
        />
        <motion.span
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute top-0 left-0 hidden h-px w-full origin-left bg-cobalt lg:block"
        />

        <ol className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-4">
          {processStages.map((stage, index) => (
            <Reveal
              as="li"
              key={stage.step}
              delay={index * 0.08}
              className="relative border-t border-ink/10 py-7 md:py-8 lg:border-t-0 lg:pt-10 lg:pr-10"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 hidden size-1.5 -translate-y-[3px] rounded-full bg-ink lg:block"
              />
              <span className="label text-cobalt">{stage.step}</span>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight md:text-[1.7rem]">
                {stage.title}
              </h3>
              <p className="mt-3.5 max-w-sm text-base leading-relaxed font-medium text-ink-soft">
                {stage.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
