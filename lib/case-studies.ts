import type { CaseStudySlug } from "@/lib/site";
import { site } from "@/lib/site";

export type CaseStudyContent = {
  slug: CaseStudySlug;
  title: string;
  tagline: string;
  role: string;
  stack: string[];
  liveUrl?: { href: string; label: string };
  // Long-form narrative: heading + paragraphs, rendered as prose
  chapters: Array<{ heading: string; body: string[] }>;
  takeaway: string;
};

export const caseStudyContent: Record<CaseStudySlug, CaseStudyContent> = {
  sitepins: {
    slug: "sitepins",
    title: "Sitepins CMS",
    tagline:
      "Owning a CMS end-to-end: auth, APIs, and the frontend that sells it",
    role: "Core engineer · Themefisher · Sep 2025 — present",
    stack: ["Next.js", "TypeScript", "Node.js", "REST APIs", "RBAC"],
    chapters: [
      {
        heading: "The shape of the problem",
        body: [
          "A CMS is a deceptively hard product. It has to feel simple to a content editor, be predictable for a developer, and stay fast while doing both. Sitepins is Themefisher's content platform, used by developers and businesses around the world — and I joined as a core engineer with ownership across the whole vertical slice.",
          "That phrase — vertical slice — matters. I don't hand the API off to a backend team or receive designs I can't question. The same person who writes the React components designs the endpoints they call. That collapses an entire class of integration bugs before they exist: the contract can't drift when one head holds both sides of it.",
        ],
      },
      {
        heading: "Authentication and authority",
        body: [
          "I own the authentication system: session handling, and role-based access control with granular roles and permissions. RBAC is one of those features that looks like a settings page and behaves like a distributed-systems problem — every UI surface, every API route, and every background service has to agree about what a given user may do, at the same moment, with no exceptions.",
          "The design principle I held onto: authority lives in exactly one place, and everything else derives from it. UI guards are a courtesy; the API is the law. Every permission check the interface performs is re-performed at the boundary, so a clever request can never do what a hidden button couldn't.",
        ],
      },
      {
        heading: "Performance as a habit, not a sprint",
        body: [
          "The frontend work runs on a simple discipline: measure, then memoize; lazy-load what the first paint doesn't need; treat images as budgets, not decoration. Cross-browser compatibility and semantic HTML aren't a checklist at the end — they're constraints the components are born with.",
          "The result is a codebase where performance work is boring, which is the highest compliment performance work can receive.",
        ],
      },
    ],
    takeaway:
      "Full-stack ownership isn't about knowing two stacks — it's about deleting the seam between them.",
  },
  slate: {
    slug: "slate",
    title: "Slate Drawing Board",
    tagline:
      "A canvas drawing engine built from scratch, one pointer event at a time",
    role: "Personal project · React, TypeScript, Canvas API, SVG",
    stack: ["React", "TypeScript", "Canvas API", "SVG"],
    liveUrl: { href: site.slateUrl, label: "slate-drawing-board.vercel.app" },
    chapters: [
      {
        heading: "Why build a drawing app in 2024+",
        body: [
          "Because nothing else forces you to understand the browser's rendering pipeline as honestly. A drawing app has no ORM to hide behind, no framework abstraction that saves you: it's pointer events arriving faster than frames, a canvas that repaints exactly what you tell it, and a user whose hand notices every dropped millisecond.",
          "Slate is a feature-rich drawing board built from first principles — shapes, freehand ink, selection, the whole surface area — and it exists precisely because I wanted to know what happens under the libraries everyone else imports.",
        ],
      },
      {
        heading: "What the canvas teaches",
        body: [
          "Event handling at drawing speed is a scheduling problem. Pointer events fire at device rate (often 120Hz+), frames render at display rate, and naive code that draws on every event burns the frame budget doing invisible work. The fix is the pattern every graphics-heavy interface converges on: accumulate input, render once per animation frame, and keep the hot path allocation-free.",
          "Device-pixel-ratio correctness, coordinate-space transforms, hit-testing drawn geometry — these sound like trivia until a line looks blurry on one laptop and crisp on another. The mini drawing surface embedded on this site's landing page is a distilled version of these exact lessons.",
        ],
      },
    ],
    takeaway:
      "Graphics code is honest code: the frame either made it in 8 milliseconds or it didn't.",
  },
  "stl-kit": {
    slug: "stl-kit",
    title: "stl-kit",
    tagline: "STL-style typed collections for TypeScript, published on npm",
    role: "Open source · TypeScript, Tsup, Vitest",
    stack: ["TypeScript", "Tsup", "Vitest", "npm"],
    liveUrl: { href: site.stlKitUrl, label: "npmjs.com/package/stl-kit" },
    chapters: [
      {
        heading: "The gap",
        body: [
          "JavaScript ships with arrays, maps, and sets — and stops. The moment you need a priority queue or a doubly linked list, you either import a decade-old package with `any` sprinkled through its types, or you write one inline and test it never. Coming from C++'s STL, the absence felt like a missing limb.",
          "stl-kit is my answer: production-grade, STL-style collections — doubly linked lists, priority queues — designed type-first. The generics aren't decoration over untyped internals; the type system is load-bearing, so misuse fails at compile time instead of in production.",
        ],
      },
      {
        heading: "Library engineering is different engineering",
        body: [
          "An application ships behavior; a library ships a contract. That changes everything: the API surface is designed before the implementation, every public signature is a promise you'll keep for years, and the test suite (Vitest) is less about coverage percentage and more about pinning the contract down so refactors can't quietly bend it.",
          "The build pipeline (Tsup) emits clean ESM and CJS with real type declarations — the unglamorous plumbing that decides whether a library feels professional the moment someone runs npm install.",
        ],
      },
    ],
    takeaway:
      "The priority-queue demo on the landing page isn't an illustration of stl-kit — it's the mindset that produced it.",
  },
};
