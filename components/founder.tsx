import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { founderPoints } from "@/data/studio";
import { siteConfig } from "@/lib/site-config";

/** Drop a portrait into /public and set the path here to replace the frame. */
const portrait: string | null = null;

export function Founder() {
  return (
    <section id="founder" className="scroll-mt-24 py-28 md:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          number="05"
          label="Founder"
          headline="Built from experience across operations, sales and software."
        />
      </div>

      {/* Portrait runs off the left edge; the text sits well inside it. */}
      <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-0">
        <Reveal className="lg:col-span-4">
          <figure className="pl-[1.375rem] md:pl-10 lg:pl-0">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-canvas-200 lg:aspect-3/4">
              {portrait ? (
                <Image
                  src={portrait}
                  alt={`${siteConfig.founder}, founder of ${siteConfig.name}`}
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Portrait placeholder for ${siteConfig.founder}, founder of ${siteConfig.name}`}
                  className="@container absolute inset-0"
                >
                  <span
                    aria-hidden
                    className="absolute inset-[7cqw] border border-line-strong"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center font-display text-[30cqw] leading-none font-semibold tracking-[-0.05em] text-bone/10"
                  >
                    JW
                  </span>
                  <span className="label absolute bottom-[7cqw] left-1/2 -translate-x-1/2 text-muted">
                    Portrait pending
                  </span>
                </div>
              )}
            </div>
            <figcaption className="label mt-4 flex items-center justify-between pr-[1.375rem] text-faint md:pr-10 lg:pr-0 lg:pl-10">
              <span>{siteConfig.founder}</span>
              <span>Founder</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="px-[1.375rem] md:px-10 lg:col-span-7 lg:col-start-6 lg:px-0 lg:pr-16">
          <Reveal delay={0.05}>
            {/* The one serif moment on the page. */}
            <p className="font-serif text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.15] tracking-[-0.01em] text-bone italic">
              Jack White is the founder of Whiteframe Studios, PubCam and
              Meridian AI.
            </p>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone-700">
              His background spans construction operations, technical systems,
              sales leadership and product development. He began building
              software to solve operational problems he experienced firsthand
              and now develops consumer products, AI systems and internal
              business tools.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              His work focuses on turning fragmented workflows and ambitious
              product ideas into practical, scalable software.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <ul>
              {founderPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-baseline gap-4 border-t border-line py-3.5 text-sm text-bone-700"
                >
                  <span aria-hidden className="h-px w-4 shrink-0 bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
