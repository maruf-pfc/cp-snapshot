# Changelog

All notable changes to CP Snapshot will be documented here.

## [1.0.0] - 29 April 2026

### ✨ Added

- Initial release with core snapshot generation
- 9 professional themes (Midnight, Dawn, Aurora, Forest, Sunset, Nord, Cyber, Dracula, Mono)
- Platform selection: Codeforces, LeetCode, CodeChef, AtCoder, Coding Ninjas, GeeksForGeeks
- Live auto-calculating "Time Left" countdown
- Contest link support (included in copied text)
- Export: Copy PNG, Download PNG, Copy formatted text
- Fully responsive mobile-first design
- 100% client-side, no backend required

### 🎨 Design

- Linear/Vercel-inspired aesthetic
- Subtle watermark effect with platform logos
- Frosted glass cards with depth and hierarchy
- Touch-optimized controls with 44px minimum targets

### 🔧 Technical

- React 19 + Vite + TypeScript
- TailwindCSS v4 with `@tailwindcss/vite` plugin
- Zustand 5 for lightweight state management
- html-to-image for high-quality PNG export
- ESLint + TypeScript strict mode

### 📱 Responsive Breakpoints

- Mobile: <640px (stacked layout, horizontal scroll preview)
- Tablet: 640px–1023px (adaptive grids)
- Desktop: ≥1024px (two-column layout)

## [1.0.1] - 1 May 2026

## 🎯 Feature Overview

Add dedicated `/cps` route for CPS Academy contest announcements with:

- Vjudge pre-selected as default platform
- Fixed 7:00 PM timing for start/end dates
- Auto-calculated 10-day contest duration
- Discord-ready announcement template with @everyone mention

## 📁 Files Added

- `src/pages/CpsPage.tsx` — Dedicated CPS page with custom form, preview, and actions
- `src/utils/cpsFormatter.ts` — Discord announcement template formatter
- `src/hooks/useLiveTimeLeft.ts` — Reusable hook for live countdown (extracted)

## 📁 Files Modified

### Types & State

- `src/types/index.ts` — Add CPS fields (mode, contestNo, moduleNo, cpsStartDate, cpsEndDate) + update ContestActions
- `src/utils/platforms.ts` — Add Vjudge platform entry with logo/color
- `src/hooks/useContestStore.ts` — Add CPS state management + auto end-date calculation (+10 days)

### Components

- `src/components/SnapshotCard.tsx` — Make card mode-aware:
  • Two-line CPS title: `MODULE-X | CONTEST-Y |` + contest name
  • CPS-specific fields: Starts/Ends (7PM), Duration: 10 days
  • Dynamic footer: "CPS Academy" + cpsacademy.io
  • Safe handling of undefined CPS dates (TypeScript fix)
- `src/components/PlatformSelector.tsx` — Update to use selectPlatform (single-select)
- `src/utils/formatters.ts` — Add calculateTimeLeft + defensive platform name handling
- `src/utils/cpsFormatter.ts` — Fix undefined date handling in formatDate

### Routing & Config

- `src/main.tsx` — Setup React Router with `/` and `/cps` routes
- `vite.config.ts` — Remove invalid historyApiFallback config

### UI Polish

- `src/styles/globals.css` — Add global cursor:pointer for interactive elements
- `src/App.tsx` — Keep standard home clean (no link to /cps)
- `src/pages/CpsPage.tsx` — Add mode indicator, Vjudge lock, helper text

## ✨ UX Improvements

- CPS mode auto-initializes: Vjudge selected, midnight theme, mode='cps'
- Start Date picker → End Date auto-fills (+10 days, both at 19:00)
- "Copy Announcement" button copies Discord-formatted message to clipboard
- Card preview updates live as CPS fields change
- Responsive design maintained across both routes

## 🔧 Technical Decisions

- Single platform selection enforced (radio behavior) for cleaner snapshots
- CPS dates stored as YYYY-MM-DD, time appended at render (19:00 fixed)
- formatCpsDate accepts string | undefined for type safety
- SnapshotCard reads mode from store directly (no prop drilling)
- React Router BrowserRouter used (SPA routing, no server config needed in dev)

## 🧪 Testing Checklist

✅ Visit `/` → Standard flow unchanged
✅ Visit `/cps` → Vjudge pre-selected, CPS form visible
✅ Enter CPS details → Card preview updates with Module/Contest header
✅ Pick Start Date → End Date auto-calculates +10 days
✅ Switch themes → Card colors update on both routes
✅ Copy Announcement → Discord template in clipboard with correct dates
✅ Build passes: `bun run build` → 0 TypeScript errors
✅ Export PNG → Clean render, no overlay bleed

## 🚀 Deployment Notes

- `/cps` is not linked from home page (intentionally private)
- For production: add rewrite rules in vercel.json / netlify.toml for SPA routing
- Optional: Add token-based access control for /cps route in future

_Format based on [Keep a Changelog](https://keepachangelog.com/)_
