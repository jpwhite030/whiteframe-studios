import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { SmartLink } from "@/components/smart-link";
import { services } from "@/data/services";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Services — Product Studio Sydney | Whiteframe Studios",
    description:
      "Product strategy, UX/UI design, web and mobile development, and AI automation from a senior Sydney product studio.",
    path: "/services",
  }),
  title: absoluteTitle("Services — Product Studio Sydney | Whiteframe Studios"),
};

export default function ServicesIndex() {
  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Services"
          title="Strategy, design and engineering under one roof."
          standfirst="Four disciplines that usually run as one engagement. Most projects start with strategy and end in production — but each of these stands on its own if that's what you need."
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]}
        />

        <Reveal className="shell max-w-2xl space-y-6 pb-14">
          <p className="text-base leading-relaxed font-medium text-ink-soft">
            Whiteframe works with founders and teams in Sydney and further
            afield, taking products from an early idea through to something
            running in production. Strategy, design and engineering sit in one
            team, which removes the handovers where intent usually gets lost.
          </p>
          <p className="text-base leading-relaxed font-medium text-ink-soft">
            A typical engagement starts by deciding what to build, moves into
            design and build, and ends with a launched product you own
            outright — code, infrastructure and accounts. Each discipline below
            is also available on its own.
          </p>
        </Reveal>

        <ul className="shell divide-y divide-ink/10 border-y border-ink/10 pb-24 md:pb-32">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Reveal delay={index * 0.05}>
                <SmartLink
                  href={`/services/${service.slug}`}
                  className="group grid gap-6 py-12 md:grid-cols-12 md:items-start md:py-16"
                >
                  <span className="label text-ink-faint md:col-span-1">
                    {service.index}
                  </span>
                  <div className="md:col-span-5">
                    <h2 className="flex items-center gap-2 text-[clamp(1.5rem,2.6vw,2.25rem)] transition-colors duration-300 group-hover:text-cobalt">
                      {service.name}
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={2}
                        className="size-5 shrink-0 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </h2>
                  </div>
                  <div className="md:col-span-6">
                    <p className="max-w-md text-base leading-relaxed font-medium text-ink-soft">
                      {service.summary}
                    </p>
                    <p className="label mt-5 text-ink-faint">
                      {service.deliverables.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </SmartLink>
              </Reveal>
            </li>
          ))}
        </ul>

        <FinalCta />
      </main>
      <Footer />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
