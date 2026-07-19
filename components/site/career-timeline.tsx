"use client";

import { useState } from "react";
import { Briefcase, Calendar, Code, MapPin, Users } from "lucide-react";

interface TimelineNode {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  teamSize?: string;
  details: string[];
  tech: string[];
  x: number; // SVG X coordinate
  y: number; // SVG Y coordinate
}

const timelineData: TimelineNode[] = [
  {
    id: "tf",
    period: "2025 — Present",
    role: "Frontend Engineer",
    company: "Themefisher",
    location: "Bangladesh (Remote)",
    teamSize: "Global Developer Ecosystem",
    tech: ["React", "Next.js", "TypeScript", "Astro", "Zustand", "Better Auth"],
    details: [
      "Core engineer on Sitepins CMS, building end-to-end features including auth systems and backend services.",
      "Design, develop, and optimize high-performance frontend components across major brand templates.",
      "Achieve high-fidelity styling, SEO indexability, and fast loading via modern rendering pipelines."
    ],
    x: 430,
    y: 60,
  },
  {
    id: "agency",
    period: "2024 — 2025",
    role: "Full-Stack Developer & Team Lead",
    company: "Brand & Visual Agency",
    location: "Remote (Project-based)",
    teamSize: "4 developers",
    tech: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "TailwindCSS"],
    details: [
      "Led full-stack delivery of client applications using MongoDB, Express, React, and Node.js.",
      "Managed version control workflows, architectural standards, and led regular PR reviews.",
      "Transformed complex creative mockups into responsive, optimized, and performant web products."
    ],
    x: 250,
    y: 180,
  },
  {
    id: "freelance",
    period: "2023 — 2024",
    role: "Full-Stack Developer",
    company: "Independent Freelance",
    location: "Bangladesh / International Clients",
    teamSize: "Solo Developer",
    tech: ["MERN Stack", "TypeScript", "Next.js", "RESTful APIs", "Git"],
    details: [
      "Architected, built, and deployed production-grade MERN stack applications for local and international clients.",
      "Managed client relationship lifecycle: initial requirements gathering, scope definition, dev, and launch.",
      "Established strong foundation in state management, responsive designs, and semantic coding."
    ],
    x: 70,
    y: 300,
  }
];

