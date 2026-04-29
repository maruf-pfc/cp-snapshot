import { forwardRef } from "react";
import { useContestStore } from "../hooks/useContestStore";
import { themes } from "../utils/themes";
import { formatDuration } from "../utils/formatters";
import { format } from "date-fns";

interface SnapshotCardProps {
  themeKey?: string;
}

const SnapshotCard = forwardRef<HTMLDivElement, SnapshotCardProps>(
  ({ themeKey }, ref) => {
    const {
      contestName,
      startDateTime,
      timeLeft,
      duration,
      selectedPlatforms,
      activeTheme,
    } = useContestStore();
    const theme = themes[themeKey || activeTheme] || themes.midnight;

    const startTimeStr = startDateTime
      ? format(new Date(startDateTime), "MMM d, yyyy • HH:mm")
      : "Not specified";

    const timeLeftStr = timeLeft
      ? format(new Date(timeLeft), "MMM d, yyyy • HH:mm")
      : "Not specified";

    const durationStr = formatDuration(duration);
    const topAccent = selectedPlatforms[0]?.color || theme.accent;

    return (
      <div
        ref={ref}
        className="relative w-130 rounded-2xl overflow-hidden border"
        style={{
          background: `linear-gradient(165deg, ${theme.surface} 0%, ${theme.bg} 100%)`,
          borderColor: theme.border,
          boxShadow:
            "0 24px 60px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(${theme.border} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Watermark */}
        {selectedPlatforms.length > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={selectedPlatforms[0].logo}
              alt=""
              className="absolute -right-8 -bottom-8 w-64 h-64 object-contain opacity-[0.04] grayscale brightness-150 mix-blend-overlay"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${theme.bg}, transparent 60%)`,
              }}
            />
          </div>
        )}

        <div className="relative p-6 space-y-5">
          {/* Top accent */}
          <div
            className="h-0.5 w-full rounded-full -mt-6 -mx-6 mb-5"
            style={{ background: topAccent }}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1
                className="text-xl font-semibold tracking-tight truncate"
                style={{ color: theme.text }}
              >
                {contestName || "Contest Name"}
              </h1>

              {/* Platform pills */}
              {selectedPlatforms.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedPlatforms.map((platform) => (
                    <div
                      key={platform.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{
                        background: theme.surface,
                        borderColor: theme.border,
                        color: theme.text,
                      }}
                    >
                      <img
                        src={platform.logo}
                        alt=""
                        className="w-3.5 h-3.5 object-contain"
                      />
                      <span className="truncate max-w-25">{platform.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border shrink-0"
              style={{
                background: theme.surface,
                borderColor: theme.border,
                color: theme.textSec,
              }}
            >
              Live
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Starts", value: startTimeStr },
                { label: "Time Left", value: timeLeftStr },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl border"
                  style={{
                    background: theme.surface,
                    borderColor: theme.border,
                  }}
                >
                  <div
                    className="text-[10px] font-medium uppercase tracking-widest mb-1"
                    style={{ color: theme.textSec }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: theme.text }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="p-4 rounded-xl border"
              style={{ background: theme.surface, borderColor: theme.border }}
            >
              <div
                className="text-[10px] font-medium uppercase tracking-widest mb-1"
                style={{ color: theme.textSec }}
              >
                Duration
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: theme.text }}
              >
                {durationStr}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-4 border-t"
            style={{ borderColor: theme.border }}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: theme.accent }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: theme.accent }}
                />
              </span>
              <span
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: theme.textSec }}
              >
                Ready to compete
              </span>
            </div>
            <span
              className="text-[10px] font-mono"
              style={{ color: theme.textSec }}
            >
              cp-snapshot.dev
            </span>
          </div>
        </div>
      </div>
    );
  },
);

SnapshotCard.displayName = "SnapshotCard";
export default SnapshotCard;
