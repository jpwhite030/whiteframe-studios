import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

/**
 * The furniture every inner page shares: breadcrumbs, an eyebrow, one H1 and
 * a standfirst. Keeping it here means heading order and landmark structure
 * are decided once rather than per page.
 */

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ crumbs }: { crumbs: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="shell">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                // The current page is not a link, and says so to assistive tech.
                <span aria-current="page" className="label text-ink-faint">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    className="label text-ink-soft underline-offset-4 transition-colors duration-200 hover:text-ink hover:underline"
                  >
                    {crumb.name}
                  </Link>
                  <ChevronRight
                    aria-hidden
                    strokeWidth={2}
                    className="size-3 text-ink-faint"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  standfirst,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  crumbs?: readonly Crumb[];
}) {
  return (
    <header className="pt-32 pb-14 md:pt-40 md:pb-20">
      {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}
      <Reveal className="shell mt-8">
        <p className="label text-ink-faint">{eyebrow}</p>
        {/* The one H1 on the page. */}
        <h1 className="mt-6 max-w-4xl text-[clamp(2rem,4.6vw,3.75rem)]">
          {title}
        </h1>
        {standfirst ? (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed font-medium text-ink-soft">
            {standfirst}
          </p>
        ) : null}
      </Reveal>
    </header>
  );
}

/** A titled block with a consistent heading level, so order never breaks. */
export function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`shell py-12 md:py-16 ${className}`}>
      <Reveal>
        <h2 className="text-[clamp(1.5rem,2.6vw,2.25rem)]">{title}</h2>
        <div className="mt-8">{children}</div>
      </Reveal>
    </section>
  );
}

/** A plain list of points, styled as prose rather than as cards. */
export function PointList({ items }: { items: readonly string[] }) {
  return (
    <ul className="max-w-2xl space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span
            aria-hidden
            className="mt-2.5 block size-1.5 shrink-0 bg-cobalt"
          />
          <span className="text-base leading-relaxed font-medium text-ink-soft">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps, used by both service process and case-study decisions. */
export function StepList({
  steps,
}: {
  steps: readonly { title: string; detail: string }[];
}) {
  return (
    <ol className="grid gap-10 sm:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step.title}>
          <p className="label text-cobalt">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-xl font-extrabold tracking-tight">
            {step.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed font-medium text-ink-soft">
            {step.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}
