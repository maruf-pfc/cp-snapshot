import type { ContestState } from "../types";

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

export const calculateTimeLeft = (startDateTime: string): string => {
  if (!startDateTime) return "Not specified";
  const now = new Date();
  const start = new Date(startDateTime);
  const diff = start.getTime() - now.getTime();

  if (diff <= 0) return "Started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  let res = "";
  if (days > 0) res += `${days}d `;
  if (hours > 0 || days > 0) res += `${hours}h `;
  res += `${minutes}m`;
  return res.trim() || "Now";
};

export const formatContestInfo = (contest: ContestState): string => {
  const {
    contestName,
    startDateTime,
    duration,
    selectedPlatforms,
    contestLink,
  } = contest;
  const platforms = selectedPlatforms.map((p) => p.name).join(", ");
  const startTime = startDateTime
    ? new Date(startDateTime).toLocaleString()
    : "Not specified";
  const durationStr = formatDuration(duration);
  const timeLeft = calculateTimeLeft(startDateTime);

  let text = `📝 Contest: ${contestName}
🌐 Platforms: ${platforms}
🕐 Starts: ${startTime}
⏱️ Duration: ${durationStr}
⏳ Time Left: ${timeLeft}`;

  if (contestLink) {
    text += `\n🔗 Link: ${contestLink}`;
  }

  return text;
};
