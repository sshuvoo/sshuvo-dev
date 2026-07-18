"use client";

import { useId, useMemo, useState } from "react";

// Interactive Lissajous figure: x = sin(a·t + δ), y = sin(b·t).
// Pure SVG — the path recomputes from the sliders, no animation loop needed.
export function LissajousLab() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [delta, setDelta] = useState(0.5);
  const baseId = useId();

  const path = useMemo(() => {
    const N = 720;
    const R = 88;
    let d = "";
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * Math.PI * 2;
      const x = 100 + R * Math.sin(a * t + delta * Math.PI);
      const y = 100 + R * Math.sin(b * t);
      d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    }
    return d;
  }, [a, b, delta]);

  const slider = (
    label: string,
    value: number,
    set: (v: number) => void,
    min: number,
    max: number,
    step: number,
  ) => {
    const id = `${baseId}-${label}`;
    return (
      <div className="flex items-center gap-3">
        <label
          htmlFor={id}
          className="w-10 font-secondary text-xs text-muted-foreground"
        >
          {label}
        </label>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-foreground"
        />
        <span className="w-8 text-right font-secondary text-xs tabular-nums text-foreground">
          {value}
        </span>
      </div>
    );
  };

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="order-2 flex flex-col gap-4 sm:order-1">
        <p className="font-secondary text-sm text-muted-foreground">
          x = sin({a}t + {delta}π) · y = sin({b}t)
        </p>
        {slider("a", a, setA, 1, 9, 1)}
        {slider("b", b, setB, 1, 9, 1)}
        {slider("δ", delta, setDelta, 0, 1, 0.05)}
      </div>
      <svg
        viewBox="0 0 200 200"
        className="order-1 mx-auto size-56 sm:order-2 sm:size-64"
        role="img"
        aria-label={`Lissajous curve with frequency ratio ${a} to ${b} and phase ${delta} pi`}
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          className="text-foreground"
        />
      </svg>
    </div>
  );
}
