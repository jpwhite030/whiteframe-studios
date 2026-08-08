"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/animated-text";
import { SmartLink } from "@/components/smart-link";
import { WhiteframeWindow } from "@/components/whiteframe-window";
import { siteConfig } from "@/lib/site-config";

const { hero } = siteConfig;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden pt-(--header-height)"
    >
      <div className="shell grid flex-1 items-center gap-x-12 gap-y-14 py-14 lg:grid-cols-12 lg:py-10">
        <div className="lg:col-span-7">
          {/* Sized so the three hand-set lines never rewrap inside 7 cols. */}
          <AnimatedText
            as="h1"
            lines={hero.headlineLines}
            onMount
            delay={0.12}
            className="text-[clamp(2.35rem,4.6vw,4.4rem)]"
          />

          {/* CSS-driven so it paints without waiting for hydration — this
              paragraph is the mobile LCP element. */}
          <p
            style={{ animationDelay: "0.18s" }}
            className="rise mt-8 max-w-md text-lg leading-relaxed font-medium text-ink-soft md:mt-10"
          >
            {hero.supporting}
          </p>

          <div
            style={{ animationDelay: "0.3s" }}
            className="rise mt-10 flex flex-wrap items-center gap-4 md:mt-12"
          >
            <SmartLink
              href={hero.primaryCta.href}
              className="min-h-12 rounded-full bg-ink px-7 py-4 text-sm font-bold text-light transition-colors duration-300 hover:bg-cobalt focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
            >
              {hero.primaryCta.label}
            </SmartLink>
            <SmartLink
              href={hero.secondaryCta.href}
              className="min-h-12 rounded-full border border-ink/25 px-7 py-4 text-sm font-bold transition-colors duration-300 hover:border-ink focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
            >
              {hero.secondaryCta.label}
            </SmartLink>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <WhiteframeWindow className="mx-auto w-full max-w-[30rem] lg:max-w-none" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="shell flex items-center justify-between border-t border-ink/10 py-5"
      >
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {hero.proof.map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              {index > 0 ? (
                <span aria-hidden className="text-ink-faint">
                  ·
                </span>
              ) : null}
              <span className="label text-ink-soft">{item}</span>
            </li>
          ))}
        </ul>
        <SmartLink
          href="/work"
          className="label group hidden items-center gap-2.5 text-ink-soft transition-colors duration-200 hover:text-ink sm:flex"
        >
          View our work
          <span
            aria-hidden
            className="relative block h-4 w-px overflow-hidden bg-ink/30"
          >
            <span className="absolute inset-x-0 top-0 h-2 bg-ink transition-transform duration-500 ease-editorial group-hover:translate-y-2" />
          </span>
        </SmartLink>
      </motion.div>
    </section>
  );
}
