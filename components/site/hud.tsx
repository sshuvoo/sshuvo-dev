"use client";

import { useWorkspace, GridMode, ToolMode } from "@/lib/workspace-context";
import { ThemeToggle } from "@/components/site/theme-toggle";
import {
  Hand,
  Pencil,
  Grid3X3,
  Compass,
  Trash2,
  HelpCircle,
  Activity,
  Code,
  Map,
  X,
  FileText,
  Mail
} from "lucide-react";
import { useState } from "react";

export function HUD() {
  const {
    gridMode,
    setGridMode,
    toolMode,
    setToolMode,
    cursorCoords,
    cameraCoords,
    activeSection,
    panTo,
    clearStrokes,
    viewMode,
    setViewMode,
  } = useWorkspace();

  const [showHelp, setShowHelp] = useState(true);

  // Return the active mathematical formula text for HUD display
  const getFormula = () => {
    switch (activeSection) {
      case "work":
        return "T(n) = O(log n)";
      case "lab":
        return "dx/dt = v_x(x,y,t)";
      case "experience":
        return "G = (V, E)";
      case "contact":
        return "S = k_B * ln(Ω)";
      case "origin":
      default:
        return "f(t) = Σ c_n * e^(2πint)";
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "work":
        return "01 // SYSTEMS WORKSPACE";
      case "lab":
        return "02 // PHYSICS & MATH LAB";
      case "experience":
        return "03 // CAREER TOPOLOGY";
      case "contact":
        return "04 // CONTACT NETWORK";
      case "origin":
      default:
        return "00 // ORIGIN SECTION";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 font-secondary select-none">
      {/* TOP HEADER STATUS HUD */}
      <div className="flex w-full items-start justify-between gap-4 pointer-events-auto">
        {/* Left Status HUD */}
        <div className="flex flex-col gap-1 rounded-xl border border-border bg-background/80 p-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-2xs font-semibold tracking-widest text-muted-foreground uppercase">
              GRID STATUS: ONLINE
            </span>
          </div>
          <h2 className="text-xs font-bold text-foreground transition-all duration-300">
            {getSectionTitle()}
          </h2>
          <div className="font-mono text-2xs text-muted-foreground font-medium select-text">
            {getFormula()}
          </div>
        </div>

        {/* Right Controls HUD */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 shadow-lg backdrop-blur-md">
          <button
            onClick={() => setViewMode(viewMode === "workspace" ? "reader" : "workspace")}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 font-secondary text-[10px] font-bold text-muted-foreground transition-all hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:outline-none"
            title="Toggle between Canvas workspace and static document layout"
          >
            <Activity className="size-3.5" />
            <span>{viewMode === "workspace" ? "READER VIEW" : "WORKSPACE VIEW"}</span>
          </button>
          {viewMode === "workspace" && (
            <button
              onClick={() => setShowHelp((prev) => !prev)}
              className={`inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:outline-none ${
                showHelp ? "bg-muted text-foreground" : ""
              }`}
              title="Help / Keyboard shortcuts"
            >
              <HelpCircle className="size-4" />
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* MID PANEL SECTION SHORTCUTS NAVIGATION */}
      {viewMode === "workspace" && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 pointer-events-auto">
          {[
            { label: "ORIGIN", id: "origin", x: 0, y: 0, zoom: 1 },
            { label: "WORK", id: "work", x: 1400, y: 0, zoom: 0.95 },
            { label: "LAB", id: "lab", x: 0, y: 1000, zoom: 0.95 },
            { label: "TIMELINE", id: "experience", x: -1400, y: 0, zoom: 0.95 },
            { label: "CONTACT", id: "contact", x: 0, y: -1000, zoom: 1 },
          ].map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => panTo(item.x, item.y, item.zoom)}
                className={`group flex items-center justify-between rounded-lg border border-border px-3 py-2 text-left font-secondary text-[10px] font-bold tracking-wider shadow-md transition-all duration-300 w-28 md:w-32 bg-background/85 hover:bg-muted focus-visible:ring-3 focus-visible:outline-none ${
                  isActive
                    ? "border-primary text-foreground bg-primary/5 ring-1 ring-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{`0${idx} ${item.label}`}</span>
                <span className="opacity-0 group-hover:opacity-100 text-2xs transition-opacity duration-300 text-muted-foreground">
                  (x,y)
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* FLOATING DIAGNOSTICS & HELP HUD */}
      {viewMode === "workspace" && showHelp && (
        <div className="absolute right-4 top-1/3 -translate-y-1/2 max-w-xs rounded-xl border border-border bg-background/95 p-4 shadow-xl pointer-events-auto backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
            <span className="text-2xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
              <Compass className="size-3.5 animate-spin" /> USER GUIDE
            </span>
            <button
              onClick={() => setShowHelp(false)}
              className="text-muted-foreground hover:text-foreground focus-visible:outline-none"
            >
              <X className="size-3.5" />
            </button>
          </div>
          <ul className="space-y-2 text-2xs text-muted-foreground">
            <li>
              ✋ <strong className="text-foreground">Pan:</strong> Drag background or use standard touch gestures to slide the coordinate grid.
            </li>
            <li>
              🔍 <strong className="text-foreground">Zoom:</strong> Scroll mouse wheel or pinch trackpad to zoom in/out (from 15% to 300%).
            </li>
            <li>
              ✏️ <strong className="text-foreground">Scribble:</strong> Select Pencil mode below and draw directly on any coordinate surface.
            </li>
            <li>
              ⌨️ <strong className="text-foreground">Accessibility:</strong> Press <code className="rounded border border-border bg-muted px-1 py-0.5">Tab</code> to automatically jump-pan coordinates.
            </li>
          </ul>
        </div>
      )}

      {/* BOTTOM CONTROL & DIAGNOSTICS DECK */}
      {viewMode === "workspace" && (
        <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-end justify-between gap-3 pointer-events-auto mt-auto">
          {/* Bottom Left: Coordinates Panel */}
          <div className="flex items-center gap-4 rounded-xl border border-border bg-background/85 px-4 py-3 shadow-lg backdrop-blur-md text-[10px] text-muted-foreground">
            <div className="flex flex-col gap-0.5 border-r border-border pr-4">
              <span className="text-2xs font-bold text-muted-foreground">POINTER COORDS</span>
              <div className="flex gap-3 text-foreground font-mono font-bold text-xs">
                <span>X: {cursorCoords.x}</span>
                <span>Y: {cursorCoords.y}</span>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 border-r border-border pr-4">
              <span className="text-2xs font-bold text-muted-foreground">CAMERA CENTER</span>
              <span className="text-foreground font-mono text-[11px] font-semibold">
                ({cameraCoords.x}, {cameraCoords.y})
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-2xs font-bold text-muted-foreground">ZOOM FACTOR</span>
              <span className="text-foreground font-mono text-[11px] font-semibold">
                {cameraCoords.zoom}%
              </span>
            </div>
          </div>

          {/* Bottom Right: Tools & Modifiers Deck */}
          <div className="flex items-center flex-wrap gap-2.5 rounded-xl border border-border bg-background/85 p-2.5 shadow-lg backdrop-blur-md">
            {/* Tool Selector Toggle */}
            <div className="flex items-center gap-0.5 border-r border-border pr-2.5 mr-0.5">
              {[
                { id: "pan", icon: Hand, label: "Pan Screen" },
                { id: "pencil", icon: Pencil, label: "Pencil Sketch" },
              ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setToolMode(tool.id as ToolMode)}
                  className={`inline-flex size-8 items-center justify-center rounded-md transition-all focus-visible:outline-none ${
                    toolMode === tool.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={tool.label}
                >
                  <tool.icon className="size-4" />
                </button>
              ))}
            </div>

            {/* Grid Style Modifier Toggle */}
            <div className="flex items-center gap-0.5 border-r border-border pr-2.5 mr-0.5">
              {[
                { id: "cartesian", label: "Cartesian", title: "Cartesian Grid" },
                { id: "polar", label: "Polar", title: "Concentric Polar Grid" },
                { id: "isometric", label: "Isometric", title: "Isometric drafting grid" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setGridMode(mode.id as GridMode)}
                  className={`px-2 py-1 text-2xs font-bold rounded-md tracking-wider transition-all focus-visible:outline-none ${
                    gridMode === mode.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  title={mode.title}
                >
                  {mode.id.toUpperCase().slice(0, 3)}
                </button>
              ))}
            </div>

            {/* Drawing Clear Action */}
            <button
              onClick={clearStrokes}
              className="inline-flex size-8 items-center justify-center rounded-md border border-border/80 text-muted-foreground transition-all hover:bg-destructive/15 hover:border-destructive hover:text-destructive focus-visible:outline-none"
              title="Erase Workspace Drawings"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
