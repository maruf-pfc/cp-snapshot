import React from "react";
import { useContestStore } from "../hooks/useContestStore";
import { platforms } from "../utils/platforms";
import { Check } from "lucide-react";

const PlatformSelector: React.FC = () => {
  const { selectedPlatforms, togglePlatform } = useContestStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {platforms.map((platform) => {
        const isSelected = selectedPlatforms.some((p) => p.id === platform.id);
        return (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform)}
            className={`
              group relative flex items-center gap-3 px-3 py-2.5 rounded-xl border 
              transition-all duration-200 ease-out text-left min-h-11
              ${
                isSelected
                  ? "bg-(--accent)/10 border-(--accent)/50 shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                  : "bg-(--surface) border-(--border) hover:border-(--border)/80 hover:bg-(--surface)/90"
              }
            `}
            style={{ "--accent": platform.color } as React.CSSProperties}
          >
            <div className="w-7 h-7 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
              <img
                src={platform.logo}
                alt={platform.name}
                className="w-5 h-5 object-contain"
                loading="lazy"
              />
            </div>
            <span
              className={`text-sm font-medium truncate ${isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}
            >
              {platform.name}
            </span>
            <div
              className={`ml-auto w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${isSelected ? "border-(--accent) bg-(--accent)" : "border-zinc-700 group-hover:border-zinc-500"}`}
            >
              {isSelected && (
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PlatformSelector;
