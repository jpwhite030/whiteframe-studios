import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { capabilities } from "@/data/studio";

export function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 py-28 md:py-36 lg:py-44">
      <div className="shell">
        <SectionHeading
          number="01"
          label="Studio"
          headline="From early idea to working product."
          variant="margin"
        />

        {/* Body copy set as two columns, indented off the left edge — a text
            block rather than another headline-plus-paragraph row. */}
        <Reveal
          delay={0.05}
          className="mt-14 grid gap-x-12 gap-y-6 md:mt-20 lg:ml-[25%] lg:grid-cols-2"
        >
          <p className="text-lg leading-relaxed text-bone-700">
            Whiteframe Studios works with founders and businesses to design,
            build and launch software that solves real operational and
            commercial problems.
          </p>
          <p className="text-lg leading-relaxed text-bone-700">
            We combine product strategy, design, engineering and automation to
            move from concept to usable software quickly.
          </p>
        </Reveal>
      </div>

      {/* The four capabilities, set large and ruled edge to edge. */}
      <ul className="mt-24 md:mt-36">
        {capabilities.map((capability, index) => (
          <Reveal
            as="li"
            key={capability}
            delay={index * 0.04}
            className="group border-t border-line last:border-b"
          >
            <div className="shell flex items-baseline gap-6 py-6 md:gap-12 md:py-9">
              <span className="label text-muted transition-colors duration-300 group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.75rem,5vw,4rem)] leading-none font-semibold tracking-[-0.03em]">
                {capability}
              </h3>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
