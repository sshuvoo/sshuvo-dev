import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudyContent } from "@/lib/case-studies";
import { caseStudies, site, type CaseStudySlug } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyContent[slug as CaseStudySlug];
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.tagline,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/work/${cs.slug}`,
      title: `${cs.title} — ${site.name}`,
      description: cs.tagline,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudyContent[slug as CaseStudySlug];
  if (!cs) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.tagline,
    url: `${site.url}/work/${cs.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  const others = caseStudies.filter((c) => c.slug !== cs.slug);

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-32 pb-24 sm:px-6">
        <Reveal>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 font-secondary text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> all work
          </Link>
          <article className="mt-8">
            <header>
              <p className="font-secondary text-sm text-muted-foreground">{cs.role}</p>
              <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {cs.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{cs.tagline}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
                {cs.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 font-secondary text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              {cs.liveUrl && (
                <p className="mt-6">
                  <a
                    href={cs.liveUrl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-secondary text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    {cs.liveUrl.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </p>
              )}
            </header>

            {cs.chapters.map((chapter, i) => (
              <section key={chapter.heading} className="mt-14">
                <h2 className="flex items-baseline gap-3 font-heading text-2xl font-semibold tracking-tight">
                  <span aria-hidden className="font-secondary text-sm font-normal text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {chapter.heading}
                </h2>
                {chapter.body.map((para) => (
                  <p key={para.slice(0, 32)} className="mt-5 leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
              </section>
            ))}

            <footer className="mt-16 rounded-xl border border-border p-6 sm:p-8">
              <p className="font-secondary text-xs tracking-wide text-muted-foreground uppercase">
                Takeaway
              </p>
              <p className="mt-3 font-heading text-xl font-medium text-balance">
                {cs.takeaway}
              </p>
            </footer>
          </article>

          <nav aria-label="More case studies" className="mt-16 border-t border-border pt-8">
            <p className="font-secondary text-xs tracking-wide text-muted-foreground uppercase">
              Keep reading
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/work/${other.slug}`}
                  className="group rounded-xl border border-border p-5 transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <p className="font-heading font-semibold group-hover:underline group-hover:underline-offset-4">
                    {other.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{other.tagline}</p>
                </Link>
              ))}
            </div>
          </nav>
        </Reveal>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </main>
    </>
  );
}
