"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { capabilities } from "@/data/capabilities";

/**
 * Four capability rows. Each row expands to show its supporting detail;
 * hover pulls the title toward cobalt and eases it right a few pixels.
 */
export function Capabilities() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="services" className="scroll-mt-20 py-28 md:py-40">
      <div className="shell">
        <p className="label text-ink-faint">Services</p>
        <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,3.6vw,3.25rem)]">
          What we do.
        </h2>
      </div>

      <div className="mt-12 md:mt-16">
        {capabilities.map((capability) => {
          const isOpen = openId === capability.id;
          const panelId = `capability-${capability.id}`;
          const buttonId = `capability-trigger-${capability.id}`;

          return (
            <div key={capability.id} className="border-t border-ink/10 last:border-b">
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : capability.id)}
                  className="group shell flex w-full items-baseline gap-6 py-7 text-left md:gap-12 md:py-9"
                >
                  <span
                    className={`label shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-cobalt" : "text-ink-faint"
                    }`}
                  >
                    {capability.index}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[clamp(1.4rem,3vw,2.5rem)] font-extrabold tracking-tight transition-[color,transform] duration-300 ease-editorial group-hover:translate-x-1.5 group-hover:text-cobalt">
                      {capability.title}
                    </span>
                    <span className="mt-2.5 block max-w-xl text-base leading-relaxed font-medium text-ink-soft">
                      {capability.summary}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="relative mt-2 block size-3.5 shrink-0 self-center"
                  >
                    <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 bg-ink" />
                    <span
                      className={`absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-ink transition-transform duration-400 ease-editorial ${
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
                    <div className="shell pb-10">
                      <ul className="flex flex-wrap gap-2.5 md:ml-[calc(2.5rem+3rem)]">
                        {capability.detail.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink-soft"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
