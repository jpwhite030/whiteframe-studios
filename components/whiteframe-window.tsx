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
import { projects, type Project } from "@/data/projects";

/**
 * The Whiteframe Window — the brand object. A literal white frame holding
 * layered previews of the studio's products. It tilts a few degrees toward
 * the pointer, its layers travel at different depths, and it can be picked
 * up and dragged a short distance before springing home.
 *
 * Reduced motion renders it perfectly still; on touch, dragging still works
 * but nothing depends on it.
 *
 * The two devices sit upright on a shared baseline and are separated by
 * scale, elevation and shadow rather than by rotation. Opposing tilts read
 * as scattered snapshots; a held grid reads as a considered composition.
 */

/**
 * A capture presented as a device rather than a pasted rectangle: dark
 * bezel, correct inner radius, and a shadow that puts it in the space.
 * Both products get identical treatment so the pair reads as one system.
 */
function Device({
  shot,
  sizes,
  priority = false,
}: {
  shot: NonNullable<Project["shot"]>;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="rounded-[1.6rem] bg-[#0d0d0d] p-[0.35rem] ring-1 ring-black/5">
      <div
        className="relative overflow-hidden rounded-[1.3rem]"
        style={{ aspectRatio: shot.aspect }}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: shot.position ?? "50% 0%" }}
        />
      </div>
    </div>
  );
}
export function WhiteframeWindow({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 70, damping: 20, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [-2.6, 2.6]);
  const rotateX = useTransform(sy, [-1, 1], [2, -2]);

  // Depth reads correctly when nearer layers travel further in the *same*
  // direction. The old back layer counter-travelled, which fought the tilt.
  const frontX = useTransform(sx, [-1, 1], [-12, 12]);
  const frontY = useTransform(sy, [-1, 1], [-7, 7]);
  const backX = useTransform(sx, [-1, 1], [-5, 5]);
  const backY = useTransform(sy, [-1, 1], [-3, 3]);

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
      aria-label="The Whiteframe Window: layered device previews of PubCam and Tally Tax"
    >
      {/* Frame chrome */}
      <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3.5">
        <span className="flex items-center gap-2">
          <span aria-hidden className="block size-2 border-[1.5px] border-ink/60" />
          <span className="label text-ink-faint">Whiteframe</span>
        </span>
        <span className="label text-ink-faint">Selected work 01–05</span>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-b-3xl bg-gradient-to-b from-[#f7f6f3] to-[#eceae5]">
        {/* A soft horizon, so the devices stand on a surface rather than
            float on flat white. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-ink/[0.06] to-transparent"
        />

        {/* Back — Tally, set back and smaller. */}
        <motion.div
          style={reduceMotion ? undefined : { x: backX, y: backY }}
          className="absolute top-[11%] right-[11%] w-[36%] drop-shadow-[0_1.25rem_2.5rem_rgba(13,13,13,0.16)]"
        >
          <Device shot={tally.shot!} sizes="(min-width: 1024px) 16vw, 32vw" />
        </motion.div>

        {/* Front — PubCam, larger and lower, overlapping the Tally device.
            Both run off the bottom edge together, on one baseline. */}
        <motion.div
          style={reduceMotion ? undefined : { x: frontX, y: frontY }}
          className="absolute top-[22%] left-[12%] w-[44%] drop-shadow-[0_2rem_3.5rem_rgba(13,13,13,0.3)]"
        >
          <Device
            shot={pubcam.shot!}
            sizes="(min-width: 1024px) 18vw, 36vw"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
