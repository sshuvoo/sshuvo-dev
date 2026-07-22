import siteConfig from "@/configs/site.json";

// Editable from the CMS via configs/site.json.
// Note: webOsUrl points at the previous portfolio (macOS-inspired web OS),
// which lived at the root domain — update it once it moves to its own
// subdomain/deployment.
export const site = siteConfig;

export const sections = [
  { id: "work", label: "Case Studies", href: "/case-study" },
] as const;

export const caseStudies = [
  {
    slug: "sitepins-cms",
    title: "Sitepins CMS",
    tagline: "Owning a CMS end-to-end: auth, APIs, and the frontend that sells it",
    role: "Core engineer · Themefisher · 2025—present",
  },
  {
    slug: "slate-drawing-board",
    title: "Slate Drawing Board",
    tagline: "A canvas drawing engine built from scratch, one pointer event at a time",
    role: "Personal project · React, TypeScript, Canvas API",
  },
  {
    slug: "stl-kit-npm-package",
    title: "stl-kit",
    tagline: "STL-style typed collections for TypeScript, published on npm",
    role: "Open source · TypeScript, Tsup, Vitest",
  },
] as const;

export type CaseStudySlug = (typeof caseStudies)[number]["slug"];
