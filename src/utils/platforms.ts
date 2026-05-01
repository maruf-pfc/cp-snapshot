import type { Platform } from "../types";

export const platforms: readonly Platform[] = [
  {
    id: "codeforces",
    name: "Codeforces",
    color: "#3B82F6",
    logo: "/logos/codeforces.png",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    color: "#F59E0B",
    logo: "/logos/leetcode.png",
  },
  {
    id: "codechef",
    name: "CodeChef",
    color: "#6366F1",
    logo: "/logos/codechef.jpg",
  },
  {
    id: "atcoder",
    name: "AtCoder",
    color: "#22D3EE",
    logo: "/logos/atcoder.png",
  },
  {
    id: "codingninjas",
    name: "Coding Ninjas",
    color: "#EC4899",
    logo: "/logos/codingninjas.png",
  },
  {
    id: "gfg",
    name: "GeeksForGeeks",
    color: "#10B981",
    logo: "/logos/geeksforgeeks.png",
  },

  // Added Vjudge for CPS
  {
    id: "vjudge",
    name: "Vjudge",
    color: "#F1FD00",
    logo: "/logos/vjudge.jpeg",
  },
] as const;
