"use client";

import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { LeetCodeStats } from "@/lib/leetcode";

interface ProblemsSolvedProgressProps {
  solved: LeetCodeStats["solved"];
}

export function ProblemsSolvedProgress({ solved }: ProblemsSolvedProgressProps) {
  const cEasy = 2 * Math.PI * 70;
  const cMedium = 2 * Math.PI * 55;
  const cHard = 2 * Math.PI * 40;

  const oEasy = cEasy - (solved.easy / solved.easyTotal) * cEasy;
  const oMedium = cMedium - (solved.medium / solved.mediumTotal) * cMedium;
  const oHard = cHard - (solved.hard / solved.hardTotal) * cHard;

  return (
    <Reveal>
      <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
        <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
          <BookOpen className="size-4.5 text-primary" />
          Problems Solved Progress
        </h2>
        <div className="mt-6 flex flex-col items-center justify-around gap-8 sm:flex-row">
          {/* Radial SVG progress */}
          <div className="relative flex size-44 items-center justify-center">
            <svg className="size-full -rotate-90">
              {/* Tracks */}
              <circle cx="88" cy="88" r="70" className="stroke-muted fill-none" strokeWidth="6" />
              <circle cx="88" cy="88" r="55" className="stroke-muted fill-none" strokeWidth="6" />
              <circle cx="88" cy="88" r="40" className="stroke-muted fill-none" strokeWidth="6" />
              {/* Active Lines */}
              <motion.circle
                cx="88"
                cy="88"
                r="70"
                className="stroke-emerald-500 fill-none"
                strokeWidth="6"
                strokeDasharray={cEasy}
                initial={{ strokeDashoffset: cEasy }}
                animate={{ strokeDashoffset: oEasy }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
              />
              <motion.circle
                cx="88"
                cy="88"
                r="55"
                className="stroke-yellow-500 fill-none"
                strokeWidth="6"
                strokeDasharray={cMedium}
                initial={{ strokeDashoffset: cMedium }}
                animate={{ strokeDashoffset: oMedium }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                strokeLinecap="round"
              />
              <motion.circle
                cx="88"
                cy="88"
                r="40"
                className="stroke-red-500 fill-none"
                strokeWidth="6"
                strokeDasharray={cHard}
                initial={{ strokeDashoffset: cHard }}
                animate={{ strokeDashoffset: oHard }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="font-heading text-2xl font-bold">{solved.total}</span>
            </div>
          </div>

          {/* List breakdown with bars */}
          <div className="w-full flex-1 space-y-4">
            {/* Easy */}
            <div>
              <div className="flex items-center justify-between font-secondary text-xs">
                <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Easy
                </span>
                <span className="text-muted-foreground">
                  <strong className="font-semibold text-foreground">{solved.easy}</strong>/{solved.easyTotal}
                  <span className="ml-2 text-3xs font-bold uppercase text-emerald-500">Beats {solved.easyBeats}%</span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(solved.easy / solved.easyTotal) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex items-center justify-between font-secondary text-xs">
                <span className="flex items-center gap-1.5 font-bold text-yellow-600 dark:text-yellow-400">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  Medium
                </span>
                <span className="text-muted-foreground">
                  <strong className="font-semibold text-foreground">{solved.medium}</strong>/{solved.mediumTotal}
                  <span className="ml-2 text-3xs font-bold uppercase text-yellow-500">Beats {solved.mediumBeats}%</span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(solved.medium / solved.mediumTotal) * 100}%` }}
                  transition={{ duration: 1, delay: 0.1 }}
                />
              </div>
            </div>

            {/* Hard */}
            <div>
              <div className="flex items-center justify-between font-secondary text-xs">
                <span className="flex items-center gap-1.5 font-bold text-red-600 dark:text-red-400">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Hard
                </span>
                <span className="text-muted-foreground">
                  <strong className="font-semibold text-foreground">{solved.hard}</strong>/{solved.hardTotal}
                  <span className="ml-2 text-3xs font-bold uppercase text-red-500">Beats {solved.hardBeats}%</span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(solved.hard / solved.hardTotal) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
