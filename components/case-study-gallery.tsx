import Image from "next/image";
import { DeviceFrame } from "@/components/device-frame";
import { ProductVideo } from "@/components/product-video";
import { Reveal } from "@/components/reveal";
import { isClip, type CaseStudyMedia } from "@/data/projects";

/**
 * Screens and recordings from the product, in the same device frame used
 * everywhere else so a case study doesn't introduce a second visual language
 * halfway down.
 *
 * One ordered list rather than video-then-stills: where a clip belongs is a
 * narrative decision, and forcing all recordings to the front takes that
 * decision away from whoever writes the case study.
 *
 * Captions carry the argument. A grid of screens with no explanation asks the
 * reader to work out why each one is here; a line each says what to look at.
 */
export function CaseStudyGallery({
  items,
  tone,
}: {
  items: readonly CaseStudyMedia[];
  /** Matches the app's own top edge where a status bar has to be drawn. */
  tone?: "light" | "dark";
}) {
  return (
    <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const key = isClip(item) ? item.sources[0].src : item.src;
        return (
          <li key={key}>
            <Reveal delay={(index % 3) * 0.06}>
              <DeviceFrame
                aspect={item.aspect}
                statusBar={!item.hasStatusBar}
                statusTone={tone}
                glare={false}
                className="w-full drop-shadow-[0_1.5rem_3rem_rgba(13,13,13,0.18)]"
              >
                {isClip(item) ? (
                  <ProductVideo demo={item} preload="none" />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
                    className="object-cover"
                    style={{ objectPosition: item.position ?? "50% 0%" }}
                  />
                )}
              </DeviceFrame>
              <p className="mt-6 text-base leading-relaxed font-medium text-ink-soft">
                {item.caption}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
