import React from "react";
import { useContestStore } from "../hooks/useContestStore";
import { Calendar, Clock } from "lucide-react";

const ContestForm: React.FC = () => {
  const {
    contestName,
    startDateTime,
    timeLeft,
    duration,
    setContestName,
    setStartDateTime,
    setTimeLeft,
    setDuration,
  } = useContestStore();

  const handleDurationHours = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value) || 0;
    const mins = duration % 60;
    setDuration(hours * 60 + mins);
  };

  const handleDurationMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(e.target.value) || 0;
    const hours = Math.floor(duration / 60);
    setDuration(hours * 60 + Math.min(mins, 59));
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
          Time Left
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="datetime-local"
            value={timeLeft}
            onChange={(e) => setTimeLeft(e.target.value)}
            className="input-field pl-11"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Duration
        </label>
        <div className="flex gap-2.5">
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
