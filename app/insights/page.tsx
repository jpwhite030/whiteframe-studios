import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { SmartLink } from "@/components/smart-link";
import { insights } from "@/data/insights";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Insights — Notes on Building Products | Whiteframe Studios",
    description:
      "Notes from a Sydney product studio on scoping, designing and shipping software.",
    path: "/insights",
  }),
  title: absoluteTitle(
    "Insights — Notes on Building Products | Whiteframe Studios",
  ),
};

export default function InsightsIndex() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
  ];

  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow="Insights"
          title="Notes on building products."
          standfirst="Occasional writing on scoping, designing and shipping software — published when there's something worth saying rather than to a content calendar."
          crumbs={crumbs}
        />

        <div className="shell pb-24 md:pb-32">
          {insights.length === 0 ? (
            // An honest empty state. Better than publishing filler to make a
            // section look populated.
            <Reveal>
              <p className="max-w-xl text-lg leading-relaxed font-medium text-ink-soft">
                Nothing published yet. The first pieces are being written — in
                the meantime, the{" "}
                <SmartLink
                  href="/work"
                  className="text-ink underline underline-offset-4"
                >
                  case studies
                </SmartLink>{" "}
                explain how we think about this work in more detail than a
                short post would.
              </p>
            </Reveal>
          ) : (
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {insights.map((post) => (
                <li key={post.slug}>
                  <SmartLink
                    href={`/insights/${post.slug}`}
                    className="group grid gap-4 py-10 md:grid-cols-12"
                  >
                    <time
                      dateTime={post.published}
                      className="label text-ink-faint md:col-span-2"
                    >
                      {post.published}
                    </time>
                    <div className="md:col-span-10">
                      <h2 className="text-2xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-cobalt">
                        {post.title}
                      </h2>
                      <p className="mt-2 max-w-xl text-base font-medium text-ink-soft">
                        {post.summary}
                      </p>
                    </div>
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FinalCta />
      </main>
      <Footer />
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
