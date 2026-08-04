import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProjectVisual } from "@/components/project-visual";
import {
  projects,
  type Project,
  type ProjectAspect,
} from "@/data/projects";
import { siteConfig } from "@/lib/site-config";

/** Literal classes so Tailwind can see them. */
const aspects: Record<ProjectAspect, string> = {
  wide: "aspect-4/3 md:aspect-16/10",
  classic: "aspect-4/3 md:aspect-3/2",
  tall: "aspect-4/3 md:aspect-5/4",
  panorama: "aspect-3/2 md:aspect-2/1",
  cinema: "aspect-3/2 md:aspect-21/9",
};

function enquiryHref(project: Project) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `${project.name} — project enquiry`,
  )}`;
}

/** The panel itself: a lit screen sitting on the dark canvas. */
function Panel({ project }: { project: Project }) {
  return (
    <a
      href={project.href ?? enquiryHref(project)}
      {...(project.href ? { target: "_blank", rel: "noreferrer" } : undefined)}
      aria-label={
        project.href
          ? `View ${project.name}`
          : `Request details about ${project.name}`
      }
      className={`group/media relative block w-full overflow-hidden bg-paper-100 ${aspects[project.aspect]}`}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover/media:scale-[1.015]">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ProjectVisual project={project} />
        )}
      </div>
      <span
        aria-hidden
        className="absolute inset-0 bg-canvas opacity-0 transition-opacity duration-500 group-hover/media:opacity-[0.07]"
      />
    </a>
  );
}

function Capabilities({ project }: { project: Project }) {
  return (
    <>
      <h4 className="label text-faint">Capabilities</h4>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {project.capabilities.map((capability) => (
          <li key={capability} className="text-sm text-muted">
            {capability}
          </li>
        ))}
      </ul>
    </>
  );
}

function StatusAndLink({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-5">
      <p className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={`size-1.5 rounded-full ${
            project.isLive ? "bg-accent" : "bg-line-strong"
          }`}
        />
        <span className="label text-bone-700">{project.status}</span>
      </p>

      <a
        href={project.href ?? enquiryHref(project)}
        {...(project.href ? { target: "_blank", rel: "noreferrer" } : undefined)}
        className="group/link inline-flex items-center gap-2 text-sm text-bone transition-colors duration-200 hover:text-accent"
      >
        <span className="relative">
          {project.href ? "View project" : "Request details"}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-editorial group-hover/link:scale-x-100"
          />
        </span>
        <ArrowUpRight
          aria-hidden
          strokeWidth={1.5}
          className="size-4 transition-transform duration-300 ease-editorial group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        />
      </a>
    </div>
  );
}

function Title({ project }: { project: Project }) {
  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:flex-wrap md:items-baseline md:justify-between md:gap-x-8">
      <div className="flex items-baseline gap-4 md:gap-6">
        <span className="label text-faint">{project.index}</span>
        <h3 className="text-[clamp(2rem,4.6vw,3.5rem)] leading-none">
          {project.name}
        </h3>
      </div>
      <p className="label text-muted">{project.category}</p>
    </div>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  // Full bleed: panel edge to edge, everything else beneath it.
  if (project.layout === "full") {
    return (
      <article id={project.id} className="scroll-mt-28">
        <div className="shell">
          <Reveal className="border-t border-line pt-8 pb-10 md:pt-10 md:pb-12">
            <Title project={project} />
          </Reveal>
        </div>

        <Reveal>
          <Panel project={project} />
        </Reveal>

        <div className="shell mt-10 grid gap-x-12 gap-y-8 md:mt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-xl text-lg leading-relaxed text-bone-700">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-4 lg:col-start-7">
            <Capabilities project={project} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-12">
            <StatusAndLink project={project} />
          </Reveal>
        </div>
      </article>
    );
  }

  // Bleed: text held at the left, panel and rule running off the right edge.
  // Left padding mirrors `shell`; there is deliberately none on the right.
  if (project.layout === "bleed") {
    const gutterRight = "pr-[1.375rem] md:pr-10 lg:pr-16 2xl:pr-20";

    return (
      <article
        id={project.id}
        className="mx-auto w-full max-w-[96rem] scroll-mt-28 pl-[1.375rem] md:pl-10 lg:pl-16 2xl:pl-20"
      >
        <Reveal className="border-t border-line pt-8 md:pt-10">
          <div className={gutterRight}>
            <Title project={project} />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:mt-14 lg:grid-cols-12 lg:items-center">
          <div
            className={`flex flex-col gap-10 lg:col-span-4 lg:pr-0 ${gutterRight}`}
          >
            <Reveal>
              <p className="max-w-xl text-lg leading-relaxed text-bone-700">
                {project.description}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <Capabilities project={project} />
            </Reveal>
            <Reveal delay={0.1}>
              <StatusAndLink project={project} />
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7 lg:col-start-6">
            <Panel project={project} />
          </Reveal>
        </div>
      </article>
    );
  }

  // Standard: panel left, meta column right.
  return (
    <article id={project.id} className="shell scroll-mt-28">
      <Reveal className="border-t border-line pt-8 md:pt-10">
        <Title project={project} />
      </Reveal>

      <div className="mt-10 grid gap-x-12 gap-y-10 md:mt-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Panel project={project} />
        </Reveal>

        <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.05}>
            <p className="max-w-xl text-lg leading-relaxed text-bone-700">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Capabilities project={project} />
          </Reveal>
          <Reveal delay={0.15}>
            <StatusAndLink project={project} />
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export function ProjectShowcase() {
  return (
    <section id="work" className="scroll-mt-24 py-28 md:py-36 lg:py-44">
      <SectionHeading
        number="02"
        label="Selected work"
        headline="Products and systems built for the real world."
        className="shell"
      />

      <div className="mt-24 flex flex-col gap-28 md:mt-32 md:gap-36 lg:gap-44">
        {projects.map((project) => (
          <ProjectBlock key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
