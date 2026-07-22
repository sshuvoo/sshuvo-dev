import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, site, type CaseStudySlug } from "@/lib/site";
import { getEntry, getSlugs } from "@/lib/mdx";
import { Reveal } from "@/components/motion/reveal";
import { BackButton } from "@/components/ui/back-button";

const DIR = "case-studies";
const importer = (slug: string) => import(`@/content/case-studies/${slug}.mdx`);

export interface CaseStudyMeta {
  title: string;
  tagline: string;
  role: string;
  stack: string[];
  cover: string;
  liveUrl?: { href: string; label: string };
  takeaway: string;
}

export function generateStaticParams() {
  return getSlugs(DIR).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getEntry<CaseStudyMeta>(importer, slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Software Engineering Case Study`,
    description: `${cs.tagline} — A detailed case study by Saffaullah Shuvo, a full-stack software engineer specializing in React, Next.js, and TypeScript.`,
    keywords: [
      cs.title,
      ...cs.stack,
      "Software Engineering Case Study",
      "Web Development Project",
      "React Project",
      "Next.js Project",
      "TypeScript Project",
      "Full-Stack Project",
    ],
    alternates: { canonical: `/case-study/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/case-study/${slug}`,
      title: `${cs.title} — ${site.name}`,
      description: cs.tagline,
      images: [{ url: cs.cover, alt: cs.title }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getEntry<CaseStudyMeta>(importer, slug);
  if (!cs) notFound();

  const { default: Content } = await import(`@/content/case-studies/${slug}.mdx`);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.tagline,
    url: `${site.url}/case-study/${slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  const others = caseStudies.filter((c) => c.slug !== (slug as CaseStudySlug));

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-32 pb-24 sm:px-6">
        <Reveal>
          <BackButton label="all work" />
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

            <div className="mt-10 overflow-hidden rounded-xl border border-border">
              <Image
                src={cs.cover}
                alt={`${cs.title} cover`}
                width={2932}
                height={1666}
                priority
                sizes="(max-width: 768px) 100vw, 48rem"
                className="h-auto w-full"
              />
            </div>

            <div className="mt-14">
              <Content />
            </div>

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
                  href={`/case-study/${other.slug}`}
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
