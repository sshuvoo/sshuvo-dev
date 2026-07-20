import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist. Return to the homepage to learn more about Saffaullah Shuvo, a full-stack software engineer.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main
      id="main"
      className="text-foreground flex flex-1 flex-col items-center justify-center px-4 py-32"
    >
      <p className="font-secondary text-muted-foreground text-xs font-bold tracking-widest uppercase">
        404
      </p>
      <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Page not found
      </h1>
      <p className="text-muted-foreground mt-4 max-w-prose text-center text-lg">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85"
        >
          Go home
        </Link>
        <Link
          href="/about"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
        >
          About me
        </Link>
      </div>
    </main>
  )
}
