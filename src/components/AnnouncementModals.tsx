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
  const store = useContestStore();

  // Local state for the form inputs
  const [moduleNo, setModuleNo] = useState("");
  const [contestNo, setContestNo] = useState("");
  const [contestName, setContestName] = useState("");
  const [contestLink, setContestLink] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("07:00 PM");
  const [daysLeft, setDaysLeft] = useState(1);
  const [copied, setCopied] = useState(false);

  // Sync state with store values whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setModuleNo(store.moduleNo || "");
      setContestNo(store.contestNo || "");
      setContestName(store.contestName || "");
      setContestLink(store.contestLink || "");
      setEndDate(store.cpsEndDate || "");
      setEndTime("07:00 PM");
      setDaysLeft(1);
      setCopied(false);
    }
  }, [isOpen, store]);

  if (!isOpen) return null;

  // Formatting helpers
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

  // Generate template text
  const getAnnouncementText = () => {
    const endDateTimeStr = getFormattedEndDateTime();
    if (type === "missed") {
      return `@everyone CPS Academy Learners ✨

The ${titlePart || "TBD"} practice contest has already started.

If anyone missed the previous announcement, no worries — you still have plenty of time to participate and practice.

🔗 Contest Link: ${contestLink || "TBD"}
⏳ Contest Ends: ${endDateTimeStr}

Make sure to solve as many problems as possible and strengthen your understanding of ${contestName || "TBD"} before the deadline.

Best of luck, everyone 🌱`;
    } else {
      return `@everyone CPS Academy Learners ✨

Only ${daysLeft} ${daysLeft === 1 ? "day" : "days"} left before the **${titlePart || "TBD"}** practice contest ends.

If you still haven’t participated or solved enough problems yet, this is your final chance to practice and improve your understanding of the ${contestName || "TBD"}.

🔗 Contest Link: ${contestLink || "TBD"}
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">
              {type === "missed"
                ? "Missed Announcement Generator"
                : "Days Left Announcement Generator"}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Customize fields below to build your announcement dynamically.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div className="space-y-4">
              {type === "daysLeft" && (
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-zinc-400">
                    Days Left
                  </label>
                  <select
                    value={daysLeft}
                    onChange={(e) => setDaysLeft(Number(e.target.value))}
                    className="input-field py-2.5 cursor-pointer"
                  >
                    <option value={1}>1 Day</option>
                    <option value={2}>2 Days</option>
                    <option value={3}>3 Days</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
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
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="e.g. 07:00 PM"
                    className="input-field py-2"
                  />
                </div>
              </div>
            </div>

            {/* Live Text Preview & Copy */}
            <div className="flex flex-col h-full min-h-[350px]">
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
                className="w-full flex-1 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-sm resize-none focus:outline-none focus:border-zinc-700 h-full"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
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
