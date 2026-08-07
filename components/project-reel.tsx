"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ProjectTile } from "@/components/project-tile";
import { projects, type Project } from "@/data/projects";

/**
 * Draggable horizontal project reel. Built on native overflow scrolling —
 * wheel, trackpad, touch, keyboard and scrollbars all keep working — with
 * mouse drag layered on top and a cursor chip inviting the drag.
 */

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
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
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

    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
  };

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
        onPointerLeave={() => {
          setChipVisible(false);
          endDrag();
        }}
      >
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(event) => event.preventDefault()}
          className="no-scrollbar flex snap-x snap-proximity gap-6 overflow-x-auto px-[1.375rem] pb-2 select-none md:cursor-grab md:gap-8 md:px-[2.75rem] md:active:cursor-grabbing xl:px-[4.5rem]"
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="w-[78vw] shrink-0 snap-start scroll-ml-[1.375rem] sm:w-[400px] md:w-[460px] md:scroll-ml-[2.75rem] xl:scroll-ml-[4.5rem]"
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
