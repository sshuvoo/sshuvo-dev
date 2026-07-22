import { site } from '@/lib/site'
import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Google_Sans_Code, Inter, JetBrains_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site/header'
import { CommandPalette } from '@/components/site/command-palette'
import { SiteFooter } from '@/components/site/footer'
import { CosmicBackground } from '@/components/canvas/cosmic-background'

const font_primary = Inter({
  variable: '--font-primary',
  subsets: ['latin'],
})

const font_secondary = JetBrains_Mono({
  variable: '--font-secondary',
  subsets: ['latin'],
})

const font_heading = Google_Sans_Code({
  variable: '--font-heading',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'Software Engineer',
    'Full-Stack Developer',
    'Frontend Engineer',
    'Frontend Developer',
    'Backend Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'MERN Stack Developer',
    'MERN Developer',
    'Go Developer',
    'Golang Developer',
    'MongoDB Developer',
    'PostgreSQL Developer',
    'Database Design',
    'Web Developer',
    'Web Application Developer',
    'AI-First Development',
    'AI-Driven Engineering',
    'AI Application Developer',
    'AI Developer',
    'Software Engineer Bangladesh',
    'Frontend Engineer Bangladesh',
    'Full-Stack Developer Bangladesh',
    'Hire Software Engineer',
    'Hire React Developer',
    'Hire Next.js Developer',
    'Hire Full-Stack Developer',
    'Hire Frontend Developer',
    'Remote Developer',
    'Remote Software Engineer',
    'Freelance Developer',
    'Talented Developer',
    'Creative Developer',
    'Top Talent Engineer',
    'Canvas API',
    'Web Performance',
    'Software Architecture',
    'Component-Based Architecture',
    'REST API Development',
    'GraphQL',
    'State Management',
    'Redux',
    'Zustand',
    'Tailwind CSS',
    'Shadcn UI',
    'Vite',
    'Tsup',
    'Vitest',
    'Git',
    'GitHub',
    'Open Source',
    'npm Packages',
    'WCAG Accessibility',
    'Responsive Design',
    'Performance Optimization',
    'AI Coding Tools',
    'Claude Code',
    'Pair Programming',
    'Software Design Patterns',
    'SOLID Principles',
    'Agile Development',
    'Saffaullah Shuvo',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'oklch(1 0 0)' },
    { media: '(prefers-color-scheme: dark)', color: 'oklch(0.145 0 0)' },
  ],
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'Full-Stack Software Engineer',
  description:
    'Full-stack software engineer specializing in React, Next.js, TypeScript, and Node.js. Building AI-first web applications with MongoDB, PostgreSQL, and Go.',
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Go',
    'REST APIs',
    'MongoDB',
    'PostgreSQL',
    'Database Design',
    'Artificial Intelligence',
    'AI-Driven Development',
    'Full-Stack Development',
    'Web Performance',
    'Canvas API',
    'Applied Mathematics',
    'MERN Stack',
    'State Management',
    'Redux',
    'Zustand',
    'Tailwind CSS',
    'Shadcn UI',
    'Vite',
    'Tsup',
    'Vitest',
    'Git',
    'Open Source',
    'npm Packages',
    'WCAG Accessibility',
    'Responsive Design',
    'Performance Optimization',
    'Software Architecture',
    'Component-Based Architecture',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    occupationLocation: {
      '@type': 'Country',
      name: 'Bangladesh',
    },
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'PostgreSQL',
      'Go',
    ],
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Rajshahi',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Themefisher',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BD',
  },
  nationality: {
    '@type': 'Country',
    name: 'Bangladesh',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${font_primary.variable} ${font_secondary.variable} ${font_heading.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CosmicBackground />
          <a
            href="#main"
            className="focus:bg-primary focus:text-primary-foreground sr-only z-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:rounded-md focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <SiteHeader />
          <CommandPalette />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  )
}
