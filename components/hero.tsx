"use client";

import { motion } from "motion/react";
import { AnimatedText } from "@/components/animated-text";
import { WhiteframeWindow } from "@/components/whiteframe-window";
import { scrollToHash, useLenis } from "@/lib/lenis-provider";
import { siteConfig } from "@/lib/site-config";

const { hero } = siteConfig;

export function Hero() {
  const lenis = useLenis();

  const go = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    scrollToHash(lenis, href);
  };

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

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-lg leading-relaxed font-medium text-ink-soft md:mt-10"
          >
            {hero.supporting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
          >
            <a
              href={hero.primaryCta.href}
              onClick={(event) => go(event, hero.primaryCta.href)}
              className="rounded-full bg-ink px-7 py-4 text-sm font-bold text-light transition-colors duration-300 hover:bg-cobalt"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              onClick={(event) => go(event, hero.secondaryCta.href)}
              className="rounded-full border border-ink/20 px-7 py-4 text-sm font-bold transition-colors duration-300 hover:border-ink"
            >
              {hero.secondaryCta.label}
            </a>
          </motion.div>
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
        <p className="label text-ink-faint">
          Founded by {siteConfig.founder} — {siteConfig.location}
        </p>
        <a
          href="#work"
          onClick={(event) => go(event, "#work")}
          className="label group flex items-center gap-2.5 text-ink-faint transition-colors duration-200 hover:text-ink"
        >
          Scroll
          <span
            aria-hidden
            className="relative block h-4 w-px overflow-hidden bg-ink/25"
          >
            <span className="absolute inset-x-0 top-0 h-2 bg-ink transition-transform duration-500 ease-editorial group-hover:translate-y-2" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
