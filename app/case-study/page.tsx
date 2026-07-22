import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { caseStudies, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies — Software Engineering Projects | React, Next.js, TypeScript",
  description:
    "A collection of software engineering case studies by Saffaullah Shuvo — covering full-stack web development, canvas engines, and open-source TypeScript libraries.",
  alternates: { canonical: "/case-study" },
  openGraph: {
    type: "website",
    url: `${site.url}/case-study`,
    title: `Case Studies — ${site.name}`,
    description:
      "A collection of software engineering case studies covering full-stack web development, canvas engines, and open-source TypeScript libraries.",
  },
};

export default function CaseStudiesPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-32 pb-24 sm:px-6">
      <Reveal>
        <header>
          <p className="font-secondary text-xs font-bold tracking-widest text-muted-foreground uppercase">
            Work
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Case Studies
          </h1>
          <p className="mt-4 max-w-prose text-lg text-muted-foreground">
            A production CMS platform, a canvas drawing engine, and a typed
            TypeScript library — each built from first principles.
          </p>
        </header>

        <div className="mt-14 grid gap-6">
          {caseStudies.map((cs) => (
            <article key={cs.slug}>
              <Link
                href={`/case-study/${cs.slug}`}
                className="group block rounded-xl border border-border p-6 transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:p-7"
              >
                <p className="font-secondary text-xs text-muted-foreground">{cs.role}</p>
                <h2 className="mt-2 font-heading text-xl font-semibold tracking-tight group-hover:underline group-hover:decoration-border group-hover:underline-offset-4 sm:text-2xl">
                  {cs.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cs.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Read case study
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </Reveal>
    </main>
  );
}
