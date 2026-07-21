import { CheckCircle2, Database } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { LeetCodeStats } from "@/lib/leetcode";

interface RecentAcceptedProps {
  submissions: LeetCodeStats["recentSubmissions"];
}

export function RecentAccepted({ submissions }: RecentAcceptedProps) {
  const recentFive = submissions.slice(0, 5);

  return (
    <Reveal>
      <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <Database className="size-4.5 text-primary" />
          Recent Accepted (AC)
        </h2>

        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {recentFive.map((ac, idx, arr) => (
              <li key={idx}>
                <div className="relative pb-6">
                  {idx !== arr.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-border"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-card">
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="line-clamp-1 font-secondary text-xs font-semibold text-foreground">
                          {ac.title}
                        </p>
                        <span
                          className={`mt-1 inline-block rounded px-1.5 py-0.5 font-secondary text-[9px] font-bold ${
                            ac.difficulty === "Easy"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : ac.difficulty === "Medium"
                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {ac.difficulty}
                        </span>
                      </div>
                      <div className="whitespace-nowrap text-right font-secondary text-[10px] text-muted-foreground">
                        <time>{ac.timeAgo}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
