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
  mode: "standard" | "cps";
  contestNo?: string;
  moduleNo?: string;
  cpsStartDate?: string;
  cpsEndDate?: string;
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
  setMode: (mode: "standard" | "cps") => void;
  setContestNo: (no: string) => void;
  setModuleNo: (no: string) => void;
  setCpsStartDate: (date: string) => void;
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
