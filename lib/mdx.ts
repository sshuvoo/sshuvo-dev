import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

export interface MdxHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function getSlugs(dir: string): string[] {
  return fs
    .readdirSync(path.join(process.cwd(), dir))
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

// `importer` must be a function with a statically-analyzable template literal
// so webpack/Turbopack can build the module graph. Pass it at the call site:
//   (slug) => import(`@/content/journals/${slug}.mdx`)
export async function getEntry<T>(
  importer: (slug: string) => Promise<{ meta: T }>,
  slug: string,
): Promise<(T & { slug: string }) | null> {
  try {
    const mod = await importer(slug);
    return { slug, ...(mod.meta as T) };
  } catch {
    return null;
  }
}

export async function getCollection<T>(
  slugs: string[],
  importer: (slug: string) => Promise<{ meta: T }>,
): Promise<(T & { slug: string })[]> {
  const entries = await Promise.all(slugs.map((slug) => getEntry<T>(importer, slug)));
  return entries.filter(Boolean) as (T & { slug: string })[];
}

export function getSource(dir: string, slug: string): string | null {
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(process.cwd(), dir, `${slug}${ext}`);
    if (fs.existsSync(file)) {
      return fs
        .readFileSync(file, "utf8")
        .replace(/^export const meta = \{[\s\S]*?\};\s*/, "")
        .trim();
    }
  }
  return null;
}

export function getHeadings(source: string): MdxHeading[] {
  const slugger = new GithubSlugger();
  const headings: MdxHeading[] = [];
  let inCodeFence = false;
  for (const line of source.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) { inCodeFence = !inCodeFence; continue; }
    if (inCodeFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "");
    headings.push({ id: slugger.slug(text), text, level: match[1].length as 2 | 3 });
  }
  return headings;
}
