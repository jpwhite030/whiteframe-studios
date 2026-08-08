"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { ProjectDemo } from "@/data/projects";

/**
 * A silent, looping screen recording of a product.
 *
 * Playback is tied to visibility rather than to page load: a recording only
 * runs while it is actually on screen, so a page carrying several of them
 * costs one decode, not five. Nothing is fetched beyond the poster until the
 * recording is close to being needed.
 *
 * Reduced motion is honoured properly — the recording never starts on its
 * own, and native controls appear so it stays watchable by choice. That is
 * the distinction the preference asks for: no unrequested motion, rather
 * than no access to the content.
 */
export function ProductVideo({
  demo,
  className = "",
  /** Poster only, no fetching, until the tile nears the viewport. */
  preload = "none",
  /**
   * Attach the poster immediately. On by default: deferring it saves nothing
   * measurable (mobile LCP was fractionally *better* with posters eager) and
   * leaves a black rectangle until scripts run — permanently, without them.
   * Opt out only for a recording far enough down a page that its poster
   * would genuinely compete with the initial paint.
   */
  posterPriority = true,
}: {
  demo: ProjectDemo;
  className?: string;
  preload?: "none" | "metadata";
  posterPriority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // The poster is fetched the moment it's set, even for a video far below
  // the fold — which competes with the hero for bandwidth on a phone. It's
  // attached only once the recording is near the viewport.
  const [posterVisible, setPosterVisible] = useState(posterPriority);
  // Null until the preference is known, which is the same on the server and
  // on the first client render — so `manual` is false in both and hydration
  // never mismatches. It resolves immediately after mount.
  const reduceMotion = useReducedMotion();
  const manual = reduceMotion === true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Attach the poster as soon as the element is anywhere near the screen,
    // whether or not playback is wanted.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPosterVisible(true);
          near.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    near.observe(el);

    if (reduceMotion) {
      // Preference can flip mid-session — stop anything already running.
      el.pause();
      return () => near.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused (low power mode, for one). The
          // poster stays up in that case, which is a fine outcome.
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      near.disconnect();
    };
  }, [reduceMotion]);

  return (
    <span className="absolute inset-0 block">
      {/* The still sits *behind* the video rather than only on the poster
          attribute, which the browser discards the moment playback is
          attempted. Without this the device goes empty during buffering, if
          autoplay is refused, or if no source is decodable — which is how a
          working recording still reads as a broken page. */}
      {posterVisible ? (
        <Image
          src={demo.poster}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 40vw, 88vw"
          className="object-cover"
        />
      ) : null}

      <video
        ref={ref}
        poster={posterVisible ? demo.poster : undefined}
        // Muted is what makes autoplay permissible at all; loop and inline
        // keep it from taking over the page or going fullscreen on iOS.
        muted
        loop
        playsInline
        preload={preload}
        controls={manual}
        aria-label={demo.alt}
        className={`absolute inset-0 size-full object-cover ${className}`}
      >
        {demo.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
    </span>
  );
}
