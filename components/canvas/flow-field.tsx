"use client";

import { useEffect, useRef } from "react";

// A vector field of ~1400 particles advected through curl-like noise.
// The pointer injects a radial charge that bends the field around it —
// the visitor stirs the ink. Pure Canvas, zero dependencies.
export function FlowField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let raf = 0;
    let w = 0;
    let h = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    type P = { x: number; y: number; px: number; py: number };
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(1400, Math.floor((w * h) / 900));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return { x, y, px: x, py: y };
      });
    };
    resize();

    // Smooth pseudo-noise field from layered sines — cheap, seamless, no lib
    const angle = (x: number, y: number, t: number) => {
      const s =
        Math.sin(x * 0.006 + t * 0.00022) +
        Math.sin(y * 0.008 - t * 0.00018) +
        Math.sin((x + y) * 0.004 + t * 0.0001);
      return s * Math.PI * 0.7;
    };

    const ink = () => getComputedStyle(canvas).getPropertyValue("color");

    const step = (time: number) => {
      // Persistent trails: fade instead of clear
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.045)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      ctx.strokeStyle = ink();
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (const p of particles) {
        const a = angle(p.x, p.y, time);
        let vx = Math.cos(a) * 1.1;
        let vy = Math.sin(a) * 1.1;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22500) {
            // Swirl around the pointer: perpendicular push, 1/d falloff
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / 150) * 3.2;
            vx += (-dy / d) * f;
            vy += (dx / d) * f;
          }
        }

        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy;

        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.px = p.x;
          p.py = p.y;
          continue;
        }
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(step);
    };

    if (reduced) {
      // Static impression: draw one long advection pass, no loop
      ctx.strokeStyle = ink();
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      for (const p of particles) {
        ctx.moveTo(p.x, p.y);
        let x = p.x;
        let y = p.y;
        for (let s = 0; s < 40; s++) {
          const a = angle(x, y, 0);
          x += Math.cos(a) * 2;
          y += Math.sin(a) * 2;
          if (x < 0 || x > w || y < 0 || y > h) break;
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      raf = requestAnimationFrame(step);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="A field of flowing ink particles. Move your pointer through it to stir the flow."
    />
  );
}