export function CareerTimeline() {
  const [selectedId, setSelectedId] = useState<string>("tf");
  const selectedNode = timelineData.find((n) => n.id === selectedId) || timelineData[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      {/* SVG Network Graph Column */}
      <div className="relative flex flex-col justify-between rounded-xl border border-border bg-card p-6">
        <div>
          <h3 className="font-heading text-lg font-semibold">Career Topology</h3>
          <p className="font-secondary text-xs text-muted-foreground">
            Graph G = (V, E) where nodes represent milestones and edges represent transition steps
          </p>
        </div>

        {/* Visual Graph Interface */}
        <div className="relative my-6 flex items-center justify-center">
          <svg
            viewBox="0 0 500 360"
            className="w-full max-w-[460px] overflow-visible text-muted-foreground/35"
          >
            <defs>
              <linearGradient id="flow-gradient" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="oklch(0.556 0 0)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="oklch(0.556 0 0)" stopOpacity="0.8" />
              </linearGradient>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" opacity="0.6" />
              </marker>
            </defs>

            {/* Connecting Graph Splines */}
            <path
              d="M 70 300 Q 160 300 250 180"
              fill="none"
              stroke="url(#flow-gradient)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 250 180 Q 340 60 430 60"
              fill="none"
              stroke="url(#flow-gradient)"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />

            {/* Moving particles on lines */}
            <circle r="3.5" fill="var(--color-primary, currentColor)" className="text-foreground">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 70 300 Q 160 300 250 180"
              />
            </circle>
            <circle r="3.5" fill="var(--color-primary, currentColor)" className="text-foreground">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M 250 180 Q 340 60 430 60"
              />
            </circle>

            {/* Graph Nodes */}
            {timelineData.map((node) => {
              const isActive = selectedId === node.id;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedId(node.id)}
                >
                  {/* Outer shadow glow ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? "28" : "20"}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "fill-primary/10 stroke-primary/30 stroke-[3]"
                        : "fill-muted/20 stroke-border group-hover:stroke-muted-foreground/60"
                    }`}
                  />
                  {/* Solid inner node */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="14"
                    className={`transition-all duration-300 ${
                      isActive
                        ? "fill-primary text-primary-foreground"
                        : "fill-card stroke-border stroke-2 group-hover:fill-muted/40"
                    }`}
                  />
                  <foreignObject
                    x={node.x - 7}
                    y={node.y - 7}
                    width="14"
                    height="14"
                    className={`transition-colors duration-300 ${
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <Briefcase className="size-3.5" />
                  </foreignObject>
                  {/* Node label */}
                  <text
                    x={node.x}
                    y={node.y + (isActive ? 42 : 34)}
                    textAnchor="middle"
                    className={`font-secondary text-[10px] font-semibold tracking-wider transition-colors duration-300 ${
                      isActive ? "fill-foreground" : "fill-muted-foreground"
                    }`}
                  >
                    {node.company.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <p className="text-center font-secondary text-[10px] text-muted-foreground">
          ▲ Node selection updates inspector properties
        </p>
      </div>

      {/* Code Inspector Column */}
      <div className="flex flex-col rounded-xl border border-border bg-zinc-950 p-6 font-secondary text-sm text-zinc-300 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500/80" />
            <span className="size-2 rounded-full bg-yellow-500/80" />
            <span className="size-2 rounded-full bg-green-500/80" />
            <span className="ml-2 font-secondary text-xs text-zinc-500">experience_schema.json</span>
          </div>
          <span className="rounded bg-zinc-800 px-2 py-0.5 text-2xs font-semibold text-zinc-400">
            TypeScript
          </span>
        </div>

        {/* Console view details */}
        <div className="mt-4 flex-1 space-y-4">
          <div>
            <span className="text-blue-400">const</span>{" "}
            <span className="text-emerald-400">milestone</span>:{" "}
            <span className="text-purple-400">TimelineNode</span> = &#123;
          </div>

          <div className="pl-4 space-y-2">
            <div>
              <span className="text-zinc-500">role:</span>{" "}
              <span className="text-orange-300">&quot;{selectedNode.role}&quot;</span>,
            </div>
            <div>
              <span className="text-zinc-500">company:</span>{" "}
              <span className="text-orange-300">&quot;{selectedNode.company}&quot;</span>,
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-zinc-500" />
              <span className="text-zinc-500">period:</span>{" "}
              <span className="text-orange-300">&quot;{selectedNode.period}&quot;</span>,
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-zinc-500" />
              <span className="text-zinc-500">location:</span>{" "}
              <span className="text-orange-300">&quot;{selectedNode.location}&quot;</span>,
            </div>
            {selectedNode.teamSize && (
              <div className="flex items-center gap-1.5">
                <Users className="size-3.5 text-zinc-500" />
                <span className="text-zinc-500">team:</span>{" "}
                <span className="text-orange-300">&quot;{selectedNode.teamSize}&quot;</span>,
              </div>
            )}
            <div>
              <span className="text-zinc-500">highlights:</span> [
              {selectedNode.details.map((detail, idx) => (
                <div key={idx} className="pl-4 text-zinc-400 text-xs leading-relaxed">
                  &quot;{detail}&quot;{idx < selectedNode.details.length - 1 ? "," : ""}
                </div>
              ))}
              ],
            </div>
            <div>
              <span className="text-zinc-500">stack:</span> [
              <div className="flex flex-wrap gap-1.5 pl-4 mt-1">
                {selectedNode.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded bg-zinc-900 px-2 py-0.5 text-xs text-zinc-300 border border-zinc-800"
                  >
                    <Code className="size-2.5 text-zinc-500" />
                    {t}
                  </span>
                ))}
              </div>
              ]
            </div>
          </div>

          <div>&#125;;</div>
        </div>
      </div>
    </div>
  );
}
