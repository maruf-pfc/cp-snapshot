import React from "react";
import { useContestStore } from "../hooks/useContestStore";
import { platforms } from "../utils/platforms";
import clsx from "clsx";
import type { Platform } from "../types";

interface PlatformLogoProps {
  platform: Platform;
  size?: number;
}

const PlatformLogo: React.FC<PlatformLogoProps> = ({ platform, size = 24 }) => (
  <div
    className="flex items-center justify-center"
    style={{ width: size, height: size }}
  >
    <div
      className="rounded-lg flex items-center justify-center font-bold text-white text-xs"
      style={{ backgroundColor: platform.color, width: size, height: size }}
    >
      {platform.name.charAt(0)}
    </div>
  </div>
);

const PlatformSelector: React.FC = () => {
  const { selectedPlatforms, togglePlatform } = useContestStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {platforms.map((platform) => {
        const isSelected = selectedPlatforms.some((p) => p.id === platform.id);
        return (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform)}
            className={clsx(
              "flex items-center gap-3 p-3 rounded-xl border transition-all duration-200",
              "hover:shadow-lg active:scale-[0.98]",
              isSelected
                ? "bg-blue-600/10 border-blue-500 shadow-blue-500/10"
                : "bg-gray-800/50 border-gray-700 hover:border-gray-600",
            )}
          >
            <div
              className={clsx(
                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                isSelected ? "bg-blue-600 border-blue-600" : "border-gray-600",
              )}
            >
              {isSelected && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <PlatformLogo platform={platform} size={20} />
            <span className="text-sm font-medium text-gray-200">
              {platform.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PlatformSelector;
