import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SmartLink } from "@/components/smart-link";
import { services } from "@/data/services";
import { caseStudyProjects } from "@/data/projects";

/**
 * A 404 that helps rather than apologises. Next serves this with a genuine
 * 404 status, and it's marked noindex so soft-404s never enter the index.
 */
export const metadata: Metadata = {
  title: "Page not found | Whiteframe Studios",
  description: "That page doesn't exist. Here's where else you could go.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main" className="flex flex-1 items-center">
        <div className="shell py-32 md:py-40">
          <p className="label text-ink-faint">Error 404</p>
          <h1 className="mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.75rem)]">
            That page doesn&rsquo;t exist.
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed font-medium text-ink-soft">
            It may have moved, or the link may have been mistyped. These are
            probably what you were after.
          </p>

          <div className="mt-14 grid gap-12 sm:grid-cols-2">
            <div>
              <h2 className="label text-ink-faint">Case studies</h2>
              <ul className="mt-5 space-y-3">
                {caseStudyProjects.map((project) => (
                  <li key={project.slug}>
                    <SmartLink
                      href={`/work/${project.slug}`}
                      className="inline-flex min-h-11 items-center text-base font-bold underline-offset-4 hover:text-cobalt hover:underline"
                    >
                      {project.name}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="label text-ink-faint">Services</h2>
              <ul className="mt-5 space-y-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <SmartLink
                      href={`/services/${service.slug}`}
                      className="inline-flex min-h-11 items-center text-base font-bold underline-offset-4 hover:text-cobalt hover:underline"
                    >
                      {service.name}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <SmartLink
            href="/"
            className="mt-14 inline-flex min-h-12 items-center rounded-full bg-ink px-7 py-4 text-sm font-bold text-light transition-colors duration-300 hover:bg-cobalt focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
          >
            Back to the homepage
          </SmartLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
