import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, absoluteTitle } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Privacy Policy | Whiteframe Studios",
    description:
      "How Whiteframe Studios collects, uses and protects the information you share through this site and during a project.",
    path: "/privacy",
  }),
  title: absoluteTitle("Privacy Policy | Whiteframe Studios"),
};

export default function PrivacyPage() {
  return (
    <main className="shell flex min-h-svh flex-col justify-center py-28">
      <p className="label text-ink-faint">Legal</p>
      <h1 className="mt-6 text-[clamp(2.25rem,5vw,4rem)]">Privacy</h1>

      <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed font-medium text-ink-soft">
        <p>
          {siteConfig.name} collects only the information you choose to send us
          — typically your name, email address and a description of your
          project when you get in touch. We use it to reply to you and for
          nothing else.
        </p>
        <p>
          We do not sell personal information, run advertising trackers or
          share your details with third parties, except where required to
          deliver a service you have asked for or by law.
        </p>
        <p>
          To ask what we hold about you, or to have it corrected or deleted,
          email{" "}
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
