import React from "react";
import { useContestStore } from "../hooks/useContestStore";
import { platforms } from "../utils/platforms";

const PlatformSelector: React.FC = () => {
  const { selectedPlatforms, selectPlatform } = useContestStore();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2.5">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.some(
            (p) => p.id === platform.id,
          );
          return (
            <button
              key={platform.id}
              onClick={() => selectPlatform(platform)}
              className={`
                group relative flex items-center gap-3 px-3 py-2.5 rounded-xl border 
                transition-all duration-200 ease-out text-left min-h-11 cursor-pointer
                ${
                  isSelected
                    ? "bg-(--accent)/10 border-(--accent)/50"
                    : "bg-(--surface) border-(--border) hover:border-(--border)/80 hover:bg-(--surface)/90"
                }
              `}
              style={
                {
                  "--accent": platform.color,
                  "--surface": "",
                  "--border": "",
                } as React.CSSProperties
              }
            >
              {/* Logo */}
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-5 h-5 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Name */}
              <span
                className={`text-sm font-medium truncate ${isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}
              >
                {platform.name}
              </span>

              {/* Radio Indicator */}
              <div
                className={`
                ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                ${isSelected ? "border-(--accent)" : "border-zinc-700 group-hover:border-zinc-500"}
              `}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-(--accent)" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Helper text when nothing selected */}
      {selectedPlatforms.length === 0 && (
        <p className="text-xs text-zinc-500">
          Select one platform to get started
        </p>
      )}
    </div>
  );
};

export default PlatformSelector;
