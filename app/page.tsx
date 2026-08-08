import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { ProjectReel } from "@/components/project-reel";
import { StudioStatement } from "@/components/studio-statement";
import { SelectedWork } from "@/components/selected-work";
import { Capabilities } from "@/components/capabilities";
import { Founder } from "@/components/founder";
import { Process } from "@/components/process";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Software Product Studio Sydney | Whiteframe Studios",
    description:
      "Whiteframe Studios is a Sydney software product studio specialising in product strategy, UX/UI design, web and mobile development, and AI automation.",
    path: "/",
  }),
  title: absoluteTitle("Software Product Studio Sydney | Whiteframe Studios"),
};

/**
 * Section order is deliberate: identity, then proof, then the case for the
 * studio, then what it does. The senior-team argument sits directly after
 * the work rather than near the footer — it's the differentiator, and it was
 * previously buried below three other sections.
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        {/* Hero, with the proof strip on its lower rule. */}
        <Hero />
        {/* Featured case studies. */}
        <SelectedWork />
        {/* "Small team. Senior execution." — moved up from below Process. */}
        <Founder />
        {/* The wider portfolio, browsable. */}
        <ProjectReel />
        <StudioStatement />
        <Capabilities />
        <Process />
        <FinalCta />
      </main>
      <Footer />
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
    </>
  );
}
