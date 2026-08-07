import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * The visual for one project. Real captures are shown as a single oversized
 * phone on a product-cast ground — one screen, large enough to read, never
 * a row of thumbnails. Products without captures get coded mockups drawn in
 * the site's own hand. The parent sets size, radius and overflow.
 */

function PhoneShot({
  shot,
  sizes,
  priority = false,
  /** Border tuned to the tile ground, so the phone edge reads on both. */
  edgeClass = "border-ink/10",
}: {
  shot: NonNullable<Project["shot"]>;
  sizes: string;
  priority?: boolean;
  edgeClass?: string;
}) {
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-[1.1rem] border shadow-[0_2rem_4rem_rgba(10,10,10,0.4)] ${edgeClass}`}
      style={{ width: shot.width ?? "62%", top: "9%", aspectRatio: shot.aspect }}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: shot.position ?? "50% 0%" }}
      />
    </div>
  );
}

function ScaffoldMockup() {
  return (
    <div className="absolute inset-0 bg-[#fbfaf7]">
      <svg
        aria-hidden
        className="absolute inset-x-[8%] top-[16%] bottom-[12%] h-auto w-[84%]"
        viewBox="0 0 360 240"
        fill="none"
      >
        {/* Standards, ledgers and braces — a scaffold elevation. */}
        <g stroke="#0d0d0d" strokeOpacity="0.28" strokeWidth="1.5">
          <path d="M30 18 V226 M130 18 V226 M230 18 V226 M330 18 V226" />
        </g>
        <g stroke="#0d0d0d" strokeOpacity="0.2" strokeWidth="1">
          <path d="M30 62 H330 M30 128 H330 M30 194 H330" />
          <path d="M30 194 L130 128 M130 128 L230 194 M230 62 L330 128" />
        </g>
        {/* Base plates */}
        <g fill="#0d0d0d" fillOpacity="0.3">
          <rect x="24" y="226" width="12" height="4" />
          <rect x="124" y="226" width="12" height="4" />
          <rect x="224" y="226" width="12" height="4" />
          <rect x="324" y="226" width="12" height="4" />
        </g>
        {/* Joints */}
        <g fill="#0d0d0d" fillOpacity="0.35">
          {[62, 128, 194].map((y) =>
            [30, 130, 230, 330].map((x) => (
              <rect key={`${x}-${y}`} x={x - 2} y={y - 2} width="4" height="4" />
            )),
          )}
        </g>
        {/* Cobalt dimension line */}
        <g stroke="#315cff" strokeWidth="1.25">
          <path d="M30 34 H330" />
          <path d="M30 28 V40 M330 28 V40" />
        </g>
      </svg>
      <span className="label absolute top-[8%] left-1/2 -translate-x-1/2 text-cobalt">
        8.1 m
      </span>
      <span className="label absolute bottom-[5%] left-[8%] text-ink-faint">
        Elevation — North
      </span>
      <span className="label absolute right-[8%] bottom-[5%] text-ink-faint">
        3 bays · 2 lifts
      </span>
    </div>
  );
}

function SeatViewMockup() {
  const rows = 6;
  const cols = 12;
  const selected = new Set(["3-5", "3-6", "3-7"]);
  const taken = (row: number, col: number) => (row * 13 + col * 5) % 11 === 3;

  return (
    <div className="absolute inset-0 bg-[#101013]">
      <svg
        aria-hidden
        className="absolute inset-x-[10%] top-[9%] h-[12%] w-[80%]"
        viewBox="0 0 340 40"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M6 34 Q170 6 334 34" stroke="#f5f3ee" strokeOpacity="0.28" strokeWidth="1.5" />
      </svg>
      <span className="label absolute top-[4.5%] left-1/2 -translate-x-1/2 text-light-faint">
        Screen
      </span>

      <div className="absolute inset-x-[10%] top-[26%] bottom-[16%] flex flex-col justify-between">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex justify-between">
            {Array.from({ length: cols }).map((_, col) => {
              const key = `${row}-${col}`;
              return (
                <span
                  key={key}
                  className="aspect-[7/6] w-[6.5%] rounded-[20%]"
                  style={{
                    backgroundColor: selected.has(key)
                      ? "#315cff"
                      : taken(row, col)
                        ? "#1a1a1f"
                        : "#26262c",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Selection chip */}
      <span className="absolute top-[54%] left-1/2 -translate-x-1/2 rounded-full bg-light px-3 py-1.5 text-[11px] font-bold tracking-tight text-ink shadow-lg">
        K6–K8 · A$72
      </span>

      <span className="label absolute bottom-[6%] left-[10%] text-light-faint">
        Dendy Cinemas — Screen 3
      </span>
    </div>
  );
}

export function ProjectTile({
  project,
  sizes = "(min-width: 768px) 40vw, 80vw",
  priority = false,
  /** `card` prefers the tile-optimised capture where one exists. */
  context = "feature",
}: {
  project: Project;
  sizes?: string;
  priority?: boolean;
  context?: "feature" | "card";
}) {
  const shot =
    (context === "card" ? project.tileShot : undefined) ?? project.shot!;

  switch (project.visual) {
    case "pubcam":
      return (
        <div className="absolute inset-0 bg-[#17121f]">
          <PhoneShot
            shot={shot}
            sizes={sizes}
            priority={priority}
            edgeClass="border-white/15"
          />
        </div>
      );

    case "tally":
      return (
        <div className="absolute inset-0 bg-[#e9efdb]">
          <PhoneShot shot={shot} sizes={sizes} priority={priority} />
        </div>
      );

    case "kingswood":
      return (
        <div className="absolute inset-0 bg-dark">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </div>
      );

    case "scaffold":
      return <ScaffoldMockup />;

    case "seatview":
      return <SeatViewMockup />;
  }
}
