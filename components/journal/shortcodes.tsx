import { ArrowUpRight, CircleAlert, Info, Lightbulb, Quote } from "lucide-react";

/* Shortcodes available inside journal MDX files. Registered globally in
   mdx-components.tsx, so entries use them without imports:

   <Callout type="tip">…</Callout>
   <PullQuote cite="…">…</PullQuote>
   <Takeaway>…</Takeaway>
   <Figure caption="…">…</Figure>
   <Stack items="React, Go, Postgres" />
*/

const calloutStyles = {
  note: { icon: Info, label: "Note", tone: "text-foreground" },
  tip: { icon: Lightbulb, label: "Tip", tone: "text-primary" },
  warning: { icon: CircleAlert, label: "Watch out", tone: "text-destructive" },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, label, tone } = calloutStyles[type];
  return (
    <aside className="my-8 rounded-xl border border-border bg-muted/20 p-5">
      <p className={`flex items-center gap-2 font-secondary text-xs font-bold tracking-widest uppercase ${tone}`}>
        <Icon className="size-3.5" aria-hidden />
        {title ?? label}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground [&>p]:mt-2 [&>p:first-child]:mt-0">
        {children}
      </div>
    </aside>
  );
}

export function PullQuote({
  cite,
  children,
}: {
  cite?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-10 border-l-2 border-foreground pl-6">
      <Quote className="size-4 text-muted-foreground" aria-hidden />
      <blockquote className="mt-2 font-heading text-xl font-medium tracking-tight text-balance text-foreground [&>p]:m-0">
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-3 font-secondary text-xs text-muted-foreground">
          — {cite}
        </figcaption>
      )}
    </figure>
  );
}

export function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-10 rounded-xl border border-border p-6 sm:p-8">
      <p className="font-secondary text-xs tracking-wide text-muted-foreground uppercase">
        Takeaway
      </p>
      <div className="mt-3 font-heading text-xl font-medium text-balance text-foreground [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

export function Figure({
  caption,
  children,
}: {
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-border bg-muted/20 p-4">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-secondary text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Stack({ items }: { items: string }) {
  return (
    <ul className="my-6 flex flex-wrap gap-2" aria-label="Technology stack">
      {items.split(",").map((item) => (
        <li
          key={item.trim()}
          className="rounded-full border border-border px-3 py-1 font-secondary text-xs text-muted-foreground"
        >
          {item.trim()}
        </li>
      ))}
    </ul>
  );
}

export function ExternalRef({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
