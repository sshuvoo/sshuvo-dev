"use client";

import { useEffect, useRef } from "react";

// A harmonograph traces the path of a pen attached to damped pendulums:
// x(t) = Σ A·sin(f·t + φ)·e^(−d·t). Drawn progressively, it looks like a
// hand plotting ink; the damping makes it spiral toward stillness.
type Pendulum = {
  amp: number;
  freq: number;
  phase: number;
  damp: number;
};

type Params = { x: [Pendulum, Pendulum]; y: [Pendulum, Pendulum] };

function makeParams(seed: number): Params {
  // Deterministic pseudo-random from a seed so a given day/visit can share a figure
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const pendulum = (base: number): Pendulum => ({
    amp: 0.55 + rand() * 0.4,
    // Near-integer frequency ratios give closed, elegant figures
    freq: base + (rand() - 0.5) * 0.02,
    phase: rand() * Math.PI * 2,
    damp: 0.0015 + rand() * 0.0025,
  });
  return {
    x: [pendulum(2), pendulum(3)],
    y: [pendulum(3), pendulum(2)],
  };
}

function point(p: Params, t: number, r: number): [number, number] {
  const term = (pe: Pendulum) =>
    pe.amp * Math.sin(pe.freq * t + pe.phase) * Math.exp(-pe.damp * t);
  return [
    (r * (term(p.x[0]) + term(p.x[1]))) / 2,
    (r * (term(p.y[0]) + term(p.y[1]))) / 2,
  ];
}

export function Harmonograph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let raf = 0;
    let t = 0;
    let params = makeParams(Date.now() % 2147483646 || 1);

    const ink = () =>
      getComputedStyle(canvas).getPropertyValue("color") || "#000";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, (rect.width / 2) * dpr, (rect.height / 2) * dpr);
    };

    const STEP = 0.012;
    const TOTAL = 5200; // total integration steps for a complete figure

    const drawSegment = (from: number, to: number, radius: number) => {
      ctx.strokeStyle = ink();
      ctx.lineWidth = 0.75;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      let [px, py] = point(params, from * STEP * 60, radius);
      ctx.moveTo(px, py);
      for (let i = from + 1; i <= to; i++) {
        [px, py] = point(params, i * STEP * 60, radius);
        ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const radius = () =>
      Math.min(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height) * 0.46;

    resize();

    if (reduced) {
      // No animation: plot the finished figure once
      drawSegment(0, TOTAL, radius());
    } else {
      const tick = () => {
        const perFrame = 26;
        if (t < TOTAL) {
          drawSegment(t, Math.min(t + perFrame, TOTAL), radius());
          t += perFrame;
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => {
      resize();
      // Redraw everything plotted so far at the new size
      drawSegment(0, reduced ? TOTAL : t, radius());
    };
    addEventListener("resize", onResize);

    const restart = () => {
      if (reduced) return;
      cancelAnimationFrame(raf);
      params = makeParams((Date.now() % 2147483646) + 1);
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
      t = 0;
      const tick = () => {
        const perFrame = 26;
        if (t < TOTAL) {
          drawSegment(t, Math.min(t + perFrame, TOTAL), radius());
          t += perFrame;
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    };
    canvas.addEventListener("click", restart);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      canvas.removeEventListener("click", restart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="A generative harmonograph figure — damped pendulum curves drawn in ink. Click to redraw a new one."
      title="Click to draw a new figure"
    />
  );
}
