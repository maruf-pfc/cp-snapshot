// src/pages/CpsPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContestStore } from "../hooks/useContestStore";
import { platforms } from "../utils/platforms";
import ThemeSelector from "../components/ThemeSelector";
import SnapshotCard from "../components/SnapshotCard";
import { Copy, Download, Check, Loader2, Star } from "lucide-react";
import { toPng } from "html-to-image";
import { formatCpsAnnouncement } from "../utils/cpsFormatter";

const CpsForm: React.FC = () => {
  const {
    contestName,
    contestNo,
    moduleNo,
    contestLink,
    cpsStartDate,
    cpsEndDate,
    setContestName,
    setContestNo,
    setModuleNo,
    setContestLink,
    setCpsStartDate,
  } = useContestStore();

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Contest Name
        </label>
        <input
          type="text"
          value={contestName}
          onChange={(e) => setContestName(e.target.value)}
          placeholder="e.g., Data types, Variables, Operators"
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Contest No
          </label>
          <input
            type="text"
            value={contestNo}
            onChange={(e) => setContestNo(e.target.value)}
            placeholder="e.g., 1"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Module No
          </label>
          <input
            type="text"
            value={moduleNo}
            onChange={(e) => setModuleNo(e.target.value)}
            placeholder="e.g., 1"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Contest Link
        </label>
        <input
          type="url"
          value={contestLink}
          onChange={(e) => setContestLink(e.target.value)}
          placeholder="https://vjudge.net/contest/..."
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Start Date
          </label>
          <input
            type="date"
            value={cpsStartDate}
            onChange={(e) => setCpsStartDate(e.target.value)}
            className="input-field"
          />
          <p className="text-xs text-zinc-500 mt-1">Time fixed at 7:00 PM</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            End Date
          </label>
          <input
            type="date"
            value={cpsEndDate}
            disabled
            className="input-field bg-zinc-800/30 cursor-not-allowed"
          />
          <p className="text-xs text-zinc-500 mt-1">Auto: Start + 10 days</p>
        </div>
      </div>
    </div>
  );
};

const CpsActionButtons: React.FC = () => {
  const [state, setState] = React.useState<"idle" | "loading" | "success">(
    "idle",
  );
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
    try {
      const url = await generateImage();
      if (!url) return;
      const a = document.createElement("a");
      a.download = `cps-${contest.contestNo || "contest"}-snap.png`;
      a.href = url;
      a.click();
    } catch {
      console.error("Download failed");
    }
  };

  const handleCopyAnnouncement = () => {
    navigator.clipboard.writeText(formatCpsAnnouncement(contest));
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopy}
        disabled={state !== "idle"}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all active:scale-[0.98] flex items-center gap-2 min-w-32.5 justify-center disabled:opacity-60 cursor-pointer"
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
        className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-xl border border-zinc-700 transition-all active:scale-[0.98] flex items-center gap-2 min-w-32.5 justify-center cursor-pointer"
      >
        <Download className="w-4 h-4" />
        Download PNG
      </button>
      <button
        onClick={handleCopyAnnouncement}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all active:scale-[0.98] flex items-center gap-2 min-w-32.5 justify-center cursor-pointer"
      >
        <Copy className="w-4 h-4" />
        Copy Announcement
      </button>
    </div>
  );
};

const CPS: React.FC = () => {
  const { mode, selectPlatform, setActiveTheme } = useContestStore();
  const navigate = useNavigate();
  const vjudge = platforms.find((p) => p.id === "vjudge");

  // Initialize CPS defaults on mount
  useEffect(() => {
    if (mode !== "cps") {
      // Set CPS mode + auto-select Vjudge
      useContestStore.getState().setMode("cps");
      if (vjudge) selectPlatform(vjudge);
      setActiveTheme("midnight");
    }
  }, [mode, selectPlatform, setActiveTheme, vjudge]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600/10 rounded-xl border border-emerald-600/20">
              <span className="text-emerald-500 font-bold text-sm">CPS</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">CPS Snapshot</h1>
              <p className="text-xs text-zinc-500">
                Academy contest announcements
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* GitHub Star Button */}
            <a
              href="https://github.com/maruf-pfc/cp-snapshot"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 cursor-pointer"
            >
              <Star className="w-4 h-4 text-yellow-400 group-hover:fill-yellow-400 transition-colors" />
              <span className="text-xs font-medium text-zinc-300 group-hover:text-zinc-100 hidden sm:inline">
                Star on GitHub
              </span>
              <svg
                className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* Back to Standard */}
            <button
              onClick={() => navigate("/")}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              ← Standard
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                Platform
              </h2>
              <p className="text-sm text-zinc-400">
                Vjudge selected by default
              </p>
              <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700 flex items-center gap-3">
                <img
                  src={vjudge?.logo}
                  alt="Vjudge"
                  className="w-6 h-6 object-contain"
                />
                <span className="font-medium">Vjudge</span>
                <span className="ml-auto text-xs text-emerald-400">
                  ✓ Selected
                </span>
              </div>
            </section>

            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                Contest Details
              </h2>
              <CpsForm />
            </section>

            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                Theme
              </h2>
              <ThemeSelector />
            </section>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
              Preview
            </h2>
            <div className="card-base p-4 sm:p-6 flex justify-center items-center overflow-hidden">
              <div data-snapshot-card className="w-full max-w-130">
                <SnapshotCard />
              </div>
            </div>
            <CpsActionButtons />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-zinc-600">
          CPS Academy • Private tool for contest announcements
        </div>
      </footer>
    </div>
  );
};

export default CPS;
