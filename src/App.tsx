import PlatformSelector from "./components/PlatformSelector";
import ContestForm from "./components/ContestForm";
import ThemeSelector from "./components/ThemeSelector";
import SnapshotCard from "./components/SnapshotCard";
import ActionButtons from "./components/ActionButtons";
import { Trophy, Star } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header - NO link to /cps */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-600/20">
              <Trophy className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                CP Snapshot
              </h1>
              <p className="text-xs text-zinc-500">
                Craft beautiful contest cards
              </p>
            </div>
          </div>

          {/* GitHub Star Button */}
          <a
            href="https://github.com/maruf-pfc/cp-snapshot"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 cursor-pointer"
          >
            <Star className="w-4 h-4 text-yellow-400 group-hover:fill-yellow-400 transition-colors" />
            <span className="text-xs font-medium text-zinc-300 group-hover:text-zinc-100">
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
        </div>
      </header>

      {/* Main Content - Same as before */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
                Platforms
              </h2>
              <PlatformSelector />
            </section>
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
                Contest Details
              </h2>
              <ContestForm />
            </section>
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
                Theme
              </h2>
              <ThemeSelector />
            </section>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
              Preview
            </h2>
            <div className="card-base p-4 sm:p-6 flex justify-center items-center overflow-hidden">
              <div data-snapshot-card className="w-full max-w-130">
                <SnapshotCard />
              </div>
            </div>
            <ActionButtons />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-zinc-600">
          Crafted with ❤️ for competitive programmers •{" "}
          <a
            href="https://www.linkedin.com/in/mdmarufsarker"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Md. Maruf Sarker
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
