import React from "react";
import { useContestStore } from "../hooks/useContestStore";
import { Calendar, Clock, Link } from "lucide-react";
import { useLiveTimeLeft } from "../hooks/useLiveTimeLeft";

const ContestForm: React.FC = () => {
  const {
    contestName,
    startDateTime,
    contestLink,
    duration,
    setContestName,
    setStartDateTime,
    setContestLink,
    setDuration,
  } = useContestStore();

  // ← Live time left via custom hook (no setState in effect!)
  const liveTimeLeft = useLiveTimeLeft(startDateTime);

  const handleDurationHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value) || 0;
    setDuration(hours * 60 + (duration % 60));
  };

  const handleDurationMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(e.target.value) || 0;
    setDuration(Math.floor(duration / 60) * 60 + Math.min(mins, 59));
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Contest Name
        </label>
        <input
          type="text"
          value={contestName}
          onChange={(e) => setContestName(e.target.value)}
          placeholder="e.g., Codeforces Round 923"
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Starts In
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="input-field pl-11"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Contest Link
          </label>
          <div className="relative">
            <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="url"
              value={contestLink}
              onChange={(e) => setContestLink(e.target.value)}
              placeholder="https://codeforces.com/..."
              className="input-field pl-11"
            />
          </div>
        </div>
      </div>

      {/* Live Time Left Display */}
      <div className="p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/50 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">Time Left</span>
        <span className="text-sm font-mono font-semibold text-zinc-100">
          {liveTimeLeft}
        </span>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Duration
        </label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="number"
              min="0"
              max="48"
              value={Math.floor(duration / 60)}
              onChange={handleDurationHours}
              placeholder="0"
              className="input-field pl-11"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">
              hrs
            </span>
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              min="0"
              max="59"
              value={duration % 60}
              onChange={handleDurationMinutes}
              placeholder="0"
              className="input-field"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">
              min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestForm;
