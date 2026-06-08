import { format } from "date-fns";
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

  // Format dates: "16 May 2026 07:00 pm"
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "TBD";
    const d = new Date(`${dateStr}T19:00:00`);
    const dateFormatted = format(d, "d MMM yyyy hh:mm");
    const ampm = format(d, "a").toLowerCase();
    return `${dateFormatted} ${ampm}`;
  };

  const startDayMonth = cpsStartDate
    ? format(new Date(`${cpsStartDate}T19:00:00`), "d MMMM")
    : "TBD";

  const startFormatted = formatDate(cpsStartDate);
  const endFormatted = formatDate(cpsEndDate);

  // Sanitize: only use contestLink if it actually looks like a URL
  const safeLink = contestLink?.startsWith("http") ? contestLink : "TBD";

  const moduleLabel = moduleNo ? `Module-${moduleNo}` : "";
  const contestLabel = contestNo ? `Contest-${contestNo}` : "";
  const prefix = [moduleLabel, contestLabel].filter(Boolean).join(" | ");
  const fullTitle = prefix ? `${prefix}: ${contestName}` : contestName;

  return `@everyone CPS Academy Learners ✨

Practice contest on **${contestName || "TBD"}** is going to start on ${startDayMonth}.

Get ready for **${fullTitle || "TBD"}**, an exciting opportunity to test your understanding and sharpen your problem-solving skills. 

🔗 Contest Link: ${safeLink}
🗓️ Starts: ${startFormatted}
⏳ Ends: ${endFormatted}

Whether you're just starting or brushing up on the basics, this is the perfect chance to learn, compete, and grow together. 🌱

Be ready - the contest begins soon!
Best of luck, everyone.`;
};

