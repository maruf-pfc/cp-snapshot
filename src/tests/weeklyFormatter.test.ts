import { describe, test, expect } from "bun:test";
import { formatWeeklyAnnouncement } from "../utils/weeklyFormatter";

describe("formatWeeklyAnnouncement", () => {
  test("formats announcement correctly with valid inputs", () => {
    const data = {
      weeklyContestNo: "42",
      weeklyDate: "2026-06-20",
      weeklyTime: "7:30 PM" as const,
      juniorLink: "https://vjudge.net/junior",
      seniorLink: "https://vjudge.net/senior",
    };

    const text = formatWeeklyAnnouncement(data);
    expect(text).toContain("Junior and Senior CPS Weekly Contests - 42");
    expect(text).toContain("Saturday 20 June");
    expect(text).toContain("7:30 PM");
    expect(text).toContain("https://vjudge.net/junior");
    expect(text).toContain("https://vjudge.net/senior");
  });

  test("uses TBD placeholders for missing links and date", () => {
    const data = {
      weeklyContestNo: "",
      weeklyDate: "",
      weeklyTime: "7:00 PM" as const,
      juniorLink: "",
      seniorLink: "",
    };

    const text = formatWeeklyAnnouncement(data);
    expect(text).toContain("Junior and Senior CPS Weekly Contests - ?");
    expect(text).toContain("scheduled for TBD");
    expect(text).toContain("Junior Contest Link.](TBD)");
    expect(text).toContain("Senior Contest Link.](TBD)");
  });

  test("handles malformed date string safely", () => {
    const data = {
      weeklyContestNo: "12",
      weeklyDate: "invalid-date",
      weeklyTime: "7:00 PM" as const,
      juniorLink: "",
      seniorLink: "",
    };

    const text = formatWeeklyAnnouncement(data);
    expect(text).toContain("scheduled for TBD");
  });
});
