import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="max-w-md font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
              {siteConfig.footerStatement}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-block border-b border-line-strong pb-1 text-base text-bone transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {siteConfig.email}
            </a>
            <div className="mt-8 space-y-1.5">
              <p className="label text-muted">
                Founded by {siteConfig.founder}
              </p>
              <p className="label text-faint">{siteConfig.location}</p>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 lg:col-span-6 lg:col-start-7"
          >
            <div>
              <h3 className="label border-b border-line pb-3 text-faint">
                Sections
              </h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-bone-700 transition-colors duration-200 hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="label border-b border-line pb-3 text-faint">
                Elsewhere
              </h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-bone-700 transition-colors duration-200 hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 md:mt-28">
          <p className="label text-faint">
            © {year} {siteConfig.name}
          </p>
          <a
            href="#top"
            className="label group inline-flex items-center gap-2 text-muted transition-colors duration-200 hover:text-bone"
          >
            Back to top
            <ArrowUp
              aria-hidden
              strokeWidth={1.5}
              className="size-3.5 transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
