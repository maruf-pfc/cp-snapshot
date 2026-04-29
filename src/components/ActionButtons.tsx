import React, { useState } from "react";
import { Copy, Download, Share2, Check } from "lucide-react";
import { toPng } from "html-to-image";
import { useContestStore } from "../hooks/useContestStore";
import { formatContestInfo } from "../utils/formatters";

const ActionButtons: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [textCopied, setTextCopied] = useState(false);
  const contest = useContestStore();

  const generateImage = async (): Promise<string | null> => {
    const element = document.querySelector(
      "[data-snapshot-card]",
    ) as HTMLElement;
    if (!element) return null;

    return await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      cacheBust: true,
      style: { transform: "scale(1)" }, // Ensure no CSS transforms interfere
    });
  };

  const handleCopyImage = async () => {
    try {
      const dataUrl = await generateImage();
      if (!dataUrl) return;

      const blob = await fetch(dataUrl).then((r) => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy image:", err);
      // Fallback: show alert
      alert("Clipboard copy failed. Try downloading instead.");
    }
  };

  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    const link = document.createElement("a");
    link.download = `${contest.contestName || "contest"}-snapshot.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyText = () => {
    const text = formatContestInfo(contest);
    navigator.clipboard.writeText(text);
    setTextCopied(true);
    setTimeout(() => setTextCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopyImage}
        className="btn-primary flex items-center gap-2"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy Image"}
      </button>

      <button
        onClick={handleDownload}
        className="btn-secondary flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download PNG
      </button>

      <button
        onClick={handleCopyText}
        className="btn-secondary flex items-center gap-2"
      >
        {textCopied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
        {textCopied ? "Copied!" : "Copy Info"}
      </button>
    </div>
  );
};

export default ActionButtons;
