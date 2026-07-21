"use client";

import { motion } from "motion/react";
import { Code2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { LeetCodeStats } from "@/lib/leetcode";

interface LanguagesEcosystemProps {
  languages: LeetCodeStats["languages"];
  totalSolved: number;
}

export function LanguagesEcosystem({ languages, totalSolved }: LanguagesEcosystemProps) {
  const topLangs = languages.slice(0, 2);
  const colors = [
    "bg-blue-500 dark:bg-blue-600",
    "bg-emerald-500 dark:bg-emerald-600",
  ];
  const dotColors = ["bg-blue-500", "bg-emerald-500"];

  return (
    <Reveal>
      <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <Code2 className="size-4.5 text-primary" />
          Languages Ecosystem
        </h2>

        {/* Horizontal bar representation */}
        <div className="mt-6 flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
          {topLangs.map((lang, idx) => {
            const pct = (lang.solved / totalSolved) * 100;
            return (
              <motion.div
                key={lang.name}
                style={{ width: `${pct}%`, transformOrigin: "left" }}
                className={`${colors[idx]} h-full first:rounded-l-full last:rounded-r-full`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
              />
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-secondary text-xs">
          {topLangs.map((lang, idx) => (
            <div key={lang.name} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${dotColors[idx]}`} />
              <span className="font-semibold text-foreground">{lang.name}</span>
              <span className="text-muted-foreground">{lang.solved} Solved</span>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
