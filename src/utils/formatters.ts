import { format } from "date-fns";
import type { ContestState } from "../types";

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

export const formatContestInfo = (contest: ContestState): string => {
  const { contestName, startDateTime, duration, selectedPlatforms } = contest;
  const platforms = selectedPlatforms.map((p) => p.name).join(", ");
  const startTime = startDateTime
    ? format(new Date(startDateTime), "PPpp")
    : "Not specified";
  const durationStr = formatDuration(duration);

  return `📝 Contest: ${contestName}
🌐 Platforms: ${platforms}
🕐 Starts: ${startTime}
⏱️ Duration: ${durationStr}`;
};
