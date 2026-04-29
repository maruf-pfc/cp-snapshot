import React from "react";
import { useContestStore } from "../hooks/useContestStore";
import { Calendar, Clock } from "lucide-react";

const ContestForm: React.FC = () => {
  const {
    contestName,
    startDateTime,
    duration,
    setContestName,
    setStartDateTime,
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
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Contest Name
        </label>
        <input
          type="text"
          value={contestName}
          onChange={(e) => setContestName(e.target.value)}
          placeholder="e.g., Codeforces Round 923 (Div. 3)"
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Start Time
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            className="input-field pl-12"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Duration
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="number"
              min="0"
              max="48"
              value={Math.floor(duration / 60)}
              onChange={handleDurationHours}
              placeholder="Hours"
              className="input-field pl-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
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
              placeholder="Minutes"
              className="input-field"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestForm;
