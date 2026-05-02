export {};

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
      trackView: (url: string, referrer?: string) => void;
    };
  }
}
