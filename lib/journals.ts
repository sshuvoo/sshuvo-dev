import fs from "node:fs";
import path from "node:path";

export interface JournalMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface JournalEntry extends JournalMeta {
  slug: string;
}

const JOURNALS_DIR = path.join(process.cwd(), "content/journals");

export function getJournalSlugs(): string[] {
  return fs
    .readdirSync(JOURNALS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

// Each entry exports `meta` from its MDX; the dynamic import resolves through
// the same @next/mdx loader the pages use, so there's no separate frontmatter parser.
export async function getJournalEntry(slug: string): Promise<JournalEntry | null> {
  try {
    const mod = await import(`@/content/journals/${slug}.mdx`);
    return { slug, ...(mod.meta as JournalMeta) };
  } catch {
    return null;
  }
}

export async function getAllJournals(): Promise<JournalEntry[]> {
  const entries = await Promise.all(getJournalSlugs().map(getJournalEntry));
  return entries
    .filter((e): e is JournalEntry => e !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatJournalDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
