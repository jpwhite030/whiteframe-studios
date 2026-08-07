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
  const standards = [34, 111, 188, 265];
  const lifts = [96, 166, 236, 306];

  return (
    <div className="absolute inset-0 bg-[#fbfaf7]">
      {/* Drawing-sheet grid across the whole tile. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(13,13,13,0.05) 0 1px, transparent 1px 100%), linear-gradient(to bottom, rgba(13,13,13,0.05) 0 1px, transparent 1px 100%)",
          backgroundSize: "24px 24px",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl ring-1 ring-ink/8 ring-inset"
      />

      {/* The elevation fills the sheet above the title block. */}
      <svg
        aria-hidden
        className="absolute inset-x-[7%] top-[4%] bottom-[19%] h-auto max-h-[77%] w-[86%]"
        viewBox="0 0 300 330"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Overall dimension */}
        <g stroke="#315cff" strokeWidth="1.5">
          <path d="M34 24 H265" />
          <path d="M34 17 V31 M265 17 V31" />
        </g>
        <rect x="118" y="10" width="64" height="26" rx="13" fill="#315cff" />
        <text
          x="150"
          y="28"
          textAnchor="middle"
          fill="#f5f3ee"
          fontSize="13"
          fontWeight="700"
          fontFamily="inherit"
        >
          8.1 m
        </text>

        {/* Standards */}
        <g stroke="#0d0d0d" strokeOpacity="0.5" strokeWidth="2.5">
          {standards.map((x) => (
            <path key={x} d={`M${x} 52 V310`} />
          ))}
        </g>

        {/* Ledgers */}
        <g stroke="#0d0d0d" strokeOpacity="0.34" strokeWidth="1.5">
          {lifts.map((y) => (
            <path key={y} d={`M34 ${y} H265`} />
          ))}
          <path d="M34 52 H265" />
        </g>

        {/* Braces — alternating diagonals in the outer bays */}
        <g stroke="#0d0d0d" strokeOpacity="0.22" strokeWidth="1.5">
          <path d="M34 166 L111 96 M34 236 L111 166 M34 306 L111 236" />
          <path d="M188 96 L265 166 M188 166 L265 236 M188 236 L265 306" />
        </g>

        {/* Joints */}
        <g fill="#0d0d0d" fillOpacity="0.55">
          {[52, ...lifts].map((y) =>
            standards.map((x) => (
              <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" />
            )),
          )}
        </g>

        {/* Base plates */}
        <g fill="#0d0d0d" fillOpacity="0.5">
          {standards.map((x) => (
            <rect key={x} x={x - 9} y="310" width="18" height="5" />
          ))}
        </g>

        {/* Height dimension */}
        <g stroke="#315cff" strokeWidth="1.5">
          <path d="M283 52 V310" />
          <path d="M276 52 H290 M276 310 H290" />
        </g>
      </svg>

      {/* Title block, like a real drawing sheet. */}
      <div className="absolute inset-x-0 bottom-0 flex h-[15%] items-center justify-between border-t border-ink/12 bg-[#fbfaf7] px-[7%]">
        <div>
          <p className="text-[13px] leading-tight font-extrabold tracking-tight text-ink">
            Elevation — North
          </p>
          <p className="label mt-1.5 text-ink-faint">Auto-generated from plans</p>
        </div>
        <div className="text-right">
          <p className="label text-ink-faint">Scale 1:50</p>
          <p className="label mt-1.5 text-cobalt">3 bays · 4 lifts</p>
        </div>
      </div>
    </div>
  );
}

function SeatViewMockup() {
  const rowLetters = ["A", "B", "C", "D", "E", "F"];
  // 10 seats per row in three blocks: 3 · aisle · 4 · aisle · 3.
  const blocks = [3, 4, 3];
  const selectedRow = 3; // row D
  const sold = (row: number, seat: number) => (row * 13 + seat * 5) % 11 === 3;

  return (
    <div className="absolute inset-0 bg-[#101013]">
      {/* Screen */}
      <svg
        aria-hidden
        className="absolute inset-x-[8%] top-[6%] h-[9%] w-[84%]"
        viewBox="0 0 340 34"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M8 30 Q170 4 332 30"
          stroke="#f5f3ee"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
      </svg>
      <span className="label absolute top-[16%] left-1/2 -translate-x-1/2 text-light-faint">
        Screen
      </span>

      {/* Seat map */}
      <div className="absolute inset-x-[9%] top-[24%] bottom-[21%] flex flex-col justify-between">
        {rowLetters.map((letter, row) => {
          let seatIndex = 0;
          return (
            <div key={letter} className="flex items-center gap-[4%]">
              <span className="w-[5%] text-[10px] font-bold text-light-faint">
                {letter}
              </span>
              {blocks.map((count, blockIndex) => (
                <div
                  key={blockIndex}
                  className="flex flex-1 justify-between gap-[6%]"
                  style={{ flexGrow: count }}
                >
                  {Array.from({ length: count }).map(() => {
                    const seat = seatIndex++;
                    const isSelected =
                      row === selectedRow && seat >= 4 && seat <= 6;
                    return (
                      <span
                        key={seat}
                        className="aspect-[8/7] flex-1 rounded-[26%]"
                        style={{
                          backgroundColor: isSelected
                            ? "#315cff"
                            : sold(row, seat)
                              ? "#1b1b20"
                              : "#2b2b31",
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}

        {/* Selection chip, anchored above row D's middle seats. */}
        <div className="pointer-events-none absolute bottom-[44%] left-1/2 -translate-x-1/2">
          <span className="block rounded-full bg-light px-3.5 py-2 text-[11px] font-bold tracking-tight whitespace-nowrap text-ink shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.5)]">
            D5–D7 · A$72
          </span>
          <span
            aria-hidden
            className="mx-auto block size-2 -translate-y-1 rotate-45 bg-light"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="absolute inset-x-[9%] bottom-[7%] flex items-center justify-between">
        <div className="flex items-center gap-4">
          {[
            { colour: "#2b2b31", label: "Free" },
            { colour: "#315cff", label: "Yours" },
            { colour: "#1b1b20", label: "Sold" },
          ].map((item) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-[26%]"
                style={{ backgroundColor: item.colour }}
              />
              <span className="label text-light-faint">{item.label}</span>
            </span>
          ))}
        </div>
        <span className="label text-light-soft">Screen 3</span>
      </div>
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
            style={{ objectPosition: shot.position ?? "50% 50%" }}
          />
        </div>
      );

    case "scaffold":
      return <ScaffoldMockup />;

    case "seatview":
      return <SeatViewMockup />;
  }
}
