export interface Platform {
  id: string;
  name: string;
  color: string;
}

export interface ContestState {
  contestName: string;
  startDateTime: string;
  duration: number; // minutes
  selectedPlatforms: Platform[];
  activeTheme: string;
}

export interface ContestActions {
  setContestName: (name: string) => void;
  setStartDateTime: (dateTime: string) => void;
  setDuration: (minutes: number) => void;
  togglePlatform: (platform: Platform) => void;
  setActiveTheme: (theme: string) => void;
  reset: () => void;
}

export type ThemeConfig = {
  name: string;
  background: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
};

export type Themes = Record<string, ThemeConfig>;
