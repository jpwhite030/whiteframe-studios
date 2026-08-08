import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FinalCta } from "@/components/final-cta";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { ProjectTile } from "@/components/project-tile";
import { Reveal } from "@/components/reveal";
import { SmartLink } from "@/components/smart-link";
import {
  PageHeader,
  PointList,
  Section,
  StepList,
} from "@/components/page-shell";
import { projectBySlug } from "@/data/projects";
import { services, serviceBySlug } from "@/data/services";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/structured-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  return {
    ...buildMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/services/${service.slug}`,
    }),
    title: absoluteTitle(service.metaTitle),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  const related = service.relatedProjects
    .map((projectSlug) => projectBySlug(projectSlug))
    .filter((project) => project?.caseStudy);

  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow={`${service.index} — Services`}
          title={service.headline}
          crumbs={crumbs}
        />

        <Reveal className="shell max-w-2xl space-y-6 pb-8">
          {service.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg leading-relaxed font-medium text-ink-soft"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Section title="Who this is for">
          <PointList items={service.audience} />
        </Section>

        <Section title="Problems this solves">
          <PointList items={service.problems} />
        </Section>

        <Section title="What you get">
          <PointList items={service.deliverables} />
        </Section>

        <Section title="How the work runs">
          <StepList steps={service.process} />
        </Section>

        {related.length > 0 ? (
          <Section title="Related work">
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
              {related.map((project) => (
                <li key={project!.slug}>
                  <SmartLink
                    href={`/work/${project!.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
                        <ProjectTile
                          project={project!}
                          context="card"
                          sizes="(min-width: 640px) 30vw, 92vw"
                        />
                      </div>
                    </div>
                    <h3 className="mt-5 flex items-center gap-2 text-xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-cobalt">
                      {project!.name}
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={2}
                        className="size-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </h3>
                    <p className="mt-2 text-sm font-medium text-ink-soft">
                      {project!.tagline}
                    </p>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section title="Questions we're usually asked">
          <FaqList faqs={service.faqs} headingLevel={3} />
        </Section>

        <FinalCta />
      </main>
      <Footer />
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path: `/services/${service.slug}`,
          }),
          faqSchema(service.faqs),
        ]}
      />
    </>
  );
}
