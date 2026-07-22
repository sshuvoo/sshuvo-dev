import { getCollection, getEntry, getHeadings, getSource, getSlugs } from "@/lib/mdx";
import type { MdxHeading } from "@/lib/mdx";

export type { MdxHeading as JournalHeading };

const DIR = "journals";

export interface JournalMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface JournalEntry extends JournalMeta {
  slug: string;
}

const importer = (slug: string) => import(`@/content/journals/${slug}.mdx`);

export function getJournalSlugs() {
  return getSlugs(DIR);
}

export function getJournalEntry(slug: string) {
  return getEntry<JournalMeta>(importer, slug);
}

export async function getAllJournals(): Promise<JournalEntry[]> {
  const entries = await getCollection<JournalMeta>(getJournalSlugs(), importer);
  return (entries as JournalEntry[]).sort((a, b) => b.date.localeCompare(a.date));
}

export function formatJournalDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function getJournalSource(slug: string) {
  return getSource(DIR, slug);
}

export function getJournalHeadings(source: string) {
  return getHeadings(source);
}
