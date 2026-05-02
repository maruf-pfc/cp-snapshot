import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CPS from "./pages/CPS";
import UmamiAnalytics from "./components/UmamiAnalytics"; // ← Import
import "./styles/globals.css";
import UmamiRouteTracker from "./components/UmamiRouteTracker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UmamiAnalytics
        websiteId={import.meta.env.VITE_UMAMI_WEBSITE_ID}
        src={import.meta.env.VITE_UMAMI_SRC}
      />

      <Routes>
        <Route path="*" element={<UmamiRouteTracker />} />
        <Route path="/" element={<App />} />
        <Route path="/cps" element={<CPS />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-zinc-400">
              Page not found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
