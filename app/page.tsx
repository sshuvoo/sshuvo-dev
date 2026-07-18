import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Harmonograph } from "@/components/canvas/harmonograph";
import { LissajousLab } from "@/components/canvas/lissajous-lab";
import { MiniSlate } from "@/components/canvas/mini-slate";
import { QueueViz } from "@/components/canvas/queue-viz";
import { Reveal } from "@/components/motion/reveal";
import { SiteHeader } from "@/components/site/header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
      <span
        aria-hidden
        className="font-secondary text-sm font-normal text-muted-foreground"
      >
        {index}
      </span>
      <span className="font-heading font-semibold tracking-tight">
        {children}
      </span>
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* ————— Hero: the identity is a plotted equation ————— */}
        <section
          id="top"
          aria-label="Introduction"
          className="relative mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-4 pt-14 sm:px-6"
        >
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-secondary text-sm text-muted-foreground">
                x(t) = Σ Aᵢ sin(fᵢt + φᵢ) e^(−dᵢt)
              </p>
              <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Saffaullah Shuvo
              </h1>
              <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
                Frontend engineer who thinks in systems and draws in code.
              </p>
              <p className="mt-6 max-w-prose text-muted-foreground">
                I studied applied mathematics, then spent three years building
                what equations become on a screen: a CMS platform, a canvas
                drawing engine, an open-source data-structures library. React,
                Next.js, and TypeScript are the tools — the curve on the right
                is the point. It&apos;s a damped pendulum, plotted live. Click
                it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#work"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  See the work
                </a>
                <ExternalLink href={site.github}>GitHub</ExternalLink>
                <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
              </div>
            </div>
            <Harmonograph className="mx-auto aspect-square w-full max-w-105 text-foreground" />
          </div>
        </section>

        {/* ————— Work ————— */}
        <section
          aria-labelledby="work"
          className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6"
        >
          <Reveal>
            <SectionHeading index="01" id="work">
              Work that runs, not screenshots
            </SectionHeading>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Every project below is either live in this page or one click from
              its real deployment. If it can&apos;t be touched, it isn&apos;t
              here.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6">
            {/* Sitepins — the professional centerpiece */}
            <Reveal>
              <article className="rounded-xl border border-border p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-xl font-semibold sm:text-2xl">
                    Sitepins CMS
                  </h3>
                  <p className="font-secondary text-xs text-muted-foreground">
                    Themefisher · core engineer · 2025—present
                  </p>
                </div>
                <p className="mt-4 max-w-prose text-muted-foreground">
                  A content management system used by developers and businesses
                  globally. I own features end-to-end — authentication systems,
                  RESTful APIs, backend services, and the frontend
                  architecture. The same hands that write the React components
                  design the API they call.
                </p>
                <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                  <li className="rounded-lg bg-muted/60 p-4">
                    <strong className="block font-secondary text-xs font-medium tracking-wide text-foreground uppercase">
                      Auth
                    </strong>
                    Authentication &amp; RBAC — roles and permissions from
                    session layer to UI guards.
                  </li>
                  <li className="rounded-lg bg-muted/60 p-4">
                    <strong className="block font-secondary text-xs font-medium tracking-wide text-foreground uppercase">
                      API
                    </strong>
                    RESTful backend services designed alongside the interfaces
                    that consume them.
                  </li>
                  <li className="rounded-lg bg-muted/60 p-4">
                    <strong className="block font-secondary text-xs font-medium tracking-wide text-foreground uppercase">
                      Frontend
                    </strong>
                    Component architecture, performance work — memoization,
                    lazy loading, image optimization.
                  </li>
                </ul>
              </article>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Slate — live mini drawing board */}
              <Reveal>
                <article className="flex h-full flex-col rounded-xl border border-border p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl font-semibold">
                      Slate Drawing Board
                    </h3>
                    <p className="font-secondary text-xs text-muted-foreground">
                      Canvas API · TypeScript
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    A drawing app built from scratch — rendering pipeline,
                    pointer events, performance under continuous input. This
                    box is a working miniature of it:
                  </p>
                  <div className="mt-4 min-h-44 flex-1 rounded-lg border border-dashed border-border">
                    <MiniSlate />
                  </div>
                  <p className="mt-4 text-sm">
                    <ExternalLink href={site.slateUrl}>
                      Open the full app
                    </ExternalLink>
                  </p>
                </article>
              </Reveal>

              {/* stl-kit — live priority queue */}
              <Reveal delay={0.08}>
                <article className="flex h-full flex-col rounded-xl border border-border p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl font-semibold">
                      stl-kit
                    </h3>
                    <p className="font-secondary text-xs text-muted-foreground">
                      open source · npm
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    STL-style typed collections for TypeScript — linked lists,
                    priority queues. Below, a real max-heap doing its job:
                  </p>
                  <div className="mt-4 min-h-44 flex-1 rounded-lg border border-dashed border-border p-4">
                    <QueueViz />
                  </div>
                  <p className="mt-4 text-sm">
                    <ExternalLink href={site.stlKitUrl}>
                      View on npm
                    </ExternalLink>
                  </p>
                </article>
              </Reveal>
            </div>

            {/* Web OS */}
            <Reveal>
              <article className="rounded-xl border border-border p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-xl font-semibold">
                    A web OS, for the fun of it
                  </h3>
                  <p className="font-secondary text-xs text-muted-foreground">
                    React · Zustand · Tailwind
                  </p>
                </div>
                <p className="mt-3 max-w-prose text-sm text-muted-foreground">
                  My previous portfolio was a macOS-style operating system in
                  the browser — windows, a terminal, notes, context menus.
                  Built to find out where component architecture and state
                  management start to creak. (Answer: later than you&apos;d
                  think, if the state is designed first.)
                </p>
                <p className="mt-4 text-sm">
                  <ExternalLink href={site.webOsUrl}>
                    It still runs
                  </ExternalLink>
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ————— Experience ————— */}
        <section
          aria-labelledby="experience"
          className="border-y border-border bg-muted/30"
        >
          <div className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6">
            <Reveal>
              <SectionHeading index="02" id="experience">
                Three years, three altitudes
              </SectionHeading>
            </Reveal>
            <ol className="mt-12 grid gap-0">
              {[
                {
                  period: "2025 — present",
                  title: "Frontend Engineer · Themefisher",
                  body: "Product engineering across Themefisher, GetHugoThemes, Zeon Studio, and Sitepins — React, Next.js, TypeScript, Astro. Core engineer on Sitepins CMS; component libraries shipped in premium templates used globally.",
                },
                {
                  period: "2024 — 2025",
                  title: "Full-Stack Developer & Team Lead · Brand & Visual Agency",
                  body: "Led a small team; set the standards for code review, Git workflow, and component architecture. Translated design direction into MERN + TypeScript delivery.",
                },
                {
                  period: "2023 — 2024",
                  title: "Full-Stack Developer · Freelance",
                  body: "Everything, alone: architecture, build, client communication, deployment. The year that taught me what 'owning delivery' actually costs.",
                },
              ].map((job, i) => (
                <Reveal key={job.period} delay={i * 0.06}>
                  <li className="grid gap-2 border-b border-border py-8 first:pt-2 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-8">
                    <p className="font-secondary text-sm text-muted-foreground">
                      {job.period}
                    </p>
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
                        {job.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ————— Mathematics ————— */}
        <section
          aria-labelledby="mathematics"
          className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6"
        >
          <Reveal>
            <SectionHeading index="03" id="mathematics">
              The mathematics is not a metaphor
            </SectionHeading>
            <p className="mt-4 max-w-prose text-muted-foreground">
              B.Sc. in Applied Mathematics, University of Rajshahi. It shows up
              as an instinct for invariants — in rendering code, in state
              design, in why an animation feels right. These are Lissajous
              curves; change the frequency ratio and watch the figure close.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 rounded-xl border border-border p-6 sm:p-8">
              <LissajousLab />
            </div>
          </Reveal>
        </section>

        {/* ————— Contact ————— */}
        <footer
          id="contact"
          aria-label="Contact"
          className="scroll-mt-20 border-t border-border"
        >
          <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
            <Reveal>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                The inbox is open.
              </h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Interesting frontend problems, canvas-heavy interfaces,
                open-source collaboration — or just to say the pendulum drew a
                good one today.
              </p>
              <p className="mt-8">
                <a
                  href={`mailto:${site.email}`}
                  className="font-secondary text-lg text-foreground underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:text-xl"
                >
                  {site.email}
                </a>
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-secondary text-xs text-muted-foreground">
                <p>
                  {site.name} · {site.location} ({site.timezone})
                </p>
                <p className="flex gap-4">
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    GitHub
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </footer>
      </main>
    </>
  );
}
