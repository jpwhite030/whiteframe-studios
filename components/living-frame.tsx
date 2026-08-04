"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { frameScenes, type FrameElement, type FrameScene } from "@/data/frame-scenes";

/**
 * The Living Frame — Whiteframe Studios' signature visual.
 *
 * A white frame that fills itself in: an empty rectangle, then rough wireframe
 * boxes drifting off-position, then those boxes snapping onto the grid, then
 * the same boxes resolving into a working product screen. It runs the same
 * cycle for each project, so the mechanism itself is the studio's argument —
 * rough idea in, finished product out.
 */

const STAGES = [
  { id: "empty", readout: "Empty frame", ms: 700 },
  { id: "wire", readout: "Wireframe", ms: 2600 },
  { id: "align", readout: "Aligning", ms: 2300 },
  { id: "build", readout: "Build", ms: 4200 },
  { id: "ship", readout: "Shipped", ms: 3200 },
  { id: "exit", readout: "Handover", ms: 700 },
] as const;

const CYCLE_MS = STAGES.reduce((total, stage) => total + stage.ms, 0);
const EASE = [0.22, 1, 0.36, 1] as const;

type StageId = (typeof STAGES)[number]["id"];

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Reads the motion preference without breaking hydration: React uses the
 * server snapshot for the first render and only then swaps in the real value,
 * so the markup never disagrees with itself.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** The four edges, drawn in sequence so the frame appears to be ruled out. */
const FRAME_EDGES = [
  { className: "top-0 left-0 h-px w-full origin-left", axis: "x" },
  { className: "top-0 right-0 h-full w-px origin-top", axis: "y" },
  { className: "bottom-0 left-0 h-px w-full origin-right", axis: "x" },
  { className: "top-0 left-0 h-full w-px origin-bottom", axis: "y" },
] as const;

const microType = { fontSize: "max(8px, 1.4cqw)" } as const;

/* ------------------------------------------------------------------ */
/* Finished-state renderers                                            */
/* ------------------------------------------------------------------ */

function Bars({ bars, accent }: { bars: readonly number[]; accent: string }) {
  const peak = Math.max(...bars);
  return (
    <div className="flex h-full w-full items-end gap-[3%]">
      {bars.map((value, index) => (
        <div
          key={index}
          className="flex-1"
          style={{
            height: `${value}%`,
            backgroundColor: value === peak ? accent : "rgba(244,241,234,0.16)",
          }}
        />
      ))}
    </div>
  );
}

function Hairlines({ count, accent }: { count: number; accent?: string }) {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-[6%]">
          <span
            className="h-px flex-1"
            style={{
              backgroundColor:
                accent && index === 1 ? accent : "rgba(244,241,234,0.14)",
            }}
          />
          <span
            className="h-px w-[18%]"
            style={{ backgroundColor: "rgba(244,241,234,0.08)" }}
          />
        </div>
      ))}
    </div>
  );
}

