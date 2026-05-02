import { useEffect } from "react";

interface UmamiAnalyticsProps {
  websiteId: string;
  src: string;
}

export default function UmamiAnalytics({
  websiteId,
  src,
}: UmamiAnalyticsProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    script.dataset.websiteId = websiteId;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [src, websiteId]);

  return null;
}
