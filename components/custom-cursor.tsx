"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/**
 * The cursor ring: a small circle that trails the pointer on a spring and
 * grows over interactive elements. Drawn in mix-blend-difference so it
 * inverts against both the cream page and the dark bands.
 *
 * Additive — the native cursor stays, text selection stays. Fine pointers
 * only, never under reduced motion, and it steps aside inside any
 * `data-cursor-none` region (the reel has its own Drag chip).
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"default" | "link" | "hidden">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // The lag is the point — the ring catches up to the pointer.
  const sx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      if (!target?.closest) return;
      if (target.closest("[data-cursor-none]")) {
        setMode("hidden");
      } else if (
        target.closest("a, button, [role='button'], input, textarea, select, summary")
      ) {
        setMode("link");
      } else {
        setMode("default");
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, reduceMotion, x, y]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[70] mix-blend-difference"
    >
      <motion.div
        animate={{
          scale: mode === "hidden" ? 0 : mode === "link" ? 2.2 : 1,
          opacity: visible && mode !== "hidden" ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="-ml-4 -mt-4 size-8 rounded-full border-[1.5px] border-light"
      />
      <motion.div
        animate={{ opacity: visible && mode === "default" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-0 -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-light"
      />
    </motion.div>
  );
}
