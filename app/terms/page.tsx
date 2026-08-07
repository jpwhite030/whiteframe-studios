import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms",
  description: `The terms on which ${siteConfig.name} provides this website.`,
};

export default function TermsPage() {
  return (
    <main className="shell flex min-h-svh flex-col justify-center py-28">
      <p className="label text-ink-faint">Legal</p>
      <h1 className="mt-6 text-[clamp(2.25rem,5vw,4rem)]">Terms</h1>

      <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed font-medium text-ink-soft">
        <p>
          This website is provided by {siteConfig.name} for general
          information about the studio and its work. Its content may change
          without notice and is provided without warranties of any kind.
        </p>
        <p>
          Project names, product imagery and brand assets shown here belong to
          their respective owners and appear as examples of studio work.
          Engagement terms for client projects are agreed in writing per
          project.
        </p>
        <p>
          Questions about these terms can be sent to{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-cobalt"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>

      <Link
        href="/"
        className="label mt-14 inline-block text-ink-faint transition-colors hover:text-ink"
      >
        ← Back to the studio
      </Link>
    </main>
  );
}
