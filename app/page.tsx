import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Studio } from "@/components/studio";
import { ProjectShowcase } from "@/components/project-showcase";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Founder } from "@/components/founder";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Studio />
        <ProjectShowcase />
        <Services />
        <Process />
        <Founder />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
