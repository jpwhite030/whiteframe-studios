"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { DeviceFrame } from "@/components/device-frame";

/**
 * The logical viewport the framed app is given, in CSS pixels — an iPhone's
 * own size. Sizing the iframe to the on-screen device instead (around 280px)
 * puts the app below any width its layout was designed for, and it overflows
 * its own frame. So it renders at phone size and is scaled to fit.
 */
const VIEWPORT = { width: 390, height: 844 };

/**
 * The real product, running in the page.
 *
 * This is a static export of the app itself rather than a prototype of it —
 * the same routes, the same components, the same copy. It runs against no
 * backend, so it tours rather than persists.
 *
 * The bundle is several megabytes, which no marketing page should pay for
 * unprompted, so nothing loads until someone asks. Until then the frame
 * shows a still and a button, which costs one image.
 */
export function LiveDemo({
  src,
  poster,
  posterAlt,
  aspect,
  label,
}: {
  /** Entry URL of the exported app. */
  src: string;
  poster: string;
  posterAlt: string;
  aspect: string;
  /** Named for screen readers, e.g. "Tally Tax". */
  label: string;
}) {
  const [running, setRunning] = useState(false);
  // Scale is measured rather than hardcoded, so the device can stay
  // responsive without the framed app ever being told it's 280px wide.
  const [scale, setScale] = useState(1);
  const screenRef = useRef<HTMLDivElement>(null);

  const measure = useCallback((node: HTMLDivElement | null) => {
    screenRef.current = node;
    if (node) {
      setScale(
        Math.min(
          node.clientWidth / VIEWPORT.width,
          node.clientHeight / VIEWPORT.height,
        ),
      );
    }
  }, []);

  useEffect(() => {
    const node = screenRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      setScale(
        Math.min(
          node.clientWidth / VIEWPORT.width,
          node.clientHeight / VIEWPORT.height,
        ),
      );
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [running]);

  return (
    <div className="mx-auto w-full max-w-[19rem]">
      <DeviceFrame aspect={aspect} statusBar={false} glare={!running}>
        {running ? (
          <div ref={measure} className="absolute inset-0 overflow-hidden">
            <iframe
              src={src}
              title={`${label}, running in your browser`}
              // Its own origin's scripts are needed for the app to run at all;
              // everything else stays off. allow-same-origin is safe here only
              // because the framed app is ours.
              sandbox="allow-scripts allow-same-origin allow-forms"
              style={{
                width: VIEWPORT.width,
                height: VIEWPORT.height,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
              className="border-0"
            />
          </div>
        ) : (
          <>
            <Image
              src={poster}
              alt={posterAlt}
              fill
              sizes="304px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setRunning(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/45 text-light backdrop-blur-[2px] transition-colors duration-300 hover:bg-ink/55 focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-4"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-light text-ink">
                <Play aria-hidden strokeWidth={2} className="ml-0.5 size-5" />
              </span>
              <span className="text-sm font-bold">Try {label}</span>
              <span className="label max-w-[12rem] text-center leading-relaxed text-light-soft">
                Loads the real app
              </span>
            </button>
          </>
        )}
      </DeviceFrame>

      <p className="mt-6 text-center text-sm leading-relaxed font-medium text-ink-soft">
        {running ? (
          <>Tap through it as you would on a phone. Nothing you enter is saved.</>
        ) : (
          <>
            The actual application, exported for the web. Several megabytes, so
            it only loads if you ask.
          </>
        )}
      </p>
    </div>
  );
}
