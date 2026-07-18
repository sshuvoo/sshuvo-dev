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
      <span className="font-heading font-semibold tracking-tight">{children}</span>
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <CommandPalette />
      <main id="main" className="flex-1">
        {/* ————— Hero: the Fourier drawing machine ————— */}
        <section
          id="top"
          aria-label="Introduction"
          className="relative mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-4 pt-20 pb-10 sm:px-6"
        >
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-secondary text-sm text-muted-foreground">
                f(t) = Σ cₙ · e^(2πint)
              </p>
              <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
                Saffaullah Shuvo
              </h1>
              <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
                Frontend engineer who thinks in systems and draws in code.
              </p>
              <p className="mt-6 max-w-prose text-muted-foreground">
                The machine on the right is running a Fourier transform, live.
                Right now it&apos;s redrawing a star with rotating circles —
                but it would much rather redraw <em>your</em> drawing.{" "}
                <strong className="font-medium text-foreground">
                  Sketch any shape on it.
                </strong>{" "}
                Then drag the slider and watch your sketch dissolve into
                mathematics and come back.
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
              <p className="mt-10 hidden items-center gap-2 font-secondary text-xs text-muted-foreground sm:flex">
                <Command className="size-3.5" aria-hidden /> Press ⌘K — this
                site has a command palette, because of course it does.
              </p>
            </div>
            <FourierMachine className="mx-auto w-full max-w-105" />
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
              Three projects, three formats: a product I engineer at work, a
              rendering engine you can scribble on, and a library you can
              operate. Each has a full case study — the story, the hard parts,
              the takeaway.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6">
            {/* Sitepins */}
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
                  A content platform used by developers and businesses
                  globally. I own vertical slices end-to-end: the
                  authentication and RBAC system, the RESTful backend
                  services, and the frontend architecture that consumes them.
                  One head holding both sides of the contract — that&apos;s
                  the feature.
                </p>
                <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                  <li className="rounded-lg bg-muted/60 p-4">
                    <strong className="block font-secondary text-xs font-medium tracking-wide text-foreground uppercase">
                      Auth
                    </strong>
                    Sessions and RBAC — roles and permissions enforced at the
                    boundary, mirrored in the UI.
                  </li>
                  <li className="rounded-lg bg-muted/60 p-4">
                    <strong className="block font-secondary text-xs font-medium tracking-wide text-foreground uppercase">
                      API
                    </strong>
                    RESTful services designed alongside the interfaces that
                    consume them.
                  </li>
                  <li className="rounded-lg bg-muted/60 p-4">
                    <strong className="block font-secondary text-xs font-medium tracking-wide text-foreground uppercase">
                      Frontend
                    </strong>
                    Component architecture and performance as a habit:
                    memoization, lazy loading, image budgets.
                  </li>
                </ul>
                <p className="mt-6">
                  <CaseStudyLink slug="sitepins">
                    Read the case study
                  </CaseStudyLink>
                </p>
              </article>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Slate */}
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
                    A drawing engine built from first principles — pointer
                    scheduling, DPR correctness, frame budgets. This box is a
                    working miniature:
                  </p>
                  <div className="mt-4 min-h-44 flex-1 rounded-lg border border-dashed border-border">
                    <MiniSlate />
                  </div>
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    <CaseStudyLink slug="slate">Case study</CaseStudyLink>
                    <ExternalLink href={site.slateUrl}>Full app</ExternalLink>
                  </p>
                </article>
              </Reveal>

              {/* stl-kit */}
              <Reveal delay={0.08}>
                <article className="flex h-full flex-col rounded-xl border border-border p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl font-semibold">stl-kit</h3>
                    <p className="font-secondary text-xs text-muted-foreground">
                      open source · npm
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    STL-style typed collections for TypeScript. Below, a real
                    max-heap doing its job — push and pop it:
                  </p>
                  <div className="mt-4 min-h-44 flex-1 rounded-lg border border-dashed border-border p-4">
                    <QueueViz />
                  </div>
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    <CaseStudyLink slug="stl-kit">Case study</CaseStudyLink>
                    <ExternalLink href={site.stlKitUrl}>npm</ExternalLink>
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
                  <ExternalLink href={site.webOsUrl}>It still runs</ExternalLink>
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        {/* ————— The Lab ————— */}
        <section aria-labelledby="lab" className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6">
            <Reveal>
              <SectionHeading index="02" id="lab">
                The Lab
              </SectionHeading>
              <p className="mt-4 max-w-prose text-muted-foreground">
                I have a B.Sc. in Applied Mathematics, and this is where it
                leaks out. Everything below is hand-rolled Canvas or SVG — no
                graphics library, no shader magic, just equations and a frame
                loop. Touch everything.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6">
              <Reveal>
                <article className="rounded-xl border border-border bg-background p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-lg font-semibold">Ink field</h3>
                    <p className="font-secondary text-xs text-muted-foreground">
                      ~1,400 particles · sine-field advection
                    </p>
                  </div>
                  <p className="mt-2 max-w-prose text-sm text-muted-foreground">
                    A vector field pushing ink through layered sine noise. Move
                    your pointer through it — you&apos;re a vortex.
                  </p>
                  <FlowField className="mt-4 h-64 w-full rounded-lg text-foreground sm:h-80" />
                </article>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-2">
                <Reveal>
                  <article className="flex h-full flex-col rounded-xl border border-border bg-background p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-heading text-lg font-semibold">
                        Lissajous lab
                      </h3>
                      <p className="font-secondary text-xs text-muted-foreground">
                        SVG · recomputed per input
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Two perpendicular oscillators; the frequency ratio decides
                      whether the figure ever closes.
                    </p>
                    <div className="mt-4 flex-1">
                      <LissajousLab />
                    </div>
                  </article>
                </Reveal>

                <Reveal delay={0.08}>
                  <article className="flex h-full flex-col rounded-xl border border-border bg-background p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-heading text-lg font-semibold">
                        Harmonograph
                      </h3>
                      <p className="font-secondary text-xs text-muted-foreground">
                        damped pendulums · click to redraw
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      x(t) = Σ A·sin(ft + φ)·e^(−dt) — a Victorian drawing
                      machine, resurrected in a frame loop. Every figure is
                      one-of-a-kind.
                    </p>
                    <Harmonograph className="mt-4 aspect-square w-full flex-1 text-foreground" />
                  </article>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ————— Experience ————— */}
        <section
          aria-labelledby="experience"
          className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6"
        >
          <Reveal>
            <SectionHeading index="03" id="experience">
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
        </section>

        {/* ————— Contact ————— */}
        <footer id="contact" aria-label="Contact" className="scroll-mt-20 border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
            <Reveal>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                The inbox is open.
              </h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Interesting frontend problems, canvas-heavy interfaces,
                open-source collaboration — or just to tell me what you drew on
                the Fourier machine.
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
