import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { ProjectTile } from "@/components/project-tile";
import { CaseStudyGallery } from "@/components/case-study-gallery";
import { Reveal } from "@/components/reveal";
import { RevealImage } from "@/components/reveal-image";
import { SmartLink } from "@/components/smart-link";
import {
  PageHeader,
  PointList,
  Section,
  StepList,
} from "@/components/page-shell";
import { caseStudyProjects, projectBySlug } from "@/data/projects";
import { serviceBySlug } from "@/data/services";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

/** Only projects with a written case study get a route. */
export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project?.caseStudy) return {};

  const { caseStudy } = project;
  return {
    ...buildMetadata({
      title: caseStudy.metaTitle,
      description: caseStudy.metaDescription,
      path: `/work/${project.slug}`,
    }),
    title: absoluteTitle(caseStudy.metaTitle),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project?.caseStudy) notFound();

  const study = project.caseStudy;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.name, path: `/work/${project.slug}` },
  ];

  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow={`${project.index} — ${study.industry}`}
          title={study.title}
          standfirst={study.summary}
          crumbs={crumbs}
        />

        <RevealImage className="shell">
          {/* Squarer than a 16:9 banner, because the subject is a phone: a
              wide box either crops the device or shrinks it to a sliver. */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[3/2]">
            <ProjectTile
              project={project}
              priority
              fit="contain"
              sizes="(min-width: 1024px) 76vw, 92vw"
            />
          </div>
        </RevealImage>

        {/* At-a-glance facts, so status and scope are readable without
            reading the whole page. */}
        <Reveal className="shell mt-12 grid gap-8 border-y border-ink/10 py-10 sm:grid-cols-3">
          <div>
            <h2 className="label text-ink-faint">Industry</h2>
            <p className="mt-3 text-base font-bold">{study.industry}</p>
          </div>
          <div>
            <h2 className="label text-ink-faint">Status</h2>
            <p className="mt-3 text-base font-bold">{project.status}</p>
          </div>
          <div>
            <h2 className="label text-ink-faint">Disciplines</h2>
            <p className="mt-3 text-base font-bold">{project.tags.join(" · ")}</p>
          </div>
        </Reveal>

        <Section title="The problem">
          <PointList items={study.problem} />
        </Section>

        <Section title="What the work had to achieve">
          <PointList items={study.objective} />
        </Section>

        <Section title="Our responsibilities">
          <PointList items={study.responsibilities} />
        </Section>

        <Section title="Decisions that shaped it">
          <StepList steps={study.decisions} />
        </Section>

        <Section title="Brand and interface">
          <PointList items={study.design} />
        </Section>

        {study.gallery && study.gallery.length > 0 ? (
          <Section title="Screens">
            <CaseStudyGallery
              items={study.gallery}
              tone={project.deviceTone}
            />
          </Section>
        ) : null}

        <Section title="Engineering approach">
          <PointList items={study.engineering} />
        </Section>

        <Section title="What we delivered">
          <PointList items={study.deliverables} />
        </Section>

        {/* Results and testimonial render only when the client has supplied
            them. Nothing is inferred, estimated or written on their behalf. */}
        {study.results && study.results.length > 0 ? (
          <Section title="Results">
            <dl className="grid gap-10 sm:grid-cols-3">
              {study.results.map((result) => (
                <div key={result.label}>
                  <dt className="label text-ink-faint">{result.label}</dt>
                  <dd className="mt-3 text-[clamp(1.75rem,3vw,2.75rem)] font-extrabold tracking-tight">
                    {result.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        ) : null}

        {study.testimonial ? (
          <Section title="What the client said">
            <figure className="max-w-2xl">
              <blockquote className="text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug font-extrabold tracking-tight text-balance">
                “{study.testimonial.quote}”
              </blockquote>
              <figcaption className="label mt-6 text-ink-faint">
                {study.testimonial.attribution}
                {study.testimonial.role ? ` — ${study.testimonial.role}` : ""}
              </figcaption>
            </figure>
          </Section>
        ) : null}

        <Section title="Services this drew on">
          <ul className="flex flex-wrap gap-4">
            {study.relatedServices.map((serviceSlug) => {
              const service = serviceBySlug(serviceSlug);
              if (!service) return null;
              return (
                <li key={service.slug}>
                  <SmartLink
                    href={`/services/${service.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-bold transition-colors duration-300 hover:border-ink focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
                  >
                    {service.name}
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={2}
                      className="size-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section title="More work">
          <ul className="flex flex-wrap gap-4">
            {caseStudyProjects
              .filter((other) => other.slug !== project.slug)
              .map((other) => (
                <li key={other.slug}>
                  <SmartLink
                    href={`/work/${other.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-bold transition-colors duration-300 hover:border-ink focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
                  >
                    {other.name}
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={2}
                      className="size-3.5 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </SmartLink>
                </li>
              ))}
          </ul>
        </Section>

        <FinalCta />
      </main>
      <Footer />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