function Body({ el, accent }: { el: FrameElement; accent: string }) {
  const surface = "absolute inset-0 border border-bone/12 bg-bone/[0.035]";
  const label = el.label ? (
    <span
      className="absolute top-[6%] left-[5%] font-mono tracking-[0.14em] text-muted uppercase"
      style={microType}
    >
      {el.label}
    </span>
  ) : null;

  switch (el.kind) {
    case "pill":
      return (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: el.accent ? accent : "rgba(244,241,234,0.9)" }}
        >
          <span
            className="font-mono tracking-[0.14em] text-canvas uppercase"
            style={microType}
          >
            {el.label}
          </span>
        </div>
      );

    case "dot":
      return (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: el.accent ? accent : "rgba(244,241,234,0.55)",
          }}
        />
      );

    case "row":
      return (
        <div className={surface}>
          <div className="absolute inset-[14%] flex flex-col justify-center gap-[14%]">
            <span
              className="h-px w-[52%]"
              style={{ backgroundColor: "rgba(244,241,234,0.28)" }}
            />
            <span
              className="h-[14%] w-full"
              style={{ backgroundColor: "rgba(244,241,234,0.07)" }}
            >
              <span
                className="block h-full"
                style={{
                  width: el.accent ? "76%" : "42%",
                  backgroundColor: el.accent ? accent : "rgba(244,241,234,0.3)",
                }}
              />
            </span>
          </div>
          {el.label ? (
            <span
              className="absolute top-[16%] right-[5%] font-mono tracking-[0.14em] text-muted uppercase"
              style={microType}
            >
              {el.label}
            </span>
          ) : null}
        </div>
      );

    case "chart":
      return (
        <div className={surface}>
          {label}
          <div className="absolute inset-x-[5%] top-[28%] bottom-[10%]">
            <Bars bars={el.bars ?? [30, 50, 70, 45]} accent={accent} />
          </div>
        </div>
      );

    case "list":
      return (
        <div className={surface}>
          {label}
          <div className="absolute inset-x-[5%] top-[26%] bottom-[10%]">
            <Hairlines count={5} accent={el.accent ? accent : undefined} />
          </div>
        </div>
      );

    case "map":
      return (
        <div className={surface}>
          {label}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 200 120"
          >
            <g
              fill="none"
              stroke="rgba(244,241,234,0.12)"
              strokeWidth="0.6"
            >
              <path d="M0 34 H200 M0 68 H200 M0 96 H200" />
              <path d="M42 0 V120 M96 0 V120 M148 0 V120" />
              <path d="M0 120 L60 62 L200 84" stroke="rgba(244,241,234,0.2)" />
            </g>
          </svg>
        </div>
      );

    case "stat":
      return (
        <div className={surface}>
          {label}
          {/* Stands in for the headline figure. */}
          <div
            className="absolute bottom-[36%] left-[5%] h-[24%] w-[46%]"
            style={{
              backgroundColor: el.accent ? accent : "rgba(244,241,234,0.82)",
            }}
          />
          <div className="absolute inset-x-[5%] bottom-[18%] flex items-end gap-[5%]">
            <span
              className="h-px flex-1"
              style={{ backgroundColor: "rgba(244,241,234,0.2)" }}
            />
            <span
              className="h-px w-[22%]"
              style={{ backgroundColor: "rgba(244,241,234,0.1)" }}
            />
          </div>
        </div>
      );

    default:
      return <div className={surface} />;
  }
}

/* ------------------------------------------------------------------ */

