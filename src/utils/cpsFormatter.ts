import type { ContestState } from "../types";

export const formatCpsAnnouncement = (contest: ContestState): string => {
  const {
    contestName,
    contestNo,
    moduleNo,
    contestLink,
    cpsStartDate,
    cpsEndDate,
  } = contest;

  // Format dates: "1 May 2026, 07:00 PM"
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "TBD";
    const d = new Date(`${dateStr}T19:00:00`);
    return d
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  const startFormatted = formatDate(cpsStartDate);
  const endFormatted = formatDate(cpsEndDate);
  const moduleLabel = moduleNo ? `Module-${moduleNo}` : "";
  const contestLabel = contestNo ? `Contest-${contestNo}` : "";
  const title = [moduleLabel, contestLabel, contestName]
    .filter(Boolean)
    .join(" | ");

  return `@everyone CPS Academy Learners ✨

Your very first practice contest on Data types, Variables, Operators is going to start today.

Get ready for ${title}: Data types, Variables, Operators— an exciting opportunity to test your understanding and sharpen your problem-solving skills. 

🔗 Contest Link: ${contestLink || "TBD"}
🗓️ Starts: ${startFormatted}
⏳ Ends: ${endFormatted}

Whether you're just starting or brushing up on the basics, this is the perfect chance to learn, compete, and grow together. 🌱

Be ready - the contest begins soon!
Best of luck, everyone.`;
};
