"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

/** Tracks which navigable section currently owns the viewport. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(siteConfig.nav.map((item) => item.sectionId));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page and allow Escape to dismiss while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const close = useCallback(() => setMenuOpen(false), []);

  // The blur is dropped while the menu is open: a backdrop-filter on the
  // header would become the containing block for the fixed menu panel and
  // collapse it to the header's own height.
  const surface = menuOpen
    ? "border-b border-line bg-canvas"
    : scrolled
      ? "border-b border-line bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70"
      : "border-b border-transparent bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-(--header-height) transition-colors duration-300 ${surface}`}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <a
          href="#top"
          onClick={close}
          className="label shrink-0 whitespace-nowrap text-bone transition-opacity duration-200 hover:opacity-60"
          aria-label={`${siteConfig.name}, back to top`}
        >
          {siteConfig.wordmark}
        </a>

        <nav aria-label="Primary" className="hidden shrink-0 md:block">
          <ul className="flex items-center gap-6 lg:gap-9">
            {siteConfig.nav.map((item) => {
              const isActive = active === item.sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative inline-block py-2 text-sm whitespace-nowrap text-bone-700 transition-colors duration-200 hover:text-bone"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-px left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="-mr-1 flex items-center gap-2.5 p-1 md:hidden"
        >
          <span className="label text-bone">{menuOpen ? "Close" : "Menu"}</span>
          <span aria-hidden className="relative block h-2.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-bone transition-all duration-300 ease-editorial ${
                menuOpen ? "top-1 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-bone transition-all duration-300 ease-editorial ${
                menuOpen ? "top-1 -rotate-45" : "top-2"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-(--header-height) bottom-0 z-40 flex flex-col justify-between overflow-y-auto overscroll-contain bg-canvas md:hidden"
          >
            <nav aria-label="Mobile" className="shell pt-10">
              <ul className="flex flex-col">
                {siteConfig.nav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.04 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-line"
                  >
                    <a
                      href={item.href}
                      onClick={close}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="font-display text-3xl tracking-tight">
                        {item.label}
                      </span>
                      <span className="label text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="shell flex flex-col gap-1.5 pb-12">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-bone-700 underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
              <p className="label text-faint">{siteConfig.location}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
