import React from "react";
import { useContestStore } from "../hooks/useContestStore";
import { themes } from "../utils/themes";
import clsx from "clsx";

const ThemeSelector: React.FC = () => {
  const { activeTheme, setActiveTheme } = useContestStore();

  return (
    <div className="flex gap-3 flex-wrap">
      {Object.entries(themes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => setActiveTheme(key)}
          className={clsx(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            "hover:shadow-lg active:scale-[0.98]",
            activeTheme === key
              ? "bg-blue-600 text-white shadow-blue-500/25"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700",
          )}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
