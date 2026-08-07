"use client";

import { AnimatedText } from "@/components/animated-text";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * Full-screen dark closing section. The circular CTA is magnetic on fine
 * pointers and a plain, comfortably large tap target everywhere else.
 */
export function FinalCta() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Project enquiry — Whiteframe Studios",
  )}`;

  return (
    <section
      id="contact"
      className="flex min-h-[88svh] scroll-mt-20 flex-col justify-center bg-dark py-28 text-light md:py-36"
    >
      <div className="shell">
        <p className="label text-light-faint">New business</p>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-16 gap-y-14 md:mt-14">
          <AnimatedText
            as="h2"
            lines={["Have something", "ambitious in mind?"]}
            className="max-w-3xl text-[clamp(2.5rem,7vw,6.25rem)]"
          />

          <Reveal delay={0.15}>
            <MagneticButton
              href={mailto}
              strength={12}
              className="group flex size-40 items-center justify-center rounded-full bg-cobalt text-center text-lg leading-tight font-extrabold tracking-tight text-light transition-colors duration-300 hover:bg-light hover:text-ink md:size-48 md:text-xl"
            >
              {siteConfig.cta.button}
            </MagneticButton>
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-light/12 pt-8 md:mt-24"
        >
          <a
            href={mailto}
            className="text-xl font-bold tracking-tight transition-colors duration-200 hover:text-cobalt md:text-2xl"
          >
            {siteConfig.email}
          </a>
          <p className="label text-light-faint">
            Replies come from {siteConfig.founder}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
