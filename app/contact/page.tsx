import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Contact — Start a Project | Whiteframe Studios",
    description:
      "Tell Whiteframe Studios what you're building. A senior Sydney product studio — you'll hear directly from Jack within two business days.",
    path: "/contact",
  }),
  title: absoluteTitle("Contact — Start a Project | Whiteframe Studios"),
};

export default function ContactPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Contact"
          title="Tell us about your product."
          standfirst={siteConfig.cta.supporting}
          crumbs={crumbs}
        />

        <div className="shell grid gap-16 pb-24 md:pb-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="sr-only">Project enquiry form</h2>
            <EnquiryForm />
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9">
            <h2 className="label text-ink-faint">Or email directly</h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 block text-lg font-bold underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>

            <h2 className="label mt-12 text-ink-faint">Where we are</h2>
            <p className="mt-4 text-base font-medium text-ink-soft">
              {siteConfig.location}
            </p>

            <h2 className="label mt-12 text-ink-faint">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {[
                "We read it properly and reply within two business days.",
                "A short call to understand the problem before we quote anything.",
                "A written proposal with scope, price and timeline.",
              ].map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="label shrink-0 text-cobalt">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-relaxed font-medium text-ink-soft">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </main>
      <Footer />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
