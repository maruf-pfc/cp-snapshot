export interface WeeklyContestData {
  weeklyContestNo: string;
  weeklyDate: string;
  weeklyTime: "7:00 PM" | "7:30 PM";
  juniorLink: string;
  seniorLink: string;
}

export const formatWeeklyAnnouncement = ({
  weeklyContestNo,
  weeklyDate,
  weeklyTime,
  juniorLink,
  seniorLink,
}: WeeklyContestData): string => {
  const no = weeklyContestNo || "?";

  const formatDay = (dateStr: string) => {
    if (!dateStr) return "TBD";
    // Parse without time component to avoid timezone shifts on the day label
    const parts = dateStr.split("-").map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return "TBD";
    const [year, month, day] = parts;
    const d = new Date(year, month - 1, day);
    if (isNaN(d.getTime())) return "TBD";
    return d.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const dayLabel = formatDay(weeklyDate);
  const jLink = juniorLink || "TBD";
  const sLink = seniorLink || "TBD";

  return `@everyone \nJunior and Senior CPS Weekly Contests - ${no} ✨ \n\nWe're excited to announce that the Junior and Senior CPS Weekly Contests ${no} are scheduled for ${dayLabel} at ${weeklyTime}\n\n🔗 Junior Contest: If you're a beginner or working on building your confidence, join the Junior CPS Weekly Contest here: [Junior Contest Link.](${jLink})\n\n🔗 Senior Contest: For those who are comfortable with our previous contest challenges, the Senior CPS Weekly Contest is available here: [Senior Contest Link.](${sLink})\n\nBest of luck to everyone participating.`;
};
