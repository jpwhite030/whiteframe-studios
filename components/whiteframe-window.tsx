"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { projects } from "@/data/projects";

/**
 * The Whiteframe Window — the brand object. A literal white frame holding
 * layered previews of the studio's products. It tilts a few degrees toward
 * the pointer, its layers travel at different depths, and it can be picked
 * up and dragged a short distance before springing home.
 *
 * Reduced motion renders it perfectly still; on touch, dragging still works
 * but nothing depends on it.
 */
export function WhiteframeWindow({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 70, damping: 20, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [-2.6, 2.6]);
  const rotateX = useTransform(sy, [-1, 1], [2, -2]);

  const frontX = useTransform(sx, [-1, 1], [-14, 14]);
  const frontY = useTransform(sy, [-1, 1], [-8, 8]);
  const midX = useTransform(sx, [-1, 1], [-7, 7]);
  const midY = useTransform(sy, [-1, 1], [-4, 4]);
  const backX = useTransform(sx, [-1, 1], [4, -4]);
  const backY = useTransform(sy, [-1, 1], [2, -2]);

  useEffect(() => {
    if (reduceMotion) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    const onMove = (event: PointerEvent) => {
      px.set((event.clientX / window.innerWidth) * 2 - 1);
      py.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduceMotion]);

  const pubcam = projects.find((p) => p.slug === "pubcam")!;
  const tally = projects.find((p) => p.slug === "tally-tax")!;

  return (
    <motion.div
      drag={!reduceMotion}
      dragSnapToOrigin
      dragElastic={0.14}
      dragConstraints={{ left: -28, right: 28, top: -18, bottom: 18 }}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1200 }
      }
      whileDrag={{ scale: 0.985 }}
      className={`relative cursor-grab touch-none rounded-3xl border border-ink/12 bg-white shadow-[0_48px_120px_rgba(13,13,13,0.14)] select-none active:cursor-grabbing ${className}`}
      role="img"
      aria-label="The Whiteframe Window: layered previews of PubCam, Tally Tax and Scaffold Visualiser"
    >
      {/* Frame chrome */}
      <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3.5">
        <span className="flex items-center gap-2">
          <span aria-hidden className="block size-2 border-[1.5px] border-ink/60" />
          <span className="label text-ink-faint">Whiteframe</span>
        </span>
        <span className="label text-ink-faint">Selected work 01–05</span>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-b-3xl">
        {/* Back — scaffold drawing, faint */}
        <motion.div
          aria-hidden
          style={reduceMotion ? undefined : { x: backX, y: backY }}
          className="absolute top-[8%] right-[-4%] h-[52%] w-[54%] overflow-hidden rounded-xl border border-ink/8 bg-[#fbfaf7] opacity-80"
        >
          <svg
            className="absolute inset-[10%] h-[80%] w-[80%]"
            viewBox="0 0 200 140"
            fill="none"
            aria-hidden
          >
            <g stroke="#0d0d0d" strokeOpacity="0.24" strokeWidth="1.25">
              <path d="M20 10 V130 M90 10 V130 M160 10 V130" />
            </g>
            <g stroke="#0d0d0d" strokeOpacity="0.16" strokeWidth="1">
              <path d="M20 40 H160 M20 85 H160" />
              <path d="M20 85 L90 40 M90 85 L160 40" />
            </g>
            <path d="M20 22 H160" stroke="#315cff" strokeWidth="1.25" />
          </svg>
        </motion.div>

        {/* Mid — Tally phone */}
        <motion.div
          style={reduceMotion ? undefined : { x: midX, y: midY }}
          className="absolute top-[16%] right-[10%] w-[34%] rotate-[5deg] overflow-hidden rounded-[1rem] border border-ink/10 shadow-[0_1.5rem_3rem_rgba(13,13,13,0.18)]"
        >
          <div className="relative" style={{ aspectRatio: tally.shot!.aspect }}>
            <Image
              src={tally.shot!.src}
              alt={tally.shot!.alt}
              fill
              sizes="(min-width: 1024px) 16vw, 32vw"
              className="object-cover"
              style={{ objectPosition: tally.shot!.position ?? "50% 0%" }}
            />
          </div>
        </motion.div>

        {/* Front — PubCam phone, bleeding off the bottom */}
        <motion.div
          style={reduceMotion ? undefined : { x: frontX, y: frontY }}
          className="absolute bottom-[-14%] left-[10%] w-[38%] rotate-[-4deg] overflow-hidden rounded-[1.1rem] shadow-[0_2.5rem_5rem_rgba(13,13,13,0.32)]"
        >
          <div className="relative" style={{ aspectRatio: pubcam.shot!.aspect }}>
            <Image
              src={pubcam.shot!.src}
              alt={pubcam.shot!.alt}
              fill
              priority
              sizes="(min-width: 1024px) 18vw, 36vw"
              className="object-cover"
              style={{ objectPosition: pubcam.shot!.position ?? "50% 0%" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
