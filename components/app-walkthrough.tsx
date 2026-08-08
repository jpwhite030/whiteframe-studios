"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { DeviceFrame } from "@/components/device-frame";
import { useLenis } from "@/lib/lenis-provider";
import { ProductVideo } from "@/components/product-video";
import type { Project, WalkthroughScreen } from "@/data/projects";

/**
 * A product walkthrough as a lightbox: the page dims, one device holds the
 * centre, and the screens step forward with a line of copy each.
 *
 * The hero renders phones at roughly a sixth of the viewport width, where no
 * interface is legible. This is where someone actually reads the product, so
 * it is worth the overlay.
 */
export function AppWalkthrough({
  project,
  onClose,
}: {
  /** The product being shown, or null when the lightbox is closed. */
  project: Project | null;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const open = project !== null;
  const productName = project?.name ?? "";

  // What the lightbox shows, in order of preference: hand-authored steps,
  // then a recording, then the single capture. A recording is the product
  // actually running, so it outranks a still of one screen of it.
  const authored = project?.walkthrough;
  const demo = authored ? undefined : project?.demo;
  const screens: readonly WalkthroughScreen[] =
    authored ??
    (project?.shot && !demo
      ? [{ ...project.shot, caption: `${project.name} — ${project.tagline}.` }]
      : []);

  const stepped = screens.length > 1;

  const go = useCallback(
    (delta: number) =>
      setIndex((current) =>
        Math.min(screens.length - 1, Math.max(0, current + delta)),
      ),
    [screens.length],
  );

  // Always reopen at the first screen rather than wherever it was left.
  // Adjusting during render rather than in an effect is React's own advice
  // for state derived from a prop change — it avoids the extra paint an
  // effect would cause, where the previous screen flashes before the reset.
  const [openedWith, setOpenedWith] = useState(open);
  if (open !== openedWith) {
    setOpenedWith(open);
    if (open) setIndex(0);
  }

  // Lenis drives the page, so hidden overflow alone will not hold it still —
  // it has to be told to stop, or the page scrolls behind the overlay.
  useEffect(() => {
    if (!open || !lenis) return;
    lenis.stop();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;

    // Focus moves into the dialog so the keyboard lands here, not on the
    // page behind it.
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, go]);

  const screen = screens[index];

  return (
    <AnimatePresence>
      {open && (demo || screen) ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} walkthrough`}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-ink/80 px-5 py-10 backdrop-blur-md outline-none"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close walkthrough"
            className="absolute top-5 right-5 rounded-full border border-light/25 p-3 text-light transition-colors duration-200 hover:border-light"
          >
            <X aria-hidden strokeWidth={2} className="size-4" />
          </button>

          <p className="label text-light-faint">{productName}</p>

          {/* The device is the one thing a click must not close. */}
          <motion.div
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 flex-1 items-center"
          >
            <DeviceFrame
              aspect={demo ? demo.aspect : screen!.aspect}
              statusBar={!(demo ?? screen!).hasStatusBar}
              className="h-full max-h-[62svh] w-auto drop-shadow-[0_3rem_6rem_rgba(0,0,0,0.6)]"
            >
              {demo ? (
                // Worth the fuller preload here: the overlay exists so the
                // recording can be watched, not glimpsed.
                <ProductVideo demo={demo} preload="metadata" />
              ) : (
              /* Keyed so a step change crossfades rather than snapping. */
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen!.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={screen!.src}
                    alt={screen!.alt}
                    fill
                    sizes="(min-width: 768px) 34vh, 80vw"
                    className="object-cover"
                    style={{ objectPosition: screen!.position ?? "50% 0%" }}
                  />
                </motion.div>
              </AnimatePresence>
              )}
            </DeviceFrame>
          </motion.div>

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-md shrink-0 flex-col items-center gap-5"
          >
            <p
              aria-live="polite"
              className="min-h-[3rem] text-center text-base leading-relaxed font-medium text-balance text-light"
            >
              {demo ? demo.alt : screen!.caption}
            </p>

            {stepped ? (
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={index === 0}
                  aria-label="Previous screen"
                  className="rounded-full border border-light/25 p-2.5 text-light transition disabled:pointer-events-none disabled:opacity-30 hover:border-light"
                >
                  <ChevronLeft aria-hidden strokeWidth={2} className="size-4" />
                </button>

                <div className="flex items-center gap-2">
                  {screens.map((item, dot) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setIndex(dot)}
                      aria-label={`Screen ${dot + 1} of ${screens.length}`}
                      aria-current={dot === index}
                      className={`size-2 rounded-full transition-colors duration-200 ${
                        dot === index ? "bg-light" : "bg-light/30"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={index === screens.length - 1}
                  aria-label="Next screen"
                  className="rounded-full border border-light/25 p-2.5 text-light transition disabled:pointer-events-none disabled:opacity-30 hover:border-light"
                >
                  <ChevronRight aria-hidden strokeWidth={2} className="size-4" />
                </button>
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
