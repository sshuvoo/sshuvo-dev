import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ExternalLink as ExternalLinkIcon } from 'lucide-react'
import { FlowField } from '@/components/canvas/flow-field'
import { MiniSlate } from '@/components/canvas/mini-slate'
import { QueueViz } from '@/components/canvas/queue-viz'
import { Reveal } from '@/components/motion/reveal'
import { site } from '@/lib/site'
import { CareerTimeline } from '@/components/site/career-timeline'

// Reusable External Link
function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group text-foreground decoration-border hover:decoration-foreground focus-visible:ring-ring/50 inline-flex items-center gap-1 font-medium underline underline-offset-4 transition-colors focus-visible:ring-3 focus-visible:outline-none ${className}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  )
}

// Case Study Link
function CaseStudyLink({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group text-foreground focus-visible:ring-ring/50 inline-flex items-center gap-1.5 text-sm font-medium focus-visible:ring-3 focus-visible:outline-none"
    >
      <span className="decoration-border group-hover:decoration-foreground underline underline-offset-4 transition-colors">
        {children}
      </span>
      <ArrowRight
        aria-hidden
        className="text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  )
}

// Section Heading indexer
function SectionHeading({
  index,
  id,
  children,
}: {
  index: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <h2 id={id} className="flex items-baseline gap-3 text-2xl sm:text-3xl">
      <span
        aria-hidden
        className="font-secondary text-muted-foreground text-sm font-normal"
      >
        {index}
      </span>
      <span className="font-heading text-foreground font-semibold tracking-tight">
        {children}
      </span>
    </h2>
  )
}

export default function Page() {
  return (
    <>
      <main
        id="main"
        className="text-foreground flex-1 scroll-smooth pb-16"
      >
        {/* Intro */}
        <section
          id="top"
          className="mx-auto max-w-5xl px-4 py-24 sm:px-6 md:py-32"
        >
          <div className="max-w-3xl">
            <span className="hero-badge font-secondary text-muted-foreground text-xs font-bold tracking-widest uppercase">
              <span aria-hidden className="hero-badge-dot" />
              Saffaullah Shuvo
            </span>
            <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              AI First Software Engineer
            </h1>
            <p className="text-muted-foreground mt-3 text-lg sm:text-xl">
              {site.tagline}
            </p>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              Applied Mathematics background. Core engineer on Sitepins CMS.
              Full-stack specialist across React, Next.js, TypeScript,
              Node.js, and Go, with MongoDB and PostgreSQL — building AI-first
              products with AI-driven development workflows, graphics
              programming, and pointer event loop systems.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href="#work"
                className="bg-primary text-primary-foreground focus-visible:ring-ring/50 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:outline-none"
              >
                View projects
              </a>
              <ExternalLink href={site.github}>GitHub</ExternalLink>
              <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="work"
          className="border-border mx-auto max-w-5xl scroll-mt-14 border-t px-4 py-20 sm:px-6"
        >
          <Reveal>
            <SectionHeading index="01">
              Work that runs, not screenshots
            </SectionHeading>
            <p className="text-muted-foreground mt-4 max-w-prose text-sm leading-relaxed">
              Three projects: a production CMS platform, a Pointer event vector
              drawing engine, and a performant typescript library published on
              npm.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8">
            <Reveal>
              <article className="border-border bg-card rounded-xl border p-6">
                <div className="border-border/50 flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
                  <h3 className="font-heading text-xl font-bold">
                    Sitepins CMS
                  </h3>
                  <p className="font-secondary text-2xs text-muted-foreground font-bold tracking-widest uppercase">
                    Themefisher · Core engineer · 2025—present
                  </p>
                </div>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  Authentication modules, REST APIs, and core component
                  architectures. Enforced permissions boundaries, component
                  optimizations (lazy loading, image budgets), and SEO
                  pipelines.
                </p>
                <div className="mt-4">
                  <CaseStudyLink slug="sitepins">
                    Read the case study
                  </CaseStudyLink>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              <Reveal>
                <article className="border-border bg-card flex h-full flex-col justify-between rounded-xl border p-6">
                  <div>
                    <div className="border-border/50 mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
                      <h3 className="font-heading text-lg font-bold">
                        Slate Drawing Board
                      </h3>
                      <p className="font-secondary text-2xs text-muted-foreground">
                        React · Canvas
                      </p>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      High-precision canvas engine with responsive Pointer
                      tracking.
                    </p>
                  </div>
                  <div>
                    <div className="border-border bg-muted/10 mb-4 rounded-lg border border-dashed p-2">
                      <MiniSlate />
                    </div>
                    <div className="flex gap-4 text-xs font-semibold">
                      <CaseStudyLink slug="slate">Case study</CaseStudyLink>
                      <ExternalLink href={site.slateUrl}>
                        Launch Slate
                      </ExternalLink>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal>
                <article className="border-border bg-card flex h-full flex-col justify-between rounded-xl border p-6">
                  <div>
                    <div className="border-border/50 mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
                      <h3 className="font-heading text-lg font-bold">
                        stl-kit
                      </h3>
                      <p className="font-secondary text-2xs text-muted-foreground">
                        npm · TS
                      </p>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      STL-style typed data collections (priority queues, heaps)
                      for TypeScript.
                    </p>
                  </div>
                  <div>
                    <div className="border-border bg-muted/10 mb-4 rounded-lg border border-dashed p-2">
                      <QueueViz />
                    </div>
                    <div className="flex gap-4 text-xs font-semibold">
                      <CaseStudyLink slug="stl-kit">Case study</CaseStudyLink>
                      <ExternalLink href={site.stlKitUrl}>npm</ExternalLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Labs */}
        <section
          id="lab"
          className="border-border mx-auto max-w-5xl scroll-mt-14 border-t px-4 py-20 sm:px-6"
        >
          <Reveal>
            <SectionHeading index="02">
              The Mathematics Laboratory
            </SectionHeading>
            <p className="text-muted-foreground mt-4 max-w-prose text-sm">
              Mathematical visualization scripts drawn progressively in frame
              loops. Touch/drag elements to alter vectors.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8">
            <Reveal>
              <article className="border-border bg-card rounded-xl border p-6">
                <h3 className="font-heading text-lg font-bold">
                  Ink vector flow field
                </h3>
                <p className="text-muted-foreground mt-1 mb-4 text-xs">
                  Sine-noise mathematical advection vectors. Move mouse through
                  canvas.
                </p>
                <div className="border-border overflow-hidden rounded-lg border bg-zinc-950">
                  <FlowField className="h-64 w-full text-emerald-400" />
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* Timeline Graph */}
        <section
          id="experience"
          className="border-border mx-auto max-w-5xl scroll-mt-14 border-t px-4 py-20 sm:px-6"
        >
          <Reveal>
            <SectionHeading index="03">
              Career milestones topology
            </SectionHeading>
            <p className="text-muted-foreground mt-4 mb-10 max-w-prose text-sm">
              Interactive node network graph illustrating professional paths.
            </p>
          </Reveal>
          <CareerTimeline />
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-border mx-auto max-w-5xl scroll-mt-14 border-t px-4 py-20 sm:px-6"
        >
          <Reveal>
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              The Inbox is Open
            </h2>
            <p className="text-muted-foreground mt-4 max-w-prose text-sm leading-relaxed">
              If you have a challenging project, need help with system architecture,
              or want to collaborate on AI-first products — let&apos;s talk.
            </p>
            <p className="text-foreground mt-6 font-mono text-lg font-bold">
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </p>
            <div className="border-border font-secondary text-2xs text-muted-foreground mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 font-bold tracking-widest uppercase">
              <span>
                {site.name} · {site.location}
              </span>
              <div className="flex gap-4">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <ExternalLinkIcon className="size-3.5" />
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <ExternalLinkIcon className="size-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  )
}
