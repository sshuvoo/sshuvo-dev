import { Cpu } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { LeetCodeStats } from "@/lib/leetcode";

interface ProblemSolvingSkillsProps {
  skills: LeetCodeStats["skills"];
}

export function ProblemSolvingSkills({ skills }: ProblemSolvingSkillsProps) {
  return (
    <Reveal>
      <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <Cpu className="size-4.5 text-primary" />
          Problem Solving Skills
        </h2>
        <div className="mt-6 space-y-6">
          {/* Advanced */}
          <div>
            <h3 className="font-heading text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Advanced Algorithms
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.advanced.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-1 font-secondary text-xs transition-colors hover:bg-muted/60"
                >
                  <span className="text-foreground">{s.name}</span>
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-3xs font-bold text-primary dark:text-primary-foreground">
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Intermediate */}
          <div>
            <h3 className="font-heading text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Intermediate Abstractions
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.intermediate.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-1 font-secondary text-xs transition-colors hover:bg-muted/60"
                >
                  <span className="text-foreground">{s.name}</span>
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-3xs font-bold text-primary dark:text-primary-foreground">
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fundamental */}
          <div>
            <h3 className="font-heading text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Fundamental Structures
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.fundamental.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-1 font-secondary text-xs transition-colors hover:bg-muted/60"
                >
                  <span className="text-foreground">{s.name}</span>
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-3xs font-bold text-primary dark:text-primary-foreground">
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
