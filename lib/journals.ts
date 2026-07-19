import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

export interface JournalMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface JournalEntry extends JournalMeta {
  slug: string;
}

export interface JournalHeading {
  id: string;
  text: string;
  level: 2 | 3;
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

// Raw markdown body with the `export const meta` block stripped — used for
// "Copy Markdown" and the open-with-AI actions.
export function getJournalSource(slug: string): string | null {
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(JOURNALS_DIR, `${slug}${ext}`);
    if (fs.existsSync(file)) {
      return fs
        .readFileSync(file, "utf8")
        .replace(/^export const meta = \{[\s\S]*?\};\s*/, "")
        .trim();
    }
  }
  return null;
}

// h2/h3 outline for the "On this page" sidebar. Slugs come from
// github-slugger, the same library rehype-slug uses, so ids always match.
export function getJournalHeadings(source: string): JournalHeading[] {
  const slugger = new GithubSlugger();
  const headings: JournalHeading[] = [];
  let inCodeFence = false;

  for (const line of source.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "");
    headings.push({
      id: slugger.slug(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }
  return headings;
}
