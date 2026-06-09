import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import CPS from "./pages/CPS";
import CPSWeekly from "./pages/CPSWeekly";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Analytics />
      <Routes>
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
