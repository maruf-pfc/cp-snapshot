import { create } from "zustand";
import type { ContestState, ContestActions } from "../types";

type ContestStore = ContestState & ContestActions;

export const useContestStore = create<ContestStore>()((set) => ({
  // Standard fields
  contestName: "",
  startDateTime: "",
  contestLink: "",
  duration: 120,
  selectedPlatforms: [],
  activeTheme: "midnight",

  // CPS fields
  mode: "standard",
  contestNo: "",
  moduleNo: "",
  cpsStartDate: "",
  cpsEndDate: "",

  // Weekly fields
  weeklyContestNo: "",
  weeklyDate: "",
  weeklyTime: "7:00 PM",
  juniorLink: "",
  seniorLink: "",

  // Standard actions
  setContestName: (name) => set({ contestName: name }),
  setStartDateTime: (dateTime) => set({ startDateTime: dateTime }),
  setContestLink: (link) => set({ contestLink: link }),
  setDuration: (minutes) => set({ duration: minutes }),
  selectPlatform: (platform) =>
    set((state) => {
      const isAlreadySelected = state.selectedPlatforms.some(
        (p) => p.id === platform.id,
      );
      return { selectedPlatforms: isAlreadySelected ? [] : [platform] };
    }),
  setActiveTheme: (theme) => set({ activeTheme: theme }),

  // CPS actions
  setMode: (mode: "standard" | "cps-cpc" | "cps-weekly") => set({ mode }),
  setContestNo: (no) => set({ contestNo: no }),
  setModuleNo: (no) => set({ moduleNo: no }),
  setCpsStartDate: (date) =>
    set(() => {
      // Auto-calculate end date: start + 10 days, both at 19:00
      if (!date) return { cpsStartDate: "", cpsEndDate: "" };

      const startDate = new Date(`${date}T19:00:00`);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 10);

      const formatDate = (d: Date) => d.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm

      return {
        cpsStartDate: date,
        cpsEndDate: formatDate(endDate).slice(0, 10), // Store just date part for input
      };
    }),

  // Weekly setters
  setWeeklyContestNo: (no) => set({ weeklyContestNo: no }),
  setWeeklyDate: (date) => set({ weeklyDate: date }),
  setWeeklyTime: (time) => set({ weeklyTime: time }),
  setJuniorLink: (link) => set({ juniorLink: link }),
  setSeniorLink: (link) => set({ seniorLink: link }),

  reset: () =>
    set({
      contestName: "",
      startDateTime: "",
      contestLink: "",
      duration: 120,
      selectedPlatforms: [],
      activeTheme: "midnight",
      mode: "standard",
      contestNo: "",
      moduleNo: "",
      cpsStartDate: "",
      cpsEndDate: "",
      weeklyContestNo: "",
      weeklyDate: "",
      weeklyTime: "7:00 PM",
      juniorLink: "",
      seniorLink: "",
    }),
}));
