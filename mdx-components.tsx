import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { CodeBlock } from '@/components/journal/code-block'
import {
  Callout,
  ExternalRef,
  Figure,
  PullQuote,
  Stack,
  Takeaway,
} from '@/components/journal/shortcodes'

const components = {
  // Element mappings styled to the site's design tokens
  h2: ({ id, children }) => (
    <h2
      id={id}
      className="font-heading text-foreground mt-14 scroll-mt-24 text-2xl font-semibold tracking-tight"
    >
      {children}
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3
      id={id}
      className="font-heading text-foreground mt-10 scroll-mt-24 text-lg font-semibold tracking-tight"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-muted-foreground mt-5 leading-relaxed">{children}</p>
  ),
  a: ({ href = '', children }) =>
    href.startsWith('/') || href.startsWith('#') ? (
      <Link
        href={href}
        className="text-foreground decoration-border hover:decoration-foreground font-medium underline underline-offset-4 transition-colors"
      >
        {children}
      </Link>
    ) : (
      <ExternalRef href={href}>{children}</ExternalRef>
    ),
  ul: ({ children }) => (
    <ul className="text-muted-foreground marker:text-border mt-5 list-disc space-y-2 pl-5 leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-muted-foreground marker:font-secondary marker:text-muted-foreground mt-5 list-decimal space-y-2 pl-5 leading-relaxed marker:text-xs">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-border text-muted-foreground mt-5 border-l-2 pl-5 italic [&>p]:mt-2 [&>p:first-child]:mt-0">
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="border-border bg-muted text-foreground rounded border px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({
    children,
    className = '',
    'data-language': dataLanguage,
    ...props
  }) => (
    <CodeBlock nodes={children} data-language={dataLanguage}>
      <pre
        data-language={dataLanguage}
        className={`border-border/60 bg-muted/40 overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-relaxed dark:bg-zinc-950/90 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit ${className}`}
        {...props}
      >
        {children}
      </pre>
    </CodeBlock>
  ),
  table: ({ children }) => (
    <div className="border-border mt-6 overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-border bg-muted/30 font-secondary text-muted-foreground border-b px-4 py-2.5 text-left text-xs font-bold tracking-wider uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-border/50 text-muted-foreground border-b px-4 py-2.5">
      {children}
    </td>
  ),
  hr: () => <hr className="border-border mt-14" />,

  // Shortcodes usable directly in journal entries
  Callout,
  PullQuote,
  Takeaway,
  Figure,
  Stack,
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
