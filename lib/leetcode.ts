export interface LeetCodeStats {
  username: string;
  name: string;
  profileUrl: string;
  avatarUrl: string;
  rank: number;
  solved: {
    total: number;
    totalQuestions: number;
    easy: number;
    easyTotal: number;
    easyBeats: number;
    medium: number;
    mediumTotal: number;
    mediumBeats: number;
    hard: number;
    hardTotal: number;
    hardBeats: number;
    acceptanceRate: number;
  };
  contest: {
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    attended: number;
    topPercentage: number;
  };
  activity: {
    submissionsPastYear: number;
    activeDays: number;
    maxStreak: number;
    recentBadge: {
      name: string;
      year: number;
    };
  };
  languages: {
    name: string;
    solved: number;
  }[];
  skills: {
    advanced: { name: string; count: number }[];
    intermediate: { name: string; count: number }[];
    fundamental: { name: string; count: number }[];
  };
  recentSubmissions: {
    title: string;
    timeAgo: string;
    difficulty: "Easy" | "Medium" | "Hard";
  }[];
}

export const leetcodeData: LeetCodeStats = {
  username: "sshuvoo",
  name: "Saffaullah Shuvo",
  profileUrl: "https://leetcode.com/u/sshuvoo/",
  avatarUrl: "https://assets.leetcode.com/static_assets/others/lg2550.png",
  rank: 632380,
  solved: {
    total: 245,
    totalQuestions: 3999,
    easy: 152,
    easyTotal: 956,
    easyBeats: 95.18,
    medium: 81,
    mediumTotal: 2088,
    mediumBeats: 82.08,
    hard: 12,
    hardTotal: 955,
    hardBeats: 66.91,
    acceptanceRate: 81.13,
  },
  contest: {
    rating: 1372,
    globalRanking: 786729,
    totalParticipants: 875878,
    attended: 9,
    topPercentage: 89.98,
  },
  activity: {
    submissionsPastYear: 378,
    activeDays: 72,
    maxStreak: 36,
    recentBadge: {
      name: "50 Days Badge 2025",
      year: 2025,
    },
  },
  languages: [
    { name: "TypeScript", solved: 207 },
    { name: "PostgreSQL", solved: 38 },
    { name: "Python3", solved: 6 },
    { name: "Go", solved: 4 },
    { name: "MySQL", solved: 1 },
  ],
  skills: {
    advanced: [
      { name: "Dynamic Programming", count: 15 },
      { name: "Backtracking", count: 8 },
      { name: "Divide and Conquer", count: 7 },
      { name: "Monotonic Stack", count: 6 },
      { name: "Quickselect", count: 2 },
      { name: "Trie", count: 2 },
      { name: "Union-Find", count: 2 },
      { name: "Data Stream", count: 1 },
    ],
    intermediate: [
      { name: "Math", count: 41 },
      { name: "Database", count: 38 },
      { name: "Hash Table", count: 35 },
      { name: "Binary Search", count: 20 },
      { name: "Depth-First Search", count: 15 },
      { name: "Recursion", count: 14 },
      { name: "Tree", count: 10 },
      { name: "Binary Tree", count: 10 },
    ],
    fundamental: [
      { name: "Array", count: 89 },
      { name: "String", count: 36 },
      { name: "Two Pointers", count: 28 },
      { name: "Stack", count: 21 },
      { name: "Linked List", count: 21 },
      { name: "Sorting", count: 20 },
      { name: "Matrix", count: 14 },
      { name: "Simulation", count: 14 },
    ],
  },
  recentSubmissions: [
    { title: "House Robber", timeAgo: "15 hours ago", difficulty: "Medium" },
    { title: "Climbing Stairs", timeAgo: "3 days ago", difficulty: "Easy" },
    { title: "N-th Tribonacci Number", timeAgo: "3 days ago", difficulty: "Easy" },
    { title: "Customer Who Visited but Did Not Make Any Transactions", timeAgo: "3 days ago", difficulty: "Easy" },
    { title: "Fix Names in a Table", timeAgo: "4 days ago", difficulty: "Easy" },
    { title: "Bank Account Summary II", timeAgo: "4 days ago", difficulty: "Easy" },
    { title: "Patients With a Condition", timeAgo: "5 days ago", difficulty: "Easy" },
    { title: "Find Users With Valid E-Mails", timeAgo: "6 days ago", difficulty: "Easy" },
    { title: "Group Sold Products By The Date", timeAgo: "7 days ago", difficulty: "Easy" },
    { title: "Top Travellers", timeAgo: "8 days ago", difficulty: "Easy" },
    { title: "Replace Employee ID With The Unique Identifier", timeAgo: "9 days ago", difficulty: "Easy" },
    { title: "List the Products Ordered in a Period", timeAgo: "9 days ago", difficulty: "Easy" },
    { title: "Students and Examinations", timeAgo: "10 days ago", difficulty: "Easy" },
    { title: "Average Selling Price", timeAgo: "11 days ago", difficulty: "Easy" },
  ],
};
