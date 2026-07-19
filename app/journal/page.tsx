import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { formatJournalDate, getAllJournals } from "@/lib/journals";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Tech notes, opinions, and field reports on AI-first development, React, Node.js, Go, and databases — by Saffaullah Shuvo.",
  alternates: { canonical: "/journal" },
  openGraph: {
    type: "website",
    url: `${site.url}/journal`,
    title: `Journal — ${site.name}`,
    description:
      "Tech notes, opinions, and field reports on AI-first development, React, Node.js, Go, and databases.",
  },
};

export default async function JournalPage() {
  const journals = await getAllJournals();

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 pt-28 pb-24 sm:px-6">
        <Reveal>
          <header>
            <p className="font-secondary text-xs font-bold tracking-widest text-muted-foreground uppercase">
              d(thoughts)/dt
            </p>
            <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Journal
            </h1>
            <p className="mt-4 max-w-prose text-lg text-muted-foreground">
              Notes, opinions, and field reports — on AI-first workflows, web
              systems, backends, and the occasional bit of mathematics.
            </p>
          </header>

          <div className="mt-14 grid gap-6">
            {journals.map((entry, i) => (
              <article key={entry.slug}>
                <Link
                  href={`/journal/${entry.slug}`}
                  className="group block rounded-xl border border-border p-6 transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:p-7"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span
                      aria-hidden
                      className="font-secondary text-sm text-muted-foreground"
                    >
                      {String(journals.length - i).padStart(2, "0")}
                    </span>
                    <time
                      dateTime={entry.date}
                      className="font-secondary text-xs text-muted-foreground"
                    >
                      {formatJournalDate(entry.date)}
                    </time>
                  </div>
                  <h2 className="mt-3 font-heading text-xl font-semibold tracking-tight group-hover:underline group-hover:decoration-border group-hover:underline-offset-4 sm:text-2xl">
                    {entry.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <ul className="flex flex-wrap gap-2" aria-label="Topics">
                      {entry.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-0.5 font-secondary text-xs text-muted-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                      Read
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </main>
    </>
  );
}
