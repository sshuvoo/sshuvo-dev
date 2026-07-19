# sshuvo-dev

Personal portfolio and engineering blog for [Saffaullah Shuvo](https://sshuvo.pro.bd) — an AI-first software engineer.

## Tech Stack

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: MDX journals with remark-gfm and rehype-slug
- **UI**: Shadcn components, Lucide icons
- **Animation**: Motion (Framer Motion successor)
- **Canvas**: Custom pointer-event-driven drawing engines

## Features

- **Case Studies** — deep dives into Sitepins CMS, Slate Drawing Board, and stl-kit
- **Mathematics Laboratory** — interactive canvas visualizations (flow fields, vector advection)
- **Journal** — MDX-powered engineering blog
- **Problem Solving** — LeetCode profile and stats dashboard
- **Career Timeline** — interactive node network graph

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

Both `dev` and `build` run a pre-step (`scripts/themes-generator.ts`) to generate theme config.

## Project Structure

```
app/                  # Next.js App Router pages
  work/[slug]/        # Case study pages
  journal/            # MDX journal listing and posts
  problem-solving/    # LeetCode stats dashboard
components/
  canvas/             # Canvas visualizations (FlowField, MiniSlate, QueueViz)
  journal/            # Journal-related components
  motion/             # Animation wrappers (Reveal)
  site/               # Site-wide components (CareerTimeline)
  ui/                 # Shadcn UI primitives
content/journals/     # MDX journal posts
configs/              # Site configuration (site.json)
lib/                  # Utilities and data loaders
scripts/              # Build scripts (theme generator)
```
