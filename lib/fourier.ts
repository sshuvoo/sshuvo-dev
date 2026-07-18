// Discrete Fourier transform of a closed 2D path, treated as complex samples.
// Each output term is an "epicycle": a circle of radius `amp` rotating at
// integer frequency `freq`; summing them all reconstructs the path exactly.

export type Epicycle = {
  freq: number;
  amp: number;
  phase: number;
};

export function dft(points: Array<[number, number]>): Epicycle[] {
  const N = points.length;
  const out: Epicycle[] = [];
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const angle = (-2 * Math.PI * k * n) / N;
      const [x, y] = points[n];
      re += x * Math.cos(angle) - y * Math.sin(angle);
      im += x * Math.sin(angle) + y * Math.cos(angle);
    }
    re /= N;
    im /= N;
    // Map k to signed frequency (…-2,-1,0,1,2…) so rotation is symmetric
    const freq = k <= N / 2 ? k : k - N;
    out.push({ freq, amp: Math.hypot(re, im), phase: Math.atan2(im, re) });
  }
  // Largest circles first: the classic nested-epicycle look, and it makes
  // truncation to the top-K terms meaningful.
  return out.sort((a, b) => b.amp - a.amp);
}

// Evaluate the truncated series at time t ∈ [0, 2π), returning every joint
// of the epicycle chain (for drawing the circles) plus the pen tip.
export function evaluate(
  cycles: Epicycle[],
  k: number,
  t: number,
): Array<[number, number]> {
  const joints: Array<[number, number]> = [[0, 0]];
  let x = 0;
  let y = 0;
  const n = Math.min(k, cycles.length);
  for (let i = 0; i < n; i++) {
    const c = cycles[i];
    const angle = c.freq * t + c.phase;
    x += c.amp * Math.cos(angle);
    y += c.amp * Math.sin(angle);
    joints.push([x, y]);
  }
  return joints;
}

// Resample an arbitrary pointer trail to N points evenly spaced by arc
// length, closing the loop. Even spacing keeps the DFT well-behaved when the
// user draws fast (sparse) and slow (dense) strokes in one gesture.
export function resample(
  trail: Array<[number, number]>,
  n: number,
): Array<[number, number]> {
  if (trail.length < 2) return [];
  const closed = [...trail, trail[0]];
  const lengths: number[] = [0];
  let total = 0;
  for (let i = 1; i < closed.length; i++) {
    total += Math.hypot(
      closed[i][0] - closed[i - 1][0],
      closed[i][1] - closed[i - 1][1],
    );
    lengths.push(total);
  }
  if (total === 0) return [];
  const out: Array<[number, number]> = [];
  let seg = 0;
  for (let i = 0; i < n; i++) {
    const target = (i / n) * total;
    while (seg < lengths.length - 2 && lengths[seg + 1] < target) seg++;
    const span = lengths[seg + 1] - lengths[seg] || 1;
    const f = (target - lengths[seg]) / span;
    out.push([
      closed[seg][0] + (closed[seg + 1][0] - closed[seg][0]) * f,
      closed[seg][1] + (closed[seg + 1][1] - closed[seg][1]) * f,
    ]);
  }
  return out;
}

// Default figure shown before the visitor draws: a five-point star,
// centered on the origin. Distinct at 4 epicycles, crisp at 64.
export function starPoints(radius: number, n = 256): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  const spikes = 5;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    // Interpolate along the star polygon's outline
    const seg = (t / (Math.PI * 2)) * spikes * 2;
    const idx = Math.floor(seg);
    const f = seg - idx;
    const angleA = (idx * Math.PI) / spikes - Math.PI / 2;
    const angleB = ((idx + 1) * Math.PI) / spikes - Math.PI / 2;
    const rA = idx % 2 === 0 ? radius : radius * 0.45;
    const rB = idx % 2 === 0 ? radius * 0.45 : radius;
    const ax = rA * Math.cos(angleA);
    const ay = rA * Math.sin(angleA);
    const bx = rB * Math.cos(angleB);
    const by = rB * Math.sin(angleB);
    pts.push([ax + (bx - ax) * f, ay + (by - ay) * f]);
  }
  return pts;
}
