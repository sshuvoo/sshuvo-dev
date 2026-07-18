"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type GridMode = "cartesian" | "polar" | "isometric";
export type ToolMode = "pan" | "pencil";

interface WorkspaceContextProps {
  gridMode: GridMode;
  setGridMode: (mode: GridMode) => void;
  toolMode: ToolMode;
  setToolMode: (mode: ToolMode) => void;
  cursorCoords: { x: number; y: number };
  setCursorCoords: (coords: { x: number; y: number }) => void;
  cameraCoords: { x: number; y: number; zoom: number };
  setCameraCoords: (coords: { x: number; y: number; zoom: number }) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  panToTarget: { x: number; y: number; zoom: number } | null;
  panTo: (x: number, y: number, zoom?: number) => void;
  clearStrokesTrigger: number;
  clearStrokes: () => void;
  viewMode: "workspace" | "reader";
  setViewMode: (mode: "workspace" | "reader") => void;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [gridMode, setGridMode] = useState<GridMode>("cartesian");
  const [toolMode, setToolMode] = useState<ToolMode>("pan");
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });
  const [cameraCoords, setCameraCoords] = useState({ x: 0, y: 0, zoom: 1 });
  const [activeSection, setActiveSection] = useState("origin");
  const [panToTarget, setPanToTarget] = useState<{ x: number; y: number; zoom: number } | null>(null);
  const [clearStrokesTrigger, setClearStrokesTrigger] = useState(0);
  const [viewMode, setViewMode] = useState<"workspace" | "reader">("workspace");

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("reader");
    }
  }, []);

  const panTo = useCallback((x: number, y: number, zoom = 1) => {
    setPanToTarget({ x, y, zoom });
    // Reset target after a short duration (letting the grid pick it up and animate)
    setTimeout(() => setPanToTarget(null), 100);
  }, []);

  const clearStrokes = useCallback(() => {
    setClearStrokesTrigger((prev) => prev + 1);
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        gridMode,
        setGridMode,
        toolMode,
        setToolMode,
        cursorCoords,
        setCursorCoords,
        cameraCoords,
        setCameraCoords,
        activeSection,
        setActiveSection,
        panToTarget,
        panTo,
        clearStrokesTrigger,
        clearStrokes,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
