import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FinalCta } from "@/components/final-cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { insights } from "@/data/insights";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, absoluteTitle } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((entry) => entry.slug === slug);
  if (!post) return {};

  const title = `${post.title} | Whiteframe Studios`;
  return {
    ...buildMetadata({
      title,
      description: post.summary,
      path: `/insights/${post.slug}`,
    }),
    title: absoluteTitle(title),
  };
}

/** Article schema, so a post can surface as one rather than a loose page. */
function articleSchema(post: (typeof insights)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.published,
    dateModified: post.published,
    inLanguage: "en-AU",
    author: { "@type": "Person", name: siteConfig.founder },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: new URL(
      `/insights/${post.slug}`,
      siteConfig.url,
    ).toString(),
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((entry) => entry.slug === slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: post.title, path: `/insights/${post.slug}` },
  ];

  const published = new Date(post.published).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Navigation />
      <main id="main" className="flex-1">
        <PageHeader
          eyebrow={`${published} — ${post.readingMinutes} min read`}
          title={post.title}
          standfirst={post.summary}
          crumbs={crumbs}
        />

        {/* One measure, so long-form actually reads as long-form. */}
        <article className="shell pb-24 md:pb-32">
          <Reveal className="max-w-2xl">
            {post.body.map((block, index) => {
              if (block.kind === "h2") {
                return (
                  <h2
                    key={index}
                    className="mt-14 text-[clamp(1.35rem,2.2vw,1.85rem)] first:mt-0"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.kind === "quote") {
                return (
                  <blockquote
                    key={index}
                    className="my-12 border-l-2 border-cobalt pl-6 text-[clamp(1.15rem,2vw,1.5rem)] leading-snug font-extrabold tracking-tight text-balance"
                  >
                    {block.text}
                  </blockquote>
                );
              }
              return (
                <p
                  key={index}
                  className="mt-6 text-lg leading-relaxed font-medium text-ink-soft first:mt-0"
                >
                  {block.text}
                </p>
              );
            })}
          </Reveal>

          <Reveal className="mt-16 max-w-2xl border-t border-ink/10 pt-8">
            <p className="label text-ink-faint">
              Written by {siteConfig.founder} — {siteConfig.location}
            </p>
          </Reveal>
        </article>

        <FinalCta />
      </main>
      <Footer />
      <JsonLd data={[breadcrumbSchema(crumbs), articleSchema(post)]} />
    </>
  );
}
