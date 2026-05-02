import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function UmamiRouteTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (window.umami) {
      window.umami.trackView(pathname + search, document.referrer);
    }
  }, [pathname, search]);

  return null;
}
