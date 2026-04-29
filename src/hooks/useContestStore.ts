import { create } from "zustand";
import type { ContestState, ContestActions } from "../types";

type ContestStore = ContestState & ContestActions;

export const useContestStore = create<ContestStore>()((set) => ({
  contestName: "",
  startDateTime: "",
  duration: 120,
  selectedPlatforms: [],
  activeTheme: "midnight",

  setContestName: (name) => set({ contestName: name }),
  setStartDateTime: (dateTime) => set({ startDateTime: dateTime }),
  setDuration: (minutes) => set({ duration: minutes }),
  togglePlatform: (platform) =>
    set((state) => {
      const exists = state.selectedPlatforms.find((p) => p.id === platform.id);
      return {
        selectedPlatforms: exists
          ? state.selectedPlatforms.filter((p) => p.id !== platform.id)
          : [...state.selectedPlatforms, platform],
      };
    }),
  setActiveTheme: (theme) => set({ activeTheme: theme }),
  reset: () =>
    set({
      contestName: "",
      startDateTime: "",
      duration: 120,
      selectedPlatforms: [],
    }),
}));
