import { useMemo, useReducer, useEffect } from "react";
import { calculateTimeLeft } from "../utils/formatters";

/**
 * Returns live-updating time left string.
 * Re-calculates every second when startDateTime is set.
 * Uses useReducer to force re-renders without violating React rules.
 */
export const useLiveTimeLeft = (startDateTime: string): string => {
  // Dummy state to force re-renders for live updates
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Set up interval to trigger re-renders
  useEffect(() => {
    if (!startDateTime) return;
    const timer = setInterval(forceUpdate, 1000);
    return () => clearInterval(timer);
  }, [startDateTime]);

  // Calculate value during render (cached with useMemo)
  return useMemo(() => calculateTimeLeft(startDateTime), [startDateTime]);
};
