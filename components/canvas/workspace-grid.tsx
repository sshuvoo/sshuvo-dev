"use client";

import { useEffect, useRef, useState } from "react";
import { useWorkspace } from "@/lib/workspace-context";

interface Point {
  x: number;
  y: number;
}

export function WorkspaceGrid({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    gridMode,
    toolMode,
    setCursorCoords,
    setCameraCoords,
    panToTarget,
    clearStrokesTrigger,
    setActiveSection,
  } = useWorkspace();

  // Camera settings (in coordinate space)
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1 });
  const targetCameraRef = useRef({ x: 0, y: 0, zoom: 1 });

  // Panning state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const cameraStart = useRef({ x: 0, y: 0 });

  // Drawing state
  const isDrawing = useRef(false);
  const strokesRef = useRef<Point[][]>([]);
  const currentStrokeRef = useRef<Point[]>([]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Clear sketches when trigger updates
  useEffect(() => {
    if (clearStrokesTrigger > 0) {
      strokesRef.current = [];
    }
  }, [clearStrokesTrigger]);

  // Handle external pan/zoom fly-tos from the context
  useEffect(() => {
    if (panToTarget) {
      targetCameraRef.current = {
        x: panToTarget.x,
        y: panToTarget.y,
        zoom: panToTarget.zoom,
      };
    }
  }, [panToTarget]);

  // Main Canvas Render Loop and Spring Interpolation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

    const getThemeColor = (varName: string) => {
      if (typeof window === "undefined") return "#888";
      return getComputedStyle(canvas).getPropertyValue(varName).trim();
    };

    const drawLoop = () => {
      // 1. Interpolate camera towards target
      const cam = cameraRef.current;
      const target = targetCameraRef.current;
      const easing = 0.12;

      cam.x += (target.x - cam.x) * easing;
      cam.y += (target.y - cam.y) * easing;
      cam.zoom += (target.zoom - cam.zoom) * easing;

      // Update state for HUD display
      setCameraCoords({
        x: Math.round(cam.x),
        y: Math.round(cam.y),
        zoom: Math.round(cam.zoom * 100),
      });

      // Calculate screen translations
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const translateX = -cam.x * cam.zoom + w / 2;
      const translateY = -cam.y * cam.zoom + h / 2;

      // Apply transform to the HTML elements container for pixel-perfect match
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${cam.zoom})`;
      }

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Colors from active CSS variables
      const borderTheme = getThemeColor("--border") || "rgba(128,128,128,0.12)";
      const labelTheme = getThemeColor("--muted-foreground") || "#888888";
      const inkTheme = getThemeColor("--primary") || "#000000";

      ctx.save();

      // Draw Grid System
      let step = 100;
      // Adjust step size depending on zoom scale to avoid grid saturation
      if (step * cam.zoom < 60) step = 200;
      if (step * cam.zoom < 60) step = 500;
      if (step * cam.zoom < 60) step = 1000;
      if (step * cam.zoom > 350) step = 50;
      if (step * cam.zoom > 350) step = 20;

      // Calculate bounds in coordinate space
      const minX = -translateX / cam.zoom;
      const maxX = (w - translateX) / cam.zoom;
      const minY = -translateY / cam.zoom;
      const maxY = (h - translateY) / cam.zoom;

      ctx.lineWidth = 0.6;
      ctx.font = "10px var(--font-secondary, monospace)";

      if (gridMode === "cartesian") {
        const startX = Math.floor(minX / step) * step;
        const startY = Math.floor(minY / step) * step;

        // Draw vertical lines
        for (let x = startX; x <= maxX; x += step) {
          const sx = x * cam.zoom + translateX;
          const isAxis = Math.abs(x) < 0.1;
          ctx.strokeStyle = isAxis ? getThemeColor("--foreground") || "#555" : borderTheme;
          ctx.lineWidth = isAxis ? 1.2 : 0.6;
          ctx.beginPath();
          ctx.moveTo(sx, 0);
          ctx.lineTo(sx, h);
          ctx.stroke();

          // Label tick coordinates along X axis
          if (!isAxis) {
            ctx.fillStyle = labelTheme;
            ctx.fillText(x.toString(), sx + 4, translateY - 4);
          }
        }

        // Draw horizontal lines
        for (let y = startY; y <= maxY; y += step) {
          const sy = y * cam.zoom + translateY;
          const isAxis = Math.abs(y) < 0.1;
          ctx.strokeStyle = isAxis ? getThemeColor("--foreground") || "#555" : borderTheme;
          ctx.lineWidth = isAxis ? 1.2 : 0.6;
          ctx.beginPath();
          ctx.moveTo(0, sy);
          ctx.lineTo(w, sy);
          ctx.stroke();

          // Label tick coordinates along Y axis
          if (!isAxis) {
            ctx.fillStyle = labelTheme;
            ctx.fillText((-y).toString(), translateX + 4, sy - 4); // Y axis inverted standard layout
          }
        }

        // Origin label
        ctx.fillStyle = getThemeColor("--foreground");
        ctx.fillText("(0, 0)", translateX + 6, translateY + 12);
      } else if (gridMode === "polar") {
        // Center of polar coordinates is origin
        ctx.strokeStyle = borderTheme;

        // Circles radii
        const maxDist = Math.hypot(Math.max(Math.abs(minX), Math.abs(maxX)), Math.max(Math.abs(minY), Math.abs(maxY)));
        const startR = step;

        for (let r = startR; r <= maxDist; r += step) {
          ctx.beginPath();
          ctx.arc(translateX, translateY, r * cam.zoom, 0, Math.PI * 2);
          ctx.stroke();

          // Label radius
          ctx.fillStyle = labelTheme;
          ctx.fillText(`r=${r}`, translateX + r * cam.zoom + 4, translateY - 4);
        }

        // Radials every 30 degrees (pi / 6)
        const radialsCount = 12;
        for (let i = 0; i < radialsCount; i++) {
          const angle = (i * Math.PI) / 6;
          const isAxis = i % 3 === 0; // major axes (0, pi/2, pi, 3pi/2)
          ctx.strokeStyle = isAxis ? getThemeColor("--foreground") || "#555" : borderTheme;
          ctx.lineWidth = isAxis ? 1.0 : 0.5;

          const dx = Math.cos(angle) * maxDist * cam.zoom;
          const dy = Math.sin(angle) * maxDist * cam.zoom;

          ctx.beginPath();
          ctx.moveTo(translateX, translateY);
          ctx.lineTo(translateX + dx, translateY + dy);
          ctx.stroke();

          // Radical angular markers
          const labelAngle = ["0", "π/6", "π/3", "π/2", "2π/3", "5π/6", "π", "7π/6", "4π/3", "3π/2", "5π/3", "11π/6"][i];
          const dist = 120 * cam.zoom;
          if (dist > 50) {
            ctx.fillStyle = labelTheme;
            const lx = translateX + Math.cos(angle) * (dist) + 4;
            const ly = translateY + Math.sin(angle) * (dist) - 4;
            ctx.fillText(labelAngle, lx, ly);
          }
        }
      } else if (gridMode === "isometric") {
        // Draw isometric grid (lines at 30 deg, 150 deg, and vertical)
        const cos30 = Math.cos(Math.PI / 6);
        const sin30 = Math.sin(Math.PI / 6);
        const gridStep = step * 1.5;

        // Draw vertical lines
        const startX = Math.floor(minX / gridStep) * gridStep;
        for (let x = startX; x <= maxX; x += gridStep) {
          const sx = x * cam.zoom + translateX;
          ctx.strokeStyle = borderTheme;
          ctx.beginPath();
          ctx.moveTo(sx, 0);
          ctx.lineTo(sx, h);
          ctx.stroke();
        }

        // Draw diagonal lines (+30 deg and -30 deg)
        // Set of lines: y = +/- x * tan(30) + offset
        // In screen coordinates: sy = translateY + (y * zoom), sx = translateX + (x * zoom)
        const diagStep = gridStep * sin30 * 2;
        const startY = Math.floor((minY - maxX * 0.577) / diagStep) * diagStep;
        const endY = Math.ceil((maxY + maxX * 0.577) / diagStep) * diagStep;

        ctx.strokeStyle = borderTheme;
        for (let offset = startY; offset <= endY; offset += diagStep) {
          // sy = 0.577 * sx + offset
          // x_screen = x * zoom + translateX, y_screen = y * zoom + translateY
          // sy1 = 0 (top of screen), sx1 = (0 - offset) / 0.577
          // sy2 = h (bottom of screen), sx2 = (h - offset) / 0.577
          const sx1 = (minX * cos30) * cam.zoom + translateX;
          const sy1 = (minX * sin30 + offset) * cam.zoom + translateY;
          const sx2 = (maxX * cos30) * cam.zoom + translateX;
          const sy2 = (maxX * sin30 + offset) * cam.zoom + translateY;

          ctx.beginPath();
          ctx.moveTo(sx1, sy1);
          ctx.lineTo(sx2, sy2);
          ctx.stroke();

          // Mirror diagonals (-30 deg)
          const sy1_m = (-minX * sin30 + offset) * cam.zoom + translateY;
          const sy2_m = (-maxX * sin30 + offset) * cam.zoom + translateY;
          ctx.beginPath();
          ctx.moveTo(sx1, sy1_m);
          ctx.lineTo(sx2, sy2_m);
          ctx.stroke();
        }
      }

      // Draw dashed connector lines between coordinate card clusters
      ctx.save();
      ctx.strokeStyle = borderTheme;
      ctx.lineWidth = 1.4;
      ctx.setLineDash([5, 8]);
      
      const cardCenters = [
        { x: -1400, y: 0 },
        { x: 1400, y: 0 },
        { x: 0, y: 1000 },
        { x: 0, y: -1000 },
      ];
      
      cardCenters.forEach((pt) => {
        ctx.beginPath();
        ctx.moveTo(translateX, translateY);
        ctx.lineTo(pt.x * cam.zoom + translateX, pt.y * cam.zoom + translateY);
        ctx.stroke();

        // Target diamond node symbol at card origin coordinates
        ctx.fillStyle = getThemeColor("--foreground") || "#555";
        ctx.beginPath();
        const px = pt.x * cam.zoom + translateX;
        const py = pt.y * cam.zoom + translateY;
        ctx.moveTo(px, py - 4);
        ctx.lineTo(px + 4, py);
        ctx.lineTo(px, py + 4);
        ctx.lineTo(px - 4, py);
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();

      // Draw visitor drawn strokes (pinned to coordinate space)
      ctx.strokeStyle = inkTheme;
      ctx.lineWidth = 2.0;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const drawStroke = (stroke: Point[]) => {
        if (stroke.length < 1) return;
        ctx.beginPath();
        const p0 = stroke[0];
        ctx.moveTo(p0.x * cam.zoom + translateX, p0.y * cam.zoom + translateY);
        for (let i = 1; i < stroke.length; i++) {
          const p = stroke[i];
          ctx.lineTo(p.x * cam.zoom + translateX, p.y * cam.zoom + translateY);
        }
        ctx.stroke();
      };

      // Draw all historical strokes
      strokesRef.current.forEach(drawStroke);

      // Draw current stroke in progress
      if (isDrawing.current) {
        drawStroke(currentStrokeRef.current);
      }

      ctx.restore();
      rafId = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [gridMode, setCameraCoords]);

  // Handle Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      setDimensions({ width: rect.width, height: rect.height });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Track cursor position in coordinates
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const xScreen = e.clientX - rect.left;
    const yScreen = e.clientY - rect.top;

    const cam = cameraRef.current;
    const w = rect.width;
    const h = rect.height;
    const translateX = -cam.x * cam.zoom + w / 2;
    const translateY = -cam.y * cam.zoom + h / 2;

    const xCoord = Math.round((xScreen - translateX) / cam.zoom);
    const yCoord = Math.round(-(yScreen - translateY) / cam.zoom); // invert standard screen Y coordinate
    setCursorCoords({ x: xCoord, y: yCoord });

    // Handle Active Drag (Panning)
    if (isDragging.current && toolMode === "pan") {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      targetCameraRef.current = {
        x: cameraStart.current.x - dx / cam.zoom,
        y: cameraStart.current.y - dy / cam.zoom,
        zoom: targetCameraRef.current.zoom,
      };
      // Keep centering section logic based on camera
      updateActiveSectionByCamera(targetCameraRef.current.x, targetCameraRef.current.y);
    }

    // Handle Active Sketching
    if (isDrawing.current && toolMode === "pencil") {
      const ptX = (xScreen - translateX) / cam.zoom;
      const ptY = (yScreen - translateY) / cam.zoom;
      currentStrokeRef.current.push({ x: ptX, y: ptY });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    if (toolMode === "pan") {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      cameraStart.current = { x: cameraRef.current.x, y: cameraRef.current.y };
    } else if (toolMode === "pencil") {
      isDrawing.current = true;
      const rect = canvas.getBoundingClientRect();
      const xScreen = e.clientX - rect.left;
      const yScreen = e.clientY - rect.top;
      const cam = cameraRef.current;
      const w = rect.width;
      const h = rect.height;
      const translateX = -cam.x * cam.zoom + w / 2;
      const translateY = -cam.y * cam.zoom + h / 2;

      const ptX = (xScreen - translateX) / cam.zoom;
      const ptY = (yScreen - translateY) / cam.zoom;
      currentStrokeRef.current = [{ x: ptX, y: ptY }];
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (toolMode === "pan") {
      isDragging.current = false;
    } else if (toolMode === "pencil") {
      isDrawing.current = false;
      if (currentStrokeRef.current.length > 1) {
        strokesRef.current.push([...currentStrokeRef.current]);
      }
      currentStrokeRef.current = [];
    }
  };

  // Zooming via Wheel Scroll (scroll centers on mouse cursor)
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const cam = cameraRef.current;
    const w = rect.width;
    const h = rect.height;
    const translateX = -cam.x * cam.zoom + w / 2;
    const translateY = -cam.y * cam.zoom + h / 2;

    // Point in coordinate space under cursor
    const coordX = (mouseX - translateX) / cam.zoom;
    const coordY = (mouseY - translateY) / cam.zoom;

    // Calculate new zoom factor
    const zoomIntensity = 0.08;
    const factor = e.deltaY < 0 ? 1 + zoomIntensity : 1 - zoomIntensity;
    const nextZoom = Math.max(0.15, Math.min(3, targetCameraRef.current.zoom * factor));

    // Center camera on the cursor coordinate point at the new zoom scale
    const targetTranslateX = -coordX * nextZoom + mouseX;
    const targetTranslateY = -coordY * nextZoom + mouseY;

    const nextCameraX = -(targetTranslateX - w / 2) / nextZoom;
    const nextCameraY = -(targetTranslateY - h / 2) / nextZoom;

    targetCameraRef.current = {
      x: nextCameraX,
      y: nextCameraY,
      zoom: nextZoom,
    };
    updateActiveSectionByCamera(nextCameraX, nextCameraY);
  };

  // Detect which coordinates card is closest to the camera center to update HUD formula
  const updateActiveSectionByCamera = (x: number, y: number) => {
    const sections = [
      { id: "origin", x: 0, y: 0 },
      { id: "work", x: 1400, y: 0 },
      { id: "lab", x: 0, y: 1000 },
      { id: "experience", x: -1400, y: 0 },
      { id: "contact", x: 0, y: -1000 },
    ];

    let closestId = "origin";
    let minDist = Infinity;

    sections.forEach((sec) => {
      const dist = Math.hypot(sec.x - x, sec.y - y);
      if (dist < minDist) {
        minDist = dist;
        closestId = sec.id;
      }
    });

    // If camera is near this quadrant, trigger HUD title focus update
    if (minDist < 800) {
      setActiveSection(closestId);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Background Interactive Canvas Grid */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className={`absolute inset-0 h-full w-full select-none ${
          toolMode === "pan"
            ? isDragging.current
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-crosshair"
        }`}
        style={{ touchAction: "none" }}
      />

      {/* HTML absolute cards layout wrapper - scaled and panned in render loop */}
      <div
        ref={containerRef}
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: 0, height: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
