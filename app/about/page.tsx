import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { site } from '@/lib/site'
import { caseStudies } from '@/lib/site'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'About Saffaullah Shuvo — Hire a Full-Stack Software Engineer',
  description:
    'Hire Saffaullah Shuvo, a full-stack software engineer specializing in React, Next.js, TypeScript, and Node.js. Core engineer at Themefisher with 3+ years of experience building AI-first web applications. Available for remote work worldwide.',
  keywords: [
    'Hire Software Engineer',
    'Hire React Developer',
    'Hire Next.js Developer',
    'Hire Full-Stack Developer',
    'Hire Frontend Developer',
    'Hire TypeScript Developer',
    'Hire MERN Stack Developer',
    'Remote Software Engineer',
    'Remote Developer for Hire',
    'Freelance Software Engineer',
    'Software Engineer Bangladesh',
    'Full-Stack Developer Bangladesh',
    'React Developer Bangladesh',
    'Next.js Developer Bangladesh',
    'Talented Software Engineer',
    'Top Talent Engineer',
    'Creative Developer',
    'AI-First Developer',
    'Software Engineer Portfolio',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: `${site.url}/about`,
    title: `About Saffaullah Shuvo — Hire a Full-Stack Software Engineer`,
    description:
      'Hire Saffaullah Shuvo, a full-stack software engineer specializing in React, Next.js, TypeScript, and Node.js.',
  },
}

const skills = [
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'Astro',
      'Redux',
      'Zustand',
      'Context API',
      'Tailwind CSS',
      'Shadcn UI',
    ],
  },
  {
    category: 'Backend',
    items: [
      'Node.js',
      'Express',
      'REST APIs',
      'Authentication/Authorization',
      'RBAC',
      'Go',
    ],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'Mongoose', 'Prisma', 'PostgreSQL'],
  },
  {
    category: 'Tools & Practices',
    items: [
      'Git/GitHub',
      'Vite',
      'Tsup',
      'Vitest',
      'AI Coding Tools',
      'WCAG Accessibility',
      'Performance Optimization',
    ],
  },
]

export default function AboutPage() {
  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Saffaullah Shuvo — Full-Stack Software Engineer',
    description:
      'Hire Saffaullah Shuvo, a full-stack software engineer specializing in React, Next.js, TypeScript, and Node.js.',
    url: `${site.url}/about`,
    mainEntity: {
      '@type': 'Person',
      name: site.name,
      jobTitle: 'Full-Stack Software Engineer',
      url: site.url,
      email: `mailto:${site.email}`,
      sameAs: [site.github, site.linkedin],
      worksFor: {
        '@type': 'Organization',
        name: 'Themefisher',
      },
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'PostgreSQL',
        'Go',
        'Full-Stack Development',
      ],
    },
  }

  const professionalServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Saffaullah Shuvo — Software Engineering Services',
    description:
      'Full-stack software engineering services specializing in React, Next.js, TypeScript, and Node.js. Available for remote work worldwide.',
    url: site.url,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BD',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Frontend Development',
            description:
              'React, Next.js, TypeScript, and modern UI development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Full-Stack Development',
            description:
              'End-to-end web application development with MERN stack',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'API Development',
            description:
              'RESTful APIs, authentication, and backend services',
          },
        },
      ],
    },
  }

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-32 pb-24 sm:px-6">
        <Reveal>
          <header>
            <p className="font-secondary text-xs font-bold tracking-widest text-muted-foreground uppercase">
              About
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Hire a Full-Stack Software Engineer
            </h1>
            <p className="mt-4 max-w-prose text-lg text-muted-foreground">
              I&apos;m Saffaullah Shuvo — a software engineer specializing in React,
              Next.js, TypeScript, and Node.js. I build AI-first web applications
              with real-world impact. Currently a core engineer at Themefisher,
              building CMS platforms used by developers and businesses worldwide.
            </p>
          </header>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              What I Do
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              I&apos;m a full-stack software engineer with over 3 years of hands-on
              experience building high-performance web applications. My
              specialization is React, Next.js, and TypeScript on the frontend,
              with Node.js and Go on the backend. I work with MongoDB and
              PostgreSQL for data, and I integrate AI-driven workflows throughout
              my development process.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              As a core engineer at Themefisher, I own end-to-end development for
              the Sitepins CMS — from authentication systems and RESTful APIs to
              frontend architecture. I&apos;ve built component libraries used in premium
              templates for developers and businesses globally.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              My background in Applied Mathematics gives me a unique perspective on
              problem-solving and system design. I think in systems and draw in
              code — from CMS platforms to canvas rendering engines.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Technical Skills
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h3 className="font-secondary text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    {skillGroup.category}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Featured Work
            </h2>
            <p className="text-muted-foreground mt-4 mb-6 max-w-prose text-sm">
              Here are some of the projects that showcase my skills and
              experience. Each project demonstrates real-world problem-solving
              and technical expertise.
            </p>
            <div className="grid gap-4">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/work/${cs.slug}`}
                  className="group rounded-xl border border-border p-5 transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <p className="font-heading font-semibold group-hover:underline group-hover:underline-offset-4">
                    {cs.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cs.tagline}
                  </p>
                  <p className="mt-2 font-secondary text-xs text-muted-foreground">
                    {cs.role}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Why Hire Me
            </h2>
            <ul className="text-muted-foreground mt-4 space-y-3 leading-relaxed">
              <li>
                <strong className="text-foreground">Full-stack ownership:</strong>{' '}
                I design and implement complete features — frontend, backend, and
                database — without handoff delays.
              </li>
              <li>
                <strong className="text-foreground">AI-first approach:</strong>{' '}
                I pair with modern AI coding tools to ship faster without
                sacrificing code quality.
              </li>
              <li>
                <strong className="text-foreground">Performance obsessed:</strong>{' '}
                I optimize for speed from the start — memoization, lazy loading,
                image budgets, and semantic HTML.
              </li>
              <li>
                <strong className="text-foreground">Open source contributor:</strong>{' '}
                I publish npm packages with TypeScript-first APIs and comprehensive
                test suites.
              </li>
              <li>
                <strong className="text-foreground">Remote-ready:</strong>{' '}
                I&apos;ve worked remotely with teams across different time zones, with
                strong communication and self-management skills.
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14 rounded-xl border border-border p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              I&apos;m available for full-time positions, contract work, and
              interesting projects. If you&apos;re looking for a software engineer who
              can own features end-to-end and deliver production-ready code, I&apos;d
              love to hear from you.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`mailto:${site.email}`}
                className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85"
              >
                Get in Touch
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
              >
                LinkedIn
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
              >
                GitHub
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-14">
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              Read My Writing
            </h2>
            <p className="text-muted-foreground mt-4 mb-6 max-w-prose text-sm">
              I write about web development, AI-first workflows, and the
              engineering decisions behind my projects.
            </p>
            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              View all journal entries
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </section>
        </Reveal>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceJsonLd),
        }}
      />
    </>
  )
}
