import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useContestStore } from "../hooks/useContestStore";
import { platforms } from "../utils/platforms";
import SnapshotCard from "../components/SnapshotCard";
import ThemeSelector from "../components/ThemeSelector";
import { Copy, Download, Check, Loader2, Star, MessageSquareText } from "lucide-react";
import { toPng } from "html-to-image";
import { formatWeeklyAnnouncement } from "../utils/weeklyFormatter";

const WeeklyForm: React.FC = () => {
  const {
    weeklyContestNo,
    weeklyDate,
    weeklyTime,
    juniorLink,
    seniorLink,
    setWeeklyContestNo,
    setWeeklyDate,
    setWeeklyTime,
    setJuniorLink,
    setSeniorLink,
  } = useContestStore();

  return (
    <div className="space-y-5">
      {/* Contest Name — static, shown for context */}
      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Contest Name
        </label>
        <div className="input-field bg-zinc-800/30 text-zinc-500 cursor-not-allowed select-none">
          CPS Academy Weekly Contest
        </div>
      </div>

      {/* Contest Number */}
      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Contest Number
        </label>
        <input
          type="number"
          min="1"
          value={weeklyContestNo}
          onChange={(e) => setWeeklyContestNo(e.target.value)}
          placeholder="e.g., 86"
          className="input-field"
        />
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Contest Date
          </label>
          <input
            type="date"
            value={weeklyDate}
            onChange={(e) => setWeeklyDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-400">
            Start Time
          </label>
          <div className="flex gap-2">
            {(["7:00 PM", "7:30 PM"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setWeeklyTime(t)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                  weeklyTime === t
                    ? "bg-emerald-600/20 border-emerald-600/50 text-emerald-400"
                    : "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Junior Contest Link */}
      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Junior Contest Link
        </label>
        <input
          type="url"
          value={juniorLink}
          onChange={(e) => setJuniorLink(e.target.value)}
          placeholder="https://vjudge.net/contest/..."
          className="input-field"
        />
      </div>

      {/* Senior Contest Link */}
      <div>
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Senior Contest Link
        </label>
        <input
          type="url"
          value={seniorLink}
          onChange={(e) => setSeniorLink(e.target.value)}
          placeholder="https://vjudge.net/contest/..."
          className="input-field"
        />
      </div>
    </div>
  );
};

const WeeklyActionButtons: React.FC = () => {
  const [imgState, setImgState] = useState<"idle" | "loading" | "success">("idle");
  const [textState, setTextState] = useState<"idle" | "success">("idle");
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

  const handleCopyImage = async () => {
    if (imgState !== "idle") return;
    setImgState("loading");
    try {
      const url = await generateImage();
      if (!url) throw new Error("No image");
      const blob = await fetch(url).then((r) => r.blob());
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setImgState("success");
    } catch {
      setImgState("idle");
    }
    setTimeout(() => setImgState("idle"), 1500);
  };

  const handleDownload = async () => {
    try {
      const url = await generateImage();
      if (!url) return;
      const a = document.createElement("a");
      a.download = `cps-weekly-${contest.weeklyContestNo || "contest"}-snap.png`;
      a.href = url;
      a.click();
    } catch {
      console.error("Download failed");
    }
  };

  const handleCopyAnnouncement = () => {
    const text = formatWeeklyAnnouncement({
      weeklyContestNo: contest.weeklyContestNo,
      weeklyDate: contest.weeklyDate,
      weeklyTime: contest.weeklyTime,
      juniorLink: contest.juniorLink,
      seniorLink: contest.seniorLink,
    });
    navigator.clipboard.writeText(text);
    setTextState("success");
    setTimeout(() => setTextState("idle"), 1500);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopyImage}
        disabled={imgState !== "idle"}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all active:scale-[0.98] flex items-center gap-2 min-w-32 justify-center disabled:opacity-60 cursor-pointer"
      >
        {imgState === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : imgState === "success" ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {imgState === "success" ? "Copied!" : "Copy Image"}
      </button>

      <button
        onClick={handleDownload}
        className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-xl border border-zinc-700 transition-all active:scale-[0.98] flex items-center gap-2 min-w-32 justify-center cursor-pointer"
      >
        <Download className="w-4 h-4" />
        Download PNG
      </button>

      <button
        onClick={handleCopyAnnouncement}
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all active:scale-[0.98] flex items-center gap-2 min-w-32 justify-center cursor-pointer"
      >
        {textState === "success" ? (
          <Check className="w-4 h-4" />
        ) : (
          <MessageSquareText className="w-4 h-4" />
        )}
        {textState === "success" ? "Copied!" : "Copy Announcement"}
      </button>
    </div>
  );
};

export const CpsNav: React.FC = () => {
  const navigate = useNavigate();
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
      isActive
        ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
    }`;
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600/10 rounded-xl border border-emerald-600/20">
              <span className="text-emerald-500 font-bold text-sm">CPS</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">CPS Snapshot</h1>
              <p className="text-xs text-zinc-500">Academy contest announcements</p>
            </div>
          </div>

          {/* Sub-nav */}
          <nav className="hidden sm:flex items-center gap-1 ml-4">
            <NavLink to="/cps/cpc" className={navLinkClass}>
              CPC Contest
            </NavLink>
            <NavLink to="/cps/weekly" className={navLinkClass}>
              Weekly Contest
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
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
          </a>

          <button
            onClick={() => navigate("/")}
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            ← Standard
          </button>
        </div>
      </div>

      {/* Mobile sub-nav */}
      <div className="sm:hidden px-4 pb-3 flex gap-2">
        <NavLink to="/cps/cpc" className={navLinkClass}>
          CPC Contest
        </NavLink>
        <NavLink to="/cps/weekly" className={navLinkClass}>
          Weekly Contest
        </NavLink>
      </div>
    </header>
  );
};

const CPSWeekly: React.FC = () => {
  const { weeklyContestNo, weeklyDate, weeklyTime } = useContestStore();
  const vjudge = platforms.find((p) => p.id === "vjudge");

  // Synchronize Weekly state with Standard state for Preview Card
  useEffect(() => {
    const time24 = weeklyTime === "7:30 PM" ? "19:30" : "19:00";
    const dateTime = weeklyDate ? `${weeklyDate}T${time24}` : "";

    useContestStore.setState({
      contestName: `Junior & Senior CPS Weekly Contests ${weeklyContestNo ? `- ${weeklyContestNo}` : ""}`,
      startDateTime: dateTime,
      duration: 300, // 5 hours
    });
  }, [weeklyContestNo, weeklyDate, weeklyTime]);

  // Set vjudge + midnight theme on mount
  useEffect(() => {
    const store = useContestStore.getState();
    store.setMode("cps-weekly");
    if (vjudge) store.selectPlatform(vjudge);
    store.setActiveTheme("midnight");
    store.setDuration(300); // 5 hours
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <CpsNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ── Left Panel ── */}
          <div className="space-y-6">
            {/* Platform — fixed Vjudge */}
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                Platform
              </h2>
              <div className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700 flex items-center gap-3">
                <img
                  src={vjudge?.logo}
                  alt="Vjudge"
                  className="w-6 h-6 object-contain"
                />
                <span className="font-medium">Vjudge</span>
                <span className="ml-auto text-xs text-emerald-400">✓ Selected</span>
              </div>
            </section>

            {/* Contest Details form */}
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                Weekly Contest Details
              </h2>
              <WeeklyForm />
            </section>
          </div>

          {/* ── Right Panel ── */}
          <div className="space-y-6">
            {/* Snapshot card preview */}
            <div>
              <h2 className="text-base font-semibold flex items-center gap-2 mb-4">
                <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                Contest Card Preview
              </h2>
              <div className="card-base p-4 sm:p-6 flex justify-center items-center overflow-hidden">
                <div data-snapshot-card className="w-full max-w-130">
                  <SnapshotCard />
                </div>
              </div>
            </div>
            <WeeklyActionButtons />
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                Theme
              </h2>
              <ThemeSelector />
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-zinc-600">
          CPS Academy • Private tool for contest announcements
        </div>
      </footer>
    </div>
  );
};

export default CPSWeekly;
