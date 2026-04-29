import type { Platform } from "../types";

export const platforms: readonly Platform[] = [
  { id: "codeforces", name: "Codeforces", color: "#1e88e5" },
  { id: "leetcode", name: "LeetCode", color: "#ffa116" },
  { id: "codechef", name: "CodeChef", color: "#5b4638" },
  { id: "atcoder", name: "AtCoder", color: "#3c5aa6" },
  { id: "kaggle", name: "Kaggle", color: "#20beff" },
  { id: "codingninjas", name: "Coding Ninjas", color: "#ff6b35" },
  { id: "gfg", name: "GeeksForGeeks", color: "#2f8d46" },
] as const;
