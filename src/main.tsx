import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import CPS from "./pages/CPS";
import CPSWeekly from "./pages/CPSWeekly";
import UmamiAnalytics from "./components/UmamiAnalytics";
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

        {/* /cps → redirect to /cps/cpc */}
        <Route path="/cps" element={<Navigate to="/cps/cpc" replace />} />
        <Route path="/cps/cpc" element={<CPS />} />
        <Route path="/cps/weekly" element={<CPSWeekly />} />

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
