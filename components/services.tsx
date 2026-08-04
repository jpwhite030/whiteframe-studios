"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { services } from "@/data/services";

export function Services() {
  const [openId, setOpenId] = useState<string>(services[0].id);

  return (
    <section id="services" className="scroll-mt-24 py-28 md:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          number="03"
          label="Capabilities"
          headline="Designed to move from problem to product."
        />
      </div>

      <div className="mt-20 md:mt-28">
        {services.map((service, index) => {
          const isOpen = openId === service.id;
          const panelId = `service-panel-${service.id}`;
          const buttonId = `service-trigger-${service.id}`;

          return (
            <Reveal
              key={service.id}
              delay={index * 0.04}
              className={`border-t border-line last:border-b ${
                isOpen ? "bg-canvas-100" : ""
              } transition-colors duration-500`}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? "" : service.id)}
                  className="group shell flex w-full items-baseline gap-5 py-7 text-left md:gap-10 md:py-10"
                >
                  <span
                    className={`label shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-accent" : "text-muted"
                    }`}
                  >
                    {service.index}
                  </span>
                  <span className="flex-1 font-display text-[clamp(1.5rem,3.4vw,2.75rem)] leading-tight font-semibold tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
                    {service.title}
                  </span>
                  <span
                    aria-hidden
                    className="relative mt-2 block size-3.5 shrink-0 self-center"
                  >
                    <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-bone" />
                    <span
                      className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-bone transition-transform duration-400 ease-editorial ${
                        isOpen ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    {/* Detail runs left, summary right — the mirror of the
                        rows above it, so the open state reads differently. */}
                    <div className="shell grid gap-8 pb-12 md:grid-cols-12 md:gap-12">
                      <ul className="md:col-span-3 md:col-start-2">
                        {service.detail.map((item) => (
                          <li
                            key={item}
                            className="border-t border-line py-2.5 text-sm text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="max-w-2xl text-[clamp(1.125rem,1.9vw,1.5rem)] leading-[1.45] text-bone-700 md:col-span-6 md:col-start-6">
                        {service.summary}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
