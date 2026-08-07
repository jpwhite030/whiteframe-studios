import Image from "next/image";
import { ProductVideo } from "@/components/product-video";
import type { Project } from "@/data/projects";

/**
 * The visual for one project. Real captures are shown as a single oversized
 * phone on a product-cast ground — one screen, large enough to read, never
 * a row of thumbnails. A product with no capture yet says so plainly rather
 * than borrowing an invented one. The parent sets size, radius and overflow.
 */

/** The phone silhouette both stills and recordings are presented in. */
function PhoneFrame({
  aspect,
  width,
  /** Border tuned to the tile ground, so the phone edge reads on both. */
  edgeClass = "border-ink/10",
  children,
}: {
  aspect: string;
  width?: string;
  edgeClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-[1.1rem] border shadow-[0_2rem_4rem_rgba(10,10,10,0.4)] ${edgeClass}`}
      style={{ width: width ?? "62%", top: "9%", aspectRatio: aspect }}
    >
      {children}
    </div>
  );
}

function PhoneShot({
  shot,
  sizes,
  priority = false,
  edgeClass,
}: {
  shot: NonNullable<Project["shot"]>;
  sizes: string;
  priority?: boolean;
  edgeClass?: string;
}) {
  return (
    <PhoneFrame aspect={shot.aspect} width={shot.width} edgeClass={edgeClass}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: shot.position ?? "50% 0%" }}
      />
    </PhoneFrame>
  );
}

function PhoneDemo({
  demo,
  edgeClass,
}: {
  demo: NonNullable<Project["demo"]>;
  edgeClass?: string;
}) {
  return (
    <PhoneFrame aspect={demo.aspect} width={demo.width} edgeClass={edgeClass}>
      <ProductVideo demo={demo} preload="metadata" />
    </PhoneFrame>
  );
}

/**
 * Stand-in for a product with no capture yet. Deliberately typographic — it
 * states what the product is and that the capture is pending, which is more
 * credible than a drawing of a screen that has never existed.
 */
function PlaceholderTile({
  project,
  context,
}: {
  project: Project;
  context: "feature" | "card";
}) {
  // Reel cards already print the name and tags directly beneath the tile.
  // Repeating them inside it reads as a bug, so the card variant carries
  // only what the caption doesn't already say.
  const standalone = context === "feature";

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[#f2f0eb] p-7 md:p-9">
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl ring-1 ring-ink/8 ring-inset"
      />

      <span aria-hidden className="block size-2.5 border-[1.5px] border-ink/40" />

      <div>
        {standalone ? (
          <>
            <p className="label text-ink-faint">{project.index}</p>
            <p className="mt-3 text-[clamp(1.15rem,2.2vw,1.75rem)] font-extrabold tracking-tight text-ink">
              {project.name}
            </p>
            <p className="label mt-3 text-ink-faint">
              {project.tags.join(" · ")}
            </p>
          </>
        ) : null}
        <p className={`label text-cobalt ${standalone ? "mt-7" : ""}`}>
          {project.status}
        </p>
        <p className="label mt-2 text-ink-faint">Capture coming</p>
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
  if (project.visual === "placeholder") {
    return <PlaceholderTile project={project} context={context} />;
  }

  const shot =
    (context === "card" ? project.tileShot : undefined) ?? project.shot!;

  // Cards stay on stills: a reel of five projects must not become five
  // videos decoding at once. Only the large feature contexts play.
  const demo = context === "feature" ? project.demo : undefined;

  switch (project.visual) {
    case "pubcam":
      return (
        <div className="absolute inset-0 bg-[#17121f]">
          {demo ? (
            <PhoneDemo demo={demo} edgeClass="border-white/15" />
          ) : (
            <PhoneShot
              shot={shot}
              sizes={sizes}
              priority={priority}
              edgeClass="border-white/15"
            />
          )}
        </div>
      );

    case "tally":
      return (
        <div className="absolute inset-0 bg-[#e9efdb]">
          {demo ? (
            <PhoneDemo demo={demo} />
          ) : (
            <PhoneShot shot={shot} sizes={sizes} priority={priority} />
          )}
        </div>
      );

    case "kingswood":
      return (
        <div className="absolute inset-0 bg-dark">
          {demo ? (
            <ProductVideo demo={demo} preload="metadata" />
          ) : (
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
              style={{ objectPosition: shot.position ?? "50% 50%" }}
            />
          )}
        </div>
      );
  }
}
