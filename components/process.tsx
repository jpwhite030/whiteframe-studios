"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { processStages } from "@/data/process";

/** Each stage hangs further below the rule than the last, so the row descends. */
const drops = ["lg:pt-10", "lg:pt-24", "lg:pt-38", "lg:pt-52"];

export function Process() {
  return (
    <section id="process" className="shell scroll-mt-24 py-28 md:py-36 lg:py-44">
      <SectionHeading
        number="04"
        label="Process"
        headline="A direct path from idea to launch."
        variant="margin"
      />

      <div className="relative mt-20 md:mt-28">
        {/* Timeline rule — drawn only once all four stages sit on one row. */}
        <span
          aria-hidden
          className="absolute top-0 left-0 hidden h-px w-full bg-line lg:block"
        />
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 hidden h-px w-full origin-left bg-bone lg:block"
        />

        <ol className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {processStages.map((stage, index) => (
            <Reveal
              as="li"
              key={stage.step}
              delay={index * 0.07}
              className={`relative border-t border-line pt-7 pb-9 lg:border-t-0 lg:pr-12 lg:pb-0 ${drops[index]}`}
            >
              {/* Node, and the line dropping from the rule to this stage. */}
              <span
                aria-hidden
                className="absolute top-0 left-0 hidden size-1.5 -translate-y-[3px] rounded-full bg-bone lg:block"
              />
              <span
                aria-hidden
                className="absolute top-0 left-[2.5px] hidden w-px bg-line lg:block"
                style={{ height: `calc(${2.5 + index * 3.5}rem)` }}
              />

              <div className="flex items-baseline gap-4">
                <span className="label text-accent">{stage.step}</span>
                <h3 className="font-display text-2xl leading-none font-semibold tracking-[-0.03em] md:text-[1.75rem]">
                  {stage.title}
                </h3>
              </div>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted md:mt-6">
                {stage.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
