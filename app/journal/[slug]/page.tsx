import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { CommandPalette } from "@/components/site/command-palette";
import { Reveal } from "@/components/motion/reveal";
import { AiActions } from "@/components/journal/ai-actions";
import { TableOfContents } from "@/components/journal/table-of-contents";
import {
  formatJournalDate,
  getAllJournals,
  getJournalEntry,
  getJournalHeadings,
  getJournalSlugs,
  getJournalSource,
} from "@/lib/journals";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getJournalSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getJournalEntry(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/journal/${slug}`,
      title: `${entry.title} — ${site.name}`,
      description: entry.description,
      publishedTime: entry.date,
      authors: [site.name],
      tags: [...entry.tags],
    },
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getJournalEntry(slug);
  if (!entry) notFound();

  const { default: Content } = await import(`@/content/journals/${slug}.mdx`);

  const source = getJournalSource(slug) ?? "";
  const headings = getJournalHeadings(source);
  const entryUrl = `${site.url}/journal/${slug}`;

  const others = (await getAllJournals()).filter((e) => e.slug !== slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.description,
    datePublished: entry.date,
    keywords: entry.tags.join(", "),
    url: `${site.url}/journal/${slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <>
      <SiteHeader />
      <CommandPalette />
      <main
        id="main"
        className="mx-auto w-full max-w-3xl flex-1 px-4 pt-28 pb-24 sm:px-6 xl:max-w-6xl"
      >
        <Reveal>
          <div className="xl:grid xl:grid-cols-[minmax(0,48rem)_1fr] xl:gap-14">
            <div>
              <Link
                href="/journal"
                className="inline-flex items-center gap-1.5 font-secondary text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <ArrowLeft className="size-3.5" aria-hidden /> all journals
              </Link>

              <article className="mt-8">
                <header>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <time
                      dateTime={entry.date}
                      className="font-secondary text-sm text-muted-foreground"
                    >
                      {formatJournalDate(entry.date)}
                    </time>
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
                  </div>
                  <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                    {entry.title}
                  </h1>
                  <p className="mt-4 text-lg text-muted-foreground">{entry.description}</p>
                  <div className="mt-6">
                    <AiActions markdown={source} url={entryUrl} title={entry.title} />
                  </div>
                </header>

                <div className="mt-6 border-t border-border pt-2">
                  <Content />
                </div>
              </article>

              {others.length > 0 && (
                <nav aria-label="More journals" className="mt-16 border-t border-border pt-8">
                  <p className="font-secondary text-xs tracking-wide text-muted-foreground uppercase">
                    Keep reading
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {others.map((other) => (
                      <Link
                        key={other.slug}
                        href={`/journal/${other.slug}`}
                        className="group rounded-xl border border-border p-5 transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                      >
                        <p className="font-heading font-semibold group-hover:underline group-hover:underline-offset-4">
                          {other.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {other.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </nav>
              )}
            </div>

            <aside className="hidden xl:block">
              <div className="sticky top-28">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </Reveal>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </main>
    </>
  );
}
