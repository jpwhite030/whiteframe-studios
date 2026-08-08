"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import { AppWalkthrough } from "@/components/app-walkthrough";
import { DeviceFrame } from "@/components/device-frame";
import { ProductVideo } from "@/components/product-video";
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
 * A capture presented as a real device, and the way into that product's
 * walkthrough. Both products get identical treatment so the pair reads as
 * one system.
 */
function Device({
  project,
  sizes,
  priority = false,
  onOpen,
  /** True while the whole window is being dragged, so a drag never opens. */
  draggingRef,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  onOpen: () => void;
  draggingRef: React.RefObject<boolean>;
}) {
  const shot = project.shot!;
  // A recording takes the screen where one exists; the still stays on as its
  // poster, so the device is never empty while the video loads.
  const demo = project.demo;
  const source = demo ?? shot;

  return (
    <button
      type="button"
      onClick={() => {
        // The window is draggable and the phones sit inside it, so a drag
        // that happens to end on a phone would otherwise open a lightbox
        // nobody asked for.
        if (draggingRef.current) return;
        onOpen();
      }}
      aria-label={`View the ${project.name} walkthrough`}
      className="group/device block w-full cursor-pointer rounded-[8.6cqw] text-left focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-4"
    >
      <DeviceFrame
        aspect={source.aspect}
        statusBar={!source.hasStatusBar}
        statusTone={project.deviceTone}
        className="transition-transform duration-500 ease-editorial group-hover/device:-translate-y-1"
      >
        {demo ? (
          <ProductVideo demo={demo} preload="metadata" />
        ) : (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
            style={{ objectPosition: shot.position ?? "50% 0%" }}
          />
        )}
      </DeviceFrame>
    </button>
  );
}

/**
 * Turn one device in space, and set the glare position the DeviceFrame reads.
 * Motion animates CSS custom properties happily, but its style type doesn't
 * model them, so the cast is confined to here rather than repeated inline.
 */
function turn(
  pitch: MotionValue<number>,
  yaw: MotionValue<number>,
  glare: MotionValue<string>,
): MotionStyle {
  return {
    rotateX: pitch,
    rotateY: yaw,
    transformPerspective: 900,
    "--glare-x": glare,
  } as MotionStyle;
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

  // Each device turns on its own axis, well beyond the window's own ±2.6°.
  // This is what stops them reading as pictures pasted onto a card — they
  // turn independently of the surface they sit on.
  const frontYaw = useTransform(sx, [-1, 1], [-11, 11]);
  const frontPitch = useTransform(sy, [-1, 1], [7, -7]);
  const backYaw = useTransform(sx, [-1, 1], [-7, 7]);
  const backPitch = useTransform(sy, [-1, 1], [4.5, -4.5]);

  // The specular sweep tracks the turn, so the glass catches light on the
  // edge rolling towards the viewer rather than drifting independently.
  const frontGlare = useTransform(sx, [-1, 1], ["88%", "12%"]);
  const backGlare = useTransform(sx, [-1, 1], ["84%", "16%"]);

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
  // Still takes the second slot the moment it has a capture; until then the
  // hero keeps Tally, so a project added ahead of its screenshot can never
  // leave the top of the page empty.
  const tally = projects.find((p) => p.slug === "tally-tax")!;
  const stillProject = projects.find((p) => p.slug === "still");
  const secondary = stillProject?.shot ? stillProject : tally;

  const [walkthrough, setWalkthrough] = useState<Project | null>(null);
  // Set on drag start and cleared a tick after release, so the click that
  // closes out a drag gesture is swallowed rather than opening a lightbox.
  const dragging = useRef(false);

  return (
    <>
    <motion.div
      drag={!reduceMotion}
      onDragStart={() => {
        dragging.current = true;
      }}
      onDragEnd={() => {
        // Cleared after the click event has already been and gone.
        window.setTimeout(() => {
          dragging.current = false;
        }, 0);
      }}
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
      // Not role="img" any more: the devices inside are buttons now, and an
      // img role would make them presentational — invisible to assistive
      // tech and unreachable, taking the walkthroughs with them.
      role="group"
      aria-label={`Product previews: ${pubcam.name} and ${secondary.name}`}
    >
      {/* Frame chrome */}
      <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3.5">
        <span className="flex items-center gap-2">
          <span aria-hidden className="block size-2 border-[1.5px] border-ink/60" />
          <span className="label text-ink-faint">Whiteframe</span>
        </span>
        <span className="label text-ink-faint">
          Selected work 01–{String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative aspect-[1/1] overflow-hidden rounded-b-3xl bg-gradient-to-b from-[#f7f6f3] to-[#eceae5]">
        {/* A soft horizon, so the devices stand on a surface rather than
            float on flat white. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-ink/[0.06] to-transparent"
        />

        {/* Back — the second product, set back and smaller. */}
        <motion.div
          style={reduceMotion ? undefined : { x: backX, y: backY }}
          className="absolute top-[7%] right-[10%] w-[33%] drop-shadow-[0_1.25rem_2.5rem_rgba(13,13,13,0.16)]"
        >
          <motion.div
            style={
              reduceMotion ? undefined : turn(backPitch, backYaw, backGlare)
            }
          >
            {/* Idle drift. Deliberately out of step with the front device —
                two objects breathing in unison read as one mechanism. */}
            <motion.div
              animate={
                reduceMotion ? undefined : { y: [0, -9, 0], rotateZ: [0, 0.9, 0] }
              }
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <Device
                project={secondary}
                sizes="(min-width: 1024px) 16vw, 32vw"
                onOpen={() => setWalkthrough(secondary)}
                draggingRef={dragging}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Front — PubCam, larger and lower, overlapping the second device.
            Both run off the bottom edge together, on one baseline. */}
        <motion.div
          style={reduceMotion ? undefined : { x: frontX, y: frontY }}
          className="absolute top-[13%] left-[11%] w-[38%] drop-shadow-[0_2rem_3.5rem_rgba(13,13,13,0.3)]"
        >
          <motion.div
            style={
              reduceMotion ? undefined : turn(frontPitch, frontYaw, frontGlare)
            }
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -13, 0], rotateZ: [0, -1.1, 0] }
              }
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Device
                project={pubcam}
                sizes="(min-width: 1024px) 18vw, 36vw"
                priority
                onOpen={() => setWalkthrough(pubcam)}
                draggingRef={dragging}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>

    <AppWalkthrough
      project={walkthrough}
      onClose={() => setWalkthrough(null)}
    />
    </>
  );
}
