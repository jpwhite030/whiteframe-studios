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

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <Hero />
        <ProjectReel />
        <StudioStatement />
        <SelectedWork />
        <Capabilities />
        <Founder />
        <Process />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
