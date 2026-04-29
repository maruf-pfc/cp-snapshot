import React, { forwardRef } from "react";
import { useContestStore } from "../hooks/useContestStore";
import { themes } from "../utils/themes";
import { formatDuration } from "../utils/formatters";
import { format } from "date-fns";
import type { Platform, ThemeConfig } from "../types";

interface PlatformBadgeProps {
  platform: Platform;
  theme: ThemeConfig;
}

const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform, theme }) => (
  <div
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
    style={{
      backgroundColor: theme.cardBg,
      border: `1px solid ${theme.border}`,
    }}
  >
    <div
      className="w-4 h-4 rounded flex items-center justify-center text-white text-xs font-bold"
      style={{ backgroundColor: platform.color }}
    >
      {platform.name.charAt(0)}
    </div>
    <span className="text-sm font-medium" style={{ color: theme.textPrimary }}>
      {platform.name}
    </span>
  </div>
);

interface SnapshotCardProps {
  themeKey?: string;
}

const SnapshotCard = forwardRef<HTMLDivElement, SnapshotCardProps>(
  ({ themeKey }, ref) => {
    const {
      contestName,
      startDateTime,
      duration,
      selectedPlatforms,
      activeTheme,
    } = useContestStore();
    const theme = themes[themeKey || activeTheme];

    const startTimeStr = startDateTime
      ? format(new Date(startDateTime), "PPpp")
      : "Not specified";

    const durationStr = formatDuration(duration);

    return (
      <div
        ref={ref}
        className="w-130 rounded-2xl overflow-hidden"
        style={{ background: theme.background }}
      >
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              {contestName || "Contest Name"}
            </h1>
            <div
              className="text-xs font-mono px-2 py-1 rounded"
              style={{
                backgroundColor: theme.accent + "20",
                color: theme.accent,
              }}
            >
              CONTEST
            </div>
          </div>

          {/* Platforms */}
          {selectedPlatforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedPlatforms.map((platform) => (
                <PlatformBadge
                  key={platform.id}
                  platform={platform}
                  theme={theme}
                />
              ))}
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                className="text-sm font-medium mb-1"
                style={{ color: theme.textSecondary }}
              >
                Starts
              </div>
              <div className="font-medium" style={{ color: theme.textPrimary }}>
                {startTimeStr}
              </div>
            </div>
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                className="text-sm font-medium mb-1"
                style={{ color: theme.textSecondary }}
              >
                Duration
              </div>
              <div className="font-medium" style={{ color: theme.textPrimary }}>
                {durationStr}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs" style={{ color: theme.textSecondary }}>
              Generated with CP Snapshot
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: theme.accent }}
              >
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

SnapshotCard.displayName = "SnapshotCard";

export default SnapshotCard;
