import PlatformSelector from "./components/PlatformSelector";
import ContestForm from "./components/ContestForm";
import ThemeSelector from "./components/ThemeSelector";
import SnapshotCard from "./components/SnapshotCard";
import ActionButtons from "./components/ActionButtons";
import { Trophy, Sparkles } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-xl">
              <Trophy className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CP Snapshot</h1>
              <p className="text-sm text-gray-500">
                Generate beautiful contest snapshots
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>v1.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-8">
            {/* Platform Selection */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full" />
                Select Platforms
              </h2>
              <PlatformSelector />
            </section>

            {/* Contest Form */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full" />
                Contest Details
              </h2>
              <ContestForm />
            </section>

            {/* Theme Selection */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full" />
                Theme
              </h2>
              <ThemeSelector />
            </section>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full" />
              Preview
            </h2>

            {/* Preview Container */}
            <div className="flex justify-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800 overflow-auto">
              <div data-snapshot-card>
                <SnapshotCard />
              </div>
            </div>

            {/* Action Buttons */}
            <ActionButtons />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-gray-600">
          Built with React 19 + Vite + TailwindCSS v4 • 100% client-side
        </div>
      </footer>
    </div>
  );
}

export default App;
