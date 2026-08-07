"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ProjectTile } from "@/components/project-tile";
import { projects, type Project } from "@/data/projects";

/**
 * Draggable horizontal project reel. Built on native overflow scrolling —
 * wheel, trackpad, touch, keyboard and scrollbars all keep working — with
 * mouse drag layered on top and a cursor chip inviting the drag.
 *
 * Mouse drag carries momentum: the reel keeps travelling on release and
 * eases to rest, rather than stopping dead under the cursor. Touch is left
 * alone — the platform already does this, and better.
 */

/**
 * Velocity decay per millisecond, as e^(-DECAY · dt). Tuned so a firm flick
 * coasts for roughly three quarters of a second. Time-based rather than
 * per-frame so the glide is identical at 60Hz and 120Hz.
 */
const DECAY = 0.0042;

/** Below this (px/ms) the glide is invisible, so we stop and save the frames. */
const MIN_VELOCITY = 0.02;

/**
 * A pointer that has been still for longer than this before release was
 * placing the reel, not throwing it — so it should not fling.
 */
const STALE_MOVE_MS = 80;

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
          <ProjectTile
            project={project}
            context="card"
            sizes="(min-width: 768px) 460px, 78vw"
          />
        </div>
      </div>

      <div className="mt-5 flex items-baseline gap-4">
        <span className="label text-ink-faint">{project.index}</span>
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-cobalt">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-ink-soft">
            {project.tagline}
          </p>
          <p className="label mt-3 text-ink-faint">
            {project.tags.join(" · ")}
          </p>
        </div>
      </div>
    </>
  );

  // Cards become links the moment a case-study href lands in the data file.
  if (project.href) {
    return (
      <a href={project.href} className="group block" draggable={false}>
        {inner}
      </a>
    );
  }
  return <div className="group">{inner}</div>;
}

