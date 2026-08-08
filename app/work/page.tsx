import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-shell";
import { ProjectTile } from "@/components/project-tile";
import { Reveal } from "@/components/reveal";
import { SmartLink } from "@/components/smart-link";
import { projects } from "@/data/projects";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Our Work — Product Case Studies | Whiteframe Studios",
    description:
      "Software products designed and built by Whiteframe Studios in Sydney — nightlife discovery, consumer tax, focus software and brand experiences.",
    path: "/work",
  }),
  title: absoluteTitle("Our Work — Product Case Studies | Whiteframe Studios"),
};

export default function WorkIndex() {
  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Work"
          title="Products we've designed and built."
          standfirst="Every project here was taken from an early idea to something running in the world. Where a case study exists, it explains the decisions rather than just showing the screens."
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]}
        />

        <Reveal className="shell max-w-2xl space-y-6 pb-14">
          <p className="text-base leading-relaxed font-medium text-ink-soft">
            Whiteframe is a product studio in Sydney. The work below spans
            consumer apps, financial software, focus tools and brand
            experiences — some shipped, some still in development, and each one
            labelled honestly as to which.
          </p>
          <p className="text-base leading-relaxed font-medium text-ink-soft">
            Most of these were taken end to end: product definition, brand,
            interface design and the engineering that put them in front of
            people. Where a case study exists it explains the decisions and the
            reasoning, not just the screens.
          </p>
        </Reveal>

        <div className="shell grid gap-x-8 gap-y-16 pb-24 md:grid-cols-2 md:pb-32">
          {projects.map((project, index) => {
            const linked = Boolean(project.caseStudy);
            const inner = (
              <>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
                    <ProjectTile
                      project={project}
                      context="card"
                      priority={index < 2}
                      sizes="(min-width: 768px) 46vw, 92vw"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-4">
                  <span className="label text-ink-faint">{project.index}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-cobalt">
                      {project.name}
                      {linked ? (
                        <ArrowUpRight
                          aria-hidden
                          strokeWidth={2}
                          className="size-4 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      ) : null}
                    </h2>
                    <p className="mt-2 text-base font-medium text-ink-soft">
                      {project.tagline}
                    </p>
                    <p className="label mt-4 text-ink-faint">
                      {project.tags.join(" · ")} — {project.status}
                    </p>
                  </div>
                </div>
              </>
            );

            return (
              <Reveal key={project.slug} delay={(index % 2) * 0.08}>
                {linked ? (
                  <SmartLink href={project.href!} className="group block">
                    {inner}
                  </SmartLink>
                ) : (
                  <div className="group">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <FinalCta />
      </main>
      <Footer />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
    </>
  );
}
