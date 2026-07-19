"use client";

import { useEffect, useState } from "react";

// Deterministic pseudo-random — SSR-safe, no Math.random
function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const stars = Array.from({ length: 70 }, (_, i) => ({
  x: rand(i * 2 + 1) * 100,
  y: rand(i * 2 + 2) * 100,
  size: 0.5 + rand(i * 3) * 1.5,
  delay: rand(i * 4) * 6,
  duration: 2 + rand(i * 5) * 4,
  brightness: 0.2 + rand(i * 6) * 0.5,
}));

const comets = [
  { delay: 3, duration: 14, top: 12, angle: -32 },
  { delay: 9, duration: 18, top: 42, angle: -26 },
  { delay: 15, duration: 16, top: 68, angle: -38 },
];

const particles = [
  { x: 15, y: 25, size: 4, delay: 0, duration: 28 },
  { x: 55, y: 12, size: 3, delay: 6, duration: 32 },
  { x: 78, y: 58, size: 5, delay: 10, duration: 26 },
  { x: 32, y: 78, size: 3.5, delay: 4, duration: 30 },
  { x: 48, y: 42, size: 4, delay: 14, duration: 34 },
];

export function CosmicBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="cosmic-bg" aria-hidden="true">
      {mounted && (
        <>
          {stars.map((star, i) => (
            <div
              key={i}
              className="cosmic-star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                "--base-opacity": star.brightness,
                "--twinkle-delay": `${star.delay}s`,
                "--twinkle-duration": `${star.duration}s`,
              } as React.CSSProperties}
            />
          ))}
          {comets.map((comet, i) => (
            <div
              key={`c-${i}`}
              className="cosmic-comet"
              style={{
                top: `${comet.top}%`,
                "--comet-delay": `${comet.delay}s`,
                "--comet-duration": `${comet.duration}s`,
                "--comet-angle": `${comet.angle}deg`,
              } as React.CSSProperties}
            />
          ))}
          {particles.map((p, i) => (
            <div
              key={`p-${i}`}
              className="cosmic-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                "--particle-delay": `${p.delay}s`,
                "--particle-duration": `${p.duration}s`,
              } as React.CSSProperties}
            />
          ))}
        </>
      )}
    </div>
  );
}
