import { ArrowUpRight } from "lucide-react";
import { ProjectTile } from "@/components/project-tile";
import { Reveal } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";
import { featuredProjects, type Project } from "@/data/projects";
import { siteConfig } from "@/lib/site-config";

/**
 * Three featured projects as large editorial case blocks. Layouts alternate
 * — visual right, visual left, then full-bleed — on one shared grid.
 */

function enquiryHref(project: Project) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `${project.name} — project enquiry`,
  )}`;
}

function CaseLink({ project }: { project: Project }) {
  return (
    <a
      href={project.href ?? enquiryHref(project)}
      className="group/link inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200 hover:text-cobalt"
    >
      <span className="relative">
        {project.href ? "View project" : "Request details"}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cobalt transition-transform duration-300 ease-editorial group-hover/link:scale-x-100"
        />
      </span>
      <ArrowUpRight
        aria-hidden
        strokeWidth={2}
        className="size-4 transition-transform duration-300 ease-editorial group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
    </a>
  );
}

function CaseMeta({ project }: { project: Project }) {
  return (
    <>
      <p className="label text-ink-faint">
        {project.index} — {project.tags.join(" · ")}
      </p>
      <h3 className="mt-6 max-w-md text-[clamp(1.75rem,3vw,2.75rem)]">
        {project.featured!.headline}
      </h3>
      <p className="mt-6 max-w-sm text-base leading-relaxed font-medium text-ink-soft">
        {project.tagline}. {project.status}.
      </p>
      <div className="mt-8">
        <CaseLink project={project} />
      </div>
    </>
  );
}

export function SelectedWork() {
  const [first, second, third] = featuredProjects;

  return (
    <section aria-label="Selected work" className="py-10 md:py-16">
      {/* 01 — visual right */}
      <article className="shell grid items-center gap-x-14 gap-y-10 py-14 md:py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <CaseMeta project={first} />
        </Reveal>
        <RevealImage className="lg:col-span-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[16/10]">
            <ProjectTile
              project={first}
              sizes="(min-width: 1024px) 62vw, 92vw"
            />
          </div>
        </RevealImage>
      </article>

      {/* 02 — visual left */}
      <article className="shell grid items-center gap-x-14 gap-y-10 py-14 md:py-20 lg:grid-cols-12">
        <RevealImage className="order-2 lg:order-1 lg:col-span-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[16/10]">
            <ProjectTile
              project={second}
              sizes="(min-width: 1024px) 62vw, 92vw"
            />
          </div>
        </RevealImage>
        <Reveal className="order-1 lg:order-2 lg:col-span-4 lg:pl-4">
          <CaseMeta project={second} />
        </Reveal>
      </article>

      {/* 03 — full-bleed photography */}
      <article className="py-14 md:py-20">
        <RevealImage className="relative">
          <div className="relative h-[60svh] min-h-[380px] md:h-[76svh]">
            <ProjectTile project={third} sizes="100vw" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent"
            />
            <div className="shell absolute inset-x-0 bottom-0 pb-10 md:pb-14">
              <p className="label text-light-soft">
                {third.index} — {third.tags.join(" · ")}
              </p>
              <h3 className="mt-4 max-w-2xl text-[clamp(2rem,4.4vw,4rem)] text-light">
                {third.featured!.headline}
              </h3>
            </div>
          </div>
        </RevealImage>
        <Reveal className="shell mt-8 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-sm text-base leading-relaxed font-medium text-ink-soft">
            {third.tagline}. {third.status}.
          </p>
          <CaseLink project={third} />
        </Reveal>
      </article>
    </section>
  );
}
