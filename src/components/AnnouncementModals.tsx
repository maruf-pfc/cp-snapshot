import React, { useState, useEffect } from "react";
import { useContestStore } from "../hooks/useContestStore";
import { format } from "date-fns";
import { X, Check, Copy } from "lucide-react";

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "missed" | "daysLeft";
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  // Local state for the form inputs
  const [moduleNo, setModuleNo] = useState("");
  const [contestNo, setContestNo] = useState("");
  const [contestName, setContestName] = useState("");
  const [contestLink, setContestLink] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState<"07:00 PM" | "07:30 PM">("07:00 PM");
  const [daysLeft, setDaysLeft] = useState(1);
  const [copied, setCopied] = useState(false);

  // Bug fix: destructure only the primitive values we need to avoid
  // the entire store object as a dep (which triggers re-sync on every
  // keystroke inside the modal, resetting user edits).
  const storeModuleNo = useContestStore((s) => s.moduleNo);
  const storeContestNo = useContestStore((s) => s.contestNo);
  const storeContestName = useContestStore((s) => s.contestName);
  const storeContestLink = useContestStore((s) => s.contestLink);
  const storeCpsEndDate = useContestStore((s) => s.cpsEndDate);

  // Sync from store only when the modal first opens, not on every re-render
  useEffect(() => {
    if (isOpen) {
      setModuleNo(storeModuleNo || "");
      setContestNo(storeContestNo || "");
      setContestName(storeContestName || "");
      setContestLink(storeContestLink || "");
      setEndDate(storeCpsEndDate || "");
      setEndTime("07:00 PM");
      setDaysLeft(1);
      setCopied(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // intentionally only on open/close toggle

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Format the end date + selected time
  const getFormattedEndDateTime = () => {
    if (!endDate) return "TBD";
    try {
      const d = new Date(`${endDate}T19:00:00`);
      return `${format(d, "d MMM yyyy")} ${endTime}`;
    } catch {
      return `${endDate} ${endTime}`;
    }
  };

  const prefix = [
    moduleNo ? `Module-${moduleNo}` : "",
    contestNo ? `Contest-${contestNo}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

  const titlePart = prefix ? `${prefix}: ${contestName}` : contestName;

  // Sanitize: only use contestLink if it's actually a URL
  const safeLink = contestLink?.startsWith("http") ? contestLink : "TBD";

  const getAnnouncementText = () => {
    const endDateTimeStr = getFormattedEndDateTime();
    if (type === "missed") {
      return `@everyone CPS Academy Learners ✨

The ${titlePart || "TBD"} practice contest has already started.

If anyone missed the previous announcement, no worries — you still have plenty of time to participate and practice.

🔗 Contest Link: ${safeLink}
⏳ Contest Ends: ${endDateTimeStr}

Make sure to solve as many problems as possible and strengthen your understanding of ${contestName || "TBD"} before the deadline.

Best of luck, everyone 🌱`;
    } else {
      return `@everyone CPS Academy Learners ✨

Only ${daysLeft} ${daysLeft === 1 ? "day" : "days"} left before the **${titlePart || "TBD"}** practice contest ends.

If you still haven't participated or solved enough problems yet, this is your final chance to practice and improve your understanding of the ${contestName || "TBD"}.

🔗 Contest Link: ${safeLink}
⏳ Ends: ${endDateTimeStr}

Try to solve as many problems as possible before the deadline. Consistent practice is the key to improvement in competitive programming.

Best of luck, everyone 🌱`;
    }
  };

  const announcementText = getAnnouncementText();

  const handleCopy = () => {
    navigator.clipboard.writeText(announcementText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Backdrop click closes modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/80 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 px-5 sm:px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-100">
              {type === "missed"
                ? "Missed Announcement Generator"
                : "Days Left Announcement Generator"}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Fields are pre-filled from the main form. Edit as needed.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {/* ── Form ── */}
            <div className="space-y-4">
              {/* Days Left — only for daysLeft type */}
              {type === "daysLeft" && (
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-400">
                    Days Left
                  </label>
                  <div className="flex gap-2">
                    {([1, 2, 3] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDaysLeft(d)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                          daysLeft === d
                            ? "bg-amber-600/20 border-amber-500/50 text-amber-400"
                            : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                        }`}
                      >
                        {d} {d === 1 ? "Day" : "Days"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Module + Contest No */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-400">
                    Module No
                  </label>
                  <input
                    type="text"
                    value={moduleNo}
                    onChange={(e) => setModuleNo(e.target.value)}
                    placeholder="e.g. 5"
                    className="input-field py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-400">
                    Contest No
                  </label>
                  <input
                    type="text"
                    value={contestNo}
                    onChange={(e) => setContestNo(e.target.value)}
                    placeholder="e.g. 4"
                    className="input-field py-2"
                  />
                </div>
              </div>

              {/* Contest Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-zinc-400">
                  Contest Name
                </label>
                <input
                  type="text"
                  value={contestName}
                  onChange={(e) => setContestName(e.target.value)}
                  placeholder="e.g. Disjoint Set Union (DSU)"
                  className="input-field py-2"
                />
              </div>

              {/* Contest Link */}
              <div>
                <label className="block text-sm font-medium mb-1.5 text-zinc-400">
                  Contest Link
                </label>
                <input
                  type="url"
                  value={contestLink}
                  onChange={(e) => setContestLink(e.target.value)}
                  placeholder="https://vjudge.net/contest/..."
                  className="input-field py-2"
                />
              </div>

              {/* End Date + Time toggle */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-400">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-field py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-400">
                    End Time
                  </label>
                  <div className="flex gap-2">
                    {(["07:00 PM", "07:30 PM"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setEndTime(t)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          endTime === t
                            ? "bg-emerald-600/20 border-emerald-600/50 text-emerald-400"
                            : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Live Preview ── */}
            <div className="flex flex-col min-h-[280px] lg:min-h-0">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-zinc-400">
                  Live Preview
                </label>
                <span className="text-[10px] uppercase font-bold text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded">
                  Generated Text
                </span>
              </div>
              <textarea
                readOnly
                value={announcementText}
                className="w-full flex-1 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs sm:text-sm resize-none focus:outline-none focus:border-zinc-700"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 sm:px-6 py-4 border-t border-zinc-800 bg-zinc-900/50 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCopy}
            className={`px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
              copied
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Everything
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
