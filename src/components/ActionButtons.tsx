import React, { useState } from "react";
import { Copy, Download, Share2, Check, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { useContestStore } from "../hooks/useContestStore";
import { formatContestInfo } from "../utils/formatters";

const ActionButtons: React.FC = () => {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [dlState, setDlState] = useState<"idle" | "loading">("idle");
  const [txtState, setTxtState] = useState<"idle" | "success">("idle");
  const contest = useContestStore();

  const generateImage = async (): Promise<string | null> => {
    const el = document.querySelector("[data-snapshot-card]") as HTMLElement;
    if (!el) return null;
    return await toPng(el, {
      quality: 1.0,
      pixelRatio: 2,
      cacheBust: true,
      style: { transform: "none" },
    });
  };

  const handleCopy = async () => {
    if (state !== "idle") return;
    setState("loading");
    try {
      const url = await generateImage();
      if (!url) throw new Error("No image");
      const blob = await fetch(url).then((r) => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setState("success");
    } catch {
      setState("idle");
    }
    setTimeout(() => setState("idle"), 1500);
  };

  const handleDownload = async () => {
    if (dlState !== "idle") return;
    setDlState("loading");
    try {
      const url = await generateImage();
      if (!url) throw new Error("No image");
      const a = document.createElement("a");
      a.download = `${contest.contestName || "contest"}-snap.png`;
      a.href = url;
      a.click();
    } catch {
      console.error("DL failed");
    }
    setTimeout(() => setDlState("idle"), 800);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(formatContestInfo(contest));
    setTxtState("success");
    setTimeout(() => setTxtState("idle"), 1500);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopy}
        disabled={state !== "idle"}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all active:scale-[0.98] flex items-center gap-2 min-w-32.5 justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {state === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : state === "success" ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {state === "success" ? "Copied!" : "Copy Image"}
      </button>
      <button
        onClick={handleDownload}
        disabled={dlState !== "idle"}
        className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-xl border border-zinc-700 transition-all active:scale-[0.98] flex items-center gap-2 min-w-32.5 justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {dlState === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {dlState === "loading" ? "Saving..." : "Download PNG"}
      </button>
      <button
        onClick={handleCopyText}
        disabled={txtState !== "idle"}
        className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-xl border border-zinc-700 transition-all active:scale-[0.98] flex items-center gap-2 min-w-32.5 justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {txtState === "success" ? (
          <Check className="w-4 h-4" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
        {txtState === "success" ? "Copied!" : "Copy Info"}
      </button>
    </div>
  );
};

export default ActionButtons;