function Element({
  el,
  stage,
  accent,
  size,
  order,
}: {
  el: FrameElement;
  stage: StageId;
  accent: string;
  size: { w: number; h: number };
  order: number;
}) {
  const shown = stage !== "empty" && stage !== "exit";
  const aligned = stage === "align" || stage === "build" || stage === "ship";
  const finished = stage === "build" || stage === "ship";

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${el.x}%`,
        top: `${el.y}%`,
        width: `${el.w}%`,
        height: `${el.h}%`,
      }}
      animate={{
        opacity: shown ? 1 : 0,
        x: aligned ? 0 : (el.drift[0] / 100) * size.w,
        y: aligned ? 0 : (el.drift[1] / 100) * size.h,
      }}
      transition={{
        duration: stage === "align" ? 0.9 : 0.5,
        delay: shown && !aligned ? order * 0.06 : order * 0.03,
        ease: EASE,
      }}
    >
      {/* Rough box */}
      <motion.div
        className="absolute inset-0 border border-dashed border-bone/40"
        animate={{ opacity: finished ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      {/* Working interface */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: finished ? 1 : 0 }}
        transition={{ duration: 0.6, delay: finished ? order * 0.05 : 0, ease: EASE }}
      >
        <Body el={el} accent={accent} />
      </motion.div>
    </motion.div>
  );
}

/** Connectors drawn between elements while the scene is still a diagram. */
function Diagram({
  scene,
  stage,
}: {
  scene: FrameScene;
  stage: StageId;
}) {
  if (!scene.diagram) return null;
  const active = stage === "wire" || stage === "align";
  const points = scene.elements.map((el) => ({
    x: el.x + el.w / 2,
    y: el.y + el.h / 2,
  }));

  return (
    <motion.svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <g stroke="rgba(244,241,234,0.16)" strokeWidth="0.25" fill="none">
        {points.slice(1).map((point, index) => (
          <path
            key={index}
            d={`M${points[index].x} ${points[index].y} L${point.x} ${point.y}`}
            strokeDasharray="1.5 1.5"
          />
        ))}
      </g>
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */

export function LivingFrame({ className = "" }: { className?: string }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [paused, setPaused] = useState(false);
  /** Bumped whenever a cycle restarts, so the progress bar remounts. */
  const [runId, setRunId] = useState(0);

  const innerRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  const scene = frameScenes[sceneIndex];
  // Reduced motion never runs the sequence: the frame just shows finished work.
  const stage: StageId = reduce ? "ship" : STAGES[stageIndex].id;

  /* Sequence ------------------------------------------------------- */
  useEffect(() => {
    if (reduce || paused) return;
    const timer = setTimeout(() => {
      if (stageIndex < STAGES.length - 1) {
        setStageIndex((index) => index + 1);
      } else {
        setSceneIndex((index) => (index + 1) % frameScenes.length);
        setStageIndex(0);
        setRunId((id) => id + 1);
      }
    }, STAGES[stageIndex].ms);
    return () => clearTimeout(timer);
  }, [stageIndex, sceneIndex, reduce, paused]);

  /* Measurement, so drift can be expressed against the frame -------- */
  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Idle while off-screen ------------------------------------------ */
  useEffect(() => {
    const node = innerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* Pointer parallax ----------------------------------------------- */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 22, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 90, damping: 22, mass: 0.5 });

  const rotateY = useTransform(sx, [-1, 1], [-2.4, 2.4]);
  const rotateX = useTransform(sy, [-1, 1], [1.8, -1.8]);

  // Three depths, so the interface layers travel at different speeds.
  const backX = useTransform(sx, [-1, 1], [-4, 4]);
  const backY = useTransform(sy, [-1, 1], [-2.4, 2.4]);
  const midX = useTransform(sx, [-1, 1], [-9, 9]);
  const midY = useTransform(sy, [-1, 1], [-5.4, 5.4]);
  const frontX = useTransform(sx, [-1, 1], [-15, 15]);
  const frontY = useTransform(sy, [-1, 1], [-9, 9]);
  const layerX = [backX, midX, frontX];
  const layerY = [backY, midY, frontY];

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    const onMove = (event: PointerEvent) => {
      const node = innerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      px.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
      py.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  /* Manual selection, tap and swipe -------------------------------- */
  const select = (index: number) => {
    setSceneIndex(index);
    setStageIndex(0);
    setRunId((id) => id + 1);
  };
  const step = (direction: 1 | -1) =>
    select((sceneIndex + direction + frameScenes.length) % frameScenes.length);

  const touch = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType !== "touch") return;
    touch.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: React.PointerEvent) => {
    if (event.pointerType !== "touch" || !touch.current) return;
    const dx = event.clientX - touch.current.x;
    const dy = event.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) step(1);
  };

  return (
    <div className={className}>
      {/* Annotations above the frame */}
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <span className="label text-muted">
          Frame {scene.index} / {String(frameScenes.length).padStart(2, "0")}
        </span>
        <span className="label hidden text-faint sm:block">{scene.spec}</span>
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        className="relative"
      >
        <div
          ref={innerRef}
          role="img"
          aria-label={`The Living Frame, currently showing ${scene.name} — ${scene.category}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="@container relative aspect-4/3 w-full touch-pan-y select-none md:aspect-5/4"
        >
          {/* The white frame itself, redrawn at the start of each cycle. */}
          <div key={`${scene.id}-border`} className="absolute inset-0">
            {FRAME_EDGES.map((edge, index) => (
              <motion.span
                key={edge.className}
                className={`absolute bg-bone ${edge.className}`}
                initial={edge.axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
                animate={edge.axis === "x" ? { scaleX: 1 } : { scaleY: 1 }}
                transition={{ duration: 0.4, delay: index * 0.09, ease: EASE }}
              />
            ))}
          </div>

          {/* Corner ticks */}
          {[
            "-top-px -left-px border-t border-l",
            "-top-px -right-px border-t border-r",
            "-bottom-px -left-px border-b border-l",
            "-bottom-px -right-px border-b border-r",
          ].map((position) => (
            <span
              key={position}
              aria-hidden
              className={`absolute size-3 border-bone/70 ${position}`}
            />
          ))}

          {/* Design grid */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(244,241,234,0.10) 0 1px, transparent 1px 100%), linear-gradient(to bottom, rgba(244,241,234,0.10) 0 1px, transparent 1px 100%)",
              backgroundSize: "16.666% 20%",
            }}
            animate={{
              opacity:
                stage === "wire" || stage === "align"
                  ? 1
                  : stage === "build"
                    ? 0.4
                    : stage === "ship"
                      ? 0.22
                      : 0,
            }}
            transition={{ duration: 0.6, ease: EASE }}
          />

          {/* Contents */}
          <div className="absolute inset-[4%]">
            <Diagram scene={scene} stage={stage} />
            {[0, 1, 2].map((layer) => (
              <motion.div
                key={layer}
                className="absolute inset-0"
                style={{ x: layerX[layer], y: layerY[layer] }}
              >
                {scene.elements.map((el, index) =>
                  el.layer === layer ? (
                    <div
                      key={el.id}
                      className={el.essential ? undefined : "hidden md:block"}
                    >
                      <Element
                        el={el}
                        stage={stage}
                        accent={scene.accent}
                        size={size}
                        order={index}
                      />
                    </div>
                  ) : null,
                )}
              </motion.div>
            ))}
          </div>

          {/* The project label, once the product is finished */}
          <motion.div
            className="absolute bottom-[4%] left-[4%] flex items-baseline gap-3"
            animate={{
              opacity: stage === "ship" ? 1 : 0,
              y: stage === "ship" ? 0 : 6,
            }}
            transition={{ duration: 0.5, delay: stage === "ship" ? 0.15 : 0, ease: EASE }}
          >
            <span
              aria-hidden
              className="size-1.5"
              style={{ backgroundColor: scene.accent }}
            />
            <span className="label text-bone">{scene.name}</span>
            <span className="label hidden text-faint sm:inline">
              {scene.category}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Controls and stage readout */}
      <div className="mt-6 flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <ul className="flex gap-6">
          {frameScenes.map((item, index) => {
            const isActive = index === sceneIndex;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-pressed={isActive}
                  className="group flex flex-col gap-2 text-left"
                >
                  <span className="flex items-baseline gap-2">
                    <span
                      className={`label transition-colors duration-200 ${
                        isActive ? "text-accent" : "text-faint"
                      }`}
                    >
                      {item.index}
                    </span>
                    <span
                      className={`text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-bone"
                          : "text-muted group-hover:text-bone-700"
                      }`}
                    >
                      {item.name}
                    </span>
                  </span>
                  <span className="relative block h-px w-full bg-line">
                    {isActive ? (
                      <motion.span
                        key={`${sceneIndex}-${runId}`}
                        className="absolute inset-y-0 left-0 w-full origin-left"
                        style={{ backgroundColor: item.accent }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: reduce ? 0 : CYCLE_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="label text-faint" aria-hidden>
          {reduce ? "Shipped" : STAGES[stageIndex].readout}
        </p>
      </div>
    </div>
  );
}
