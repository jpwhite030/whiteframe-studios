import { SmartLink } from "@/components/smart-link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-light/10 bg-dark pt-16 pb-10 text-light">
      <div className="shell">
        <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-12">
          <div>
            <p className="flex items-center gap-2.5 text-[15px] font-extrabold tracking-tight">
              <span
                aria-hidden
                className="block size-2.5 border-[1.5px] border-current"
              />
              {siteConfig.wordmark}
            </p>
            <p className="mt-4 text-sm font-medium text-light-soft">
              {siteConfig.location}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-block text-sm font-semibold text-light-soft transition-colors duration-200 hover:text-light"
            >
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-16 gap-y-10">
            <ul className="space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <SmartLink
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-light-soft transition-colors duration-200 hover:text-light"
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {siteConfig.confirmedSocials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-light-soft transition-colors duration-200 hover:text-light"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <SmartLink
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-light-soft transition-colors duration-200 hover:text-light"
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-light/10 pt-6">
          <p className="label text-light-faint">
            © {year} {siteConfig.name}
          </p>
          <p className="label text-light-faint">{siteConfig.footerLine}</p>
        </div>
      </div>
    </footer>
  );
}
