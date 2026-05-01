import { forwardRef } from "react";
import { useContestStore } from "../hooks/useContestStore";
import { themes } from "../utils/themes";
import { formatDuration } from "../utils/formatters";
import { format } from "date-fns";
import { useLiveTimeLeft } from "../hooks/useLiveTimeLeft";

interface SnapshotCardProps {
  themeKey?: string;
}

const SnapshotCard = forwardRef<HTMLDivElement, SnapshotCardProps>(
  ({ themeKey }, ref) => {
    const store = useContestStore();
    const {
      contestName,
      startDateTime,
      duration,
      selectedPlatforms,
      activeTheme,

      // CPS fields
      mode,
      contestNo,
      moduleNo,
      cpsStartDate,
      cpsEndDate,
    } = store;

    const theme = themes[themeKey || activeTheme] || themes.midnight;
    const isCps = mode === "cps";

    // Live time left for standard mode
    const liveTimeLeft = useLiveTimeLeft(isCps ? "" : startDateTime);

    // Format helpers
    const formatCpsDate = (dateStr: string | undefined) => {
      if (!dateStr) return "TBD";
      const d = new Date(`${dateStr}T19:00:00`);
      return d
        .toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "");
    };

    // Standard mode values
    const startTimeStr = startDateTime
      ? format(new Date(startDateTime), "MMM d, yyyy • HH:mm")
      : "Not specified";
    const durationStr = formatDuration(duration);

    // CPS mode values
    const cpsStartFormatted = formatCpsDate(cpsStartDate);
    const cpsEndFormatted = formatCpsDate(cpsEndDate);

    // Dynamic accent based on selected platform or theme
    const topAccent = selectedPlatforms[0]?.color || theme.accent;

    return (
      <div
        ref={ref}
        className="relative w-full max-w-130 min-w-70 rounded-2xl overflow-hidden border mx-auto"
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

        <div className="relative p-5 sm:p-6 space-y-4 sm:space-y-5">
          {/* Top accent */}
          <div
            className="h-0.5 w-full rounded-full -mt-5 -mx-5 sm:-mt-6 sm:-mx-6 mb-4"
            style={{ background: topAccent }}
          />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* CPS Mode: Two-line title */}
              {isCps ? (
                <div className="space-y-0.5">
                  {/* Line 1: Module/Contest identifiers */}
                  <div
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: theme.accent }}
                  >
                    {[
                      moduleNo ? `Module-${moduleNo}` : "",
                      contestNo ? `Contest-${contestNo}` : "",
                    ]
                      .filter(Boolean)
                      .join(" | ")}
                    {/* Add trailing pipe if we have identifiers but also a name */}
                    {(moduleNo || contestNo) && contestName ? " |" : ""}
                  </div>
                  {/* Line 2: Contest name */}
                  <h1
                    className="text-lg sm:text-xl font-semibold tracking-tight truncate"
                    style={{ color: theme.text }}
                  >
                    {contestName || "Contest Name"}
                  </h1>
                </div>
              ) : (
                /* Standard Mode: Single-line title */
                <h1
                  className="text-lg sm:text-xl font-semibold tracking-tight truncate"
                  style={{ color: theme.text }}
                >
                  {contestName || "Contest Name"}
                </h1>
              )}

              {/* Platform badge */}
              {selectedPlatforms.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2.5">
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
                      <span className="truncate max-w-22.5 sm:max-w-25">
                        {platform.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status badge */}
            <div
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border self-start shrink-0"
              style={{
                background: theme.surface,
                borderColor: theme.border,
                color: theme.textSec,
              }}
            >
              {isCps ? "10 Days" : "Live"}
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-3">
            {isCps ? (
              // CPS mode: Start + End dates
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
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
                    Starts
                  </div>
                  <div
                    className="text-sm font-medium truncate"
                    style={{ color: theme.text }}
                  >
                    {cpsStartFormatted}
                  </div>
                </div>
                <div
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
                    Ends
                  </div>
                  <div
                    className="text-sm font-medium truncate"
                    style={{ color: theme.text }}
                  >
                    {cpsEndFormatted}
                  </div>
                </div>
              </div>
            ) : (
              // Standard mode: Starts + Time Left
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
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
                    Starts
                  </div>
                  <div
                    className="text-sm font-medium truncate"
                    style={{ color: theme.text }}
                  >
                    {startTimeStr}
                  </div>
                </div>
                <div
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
                    Time Left
                  </div>
                  <div
                    className="text-sm font-medium truncate"
                    style={{ color: theme.text }}
                  >
                    {liveTimeLeft}
                  </div>
                </div>
              </div>
            )}

            {/* Duration row (shared) */}
            <div
              className="p-4 rounded-xl border"
              style={{ background: theme.surface, borderColor: theme.border }}
            >
              <div
                className="text-[10px] font-medium uppercase tracking-widest mb-1"
                style={{ color: theme.textSec }}
              >
                {isCps ? "Duration" : "Duration"}
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: theme.text }}
              >
                {isCps ? "10 days" : durationStr}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4 border-t"
            style={{ borderColor: theme.border }}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
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
                {isCps ? "CPS Academy" : "Ready to compete"}
              </span>
            </div>
            <span
              className="text-[10px] font-mono text-left sm:text-right"
              style={{ color: theme.textSec }}
            >
              {isCps ? "cpsacademy.io" : "cp-snapshot.vercel.app"}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

SnapshotCard.displayName = "SnapshotCard";
export default SnapshotCard;
