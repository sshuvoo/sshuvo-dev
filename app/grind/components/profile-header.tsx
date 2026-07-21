"use client";

import { ArrowUpRight, Cpu, Database } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { LeetCodeStats } from "@/lib/leetcode";

interface ProfileHeaderProps {
  data: Pick<
    LeetCodeStats,
    "username" | "name" | "profileUrl" | "avatarUrl" | "rank" | "solved" | "contest" | "activity"
  >;
}

export function ProfileHeader({ data }: ProfileHeaderProps) {
  const { username, name, profileUrl, avatarUrl, rank, solved, contest, activity } = data;

  return (
    <Reveal>
      <header className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md sm:p-8">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted mx-auto sm:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt={name}
                className="absolute inset-0 h-full w-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="font-heading text-lg font-bold text-muted-foreground">
                SS
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold sm:text-3xl">
                  {name}
                </h1>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-secondary text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              </div>
              <p className="mt-1 font-secondary text-sm text-muted-foreground">
                @{username} · LeetCode Profile
              </p>
            </div>
          </div>
          <div>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-secondary text-xs font-semibold text-primary-foreground transition-all hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Verify LeetCode Profile
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4">
          <div className="rounded-lg bg-muted/40 p-3.5">
            <span className="font-secondary text-2xs font-bold tracking-widest text-muted-foreground uppercase">
              Global Rank
            </span>
            <p className="mt-1 font-heading text-base font-bold sm:text-lg">
              #{rank.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3.5">
            <span className="font-secondary text-2xs font-bold tracking-widest text-muted-foreground uppercase">
              Contest Rating
            </span>
            <p className="mt-1 font-heading text-base font-bold sm:text-lg">
              {contest.rating}
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3.5">
            <span className="font-secondary text-2xs font-bold tracking-widest text-muted-foreground uppercase">
              Acceptance Rate
            </span>
            <p className="mt-1 font-heading text-base font-bold sm:text-lg">
              {solved.acceptanceRate}%
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3.5">
            <span className="font-secondary text-2xs font-bold tracking-widest text-muted-foreground uppercase">
              Max Streak
            </span>
            <p className="mt-1 font-heading text-base font-bold text-orange-500 sm:text-lg">
              {activity.maxStreak} Days
            </p>
          </div>
        </div>

        {/* Current Focus */}
        <div className="mt-4 flex flex-wrap items-center gap-2 font-secondary text-xs text-muted-foreground">
          <span className="text-foreground font-semibold">Currently focused on:</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-amber-600 dark:text-amber-400">
            <Cpu className="size-3" />
            Dynamic Programming
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-600 dark:text-emerald-400">
            <Database className="size-3" />
            PostgreSQL
          </span>
        </div>
      </header>
    </Reveal>
  );
}
