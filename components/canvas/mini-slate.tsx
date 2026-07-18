"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser, Pen } from "lucide-react";

// A working miniature of the Slate drawing board: pointer-event capture,
// pressure-aware line width, DPR-corrected canvas. The project card IS the demo.
export function MiniSlate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<[number, number] | null>(null);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Preserve drawing on resize by snapshotting
      const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.putImageData(snapshot, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };
    resize();

    const pos = (e: PointerEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    };

    const down = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      drawing.current = true;
      last.current = pos(e);
    };
    const move = (e: PointerEvent) => {
      if (!drawing.current || !last.current) return;
      const p = pos(e);
      ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue("color");
      ctx.lineWidth = 1 + (e.pressure || 0.5) * 2.5;
      ctx.beginPath();
      ctx.moveTo(last.current[0], last.current[1]);
      ctx.lineTo(p[0], p[1]);
      ctx.stroke();
      last.current = p;
      setHasInk(true);
    };
    const up = () => {
      drawing.current = false;
      last.current = null;
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    addEventListener("resize", resize);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      removeEventListener("resize", resize);
    };
  }, []);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-crosshair touch-none text-foreground"
        aria-label="A small drawing surface — draw on it with your pointer or finger"
      />
      {!hasInk && (
        <p
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 font-secondary text-xs text-muted-foreground"
        >
          <Pen className="size-3.5" /> draw here — it works
        </p>
      )}
      {hasInk && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2 py-1 font-secondary text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Eraser className="size-3" aria-hidden /> clear
        </button>
      )}
    </div>
  );
}
