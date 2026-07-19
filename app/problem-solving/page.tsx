"use client";

import { motion } from "motion/react";
import {
  Trophy,
  Flame,
  Calendar,
  Award,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Database,
  Cpu,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { CommandPalette } from "@/components/site/command-palette";
import { Reveal } from "@/components/motion/reveal";
import { leetcodeData } from "@/lib/leetcode";

export default function ProblemSolvingPage() {
  const {
    username,
    name,
    profileUrl,
    avatarUrl,
    rank,
    solved,
    contest,
    activity,
    languages,
    skills,
    recentSubmissions,
  } = leetcodeData;

  // Concentric circle SVG values
  // Circumference = 2 * PI * R
  const cEasy = 2 * Math.PI * 70;
  const cMedium = 2 * Math.PI * 55;
  const cHard = 2 * Math.PI * 40;

  const oEasy = cEasy - (solved.easy / solved.easyTotal) * cEasy;
  const oMedium = cMedium - (solved.medium / solved.mediumTotal) * cMedium;
  const oHard = cHard - (solved.hard / solved.hardTotal) * cHard;

  return (
    <>
      <SiteHeader />
      <CommandPalette />
      <main
        id="main"
        className="mx-auto w-full max-w-5xl flex-1 px-4 pt-28 pb-24 sm:px-6"
      >
        <Reveal>
          {/* Header Hero */}
          <header className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md sm:p-8">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback to avatar text
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
                <p className="mt-1 font-heading text-xl font-bold sm:text-2xl">
                  #{rank.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3.5">
                <span className="font-secondary text-2xs font-bold tracking-widest text-muted-foreground uppercase">
                  Contest Rating
                </span>
                <p className="mt-1 font-heading text-xl font-bold sm:text-2xl">
                  {contest.rating}
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3.5">
                <span className="font-secondary text-2xs font-bold tracking-widest text-muted-foreground uppercase">
                  Acceptance Rate
                </span>
                <p className="mt-1 font-heading text-xl font-bold sm:text-2xl">
                  {solved.acceptanceRate}%
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 p-3.5">
                <span className="font-secondary text-2xs font-bold tracking-widest text-muted-foreground uppercase">
                  Max Streak
                </span>
                <p className="mt-1 font-heading text-xl font-bold text-orange-500 sm:text-2xl">
                  {activity.maxStreak} Days
                </p>
              </div>
            </div>
          </header>
        </Reveal>

        {/* Dashboard Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {/* Column 1 & 2: Main stats dashboard */}
          <div className="grid gap-8 md:col-span-2">
            
            {/* Problems Solved Progress Circle Card */}
            <Reveal>
              <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
                <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
                  <BookOpen className="size-4.5 text-primary" />
                  Problems Solved Progress
                </h2>
                <div className="mt-6 flex flex-col items-center justify-around gap-8 sm:flex-row">
                  {/* radial SVG progress */}
                  <div className="relative flex size-44 items-center justify-center">
                    <svg className="size-full -rotate-90">
                      {/* Tracks */}
                      <circle
                        cx="88"
                        cy="88"
                        r="70"
                        className="stroke-muted fill-none"
                        strokeWidth="8"
                      />
                      <circle
                        cx="88"
                        cy="88"
                        r="55"
                        className="stroke-muted fill-none"
                        strokeWidth="8"
                      />
                      <circle
                        cx="88"
                        cy="88"
                        r="40"
                        className="stroke-muted fill-none"
                        strokeWidth="8"
                      />
                      {/* Active Lines */}
                      <motion.circle
                        cx="88"
                        cy="88"
                        r="70"
                        className="stroke-emerald-500 fill-none"
                        strokeWidth="8"
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
                        strokeWidth="8"
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
                        strokeWidth="8"
                        strokeDasharray={cHard}
                        initial={{ strokeDashoffset: cHard }}
                        animate={{ strokeDashoffset: oHard }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center text-center">
                      <span className="font-heading text-3xl font-bold">
                        {solved.total}
                      </span>
                      <span className="font-secondary text-3xs text-muted-foreground tracking-wider uppercase">
                        Solved
                      </span>
                    </div>
                  </div>

                  {/* List breakdown with bars */}
                  <div className="flex-1 w-full space-y-4">
                    {/* Easy */}
                    <div>
                      <div className="flex items-center justify-between font-secondary text-xs">
                        <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Easy
                        </span>
                        <span className="text-muted-foreground">
                          <strong className="text-foreground font-semibold">{solved.easy}</strong>/{solved.easyTotal}
                          <span className="ml-2 text-3xs text-emerald-500 font-bold uppercase">Beats {solved.easyBeats}%</span>
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
                          <strong className="text-foreground font-semibold">{solved.medium}</strong>/{solved.mediumTotal}
                          <span className="ml-2 text-3xs text-yellow-500 font-bold uppercase">Beats {solved.mediumBeats}%</span>
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
                          <strong className="text-foreground font-semibold">{solved.hard}</strong>/{solved.hardTotal}
                          <span className="ml-2 text-3xs text-red-500 font-bold uppercase">Beats {solved.hardBeats}%</span>
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

            {/* Contest Stats */}
            <Reveal>
              <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
                <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
                  <Trophy className="size-4.5 text-yellow-500" />
                  Contest Performance
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-muted/20 p-4">
                    <span className="font-secondary text-3xs font-bold tracking-widest text-muted-foreground uppercase">
                      Global Percentile
                    </span>
                    <p className="mt-1 font-heading text-2xl font-bold">
                      Top {contest.topPercentage}%
                    </p>
                    <p className="mt-1.5 font-secondary text-3xs text-muted-foreground leading-relaxed">
                      Ranked in top 10% globally among {contest.totalParticipants.toLocaleString()} developers.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/20 p-4">
                    <span className="font-secondary text-3xs font-bold tracking-widest text-muted-foreground uppercase">
                      Attended Contests
                    </span>
                    <p className="mt-1 font-heading text-2xl font-bold">
                      {contest.attended}
                    </p>
                    <p className="mt-1.5 font-secondary text-3xs text-muted-foreground leading-relaxed">
                      Actively participating in weekend weekly contests.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/20 p-4">
                    <span className="font-secondary text-3xs font-bold tracking-widest text-muted-foreground uppercase">
                      Contest Badge
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <Award className="size-6 text-yellow-500 shrink-0" />
                      <div>
                        <p className="font-secondary text-[11px] font-bold text-foreground">
                          {activity.recentBadge.name}
                        </p>
                        <p className="font-secondary text-[9px] text-muted-foreground uppercase">
                          Released {activity.recentBadge.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Languages Stacked Bar & List */}
            <Reveal>
              <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
                <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
                  <Code2 className="size-4.5 text-primary" />
                  Languages Ecosystem
                </h2>
                
                {/* Horizontal bar representation */}
                <div className="mt-6 flex h-3.5 w-full overflow-hidden rounded-full bg-muted">
                  {languages.map((lang, idx) => {
                    const pct = (lang.solved / solved.total) * 100;
                    // Custom colors
                    const colors = [
                      "bg-blue-500 dark:bg-blue-600",
                      "bg-emerald-500 dark:bg-emerald-600",
                      "bg-amber-500 dark:bg-amber-600",
                      "bg-indigo-500 dark:bg-indigo-600",
                      "bg-rose-500 dark:bg-rose-600",
                    ];
                    return (
                      <motion.div
                        key={lang.name}
                        style={{ width: `${pct}%`, transformOrigin: "left" }}
                        className={`${colors[idx % colors.length]} h-full first:rounded-l-full last:rounded-r-full`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1 }}
                      />
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-secondary text-xs">
                  {languages.map((lang, idx) => {
                    const colors = [
                      "bg-blue-500",
                      "bg-emerald-500",
                      "bg-amber-500",
                      "bg-indigo-500",
                      "bg-rose-500",
                    ];
                    return (
                      <div key={lang.name} className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${colors[idx % colors.length]}`} />
                        <span className="font-semibold text-foreground">{lang.name}</span>
                        <span className="text-muted-foreground">{lang.solved} Solved</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </Reveal>

            {/* Skills Tag Grid */}
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
          </div>

          {/* Column 3: Consistency stats, recent items, and badge */}
          <div className="grid gap-8">
            {/* Activity Card */}
            <Reveal>
              <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
                <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
                  <Calendar className="size-4.5 text-primary" />
                  Consistency Stats
                </h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                      <Flame className="size-5" />
                    </div>
                    <div>
                      <p className="font-secondary text-2xs font-bold text-muted-foreground uppercase">
                        Current Max Streak
                      </p>
                      <p className="font-heading text-xl font-bold">
                        {activity.maxStreak} Active Days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="size-5" />
                    </div>
                    <div>
                      <p className="font-secondary text-2xs font-bold text-muted-foreground uppercase">
                        Annual Submissions
                      </p>
                      <p className="font-heading text-xl font-bold">
                        {activity.submissionsPastYear} Submissions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                      <Sparkles className="size-5" />
                    </div>
                    <div>
                      <p className="font-secondary text-2xs font-bold text-muted-foreground uppercase">
                        Total active days
                      </p>
                      <p className="font-heading text-xl font-bold">
                        {activity.activeDays} Days Total
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Recent Submissions timeline */}
            <Reveal>
              <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
                <h2 className="flex items-center gap-2 font-heading text-lg font-bold">
                  <Database className="size-4.5 text-primary" />
                  Recent Accepted (AC)
                </h2>
                
                <div className="mt-6 flow-root">
                  <ul className="-mb-8">
                    {recentSubmissions.map((ac, idx) => (
                      <li key={idx}>
                        <div className="relative pb-6">
                          {idx !== recentSubmissions.length - 1 ? (
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
                                <p className="font-secondary text-xs font-semibold text-foreground line-clamp-1">
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
          </div>
        </div>
      </main>
    </>
  );
}
