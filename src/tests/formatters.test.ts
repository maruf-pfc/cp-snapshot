import { describe, test, expect } from "bun:test";
import { formatDuration, calculateTimeLeft, formatContestInfo } from "../utils/formatters";
import type { ContestState } from "../types";

describe("formatDuration", () => {
  test("formats 0 minutes as 0m", () => {
    expect(formatDuration(0)).toBe("0m");
  });

  test("formats exact hours", () => {
    expect(formatDuration(120)).toBe("2h");
    expect(formatDuration(60)).toBe("1h");
  });

  test("formats minutes only", () => {
    expect(formatDuration(45)).toBe("45m");
  });

  test("formats mixed hours and minutes", () => {
    expect(formatDuration(135)).toBe("2h 15m");
  });
});

describe("calculateTimeLeft", () => {
  test("returns Not specified for empty date", () => {
    expect(calculateTimeLeft("")).toBe("Not specified");
  });

  test("returns Started for past dates", () => {
    expect(calculateTimeLeft("2020-01-01T12:00:00")).toBe("Started");
  });

  test("calculates duration for future dates correctly", () => {
    const futureDate = new Date();
    // Add 1 day, 2 hours, 3 minutes
    futureDate.setDate(futureDate.getDate() + 1);
    futureDate.setHours(futureDate.getHours() + 2);
    futureDate.setMinutes(futureDate.getMinutes() + 3);

    const timeLeft = calculateTimeLeft(futureDate.toISOString());
    expect(timeLeft).toContain("1d");
    expect(timeLeft).toContain("2h");
  });
});

describe("formatContestInfo", () => {
  test("generates announcement text string", () => {
    const contest: ContestState = {
      contestName: "Test Contest",
      startDateTime: "2026-12-31T19:00:00",
      contestLink: "https://codeforces.com/contest/123",
      duration: 150,
      selectedPlatforms: [
        { id: "codeforces", name: "Codeforces", color: "#3B82F6", logo: "/logos/codeforces.png" }
      ],
      activeTheme: "midnight",
      mode: "standard",
      weeklyContestNo: "",
      weeklyDate: "",
      weeklyTime: "7:00 PM",
      juniorLink: "",
      seniorLink: ""
    };

    const text = formatContestInfo(contest);
    expect(text).toContain("Test Contest");
    expect(text).toContain("Codeforces");
    expect(text).toContain("2h 30m");
    expect(text).toContain("https://codeforces.com/contest/123");
  });
});
