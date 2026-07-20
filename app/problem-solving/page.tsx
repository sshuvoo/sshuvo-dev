import type { Metadata } from "next";
import { leetcodeData } from "@/lib/leetcode";
import { site } from "@/lib/site";
import { ProfileHeader } from "./components/profile-header";
import { ProblemsSolvedProgress } from "./components/problems-solved-progress";
import { ProblemSolvingSkills } from "./components/problem-solving-skills";
import { LanguagesEcosystem } from "./components/languages-ecosystem";
import { RecentAccepted } from "./components/recent-accepted";

export const metadata: Metadata = {
  title: "Problem Solving",
  description:
    "LeetCode problem solving stats, progress, and skills showcase. 245+ problems solved across TypeScript and PostgreSQL with focus on Dynamic Programming and Database algorithms.",
  keywords: [
    "LeetCode",
    "Problem Solving",
    "DSA",
    "Data Structures and Algorithms",
    "Dynamic Programming",
    "TypeScript",
    "PostgreSQL",
    "SQL",
    "Coding Challenges",
    "Competitive Programming",
    "Algorithm Practice",
    "Saffaullah Shuvo",
  ],
  openGraph: {
    title: "Problem Solving",
    description:
      "LeetCode problem solving stats and skills. 245+ problems solved with focus on Dynamic Programming and PostgreSQL.",
    url: `${site.url}/problem-solving`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Problem Solving",
    description:
      "LeetCode problem solving stats and skills. 245+ problems solved with focus on Dynamic Programming and PostgreSQL.",
  },
  alternates: {
    canonical: "/problem-solving",
  },
};

export default function ProblemSolvingPage() {
  const { username, name, profileUrl, avatarUrl, rank, solved, contest, activity, languages, skills, recentSubmissions } = leetcodeData;

  return (
    <>
      <main
        id="main"
        className="mx-auto w-full max-w-5xl flex-1 px-4 pt-32 pb-24 sm:px-6"
      >
        <ProfileHeader
          data={{ username, name, profileUrl, avatarUrl, rank, solved, contest, activity }}
        />

        {/* Dashboard Grid */}
        <div className="mt-8 grid items-start gap-8 md:grid-cols-3">
          {/* Column 1 & 2: Main stats dashboard */}
          <div className="grid gap-8 md:col-span-2">
            <ProblemsSolvedProgress solved={solved} />
            <ProblemSolvingSkills skills={skills} />
          </div>

          {/* Column 3: Languages and recent items */}
          <div className="grid gap-8">
            <LanguagesEcosystem languages={languages} totalSolved={solved.total} />
            <RecentAccepted submissions={recentSubmissions} />
          </div>
        </div>
      </main>
    </>
  );
}
