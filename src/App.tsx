import PlatformSelector from "./components/PlatformSelector";
import ContestForm from "./components/ContestForm";
import ThemeSelector from "./components/ThemeSelector";
import SnapshotCard from "./components/SnapshotCard";
import ActionButtons from "./components/ActionButtons";
import { Trophy, Sparkles } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Header with subtle animation */}
      <header className="border-b border-border-subtle bg-bg-base/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-primary/10 rounded-xl border border-accent-primary/20">
              <Trophy className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-linear-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                CP Snapshot
              </h1>
              <p className="text-xs text-text-muted">
                Craft beautiful contest cards
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Sparkles className="w-3.5 h-3.5 text-accent-secondary" />
            <span className="hidden sm:inline">v1.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-7">
            {/* Platform Selection */}
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-accent-primary rounded-full" />
                Platforms
              </h2>
              <PlatformSelector />
            </section>

            {/* Contest Form */}
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-accent-primary rounded-full" />
                Contest Details
              </h2>
              <ContestForm />
            </section>

            {/* Theme Selection */}
            <section className="card-base p-5 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <span className="w-1.5 h-5 bg-accent-primary rounded-full" />
                Theme
              </h2>
              <ThemeSelector />
            </section>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <span className="w-1.5 h-5 bg-accent-primary rounded-full" />
              Preview
            </h2>

            {/* Preview Container with subtle animation */}
            <div className="card-base p-6 flex justify-center items-center min-h-100 overflow-auto">
              <div
                data-snapshot-card
                className="transition-transform duration-300 hover:scale-[1.01]"
              >
                <SnapshotCard />
              </div>
            </div>

            {/* Action Buttons */}
            <ActionButtons />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-text-muted">
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
