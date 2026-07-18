"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Command } from "lucide-react";
import { FlowField } from "@/components/canvas/flow-field";
import { FourierMachine } from "@/components/canvas/fourier-machine";
import { Harmonograph } from "@/components/canvas/harmonograph";
import { LissajousLab } from "@/components/canvas/lissajous-lab";
import { MiniSlate } from "@/components/canvas/mini-slate";
import { QueueViz } from "@/components/canvas/queue-viz";
import { Reveal } from "@/components/motion/reveal";
import { CommandPalette } from "@/components/site/command-palette";
import { SiteHeader } from "@/components/site/header";
import { site } from "@/lib/site";
import { WorkspaceProvider, useWorkspace } from "@/lib/workspace-context";
import { WorkspaceGrid } from "@/components/canvas/workspace-grid";
import { HUD } from "@/components/site/hud";
import { CareerTimeline } from "@/components/site/career-timeline";

// Reusable External Link
function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${className}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

// Case Study Link
function CaseStudyLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <span className="underline decoration-border underline-offset-4 transition-colors group-hover:decoration-foreground">
        {children}
      </span>
      <ArrowRight
        aria-hidden
        className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

// Section Heading indexer
function SectionHeading({
  index,
  id,
  children,
}: {
  index: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 id={id} className="flex items-baseline gap-3 text-2xl sm:text-3xl">
      <span aria-hidden className="font-secondary text-sm font-normal text-muted-foreground">
        {index}
      </span>
      <span className="font-heading font-semibold tracking-tight text-foreground">{children}</span>
    </h2>
  );
}

export default function Page() {
  return (
    <WorkspaceProvider>
      <MainLayout />
    </WorkspaceProvider>
  );
}

function MainLayout() {
  const { viewMode } = useWorkspace();

  return (
    <>
      <CommandPalette />
      {viewMode === "workspace" ? <WorkspaceDraftboard /> : <WorkspaceReader />}
    </>
  );
}

/* ============================================================================
   1. WORKSPACE DRAFTBOARD VIEW (Infinite Draggable Coordinate Grid)
   ============================================================================ */
