export interface Platform {
  id: string;
  name: string;
  color: string;
  logo: string;
}

export interface ContestState {
  contestName: string;
  startDateTime: string;
  contestLink: string;
  duration: number;
  selectedPlatforms: Platform[];
  activeTheme: string;

  // CPS-specific fields
  mode: "standard" | "cps-cpc" | "cps-weekly";
  contestNo?: string;
  moduleNo?: string;
  cpsStartDate?: string;
  cpsEndDate?: string;

  // Weekly contest fields
  weeklyContestNo: string;
  weeklyDate: string;
  weeklyTime: "7:00 PM" | "7:30 PM";
  juniorLink: string;
  seniorLink: string;
}

export interface ContestActions {
  setContestName: (name: string) => void;
  setStartDateTime: (dateTime: string) => void;
  setContestLink: (link: string) => void;
  setDuration: (minutes: number) => void;
  selectPlatform: (platform: Platform) => void;
  setActiveTheme: (theme: string) => void;
  reset: () => void;

  // CPS actions
  setMode: (mode: "standard" | "cps-cpc" | "cps-weekly") => void;
  setContestNo: (no: string) => void;
  setModuleNo: (no: string) => void;
  setCpsStartDate: (date: string) => void;

  // Weekly actions
  setWeeklyContestNo: (no: string) => void;
  setWeeklyDate: (date: string) => void;
  setWeeklyTime: (time: "7:00 PM" | "7:30 PM") => void;
  setJuniorLink: (link: string) => void;
  setSeniorLink: (link: string) => void;
}

export type ThemeConfig = {
  name: string;
  bg: string;
  surface: string;
  text: string;
  textSec: string;
  accent: string;
  border: string;
};

export type Themes = Record<string, ThemeConfig>;
