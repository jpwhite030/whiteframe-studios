import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader, PointList, Section } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { SmartLink } from "@/components/smart-link";
import { team } from "@/data/team";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Studio — About Whiteframe Studios, Sydney",
    description:
      "Whiteframe Studios is a senior product studio in Sydney founded by Jack White. You work directly with the people designing and building your product.",
    path: "/studio",
  }),
  title: absoluteTitle("Studio — About Whiteframe Studios, Sydney"),
};

export default function StudioPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Studio", path: "/studio" },
  ];

  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Studio"
          title="A senior studio, deliberately small."
          standfirst={`Whiteframe is an independent product studio in ${siteConfig.location}. It exists because the alternative — an agency where the people who sold the work are not the people who do it — produces worse software, more slowly.`}
          crumbs={crumbs}
        />

        <Section title="How we work">
          <div className="max-w-2xl space-y-6">
            <p className="text-lg leading-relaxed font-medium text-ink-soft">
              You work directly with the people designing and building your
              product. There is no account layer, no relay between the brief and
              the build, and no handover point where intent gets lost.
            </p>
            <p className="text-lg leading-relaxed font-medium text-ink-soft">
              In practice that means decisions get made in the conversation
              rather than after it, and the person answering a question about
              the interface is the person who designed it.
            </p>
          </div>
        </Section>

        <Section title="What that gives you">
          <PointList
            items={[
              "Fewer people between the problem and the person solving it",
              "Decisions made in hours rather than in the next scheduled call",
              "Design and engineering choices made together, not in sequence",
              "One team accountable from first sketch to production",
            ]}
          />
        </Section>

        <Section title="Specialist collaborators">
          <div className="max-w-2xl space-y-6">
            <p className="text-lg leading-relaxed font-medium text-ink-soft">
              Some projects need a skill it would be dishonest to claim in
              house — motion, illustration, a specific compliance domain. In
              those cases we bring in a specialist we have worked with before,
              introduce them properly, and keep the accountability with us.
            </p>
            <p className="text-lg leading-relaxed font-medium text-ink-soft">
              What does not happen is a project quietly staffed by people you
              never agreed to.
            </p>
          </div>
        </Section>

        <Section title="Who you'll work with">
          <ul className="grid gap-12 sm:grid-cols-2">
            {team.map((person) => (
              <li key={person.name}>
                {/* Portrait renders once a real photograph is supplied —
                    see CONTENT.md. Until then the entry is typographic
                    rather than showing a placeholder avatar. */}
                <h3 className="text-2xl font-extrabold tracking-tight">
                  {person.name}
                </h3>
                <p className="label mt-3 text-ink-faint">{person.role}</p>
                <div className="mt-5 space-y-4">
                  {person.bio.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed font-medium text-ink-soft"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {person.links.length > 0 ? (
                  <ul className="mt-6 flex flex-wrap gap-4">
                    {person.links.map((link) => (
                      <li key={link.href}>
                        <SmartLink
                          href={link.href}
                          className="label inline-flex min-h-11 items-center text-ink-soft underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline"
                        >
                          {link.label}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>

        <Reveal className="shell py-12 md:py-16">
          <h2 className="text-[clamp(1.5rem,2.6vw,2.25rem)]">Where we are</h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed font-medium text-ink-soft">
            {siteConfig.location}. We work with clients wherever they are, and
            most projects run remotely — but the studio is Sydney-based and
            happy to meet in person.
          </p>
        </Reveal>

        <FinalCta />
      </main>
      <Footer />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
