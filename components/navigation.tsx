"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { scrollToHash, useLenis } from "@/lib/lenis-provider";
import { siteConfig } from "@/lib/site-config";

/**
 * Fixed navigation. The wordmark and links sit in a mix-blend-difference
 * layer, so they invert automatically over dark sections — no scroll
 * detection needed. The cobalt CTA lives outside the blend group and works
 * against both grounds.
 */
export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  const go = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      setMenuOpen(false);
      scrollToHash(lenis, href);
    },
    [lenis],
  );

  // Lock the page and allow Escape to dismiss while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, lenis]);

  return (
    <>
      {/* Blending layer. mix-blend-difference only reaches the page when it
          sits on the fixed element itself — on a child of a fixed header it
          blends against the header's transparent backdrop and vanishes. */}
      <header className="fixed inset-x-0 top-0 z-50 h-(--header-height) text-light mix-blend-difference">
        <div className="shell flex h-full items-center justify-between gap-6">
          <a
            href="#top"
            onClick={(event) => go(event, "#top")}
            aria-label={`${siteConfig.name}, back to top`}
            className="flex items-center gap-2.5 text-[15px] font-extrabold tracking-tight"
          >
            <span
              aria-hidden
              className="block size-2.5 border-[1.5px] border-current"
            />
            {siteConfig.wordmark}
          </a>

          <div className="flex items-center gap-8">
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-8">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => go(event, item.href)}
                      className="group relative inline-block py-2 text-sm font-semibold"
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className="absolute bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Space held for the CTA pill, which lives in the layer below. */}
            <span
              aria-hidden
              className="hidden w-[8.5rem] sm:block md:ml-0"
            />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-1 flex items-center gap-2.5 p-1 md:hidden"
            >
              <span className="text-sm font-bold">
                {menuOpen ? "Close" : "Menu"}
              </span>
              <span aria-hidden className="relative block h-2.5 w-5">
                <span
                  className={`absolute left-0 block h-[1.5px] w-full bg-current transition-all duration-300 ease-editorial ${
                    menuOpen ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-full bg-current transition-all duration-300 ease-editorial ${
                    menuOpen ? "top-1 -rotate-45" : "top-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Non-blending layer: the cobalt CTA keeps its true colour. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden h-(--header-height) sm:block">
        <div className="shell flex h-full items-center justify-end">
          <a
            href={siteConfig.navCta.href}
            onClick={(event) => go(event, siteConfig.navCta.href)}
            className="pointer-events-auto rounded-full bg-cobalt px-5 py-2.5 text-sm font-bold text-light transition-colors duration-300 hover:bg-cobalt-600 max-md:mr-14"
          >
            {siteConfig.navCta.label}
          </a>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-dark pt-(--header-height) text-light md:hidden"
          >
            <nav aria-label="Mobile" className="shell pt-12">
              <ul className="flex flex-col">
                {[...siteConfig.nav, siteConfig.navCta].map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.05 + index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-light/10"
                  >
                    <a
                      href={item.href}
                      onClick={(event) => go(event, item.href)}
                      className="flex items-baseline justify-between py-6"
                    >
                      <span className="text-4xl font-extrabold tracking-tight">
                        {item.label}
                      </span>
                      <span className="label text-light-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="shell flex flex-col gap-2 pb-12"
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-semibold text-light-soft transition-colors hover:text-light"
              >
                {siteConfig.email}
              </a>
              <p className="label text-light-faint">{siteConfig.location}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
