import { describe, test, expect } from "bun:test";
import { formatCpsAnnouncement } from "../utils/cpsFormatter";
import type { ContestState } from "../types";

describe("formatCpsAnnouncement", () => {
  test("generates announcement for valid details", () => {
    const contest: ContestState = {
      contestName: "Segment Tree",
      startDateTime: "",
      contestNo: "3",
      moduleNo: "6",
      contestLink: "https://vjudge.net/contest/123",
      duration: 14400,
      selectedPlatforms: [],
      activeTheme: "midnight",
      mode: "cps-cpc",
      cpsStartDate: "2026-06-15",
      cpsEndDate: "2026-06-25",
      weeklyContestNo: "",
      weeklyDate: "",
      weeklyTime: "7:00 PM",
      juniorLink: "",
      seniorLink: ""
    };

    const text = formatCpsAnnouncement(contest);
    expect(text).toContain("Segment Tree");
    expect(text).toContain("Module-6 | Contest-3");
    expect(text).toContain("https://vjudge.net/contest/123");
    expect(text).toContain("15 June");
    expect(text).toContain("25 Jun");
  });

  test("uses TBD fallback for invalid contest links", () => {
    const contest: ContestState = {
      contestName: "Segment Tree",
      startDateTime: "",
      contestNo: "3",
      moduleNo: "6",
      contestLink: "invalid-link",
      duration: 14400,
      selectedPlatforms: [],
      activeTheme: "midnight",
      mode: "cps-cpc",
      cpsStartDate: "2026-06-15",
      cpsEndDate: "2026-06-25",
      weeklyContestNo: "",
      weeklyDate: "",
      weeklyTime: "7:00 PM",
      juniorLink: "",
      seniorLink: ""
    };

    const text = formatCpsAnnouncement(contest);
    expect(text).toContain("Contest Link: TBD");
  });

  test("handles empty/undefined dates gracefully", () => {
    const contest: ContestState = {
      contestName: "Segment Tree",
      startDateTime: "",
      contestNo: "",
      moduleNo: "",
      contestLink: "",
      duration: 0,
      selectedPlatforms: [],
      activeTheme: "midnight",
      mode: "cps-cpc",
      cpsStartDate: "",
      cpsEndDate: "",
      weeklyContestNo: "",
      weeklyDate: "",
      weeklyTime: "7:00 PM",
      juniorLink: "",
      seniorLink: ""
    };

    const text = formatCpsAnnouncement(contest);
    expect(text).toContain("start on TBD");
    expect(text).toContain("Contest Link: TBD");
    expect(text).toContain("Starts: TBD");
    expect(text).toContain("Ends: TBD");
  });
});
