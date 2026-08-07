import { AnimatedText } from "@/components/animated-text";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * The founder-led positioning band — the page's first full dark section.
 * The fixed navigation inverts over it automatically via blend mode.
 */
export function Founder() {
  const { headline, supporting, principles } = siteConfig.founderBand;

  return (
    <section className="bg-dark py-28 text-light md:py-40">
      <div className="shell">
        <p className="label text-light-faint">How we work</p>

        <AnimatedText
          as="h2"
          lines={["Small team. Senior execution.", "No layers of account management."]}
          className="mt-10 max-w-5xl text-[clamp(1.9rem,4.6vw,4.25rem)] md:mt-14"
        />
        <span className="sr-only">{headline}</span>

        <Reveal delay={0.1} className="mt-10 md:mt-14 lg:grid lg:grid-cols-12">
          <p className="max-w-xl text-lg leading-relaxed font-medium text-light-soft lg:col-span-6 lg:col-start-6">
            {supporting}
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-x-10 gap-y-8 md:mt-24 md:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal
              as="li"
              key={principle}
              delay={index * 0.07}
              className="border-t border-light/15 pt-5"
            >
              <span className="label text-light-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3.5 text-xl font-extrabold tracking-tight">
                {principle}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
