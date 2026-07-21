import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/lib/site";
import { getAllJournals } from "@/lib/journals";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const journals = await getAllJournals();

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    ...caseStudies.map((cs) => ({
      url: `${site.url}/case-study/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...journals.map((entry) => ({
      url: `${site.url}/journal/${entry.slug}`,
      lastModified: new Date(`${entry.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
