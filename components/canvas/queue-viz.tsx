"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Live visual of a max priority queue — the core structure in stl-kit.
// Push inserts with a random priority; pop always removes the max.
type Node = { id: number; priority: number };

let nextId = 1;

export function QueueViz() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: -3, priority: 42 },
    { id: -2, priority: 17 },
    { id: -1, priority: 88 },
  ]);
  const reduced = useReducedMotion();

  const push = () => {
    if (nodes.length >= 8) return;
    setNodes((n) =>
      [...n, { id: nextId++, priority: Math.floor(Math.random() * 99) + 1 }].sort(
        (a, b) => b.priority - a.priority,
      ),
    );
  };

  const pop = () => setNodes((n) => n.slice(1));

  const sorted = [...nodes].sort((a, b) => b.priority - a.priority);

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div
        className="flex min-h-16 flex-wrap items-center gap-2"
        aria-live="polite"
        aria-label={`Priority queue with ${sorted.length} elements: ${sorted.map((n) => n.priority).join(", ")}`}
      >
        <AnimatePresence mode="popLayout">
          {sorted.map((node, i) => (
            <motion.span
              key={node.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: -12 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={`inline-flex size-10 items-center justify-center rounded-md border font-secondary text-sm tabular-nums ${
                i === 0
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground"
              }`}
            >
              {node.priority}
            </motion.span>
          ))}
        </AnimatePresence>
        {sorted.length === 0 && (
          <span className="font-secondary text-xs text-muted-foreground">
            queue is empty
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 font-secondary text-xs">
        <button
          type="button"
          onClick={push}
          disabled={nodes.length >= 8}
          className="rounded-md border border-border px-3 py-1.5 text-foreground transition-colors hover:bg-muted disabled:opacity-40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          .push(rand)
        </button>
        <button
          type="button"
          onClick={pop}
          disabled={nodes.length === 0}
          className="rounded-md border border-border px-3 py-1.5 text-foreground transition-colors hover:bg-muted disabled:opacity-40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          .pop()
        </button>
        <span className="ml-auto text-muted-foreground">max-heap · O(log n)</span>
      </div>
    </div>
  );
}
