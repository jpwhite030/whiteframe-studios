"use client";

import { motion } from "motion/react";
import { ActionLink } from "@/components/action-link";
import { LivingFrame } from "@/components/living-frame";
import { siteConfig } from "@/lib/site-config";

const { hero } = siteConfig;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pt-(--header-height) pb-16 md:min-h-svh md:pb-20"
    >
      {/* Asymmetric split: the copy holds five columns, the frame takes six. */}
      <div className="shell grid w-full items-center gap-y-16 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="label flex items-center gap-3 text-muted"
          >
            <span aria-hidden className="h-px w-8 bg-accent" />
            {hero.eyebrow}
          </motion.p>

          {/* Sized so the two hand-set lines never wrap inside five columns. */}
          <h1 className="mt-8 text-[clamp(2.15rem,3.5vw,3.5rem)] leading-[1] md:mt-10">
            {hero.headlineLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: "104%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.22 + index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-lg leading-relaxed text-bone-700 md:mt-10"
          >
            {hero.supporting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row md:mt-12"
          >
            <ActionLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </ActionLink>
            <ActionLink href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </ActionLink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="label mt-12 border-t border-line pt-5 text-muted md:mt-14"
          >
            {hero.signature}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-6 lg:col-start-7"
        >
          <LivingFrame />
        </motion.div>
      </div>
    </section>
  );
}
