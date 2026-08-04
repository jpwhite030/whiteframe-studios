import type { Project, ProjectVisual as VisualKey } from "@/data/projects";

/**
 * Coded placeholder visuals — one per project. Every panel is a light surface
 * so it reads as a lit screen against the dark canvas; the compositions inside
 * are what tell them apart. Set `image` on a project in data/projects.ts to
 * swap any of these for a real screenshot.
 *
 * Geometry uses `cqw` directly. Type is sized from `--tx`, which is larger
 * relative to the frame on small screens so labels stay legible when the whole
 * composition is only ~340px wide.
 */

const type = (scale: number) => ({ fontSize: `calc(var(--tx) * ${scale})` });

function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`@container relative h-full w-full overflow-hidden text-ink [--tx:1.9cqw] md:[--tx:1cqw] ${className}`}
    >
      {children}
    </div>
  );
}

/** Uppercase monospaced meta text, the shared voice of every visual. */
function Meta({
  scale = 1.2,
  className = "",
  children,
}: {
  scale?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`font-mono tracking-[0.16em] uppercase ${className}`}
      style={type(scale)}
    >
      {children}
    </span>
  );
}

function PubCamVisual() {
  const venues = [
    { name: "The Winston", state: "Busy", width: "82%" },
    { name: "Lantern Rooms", state: "Steady", width: "54%" },
    { name: "Harbour Social", state: "Quiet", width: "26%" },
  ];

  return (
    <Frame className="bg-paper-100">
      {/* Street grid behind the device. */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-paper-line"
        preserveAspectRatio="none"
        viewBox="0 0 400 300"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.9">
          <path d="M0 74 H400 M0 150 H400 M0 226 H400" />
          <path d="M62 0 V300 M148 0 V300 M252 0 V300 M338 0 V300" />
          <path d="M0 300 L120 180 L400 210" opacity="0.55" />
        </g>
        <g fill="currentColor">
          <circle cx="62" cy="74" r="2" />
          <circle cx="252" cy="226" r="2" />
          <circle cx="338" cy="150" r="2" />
        </g>
      </svg>

      <div className="absolute top-[7cqw] left-[7cqw] flex items-center gap-[1.6cqw]">
        <span className="block size-[1.4cqw] rounded-full bg-accent-deep" />
        <Meta className="text-ink-700">Live now</Meta>
      </div>

      {/* Device */}
      <div className="absolute bottom-[-7cqw] left-1/2 w-[46cqw] -translate-x-1/2 rounded-[3.4cqw] bg-ink p-[1.1cqw] shadow-[0_2cqw_6cqw_rgba(20,19,15,0.22)] md:w-[38cqw]">
        <div className="rounded-[2.6cqw] bg-[#1c1b17] px-[2.6cqw] pt-[2.6cqw] pb-[9cqw]">
          <div className="flex items-center justify-between">
            <Meta scale={1.05} className="text-paper/45">
              Tonight
            </Meta>
            <Meta scale={1.05} className="text-paper/45">
              Surry Hills
            </Meta>
          </div>

          <p
            className="mt-[2.4cqw] font-display leading-none tracking-tight text-paper"
            style={type(3)}
          >
            Near you
          </p>

          <ul className="mt-[3.6cqw] space-y-[3.4cqw] md:mt-[3cqw] md:space-y-[2.2cqw]">
            {venues.map((venue) => (
              <li key={venue.name}>
                <div className="flex items-baseline justify-between gap-[1cqw]">
                  <span className="text-paper/90" style={type(1.5)}>
                    {venue.name}
                  </span>
                  <Meta scale={1} className="text-paper/40">
                    {venue.state}
                  </Meta>
                </div>
                <div className="mt-[1.8cqw] h-[0.7cqw] w-full bg-paper/12 md:mt-[1cqw] md:h-[0.5cqw]">
                  <div
                    className="h-full bg-accent"
                    style={{ width: venue.width }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

function MeridianVisual() {
  const boxes = [
    { left: "14%", top: "26%", width: "13%", height: "34%", label: "Entry" },
    { left: "36%", top: "38%", width: "11%", height: "29%", label: "Queue" },
    { left: "52%", top: "30%", width: "12%", height: "32%", label: "Queue" },
    { left: "72%", top: "44%", width: "14%", height: "27%", label: "Floor" },
  ];
  const bars = [26, 34, 30, 46, 58, 72, 88, 76, 54, 38];

  return (
    <Frame className="bg-paper-200">
      <div className="absolute inset-[5cqw] flex flex-col">
        {/* Camera view */}
        <div className="relative flex-1 border border-paper-line bg-paper">
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full text-paper-line"
            preserveAspectRatio="none"
            viewBox="0 0 300 160"
          >
            <g fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.7">
              <path d="M0 40 H300 M0 80 H300 M0 120 H300" />
              <path d="M60 0 V160 M120 0 V160 M180 0 V160 M240 0 V160" />
            </g>
            <path
              d="M20 160 L110 44 L196 44 L286 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
          </svg>

          {boxes.map((box, index) => (
            <div
              key={`${box.label}-${index}`}
              className="absolute border border-accent-deep/80"
              style={{
                left: box.left,
                top: box.top,
                width: box.width,
                height: box.height,
              }}
            >
              <Meta
                scale={0.95}
                className="absolute bottom-full left-0 mb-[0.4cqw] bg-accent-deep px-[0.6cqw] py-[0.25cqw] text-paper"
              >
                {box.label}
              </Meta>
            </div>
          ))}

          <Meta
            scale={1.05}
            className="absolute top-[1.8cqw] right-[1.8cqw] text-ink-faint"
          >
            Cam 02 · Front bar
          </Meta>
        </div>

        {/* Occupancy strip */}
        <div className="mt-[3cqw] border border-paper-line bg-paper p-[2.2cqw]">
          <div className="flex items-baseline justify-between gap-[2cqw]">
            <Meta className="text-ink">Occupancy</Meta>
            <Meta scale={1.05} className="text-ink-faint">
              6pm — 3am
            </Meta>
          </div>
          <div className="mt-[1.8cqw] flex h-[11cqw] items-end gap-[0.7cqw]">
            {bars.map((height, index) => (
              <div
                key={index}
                className={`flex-1 ${
                  index === 6 ? "bg-accent-deep" : "bg-paper-line"
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function TallyVisual() {
  const lines = ["68%", "52%", "80%", "44%"];
  const categories = [
    { label: "Tools and equipment", state: "Deductible" },
    { label: "Vehicle and travel", state: "Deductible" },
    { label: "Personal", state: "Excluded" },
  ];

  return (
    <Frame className="bg-paper-200">
      {/* Path from the scanned receipt to its classification. */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-paper-line"
        preserveAspectRatio="none"
        viewBox="0 0 400 300"
      >
        <path
          d="M126 140 C 190 158, 200 182, 240 198"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeDasharray="3 4"
        />
      </svg>

      <div className="absolute top-[7cqw] right-[7cqw] flex items-center gap-[1.4cqw]">
        <Meta scale={1.05} className="text-ink-faint">
          Scanned
        </Meta>
        <span aria-hidden className="h-px w-[3cqw] bg-paper-line" />
        <Meta scale={1.05} className="text-accent-deep">
          Classified
        </Meta>
      </div>

      {/* Receipt */}
      <div className="absolute top-[9cqw] left-[7cqw] w-[32cqw] bg-paper px-[2.6cqw] pt-[3cqw] pb-[4cqw] shadow-[0_1.4cqw_4cqw_rgba(20,19,15,0.12)]">
        <div className="flex items-center justify-between">
          <Meta scale={1} className="text-ink-faint">
            Receipt
          </Meta>
          <span className="size-[1.1cqw] rounded-full bg-accent-deep" />
        </div>
        <div className="mt-[2.4cqw] space-y-[1.2cqw]">
          {lines.map((width, index) => (
            <div
              key={index}
              className="h-[0.75cqw] bg-paper-line"
              style={{ width }}
            />
          ))}
        </div>
        <div className="mt-[2.6cqw] flex items-baseline justify-between border-t border-paper-line pt-[1.6cqw]">
          <Meta scale={1} className="text-ink-faint">
            Total
          </Meta>
          <div className="h-[0.9cqw] w-[22%] bg-ink" />
        </div>
        {/* torn edge */}
        <svg
          aria-hidden
          className="absolute inset-x-0 -bottom-[0.9cqw] h-[1cqw] w-full text-paper"
          preserveAspectRatio="none"
          viewBox="0 0 100 6"
        >
          <path
            d="M0 0 L5 6 L10 0 L15 6 L20 0 L25 6 L30 0 L35 6 L40 0 L45 6 L50 0 L55 6 L60 0 L65 6 L70 0 L75 6 L80 0 L85 6 L90 0 L95 6 L100 0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Classification panel */}
      <div className="absolute right-[7cqw] bottom-[7cqw] w-[46cqw] border border-paper-line bg-paper p-[3cqw] md:w-[42cqw]">
        <Meta scale={1} className="text-ink-faint">
          This year
        </Meta>
        <ul className="mt-[2.4cqw] space-y-[2cqw]">
          {categories.map((category) => (
            <li
              key={category.label}
              className="flex items-baseline justify-between gap-[2cqw] border-b border-paper-line pb-[1.4cqw] last:border-0 last:pb-0"
            >
              <span className="text-ink" style={type(1.55)}>
                {category.label}
              </span>
              <Meta
                scale={0.95}
                className={
                  category.state === "Excluded"
                    ? "text-ink-faint"
                    : "text-accent-deep"
                }
              >
                {category.state}
              </Meta>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

function SkelScaffVisual() {
  const nodes = ["Enquiry", "Quote", "Job", "Tasks", "Invoice"];
  const automated = [2, 3];

  return (
    <Frame className="bg-paper-100">
      <div className="absolute inset-0 flex flex-col justify-center px-[7cqw]">
        <Meta className="text-ink-faint">Operations pipeline</Meta>

        <div className="mt-[3cqw] flex items-stretch">
          {nodes.map((node, index) => (
            <div key={node} className="flex flex-1 items-center">
              <div
                className={`flex-1 border bg-paper px-[1.6cqw] py-[2cqw] ${
                  automated.includes(index)
                    ? "border-accent-deep"
                    : "border-paper-line"
                }`}
              >
                <Meta scale={0.9} className="text-ink-faint">
                  {String(index + 1).padStart(2, "0")}
                </Meta>
                <p
                  className="mt-[1.2cqw] leading-none text-ink"
                  style={type(1.7)}
                >
                  {node}
                </p>
                <div
                  className={`mt-[1.6cqw] h-[0.5cqw] w-full ${
                    automated.includes(index) ? "bg-accent-deep" : "bg-paper-line"
                  }`}
                />
              </div>
              {index < nodes.length - 1 ? (
                <div
                  aria-hidden
                  className="h-px w-[2.6cqw] shrink-0 bg-paper-line"
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-[2.4cqw] flex items-center gap-[1.6cqw]">
          <span className="h-px flex-1 bg-paper-line" />
          <Meta
            scale={0.95}
            className="border border-accent-deep px-[1.4cqw] py-[0.6cqw] text-accent-deep"
          >
            Automated
          </Meta>
          <span className="h-px flex-1 bg-paper-line" />
        </div>
      </div>
    </Frame>
  );
}

function KingswoodVisual() {
  const shows = [
    { city: "Melbourne", venue: "Corner Hotel" },
    { city: "Sydney", venue: "Metro Theatre" },
    { city: "Brisbane", venue: "The Triffid" },
  ];

  return (
    <Frame className="bg-paper">
      <div className="absolute inset-0 flex flex-col justify-between p-[4cqw] md:p-[3cqw]">
        <div className="flex items-start justify-between">
          <Meta scale={1.05} className="text-ink-faint">
            Tour
          </Meta>
          <Meta scale={1.05} className="text-ink-faint">
            Listen
          </Meta>
        </div>

        <div className="flex items-end justify-between gap-[4cqw]">
          {/* Not a heading — this is artwork, and the frame carries its label. */}
          <p className="font-display text-[8.4cqw] leading-[0.8] font-semibold tracking-[-0.045em] text-ink uppercase">
            Kingswood
          </p>

          <div
            aria-hidden
            className="flex h-[5cqw] flex-1 items-center gap-[0.4cqw]"
          >
            {Array.from({ length: 48 }).map((_, index) => {
              const height = 16 + ((index * 37) % 84);
              return (
                <span
                  key={index}
                  className={`flex-1 ${
                    index % 9 === 0 ? "bg-accent-deep" : "bg-ink/25"
                  }`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>

        <ul className="flex gap-[3cqw]">
          {shows.map((show) => (
            <li key={show.city} className="flex-1 border-t border-ink/20 pt-[1.4cqw]">
              <span className="block text-ink" style={type(1.7)}>
                {show.city}
              </span>
              <Meta scale={1} className="mt-[0.8cqw] block text-ink-faint">
                {show.venue}
              </Meta>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

const visuals: Record<VisualKey, () => React.JSX.Element> = {
  pubcam: PubCamVisual,
  meridian: MeridianVisual,
  tally: TallyVisual,
  skelscaff: SkelScaffVisual,
  kingswood: KingswoodVisual,
};

export function ProjectVisual({ project }: { project: Project }) {
  const Visual = visuals[project.visual];
  return (
    <div role="img" aria-label={project.imageAlt} className="h-full w-full">
      <Visual />
    </div>
  );
}
