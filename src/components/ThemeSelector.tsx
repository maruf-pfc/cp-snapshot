import React from "react";
import { useContestStore } from "../hooks/useContestStore";
import { themes } from "../utils/themes";

const ThemeSelector: React.FC = () => {
  const { activeTheme, setActiveTheme } = useContestStore();

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(themes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => setActiveTheme(key)}
          className={`
            px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
            border min-w-17.5 sm:min-w-0
            ${
              activeTheme === key
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                : "bg-zinc-800/50 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
            }
          `}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
