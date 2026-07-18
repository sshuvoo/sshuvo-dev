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
  { id: "experience", label: "Experience" },
  { id: "mathematics", label: "Mathematics" },
  { id: "contact", label: "Contact" },
] as const;
