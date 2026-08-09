"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

/** The active Lenis instance, or null when smooth scroll is off. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Smooth scrolling for the whole document. Never created when the user
 * prefers reduced motion — native scrolling (and the CSS smooth-scroll
 * fallback) takes over untouched.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Announced from the first animation frame rather than synchronously,
    // so the effect itself never sets state.
    let announced = false;
    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      if (!announced) {
        announced = true;
        setLenis(instance);
      }
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
    };
  }, []);

  // Reset to the top on every navigation.
  //
  // Next scrolls the window to 0 when a route changes, but Lenis holds its
  // own scroll position and writes it back on the next frame — so following
  // a link from halfway down one page dropped you halfway down the next,
  // and from the footer it landed at the bottom. Lenis has to be told
  // separately, immediately so there is no visible travel.
  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

/** Scroll to an in-page anchor through Lenis when it is running. */
export function scrollToHash(lenis: Lenis | null, hash: string) {
  if (lenis) {
    lenis.scrollTo(hash, { offset: -88 });
  } else {
    document.querySelector(hash)?.scrollIntoView();
  }
  history.replaceState(null, "", hash);
}
