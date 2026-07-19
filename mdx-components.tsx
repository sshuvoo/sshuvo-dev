import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import {
  Callout,
  ExternalRef,
  Figure,
  PullQuote,
  Stack,
  Takeaway,
} from "@/components/journal/shortcodes";

const components = {
  // Element mappings styled to the site's design tokens
  h2: ({ id, children }) => (
    <h2
      id={id}
      className="mt-14 scroll-mt-24 font-heading text-2xl font-semibold tracking-tight text-foreground"
    >
      {children}
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3
      id={id}
      className="mt-10 scroll-mt-24 font-heading text-lg font-semibold tracking-tight text-foreground"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 leading-relaxed text-muted-foreground">{children}</p>
  ),
  a: ({ href = "", children }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link
        href={href}
        className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
      >
        {children}
      </Link>
    ) : (
      <ExternalRef href={href}>{children}</ExternalRef>
    ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-border">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 leading-relaxed text-muted-foreground marker:font-secondary marker:text-xs marker:text-muted-foreground">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-5 border-l-2 border-border pl-5 text-muted-foreground italic [&>p]:mt-2 [&>p:first-child]:mt-0">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-zinc-950 p-5 font-mono text-sm leading-relaxed text-zinc-100 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border bg-muted/30 px-4 py-2.5 text-left font-secondary text-xs font-bold tracking-wider text-muted-foreground uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border/50 px-4 py-2.5 text-muted-foreground">
      {children}
    </td>
  ),
  hr: () => <hr className="mt-14 border-border" />,

  // Shortcodes usable directly in journal entries
  Callout,
  PullQuote,
  Takeaway,
  Figure,
  Stack,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
