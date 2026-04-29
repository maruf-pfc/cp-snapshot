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
}

export interface ContestActions {
  setContestName: (name: string) => void;
  setStartDateTime: (dateTime: string) => void;
  setContestLink: (link: string) => void;
  setDuration: (minutes: number) => void;
  selectPlatform: (platform: Platform) => void;
  setActiveTheme: (theme: string) => void;
  reset: () => void;
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