export function ProjectReel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);

  const chipX = useMotionValue(0);
  const chipY = useMotionValue(0);
  const springX = useSpring(chipX, { stiffness: 260, damping: 24, mass: 0.4 });
  const springY = useSpring(chipY, { stiffness: 260, damping: 24, mass: 0.4 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFine(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Mouse drag-to-scroll. Touch uses native momentum scrolling untouched.
  const drag = useRef({
    active: false,
    startX: 0,
    startLeft: 0,
    moved: 0,
    /** Where the drag wants scrollLeft, applied once per frame. */
    target: 0,
    lastX: 0,
    lastTime: 0,
    /** scrollLeft travel in px/ms, smoothed across recent moves. */
    velocity: 0,
  });

  /** Handle for the pending scroll write, and for the momentum loop. */
  const writeFrame = useRef(0);
  const glideFrame = useRef(0);

  const maxScroll = (el: HTMLDivElement) => el.scrollWidth - el.clientWidth;

  const stopGlide = useCallback(() => {
    if (glideFrame.current) {
      cancelAnimationFrame(glideFrame.current);
      glideFrame.current = 0;
    }
  }, []);

  /**
   * Coalesce scroll writes to one per frame. Pointer events outpace the
   * display, and every write forces layout — batching keeps the drag smooth.
   */
  const scheduleWrite = useCallback(() => {
    if (writeFrame.current) return;
    writeFrame.current = requestAnimationFrame(() => {
      writeFrame.current = 0;
      const el = trackRef.current;
      if (el) el.scrollLeft = drag.current.target;
    });
  }, []);

  /** Coast to rest on release, clamping (and killing velocity) at the ends. */
  const startGlide = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    let velocity = drag.current.velocity;
    if (Math.abs(velocity) < MIN_VELOCITY) return;

    let left = el.scrollLeft;
    const limit = maxScroll(el);
    let previous = performance.now();

    const step = (now: number) => {
      // Cap dt so a backgrounded tab does not resume with one huge jump.
      const dt = Math.min(now - previous, 64);
      previous = now;

      velocity *= Math.exp(-DECAY * dt);
      left += velocity * dt;

      if (left <= 0) {
        left = 0;
        velocity = 0;
      } else if (left >= limit) {
        left = limit;
        velocity = 0;
      }

      el.scrollLeft = left;

      glideFrame.current =
        Math.abs(velocity) > MIN_VELOCITY ? requestAnimationFrame(step) : 0;
    };

    glideFrame.current = requestAnimationFrame(step);
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    // A new grab takes over from any coasting still in flight.
    stopGlide();
    // Stop the browser starting a text selection that would sweep across
    // the rest of the page as the drag travels.
    event.preventDefault();
    // Capture the pointer so the drag survives leaving the track, and so
    // the browser never starts a native image drag instead.
    el.setPointerCapture(event.pointerId);
    drag.current = {
      active: true,
      startX: event.clientX,
      startLeft: el.scrollLeft,
      moved: 0,
      target: el.scrollLeft,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
    };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;

    if (fine) {
      const rect = el.getBoundingClientRect();
      chipX.set(event.clientX - rect.left);
      chipY.set(event.clientY - rect.top);
    }

    const state = drag.current;
    if (!state.active) return;

    const dx = event.clientX - state.startX;
    state.moved = Math.max(state.moved, Math.abs(dx));
    // Clamp so travel past an end does not bank up as invisible overshoot
    // that has to be unwound before the reel moves back.
    state.target = Math.max(
      0,
      Math.min(state.startLeft - dx, maxScroll(el)),
    );

    // scrollLeft runs opposite to the pointer, hence lastX - clientX.
    const dt = event.timeStamp - state.lastTime;
    if (dt > 0) {
      const instant = (state.lastX - event.clientX) / dt;
      state.velocity = state.velocity * 0.7 + instant * 0.3;
      state.lastX = event.clientX;
      state.lastTime = event.timeStamp;
    }

    scheduleWrite();
  };

  const endDrag = (event?: React.PointerEvent) => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;

    // Held still before letting go? That was placing the reel, not throwing
    // it — the last measured velocity is stale, so drop it.
    const idle = (event?.timeStamp ?? performance.now()) - state.lastTime;
    if (idle > STALE_MOVE_MS) state.velocity = 0;

    startGlide();
  };

  // Release every pending frame if the reel unmounts mid-gesture.
  useEffect(
    () => () => {
      if (writeFrame.current) cancelAnimationFrame(writeFrame.current);
      if (glideFrame.current) cancelAnimationFrame(glideFrame.current);
    },
    [],
  );

  // A drag must not fire the card's link on release.
  const onClickCapture = (event: React.MouseEvent) => {
    if (drag.current.moved > 6) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <section id="work" className="scroll-mt-20 py-28 md:py-40">
      <div className="shell flex items-end justify-between gap-6">
        <div>
          <p className="label text-ink-faint">Work</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,3.25rem)]">
            Products we’ve designed and built.
          </h2>
        </div>
        <p className="label hidden shrink-0 pb-2 text-ink-faint md:block">
          01 — {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <div
        className="relative mt-12 md:mt-16"
        data-cursor-none=""
        onPointerEnter={() => fine && setChipVisible(true)}
        onPointerLeave={() => setChipVisible(false)}
      >
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(event) => event.preventDefault()}
          // Snap is right on touch — it rides the platform's own momentum.
          // Under a mouse it fights the glide and lands as a jerk, so once a
          // fine pointer is confirmed the reel comes to rest where it's left.
          className={`no-scrollbar flex gap-6 overflow-x-auto px-[1.375rem] pb-2 select-none md:cursor-grab md:gap-8 md:px-[2.75rem] md:active:cursor-grabbing xl:px-[4.5rem] ${
            fine ? "" : "snap-x snap-proximity"
          }`}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="w-[78vw] shrink-0 scroll-ml-[1.375rem] snap-start sm:w-[400px] md:w-[460px] md:scroll-ml-[2.75rem] xl:scroll-ml-[4.5rem]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
          {/* End spacer so the last card can align to the gutter. */}
          <div aria-hidden className="w-px shrink-0" />
        </div>

        {/* Drag chip — fine pointers only, purely decorative. */}
        {fine ? (
          <motion.span
            aria-hidden
            style={{ x: springX, y: springY }}
            animate={{ opacity: chipVisible ? 1 : 0, scale: chipVisible ? 1 : 0.6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute top-0 left-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink px-4 py-2 text-[11px] font-bold tracking-[0.08em] text-light uppercase"
          >
            Drag
          </motion.span>
        ) : null}
      </div>
    </section>
  );
}
