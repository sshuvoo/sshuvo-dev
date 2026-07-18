"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { dft, evaluate, resample, starPoints, type Epicycle } from "@/lib/fourier";

const SAMPLES = 256;

// The Fourier drawing machine. Idle: rotating epicycles redraw a star.
// Draw any closed-ish shape on it and the machine decomposes YOUR sketch
// into circles and redraws it forever. A slider controls how many terms
// survive — watch your drawing emerge from blobs to fidelity.
export function FourierMachine({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cyclesRef = useRef<Epicycle[]>([]);
  const kRef = useRef(24);
  const trailRef = useRef<Array<[number, number]>>([]);
  const drawingRef = useRef(false);
  const [k, setK] = useState(24);
  const [userDrawn, setUserDrawn] = useState(false);

  const setTerms = (v: number) => {
    kRef.current = v;
    setK(v);
  };

  const loadPath = useCallback((pts: Array<[number, number]>) => {
    cyclesRef.current = dft(pts);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let raf = 0;
    let t = 0;
    let trace: Array<[number, number]> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, (rect.width / 2) * dpr, (rect.height / 2) * dpr);
    };
    resize();

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      return Math.min(rect.width, rect.height);
    };

    if (cyclesRef.current.length === 0) {
      loadPath(starPoints(size() * 0.3, SAMPLES));
    }

    const ink = () => getComputedStyle(canvas).getPropertyValue("color");

    const clearAll = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
    };

    const drawFrame = (showCircles: boolean) => {
      clearAll();
      const color = ink();
      const joints = evaluate(cyclesRef.current, kRef.current, t);
      const tip = joints[joints.length - 1];

      // Epicycle skeleton — the machine itself
      if (showCircles) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.18;
        ctx.lineWidth = 0.75;
        for (let i = 1; i < joints.length; i++) {
          const [px, py] = joints[i - 1];
          const r = Math.hypot(joints[i][0] - px, joints[i][1] - py);
          if (r < 1.5) continue;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.moveTo(joints[0][0], joints[0][1]);
        for (const [jx, jy] of joints) ctx.lineTo(jx, jy);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // The traced output — the pen's ink
      trace.push([tip[0], tip[1]]);
      if (trace.length > SAMPLES + 8) trace = trace.slice(-SAMPLES - 8);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      trace.forEach(([px, py], i) => {
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      // Pen tip
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(tip[0], tip[1], 2.4, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      if (!drawingRef.current) {
        t += (Math.PI * 2) / SAMPLES;
        if (t > Math.PI * 2) {
          t -= Math.PI * 2;
        }
        drawFrame(true);
      }
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      // Static: render the fully-traced figure plus the frozen machine
      trace = [];
      for (let i = 0; i <= SAMPLES; i++) {
        const joints = evaluate(cyclesRef.current, kRef.current, (i / SAMPLES) * Math.PI * 2);
        trace.push(joints[joints.length - 1]);
      }
      t = 0;
      drawFrame(true);
    } else {
      raf = requestAnimationFrame(loop);
    }

    // ——— user drawing capture ———
    const pos = (e: PointerEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left - rect.width / 2, e.clientY - rect.top - rect.height / 2];
    };
    const down = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      drawingRef.current = true;
      trailRef.current = [pos(e)];
    };
    const move = (e: PointerEvent) => {
      if (!drawingRef.current) return;
      trailRef.current.push(pos(e));
      // Live echo of the raw stroke while drawing
      clearAll();
      ctx.strokeStyle = ink();
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      trailRef.current.forEach(([px, py], i) => {
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.globalAlpha = 1;
    };
    const up = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      const pts = resample(trailRef.current, SAMPLES);
      if (pts.length === SAMPLES) {
        loadPath(pts);
        trace = [];
        t = 0;
        setUserDrawn(true);
        if (reduced) {
          for (let i = 0; i <= SAMPLES; i++) {
            const joints = evaluate(cyclesRef.current, kRef.current, (i / SAMPLES) * Math.PI * 2);
            trace.push(joints[joints.length - 1]);
          }
          drawFrame(true);
        }
      }
      trailRef.current = [];
    };

    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      removeEventListener("resize", resize);
    };
    // Note: k changes flow through kRef without restarting the effect
  }, [loadPath]);

  const reset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    loadPath(starPoints(Math.min(rect.width, rect.height) * 0.3, SAMPLES));
    setUserDrawn(false);
  };

  return (
    <div className={className}>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="aspect-square w-full cursor-crosshair touch-none text-foreground"
          role="img"
          aria-label="A Fourier drawing machine: rotating circles trace a figure. Draw a closed shape on it with your pointer and the machine will decompose and redraw your drawing."
        />
        <p
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 font-secondary text-xs whitespace-nowrap text-muted-foreground"
        >
          {userDrawn ? "your sketch, as rotating circles" : "draw any shape on me"}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <label
          htmlFor="fourier-k"
          className="font-secondary text-xs whitespace-nowrap text-muted-foreground"
        >
          {k} circles
        </label>
        <input
          id="fourier-k"
          type="range"
          min={2}
          max={128}
          step={1}
          value={k}
          onChange={(e) => setTerms(Number(e.target.value))}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-foreground"
          aria-label="Number of Fourier terms used to redraw the figure"
        />
        {userDrawn && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-secondary text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <RotateCcw className="size-3" aria-hidden /> star
          </button>
        )}
      </div>
    </div>
  );
}