function WorkspaceDraftboard() {
  const { panTo } = useWorkspace();

  // Shift viewport focal coordinate automatically when keyboard focus jumps inside a card
  const handleFocusCapture = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    const card = target.closest("[data-card-id]");
    if (card) {
      const cardId = card.getAttribute("data-card-id");
      if (cardId === "origin") panTo(0, 0, 1);
      else if (cardId === "work") panTo(1400, 0, 0.95);
      else if (cardId === "lab") panTo(0, 1000, 0.95);
      else if (cardId === "experience") panTo(-1400, 0, 0.95);
      else if (cardId === "contact") panTo(0, -1000, 1);
    }
  };

  return (
    <div onFocusCapture={handleFocusCapture}>
      <HUD />
      <WorkspaceGrid>
        {/* ————— ORIGIN CARD: HERO & INTRODUCTION (0, 0) ————— */}
        <article
          data-card-id="origin"
          className="absolute rounded-2xl border border-border bg-card/90 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 w-[960px]"
          style={{
            transform: "translate3d(-480px, -240px, 0)",
          }}
        >
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-secondary text-xs text-muted-foreground tracking-wider font-semibold">
                ORIGIN // COORDINATE [0.0, 0.0]
              </p>
              <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Saffaullah Shuvo
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Frontend engineer who thinks in systems and draws in code.
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Applied Mathematics background. Specialized in high-performance web products, pointer event architectures, and canvas rendering. 
                <br />
                <strong className="font-bold text-foreground">Tip:</strong> This portfolio is an infinite draftboard. Use your mouse to drag the grid, scroll to zoom, click side coordinates, or select the Pencil tool to scribble.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <button
                  type="button"
                  onClick={() => panTo(1400, 0, 0.95)}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none cursor-pointer"
                >
                  Explore projects (x:1400)
                </button>
                <ExternalLink href={site.github}>GitHub</ExternalLink>
                <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
              </div>
              <p className="mt-8 hidden items-center gap-2 font-secondary text-xs text-muted-foreground sm:flex">
                <Command className="size-3.5" aria-hidden /> Press ⌘K for command palette
              </p>
            </div>
            <div className="rounded-xl border border-border/80 bg-muted/30 p-4">
              <FourierMachine className="w-full" />
            </div>
          </div>
        </article>

        {/* ————— SYSTEMS WORKSPACE CARD (1400, 0) ————— */}
        <article
          data-card-id="work"
          className="absolute rounded-2xl border border-border bg-card/90 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 w-[960px]"
          style={{
            transform: "translate3d(920px, -320px, 0)",
          }}
        >
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-heading text-2xl font-bold tracking-tight">Work that runs, not screenshots</h2>
            <span className="font-secondary text-xs text-muted-foreground tracking-wider font-semibold">
              SYSTEMS // COORDINATE [1400.0, 0.0]
            </span>
          </div>

          <div className="grid gap-6">
            {/* Sitepins */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold text-foreground">Sitepins CMS</h3>
                <p className="font-secondary text-2xs text-muted-foreground uppercase tracking-widest font-bold">
                  Themefisher · core engineer · 2025—present
                </p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Vertical slices end-to-end: RBAC auth system, RESTful node backend endpoints, and Next.js frontend rendering components. High efficiency, lazy loading, and caching optimization.
              </p>
              <div className="mt-4">
                <CaseStudyLink slug="sitepins">Read the case study</CaseStudyLink>
              </div>
            </div>

            {/* Interactive widgets in grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col rounded-xl border border-border/60 bg-muted/20 p-5">
                <h3 className="font-heading text-md font-semibold text-foreground">Slate Drawing Board</h3>
                <p className="font-secondary text-2xs text-muted-foreground uppercase tracking-widest font-bold">
                  Canvas API · TypeScript
                </p>
                <div className="my-3 flex-1 rounded-lg border border-dashed border-border p-2 bg-background/50">
                  <MiniSlate />
                </div>
                <p className="flex gap-4 text-xs font-semibold mt-2">
                  <CaseStudyLink slug="slate">Case study</CaseStudyLink>
                  <ExternalLink href={site.slateUrl}>Full app</ExternalLink>
                </p>
              </div>

              <div className="flex flex-col rounded-xl border border-border/60 bg-muted/20 p-5">
                <h3 className="font-heading text-md font-semibold text-foreground">stl-kit</h3>
                <p className="font-secondary text-2xs text-muted-foreground uppercase tracking-widest font-bold">
                  open source · npm library
                </p>
                <div className="my-3 flex-1 rounded-lg border border-dashed border-border p-2 bg-background/50">
                  <QueueViz />
                </div>
                <p className="flex gap-4 text-xs font-semibold mt-2">
                  <CaseStudyLink slug="stl-kit">Case study</CaseStudyLink>
                  <ExternalLink href={site.stlKitUrl}>npm Package</ExternalLink>
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* ————— PHYSICS & MATH LAB CARD (0, 1000) ————— */}
        <article
          data-card-id="lab"
          className="absolute rounded-2xl border border-border bg-card/90 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 w-[960px]"
          style={{
            transform: "translate3d(-480px, 480px, 0)",
          }}
        >
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight">The Mathematics Laboratory</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                All visual items are hand-rolled Canvas/SVG drawing equations in frame loops.
              </p>
            </div>
            <span className="font-secondary text-xs text-muted-foreground tracking-wider font-semibold">
              ANALYSIS // COORDINATE [0.0, 1000.0]
            </span>
          </div>

          <div className="grid gap-6">
            {/* Ink flow field */}
            <div className="rounded-xl border border-border/60 bg-muted/20 p-5">
              <h3 className="font-heading text-md font-semibold text-foreground">Fluid Vector field</h3>
              <p className="text-2xs font-secondary text-muted-foreground tracking-wide">
                ~1,400 particles · Layered Sine/Cosine Vector Flow. Hover to inject vortices.
              </p>
              <div className="mt-3 overflow-hidden rounded-lg border border-border">
                <FlowField className="h-64 w-full bg-zinc-950 text-emerald-400" />
              </div>
            </div>

            {/* Lissajous & Harmonograph */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading text-md font-semibold text-foreground">Lissajous Lab</h4>
                  <p className="text-2xs font-secondary text-muted-foreground">Oscillators frequency ratio configuration.</p>
                </div>
                <div className="my-4 flex-1">
                  <LissajousLab />
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/20 p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading text-md font-semibold text-foreground">Harmonograph</h4>
                  <p className="text-2xs font-secondary text-muted-foreground">Damped pendulums trajectory curves. Click to redraw.</p>
                </div>
                <div className="my-4 aspect-square w-full flex-1">
                  <Harmonograph className="h-full w-full text-foreground" />
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ————— CAREER TIMELINE GRAPH CARD (-1400, 0) ————— */}
        <article
          data-card-id="experience"
          className="absolute rounded-2xl border border-border bg-card/90 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 w-[960px]"
          style={{
            transform: "translate3d(-1880px, -240px, 0)",
          }}
        >
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-heading text-2xl font-bold tracking-tight">Three years, three altitudes</h2>
            <span className="font-secondary text-xs text-muted-foreground tracking-wider font-semibold">
              TIMELINE // COORDINATE [-1400.0, 0.0]
            </span>
          </div>
          <div className="mt-4">
            <CareerTimeline />
          </div>
        </article>

        {/* ————— CONTACT NETWORK CARD (0, -1000) ————— */}
        <article
          data-card-id="contact"
          className="absolute rounded-2xl border border-border bg-card/90 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 w-[960px]"
          style={{
            transform: "translate3d(-480px, -1260px, 0)",
          }}
        >
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight">The Inbox is Open</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Collaborations on graphics-heavy interfaces, math modeling, and typescript systems.
              </p>
            </div>
            <span className="font-secondary text-xs text-muted-foreground tracking-wider font-semibold">
              CONNECTIONS // COORDINATE [0.0, -1000.0]
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have a challenging vector layout, a complex rendering pipeline to debug, or want to share details of drawings made on the Fourier grid? Let's connect.
              </p>
              <p className="mt-6 font-mono text-lg font-bold text-foreground">
                <a
                  href={`mailto:${site.email}`}
                  className="hover:underline focus-visible:ring-3 focus-visible:outline-none"
                >
                  {site.email}
                </a>
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-border p-5 bg-muted/10 font-secondary text-xs text-muted-foreground space-y-2">
              <div className="text-2xs uppercase tracking-wider font-bold text-foreground">SYSTEM DIAGNOSTICS</div>
              <div>LOC: {site.location}</div>
              <div>ZONE: {site.timezone}</div>
              <div>DOM: <a href={site.url} className="text-primary hover:underline">{site.url.replace("https://", "")}</a></div>
            </div>
          </div>
        </article>
      </WorkspaceGrid>
    </div>
  );
}

