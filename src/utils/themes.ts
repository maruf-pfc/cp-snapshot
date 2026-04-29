import type { Themes } from "../types";

export const themes: Themes = {
  dark: {
    name: "Dark",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    cardBg: "#1e293b",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    accent: "#3b82f6",
    border: "#334155",
  },
  light: {
    name: "Light",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    cardBg: "#ffffff",
    textPrimary: "#0f172a",
    textSecondary: "#64748b",
    accent: "#2563eb",
    border: "#cbd5e1",
  },
  neon: {
    name: "Neon",
    background:
      "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
    cardBg: "#0f0f23",
    textPrimary: "#00ff88",
    textSecondary: "#00ccff",
    accent: "#00ff88",
    border: "#1a3a3a",
  },
  minimal: {
    name: "Minimal",
    background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
    cardBg: "#ffffff",
    textPrimary: "#171717",
    textSecondary: "#737373",
    accent: "#171717",
    border: "#e5e5e5",
  },
  codeforces: {
    name: "Codeforces",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    cardBg: "#232336",
    textPrimary: "#ffffff",
    textSecondary: "#8b8b9e",
    accent: "#0088cc",
    border: "#33334a",
  },
} as const;
