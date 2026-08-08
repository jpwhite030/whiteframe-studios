import type { ReactNode } from "react";

/**
 * An iPhone, drawn rather than photographed — titanium edge, black bezel,
 * Dynamic Island and side hardware. Nothing here is an image, so it stays
 * sharp at any size and adds no bytes to the page.
 *
 * Every dimension is expressed in `cqw` (percent of the device's own width)
 * against a container declared on the root. That is what lets one component
 * serve a 34%-wide phone in the hero and a full-height one in the lightbox
 * without a single hardcoded pixel — the island, the corner radii and the
 * buttons all scale together, which is exactly what breaks when a device
 * frame is built with fixed rem values.
 */

/** Real capture ratios rarely match a true iPhone, so the caller decides. */
const IPHONE_ASPECT = "1179 / 2556";

export function DeviceFrame({
  aspect = IPHONE_ASPECT,
  className = "",
  /**
   * The black strip carrying the Dynamic Island. Captures taken inside the
   * app rarely include a status bar, so drawing one keeps the island from
   * sitting on top of the app's own header.
   */
  statusBar = true,
  /**
   * Tone of that drawn strip. It should match the app's own top edge — a
   * light app shows a light status bar with the island as a black cutout in
   * it, which is the read that makes a device recognisable. On a dark app
   * the island genuinely does disappear, on a real phone too.
   */
  statusTone = "dark",
  /**
   * Specular sweep across the glass. Its position reads the `--glare-x`
   * custom property, so a parent can drive it from a motion value without
   * this component needing to know anything about animation.
   */
  glare = true,
  children,
}: {
  aspect?: string;
  className?: string;
  statusBar?: boolean;
  statusTone?: "light" | "dark";
  glare?: boolean;
  children: ReactNode;
}) {
  const light = statusTone === "light";
  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: aspect, containerType: "inline-size" }}
    >
      {/* Side hardware, seated under the body so only the outer sliver shows. */}
      <span
        aria-hidden
        className="absolute top-[19%] -left-[1.1cqw] h-[4cqw] w-[1.5cqw] rounded-l-[0.6cqw] bg-[#8b8b93]"
      />
      <span
        aria-hidden
        className="absolute top-[26%] -left-[1.1cqw] h-[7.5cqw] w-[1.5cqw] rounded-l-[0.6cqw] bg-[#8b8b93]"
      />
      <span
        aria-hidden
        className="absolute top-[35.5%] -left-[1.1cqw] h-[7.5cqw] w-[1.5cqw] rounded-l-[0.6cqw] bg-[#8b8b93]"
      />
      <span
        aria-hidden
        className="absolute top-[30%] -right-[1.1cqw] h-[12cqw] w-[1.5cqw] rounded-r-[0.6cqw] bg-[#8b8b93]"
      />

      {/* Titanium body. The gradient runs across the width so the two long
          edges catch light and the flats between them stay matte. */}
      <div
        className="absolute inset-0 rounded-[8.6cqw] p-[1.1cqw]"
        style={{
          backgroundImage:
            "linear-gradient(100deg, #f2f2f5 0%, #a4a4ad 14%, #75757e 34%, #6e6e77 52%, #9d9da6 74%, #ededf1 92%, #b9b9c1 100%)",
        }}
      >
        {/* Bezel */}
        <div className="h-full w-full rounded-[7.6cqw] bg-[#08080a] p-[2.3cqw]">
          {/* Screen */}
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[5.4cqw] bg-black">
            {statusBar ? (
              <div
                className={`relative flex h-[6.4cqw] shrink-0 items-center justify-center ${
                  light ? "bg-[#f4f4f6]" : "bg-[#0a0a0c]"
                }`}
              >
                <span
                  aria-hidden
                  className="h-[3.1cqw] w-[10.6cqw] rounded-full bg-black"
                />
              </div>
            ) : null}

            <div className="relative min-h-0 flex-1">{children}</div>
          </div>
        </div>
      </div>

      {/* Glass. Sits above the screen but takes no pointer events, so the
          device underneath stays clickable. */}
      {glare ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[8.6cqw]"
        >
          <span
            className="absolute -inset-y-[25%] w-[38%] -translate-x-1/2 rotate-[18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[1.5cqw]"
            style={{ left: "var(--glare-x, 50%)" }}
          />
        </span>
      ) : null}
    </div>
  );
}