/* ============================================================================
   2. ACCESSIBLE CLASSIC READER VIEW (Vertical stacked layout for mobile / lists)
   ============================================================================ */
function WorkspaceReader() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 bg-background text-foreground scroll-smooth pb-16">
        {/* Intro */}
        <section
          id="top"
          className="mx-auto max-w-5xl px-4 py-24 sm:px-6 md:py-32"
        >
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] items-center">
            <div>
              <span className="font-secondary text-xs text-muted-foreground uppercase tracking-widest font-bold">
                f(t) = Σ c_n * e^(2πint)
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Saffaullah Shuvo
              </h1>
              <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
                Frontend engineer who thinks in systems and draws in code.
              </p>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                Applied Mathematics background. Core engineer on Sitepins CMS. Specialist in React, Next.js, graphics programming, and pointer event loop systems.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <a
                  href="#work"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  View projects
                </a>
                <ExternalLink href={site.github}>GitHub</ExternalLink>
                <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <FourierMachine className="w-full" />
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="work"
          className="mx-auto max-w-5xl px-4 py-20 sm:px-6 border-t border-border scroll-mt-14"
        >
          <Reveal>
            <SectionHeading index="01">Work that runs, not screenshots</SectionHeading>
            <p className="mt-4 max-w-prose text-sm text-muted-foreground leading-relaxed">
              Three projects: a production CMS platform, a Pointer event vector drawing engine, and a performant typescript library published on npm.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8">
            <Reveal>
              <article className="rounded-xl border border-border p-6 bg-card">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/50 pb-3">
                  <h3 className="font-heading text-xl font-bold">Sitepins CMS</h3>
                  <p className="font-secondary text-2xs text-muted-foreground uppercase tracking-widest font-bold">
                    Themefisher · Core engineer · 2025—present
                  </p>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Authentication modules, REST APIs, and core component architectures. Enforced permissions boundaries, component optimizations (lazy loading, image budgets), and SEO pipelines.
                </p>
                <div className="mt-4">
                  <CaseStudyLink slug="sitepins">Read the case study</CaseStudyLink>
                </div>
              </article>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              <Reveal>
                <article className="rounded-xl border border-border p-6 bg-card flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/50 pb-3 mb-4">
                      <h3 className="font-heading text-lg font-bold">Slate Drawing Board</h3>
                      <p className="font-secondary text-2xs text-muted-foreground">React · Canvas</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      High-precision canvas engine with responsive Pointer tracking.
                    </p>
                  </div>
                  <div>
                    <div className="rounded-lg border border-dashed border-border p-2 bg-muted/10 mb-4">
                      <MiniSlate />
                    </div>
                    <div className="flex gap-4 text-xs font-semibold">
                      <CaseStudyLink slug="slate">Case study</CaseStudyLink>
                      <ExternalLink href={site.slateUrl}>Launch Slate</ExternalLink>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Reveal>
                <article className="rounded-xl border border-border p-6 bg-card flex flex-col justify-between h-full">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/50 pb-3 mb-4">
                      <h3 className="font-heading text-lg font-bold">stl-kit</h3>
                      <p className="font-secondary text-2xs text-muted-foreground">npm · TS</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      STL-style typed data collections (priority queues, heaps) for TypeScript.
                    </p>
                  </div>
                  <div>
                    <div className="rounded-lg border border-dashed border-border p-2 bg-muted/10 mb-4">
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
          className="mx-auto max-w-5xl px-4 py-20 sm:px-6 border-t border-border scroll-mt-14"
        >
          <Reveal>
            <SectionHeading index="02">The Mathematics Laboratory</SectionHeading>
            <p className="mt-4 max-w-prose text-sm text-muted-foreground">
              Mathematical visualization scripts drawn progressively in frame loops. Touch/drag elements to alter vectors.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8">
            <Reveal>
              <article className="rounded-xl border border-border p-6 bg-card">
                <h3 className="font-heading text-lg font-bold">Ink vector flow field</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-4">
                  Sine-noise mathematical advection vectors. Move mouse through canvas.
                </p>
                <div className="rounded-lg border border-border bg-zinc-950 overflow-hidden">
                  <FlowField className="h-64 w-full text-emerald-400" />
                </div>
              </article>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              <Reveal>
                <article className="rounded-xl border border-border p-6 bg-card flex flex-col justify-between">
                  <h3 className="font-heading text-md font-bold mb-4">Lissajous curves lab</h3>
                  <div className="flex-1">
                    <LissajousLab />
                  </div>
                </article>
              </Reveal>

              <Reveal>
                <article className="rounded-xl border border-border p-6 bg-card flex flex-col justify-between">
                  <h3 className="font-heading text-md font-bold mb-4">Damped harmonograph</h3>
                  <div className="aspect-square w-full flex-1">
                    <Harmonograph className="h-full w-full text-foreground" />
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Timeline Graph */}
        <section
          id="experience"
          className="mx-auto max-w-5xl px-4 py-20 sm:px-6 border-t border-border scroll-mt-14"
        >
          <Reveal>
            <SectionHeading index="03">Career milestones topology</SectionHeading>
            <p className="mt-4 max-w-prose text-sm text-muted-foreground mb-10">
              Interactive node network graph illustrating professional paths.
            </p>
          </Reveal>
          <CareerTimeline />
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="mx-auto max-w-5xl px-4 py-20 sm:px-6 border-t border-border scroll-mt-14"
        >
          <Reveal>
            <h2 className="font-heading text-3xl font-bold tracking-tight">The Inbox is Open</h2>
            <p className="mt-4 max-w-prose text-sm text-muted-foreground leading-relaxed">
              If you have challenging vector math problems, component rendering bottlenecks, or just want to chat about the Fourier transform.
            </p>
            <p className="mt-6 font-mono text-lg font-bold text-foreground">
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-secondary text-2xs text-muted-foreground uppercase tracking-widest font-bold">
              <span>{site.name} · {site.location}</span>
              <div className="flex gap-4">
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
