export const site = {
  name: "Saffaullah Shuvo",
  shortName: "sshuvo",
  role: "Frontend Engineer",
  title: "Saffaullah Shuvo — Frontend Engineer",
  description:
    "Frontend engineer with an applied-mathematics background. I build high-performance web interfaces with React, Next.js, and TypeScript — from CMS platforms to canvas rendering engines.",
  url: "https://sshuvo.pro.bd",
  email: "sshuvo0112@gmail.com",
  location: "Bangladesh",
  timezone: "UTC+6",
  github: "https://github.com/sshuvoo",
  linkedin: "https://linkedin.com/in/saffaullahshuvo",
  // The previous portfolio (macOS-inspired web OS) lived at the root domain.
  // Update this once it moves to its own subdomain/deployment.
  webOsUrl: "https://sshuvo.pro.bd",
  slateUrl: "https://slate-drawing-board.vercel.app",
  stlKitUrl: "https://www.npmjs.com/package/stl-kit",
} as const;

export const sections = [
  { id: "work", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const caseStudies = [
  {
    slug: "sitepins",
    title: "Sitepins CMS",
    tagline: "Owning a CMS end-to-end: auth, APIs, and the frontend that sells it",
    role: "Core engineer · Themefisher · 2025—present",
  },
  {
    slug: "slate",
    title: "Slate Drawing Board",
    tagline: "A canvas drawing engine built from scratch, one pointer event at a time",
    role: "Personal project · React, TypeScript, Canvas API",
  },
  {
    slug: "stl-kit",
    title: "stl-kit",
    tagline: "STL-style typed collections for TypeScript, published on npm",
    role: "Open source · TypeScript, Tsup, Vitest",
  },
] as const;

export type CaseStudySlug = (typeof caseStudies)[number]["slug"];
