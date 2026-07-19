import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

// A static harmonograph figure rendered as SVG inside the OG card —
// the same identity mark the site draws live.
function figurePath(): string {
  const cx = 890;
  const cy = 315;
  const R = 250;
  let d = "";
  for (let i = 0; i <= 2600; i++) {
    const t = i * 0.012 * 60 * 0.02;
    const x =
      cx +
      (R *
        (0.8 * Math.sin(2.01 * t + 1.2) * Math.exp(-0.002 * t) +
          0.6 * Math.sin(3.0 * t + 2.4) * Math.exp(-0.0025 * t))) /
        2;
    const y =
      cy +
      (R *
        (0.75 * Math.sin(2.99 * t + 0.4) * Math.exp(-0.002 * t) +
          0.65 * Math.sin(2.0 * t + 4.1) * Math.exp(-0.003 * t))) /
        2;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b0b0b",
          color: "#fafafa",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <path
            d={figurePath()}
            fill="none"
            stroke="#fafafa"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            maxWidth: 760,
          }}
        >
          <div style={{ fontSize: 28, color: "#a3a3a3" }}>
            x(t) = Σ A·sin(ft + φ)·e^(−dt)
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 34, color: "#d4d4d4", marginTop: 12 }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: 26, color: "#a3a3a3", marginTop: 28 }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
